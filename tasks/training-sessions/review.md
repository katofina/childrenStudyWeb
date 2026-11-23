# Code Review

## Findings

1. **MEDIUM** — `src/app/page.tsx:93` adds a nested `<main>` inside the layout’s existing `<main>` at `src/app/layout.tsx:18`. Use a `div` or `section` for the page root to preserve valid landmark structure.

2. **MEDIUM** — `src/app/trainingSessions.test.ts:23` tests only pure filtering/validation helpers. It does not exercise the required create/filter UI behavior, duplicate-submission guard, pending state, or successful list update.

3. **LOW** — `src/app/page.tsx:78` does not move focus to the first invalid field after submission. Invalid form submissions still produce inline errors, but keyboard users lack clear focus recovery.

## Verdict: **NEEDS-CHANGES**

`npm test` passes with 2 tests; `npm run lint` passes with no warnings or errors.

Residual gaps: no real-browser evidence or production build verification.
