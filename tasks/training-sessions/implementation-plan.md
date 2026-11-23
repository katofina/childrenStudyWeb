# Implementation Plan: Training Sessions Workspace

## Scope

Implement the accepted training-sessions workspace in the existing Next.js application route:

- Replace or repurpose the existing home route UI with a trainer-oriented sessions workspace.
- Request mock sessions through a replaceable HTTP or equivalent request boundary.
- Show initial loading and recoverable error states.
- Display each returned or newly created session with title, status, and start date/time.
- Provide `All` and exactly one representative status filter, such as `Scheduled`, based on the requirements assumption.
- Provide a create form for title, date, and time.
- Trim and validate title length; require date and time; validate the combined date/time as future at submission.
- Prevent duplicate create submissions while pending and add a successful created session to the current view only when it matches the active filter.
- Add at least one behavior-level automated test for filtering or successful creation.
- Document the repository command used to start the app.
- Preserve a real-browser observation record in the later verification artifact if verification is performed.

## Out of scope

- Session details, drawers, deep links, or navigation to another route.
- Search, pagination, or additional status/multiple filters.
- Complete API contract or scenario matrix.
- Backend implementation or durable database persistence.
- Strict TypeScript migration or unrelated refactoring.
- CI, deployment, public URL, or production hosting.
- Desktop/mobile screenshot sets or exhaustive accessibility/responsive testing.
- Full test coverage.
- Visual or structural changes unrelated to the onboarding flow.
- Resolution of non-blocking open questions beyond reasonable assumptions recorded in the requirements artifact.

## Likely files and directories

- `src/app/page.tsx`: workspace page, list, filter, create form, loading/error/pending states, and UI state orchestration.
- `src/app/page.module.css`: scoped layout and states for the workspace.
- `src/app/globals.css`: only if a small global base-style correction is required; avoid unrelated global changes.
- `package.json`: add a documented test script and test dependencies if the repository test stack requires them.
- A mock request module or HTTP mock setup, location to be selected by implementation without creating a backend:
  - for example `src/app/mockSessions.ts`, or another conventional `src/` mock boundary;
  - if MSW is used, add its setup/config files and public worker asset; otherwise prefer a small replaceable mock module exposed through a fetch boundary.
- Test files adjacent to the page or in a conventional test directory, for example `src/app/page.test.tsx` or `src/app/page.spec.tsx`.
- `README.md`: document the existing repository start command and test command if added.
- `tasks/training-sessions/implementation-plan.md`: this plan artifact.

The implementation should prefer the existing Next.js app, npm scripts, MUI dependency, and React state patterns. It should not introduce a new route outside the existing application root.

## Required UI behavior and states

### Initial workspace

- On first load, trigger the mock session list request.
- While pending, show an identifiable loading state.
- On success, show the returned sessions as a list or cards.
- Each session visibly shows:
  - trimmed or original title;
  - status;
  - readable start date/time.
- No sessions should be invented outside the mock boundary.

### Filters

- Render `All` and one status filter; exactly one status filter should represent the onboarding status value.
- Use `Scheduled` as the representative status unless repository context supplies a confirmed status name.
- Selecting a filter immediately derives and renders only matching sessions.
- Filtering does not reload or reopen the workspace.
- Under `All`, show every session regardless of status.

### Create form

- Provide an open/create action and a form.
- Include title, date, and time controls; both date and time are required.
- On submission:
  - trim leading and trailing title whitespace;
  - reject an empty title or titles shorter than 3 or longer than 80 characters;
  - reject missing date or time;
  - combine date/time and reject a value that is not later than the submission-time clock;
  - place readable validation messages near the relevant field or form.
- The submit action is disabled and duplicated submit attempts are blocked while creation is pending.
- Show a create-pending state.
- On create failure, preserve entered values and show an understandable readable form error with retry available.
- On create success, add the returned or locally modeled session to the sessions state and remain visible only if it matches the active filter.
- If the created session is filtered out, do not falsely include it in the rendered list.
- Form close behavior and success confirmation are intentionally left as implementation details consistent with the accepted assumptions, unless a confirmed requirement is later supplied.

### Request states

- Initial loading: explicit pending text or indicator.
- Initial success: session list rendered.
- Initial error: understandable message plus retry action that re-runs only the list request.
- Create pending: submit disabled and a visible pending label/indicator.
- Create failure: readable form-level or field-level error; form remains usable.
- Create success: session state update and immediate filter-aware rendering.

## Data flow and state changes

1. `Home`/workspace state initializes with `sessions=[]`, `filter=All`, and initial request status `idle/loading/error/success`.
2. A mount effect calls a list function from the mock request boundary.
3. The request boundary returns session objects shaped with at least `id`, `title`, `status`, and `startDateTime` or equivalent fields.
4. While loading, render the loading state instead of stale sessions.
5. On success, set sessions and request status to success.
6. On failure, set request status to error; a retry calls the same list function and restores loading state.
7. Filter state changes only when the filter control is selected. Visible sessions are derived as `filter === All ? sessions : sessions.filter(session.status === filter)`.
8. Create form state owns title, date, time, field/form errors, and open state if the form is modal or conditionally rendered.
9. Submission validates synchronously and then guards against pending status; only a valid submission calls the mock create boundary.
10. Create pending sets `isCreating=true`; disable submit and duplicate submission.
11. Create success appends or prepends the created session in state and clears pending; it does not directly bypass filtering.
12. Create failure sets a readable form error, clears pending, and preserves form values for retry.
13. Persistence is in-memory or mock-lifetime only unless the existing mock mechanism provides reload persistence.

## Essential test coverage

Add at least one behavior-level automated test. Recommended primary test: successful creation.

- Render the workspace with a mock session list.
- Wait for loading to resolve.
- Open the form.
- Enter a valid title and future date/time.
- Submit and verify:
  - pending state prevents duplicate submission;
  - successful session appears in the visible list;
  - it remains visible under `All` or a matching status filter.

Alternative acceptable test: filtering.

- Render sessions with at least one matching and one nonmatching status.
- Resolve loading.
- Select the one status filter.
- Verify only matching sessions remain.

High-value validation assertions for any test suite:

- title whitespace is trimmed before validation and submission;
- a title shorter than 3 or longer than 80 characters is rejected;
- date/time in the past is rejected.

Keep test scope behavior-oriented; do not require full unit coverage or exhaustive scenario matrices.

## Verification commands and expected evidence

- Install dependencies if required: `npm install`
  - Expected: dependencies resolve successfully.
- Start the app: `npm run dev`
  - Expected: Next.js reports a local URL, normally `http://localhost:3000`; application route responds successfully.
- Repository checks:
  - `npm run lint`
  - Expected: no lint failures, or report concrete unrelated or corrected failures.
  - `npm run build`
  - Expected: production build completes if the current environment supports it.
- Tests: use `npm test -- --runInBand` only if the test script and runner conventions support it; otherwise use the repository-documented test command.
  - Expected: at least the behavior-level test passes.
- Manual browser check:
  - Open the local URL.
  - Observe initial loading and successful or recoverable error behavior.
  - Exercise `All`, the status filter, form open, valid future-session creation, and list update.
  - Expected evidence: actual observations, command used, URL, and success/failure must be recorded in `tasks/training-sessions/verification.md`.

No verification claim should be made without an executed command or observed browser result.

## Key risks and unresolved constraints

- Status naming is unspecified. The plan assumes `Scheduled` for one status filter; implementation must keep the value simple and centralized to avoid future contract churn.
- Persistence semantics are not specified. Implementation should use mock/in-memory behavior only; do not imply reload persistence.
- Create success UX is unspecified. A reasonable implementation may close the form or keep it open, but should provide either clear success feedback or an obvious return to the updated list.
- Retry behavior for the initial list request is unspecified. The implementation may provide a Retry button that reissues the list request; exact retry copy is not contract-critical.
- Create error response shape is unspecified. The mock boundary should support a clear generic failure and the UI should remain retryable; exact server status text can remain a low-risk implementation detail.
- Test tooling is not configured in `package.json` and no existing test files were found. Implementation needs to select and add conventional React/Next test tooling rather than adding broad infrastructure.
- Existing home-page styles and content may conflict with the onboarding view. The plan treats replacement of that route as part of scope, while avoiding unrelated route/refactor changes.
- The mock mechanism must remain HTTP-like or replaceable and must not become a backend service.
- Browser and verification artifacts may expose environment limitations even when code behavior is complete; verification evidence must be honest and explicit.
