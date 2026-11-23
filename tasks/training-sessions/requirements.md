# Requirements: Training Sessions Workspace

## Task

- Task ID: `training-sessions`
- Repository: `/Users/oadmin/Documents/projects/childrenStudyWeb`
- Phase: Requirements analysis

## Goal

Provide a trainer with a small frontend workspace to view training sessions, filter the list by one status, and create a session that appears in the list immediately after successful creation.

## Primary User

- A trainer who needs a simple list of training sessions and a way to add a future session.

## User Outcome

The trainer can open the workspace, see sessions loaded from the mock API, choose one status filter, open the create form, submit a valid future session, and see the new session in the visible list.

## Acceptance Criteria

### Initial loading

1. When the workspace opens, it requests the sessions and displays a clear loading state while the request is pending.
2. When the request completes successfully, the workspace shows the returned sessions.
3. Each session visibly includes its title, status, and start date/time.

### Filtering

1. An `All` filter is available and shows sessions regardless of status.
2. Exactly one status filter is available for the onboarding flow.
3. Selecting a status updates the visible list to contain only sessions with that status.
4. Filtering does not require reopening or reloading the workspace.

### Create session

1. The trainer can open a create form.
2. The title is required.
3. Leading and trailing whitespace is trimmed before validation and submission.
4. The trimmed title is valid only when it contains between 3 and 80 characters, inclusive.
5. The date and time fields are both required.
6. The combined date/time must be later than the current time at the moment of submission.
7. Invalid title or date/time input produces a useful, readable validation message near the relevant field or form.
8. The submission action is prevented while a create request is pending.
9. A second submit is not accepted while the first request is pending.
10. If creation succeeds, the new session is added to the visible list and remains visible under the current filter when it matches that filter.
11. If the created session does not match the current filter, the application must not falsely show it as matching; it may remain out of the visible list until the filter is changed.

### Request states

1. The initial sessions request has an identifiable loading state.
2. The initial sessions request has one understandable, recoverable error state, with an available retry or equivalent recovery action.
3. The create request prevents duplicate submission and reports failure in an understandable way that leaves the form usable for retry.
4. The create request has a pending state in the UI.

### Verification

1. At least one behavior-level automated test covers a main flow: filtering or successful creation.
2. The application must start with a documented repository command.
3. The list, filter, and create flow must be exercised once in a real browser.
4. The manual browser observation must state what was actually observed, including the command used and whether the flow succeeded.

## Non-Goals

- Session details, drawers, or deep links.
- Search or multiple filters.
- Pagination.
- A complete API contract or scenario matrix.
- Desktop/mobile screenshot sets.
- Exhaustive responsive and accessibility validation.
- Full test coverage.
- CI, deployment, or a public URL.
- Strict TypeScript migration or unrelated refactoring.
- Backend implementation; mock data remains behind a replaceable HTTP or equivalent request boundary.

## Facts

- The application is a Next.js frontend using npm scripts in the existing repository.
- The task requires a mock API, not a backend service.
- The pass criteria require requirements, plan, review, verification, and workflow-log artifacts.
- The existing workflow log reports a passing repository, Node.js, manifest, browser capability, docs capability, and lint capability, but pending activation of Claude and Codex hooks.
- The repository currently has no test script in `package.json` and no existing requirements artifact was found in the task directories.

## Assumptions

- The available status values and status names for mock sessions have not been specified. A single representative status such as `Scheduled` is sufficient for the required filter unless a human supplies a different expected status.
- Date and time are entered through two fields or a conventional combined date-time control.
- “Recoverable request error” means the user can retry or reattempt without restarting the application.
- A successful create operation is represented locally or through the mock request boundary and does not persist beyond mock-session lifetime unless the existing mock mechanism supplies persistence.
- The app should open in its existing application route rather than introducing a new route outside the onboarding scope.

## Open Questions

1. Which status value should be used for the required single status filter (for example, `Scheduled`, `Upcoming`, or another repository-defined value)?
2. Are mock sessions and form-created sessions intended to persist only in memory, or must they persist across browser reloads?
3. Should the create form close after success, and should focus or confirmation feedback be displayed?
4. What exact retry behavior is expected for a failed initial list request?
5. What exact create error text or status response should the UI handle from the mock boundary?

These questions do not block documenting requirements, but status naming and persistence semantics may require human clarification before implementation contract decisions are made.

## Dependencies

- Existing Next.js application and npm package setup.
- Existing or addable test tooling for one behavior-level test.
- A conventional mock HTTP boundary or existing repository mock mechanism.
- Browser tooling is available for the manual check.

## Readiness

Requirements are sufficiently bounded for a later implementation plan. Product ambiguities remain around status naming, persistence, and success/retry feedback, but none is confirmed to block the core list/filter/create outcome if reasonable onboarding assumptions are recorded.

## STOP

Requirements analysis is complete. No implementation, architecture selection, plan, or subsequent role was started.