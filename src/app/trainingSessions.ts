export type SessionStatus = "Scheduled" | "Completed";

export type TrainingSession = {
  id: string;
  title: string;
  status: SessionStatus;
  startDateTime: string;
};

export type SessionCreateInput = {
  title: string;
  date: string;
  time: string;
};

export type SessionValidationErrors = {
  title?: string;
  date?: string;
  time?: string;
};

const INITIAL_SESSIONS: TrainingSession[] = [
  {
    id: "session-1",
    title: "Reading foundations",
    status: "Scheduled",
    startDateTime: "2026-12-02T09:30:00",
  },
  {
    id: "session-2",
    title: "Creative math practice",
    status: "Completed",
    startDateTime: "2026-11-15T14:00:00",
  },
  {
    id: "session-3",
    title: "Scratch exploration",
    status: "Scheduled",
    startDateTime: "2026-12-09T16:15:00",
  },
];

let sessions = INITIAL_SESSIONS.map((session) => ({ ...session }));
let nextId = 4;

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function listTrainingSessions(): Promise<TrainingSession[]> {
  await wait(450);
  return sessions.map((session) => ({ ...session }));
}

export async function createTrainingSession(input: SessionCreateInput): Promise<TrainingSession> {
  await wait(650);

  const created: TrainingSession = {
    id: `session-${nextId}`,
    title: input.title,
    status: "Scheduled",
    startDateTime: `${input.date}T${input.time}:00`,
  };

  nextId += 1;
  sessions = [created, ...sessions];
  return { ...created };
}

export function validateSessionInput(
  input: SessionCreateInput,
  now: Date = new Date(),
): SessionValidationErrors {
  const errors: SessionValidationErrors = {};
  const title = input.title.trim();

  if (!title) {
    errors.title = "Enter a session title.";
  } else if (title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  } else if (title.length > 80) {
    errors.title = "Title must be 80 characters or fewer.";
  }

  if (!input.date) {
    errors.date = "Choose a date.";
  }

  if (!input.time) {
    errors.time = "Choose a time.";
  }

  if (input.date && input.time) {
    const combined = new Date(`${input.date}T${input.time}`);
    if (Number.isNaN(combined.getTime())) {
      errors.date = "Enter a valid date and time.";
    } else if (combined.getTime() <= now.getTime()) {
      errors.date = "Date and time must be later than now.";
    }
  }

  return errors;
}

export function getVisibleSessions(
  sessionsToFilter: TrainingSession[],
  filter: "All" | SessionStatus,
): TrainingSession[] {
  return filter === "All"
    ? sessionsToFilter
    : sessionsToFilter.filter((session) => session.status === filter);
}

export async function runCreateOnce<T>(
  pendingRef: { current: boolean },
  operation: () => Promise<T>,
): Promise<T | undefined> {
  if (pendingRef.current) return undefined;

  pendingRef.current = true;
  try {
    return await operation();
  } finally {
    pendingRef.current = false;
  }
}

export function prependCreatedSession(
  sessionsToUpdate: TrainingSession[],
  created: TrainingSession,
): TrainingSession[] {
  return [created, ...sessionsToUpdate];
}
