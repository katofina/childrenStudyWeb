import test from "node:test";
import assert from "node:assert/strict";
import {
  createTrainingSession,
  getVisibleSessions,
  prependCreatedSession,
  runCreateOnce,
  validateSessionInput,
  type TrainingSession,
} from "./trainingSessions.ts";

const sessions: TrainingSession[] = [
  {
    id: "1",
    title: "Reading foundations",
    status: "Scheduled",
    startDateTime: "2026-12-02T09:30:00",
  },
  {
    id: "2",
    title: "Creative math practice",
    status: "Completed",
    startDateTime: "2026-11-15T14:00:00",
  },
];

test("filters the visible session list without reloading", () => {
  assert.deepEqual(getVisibleSessions(sessions, "All"), sessions);
  assert.deepEqual(getVisibleSessions(sessions, "Scheduled"), [sessions[0]]);
});

test("validates trimmed title and future date/time", () => {
  const now = new Date("2026-11-23T12:00:00");

  assert.deepEqual(
    validateSessionInput(
      { title: "  AB  ", date: "2026-11-23", time: "11:00" },
      now,
    ),
    {
      title: "Title must be at least 3 characters.",
      date: "Date and time must be later than now.",
    },
  );

  assert.deepEqual(
    validateSessionInput(
      { title: "  Reading practice  ", date: "2026-11-24", time: "09:30" },
      now,
    ),
    {},
  );
});

test("prevents duplicate create work while pending", async () => {
  const pending = { current: false };
  let operationCount = 0;

  const first = runCreateOnce(pending, async () => {
    operationCount += 1;
    await new Promise((resolve) => setTimeout(resolve, 5));
    return "created";
  });
  const second = await runCreateOnce(pending, async () => {
    operationCount += 1;
    return "duplicate";
  });

  assert.equal(await first, "created");
  assert.equal(second, undefined);
  assert.equal(operationCount, 1);
});

test("successful creation updates and respects the active filter", async () => {
  const pending = { current: false };
  const created = await runCreateOnce(pending, () =>
    createTrainingSession({
      title: "Verification session",
      date: "2026-12-10",
      time: "10:00",
    }),
  );

  assert.ok(created);
  const updated = prependCreatedSession(sessions, created);

  assert.equal(updated[0].title, "Verification session");
  assert.equal(updated[0].status, "Scheduled");
  assert.deepEqual(getVisibleSessions(updated, "Scheduled"), [updated[0], sessions[0]]);
  assert.deepEqual(getVisibleSessions(updated, "Completed"), [sessions[1]]);
});
