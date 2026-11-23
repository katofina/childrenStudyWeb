'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./page.module.css";
import {
  createTrainingSession,
  getVisibleSessions,
  listTrainingSessions,
  prependCreatedSession,
  SessionStatus,
  TrainingSession,
  validateSessionInput,
} from "./trainingSessions";

const FILTERS: Array<"All" | SessionStatus> = ["All", "Scheduled"];

function formatSessionTime(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function Home() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [filter, setFilter] = useState<"All" | SessionStatus>("All");
  const [listState, setListState] = useState<"loading" | "success" | "error">("loading");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const createPendingRef = useRef(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const loadSessions = async () => {
    setListState("loading");
    try {
      const nextSessions = await listTrainingSessions();
      setSessions(nextSessions);
      setListState("success");
    } catch {
      setListState("error");
    }
  };

  useEffect(() => {
    void loadSessions();
  }, []);

  const visibleSessions = useMemo(
    () => getVisibleSessions(sessions, filter),
    [sessions, filter],
  );

  const openCreate = () => {
    setCreateError("");
    setTitleError("");
    setDateError("");
    setTimeError("");
    setSuccessMessage("");
    setIsCreateOpen(true);
  };

  const closeCreate = () => {
    if (createPendingRef.current) return;
    setIsCreateOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (createPendingRef.current) return;

    const trimmedTitle = title.trim();
    const errors = validateSessionInput({ title: trimmedTitle, date, time });
    setTitleError(errors.title ?? "");
    setDateError(errors.date ?? "");
    setTimeError(errors.time ?? "");
    setCreateError("");

    if (errors.title || errors.date || errors.time) {
      if (errors.title) titleRef.current?.focus();
      else if (errors.date) dateRef.current?.focus();
      else if (errors.time) timeRef.current?.focus();
      return;
    }

    createPendingRef.current = true;
    setIsCreating(true);
    try {
      const created = await createTrainingSession({
        title: trimmedTitle,
        date,
        time,
      });
      setSessions((current) => prependCreatedSession(current, created));
      setIsCreateOpen(false);
      setTitle("");
      setDate("");
      setTime("");
      setSuccessMessage("Session created successfully.");
    } catch {
      setCreateError("We couldn't create the session. Check the form and try again.");
    } finally {
      createPendingRef.current = false;
      setIsCreating(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.workspace} aria-labelledby="training-sessions-heading">
        <div className={styles.toolbar}>
          <div>
            <Typography id="training-sessions-heading" component="h1" variant="h4">
              Training sessions
            </Typography>
            <Typography color="text.secondary">
              View and create upcoming training sessions.
            </Typography>
          </div>
          <Button variant="contained" onClick={openCreate}>
            Create session
          </Button>
        </div>

        {successMessage ? (
          <Alert severity="success" onClose={() => setSuccessMessage("")}>
            {successMessage}
          </Alert>
        ) : null}

        {listState === "loading" ? (
          <div className={styles.loadingState} role="status" aria-live="polite">
            <CircularProgress size={28} />
            <span>Loading sessions…</span>
          </div>
        ) : null}

        {listState === "error" ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => void loadSessions()}>
                Retry
              </Button>
            }
          >
            We couldn&apos;t load the sessions. Try again.
          </Alert>
        ) : null}

        {listState === "success" ? (
          <>
            <FormControl size="small" className={styles.filter}>
              <InputLabel id="session-filter-label">Status filter</InputLabel>
              <Select
                labelId="session-filter-label"
                label="Status filter"
                value={filter}
                onChange={(event) => setFilter(event.target.value as "All" | SessionStatus)}
              >
                {FILTERS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {visibleSessions.length > 0 ? (
              <ul className={styles.sessionList}>
                {visibleSessions.map((session) => (
                  <li className={styles.sessionCard} key={session.id}>
                    <Box>
                      <Typography component="h2" variant="h6">
                        {session.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {formatSessionTime(session.startDateTime)}
                      </Typography>
                    </Box>
                    <span className={styles.status}>{session.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.emptyState}>No sessions match this filter.</div>
            )}
          </>
        ) : null}
      </section>

      <Dialog open={isCreateOpen} onClose={closeCreate} fullWidth maxWidth="sm">
        <DialogTitle>Create a session</DialogTitle>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <DialogContent className={styles.form}>
            {createError ? <Alert severity="error">{createError}</Alert> : null}
            <TextField
              label="Session title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              error={Boolean(titleError)}
              helperText={titleError}
              fullWidth
              required
              inputProps={{ maxLength: 81 }}
              disabled={isCreating}
              inputRef={titleRef}
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              error={Boolean(dateError)}
              helperText={dateError}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              disabled={isCreating}
              inputRef={dateRef}
            />
            <TextField
              label="Time"
              name="time"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              error={Boolean(timeError)}
              helperText={timeError}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              disabled={isCreating}
              inputRef={timeRef}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={closeCreate} disabled={isCreating}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isCreating}>
              {isCreating ? "Creating…" : "Create"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
