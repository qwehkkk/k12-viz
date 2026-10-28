CREATE TABLE IF NOT EXISTS feedback (
  id    TEXT PRIMARY KEY,
  ts    INTEGER NOT NULL,
  page  TEXT,
  title TEXT,
  trail TEXT,
  ctx   TEXT,
  text  TEXT NOT NULL,
  nick  TEXT,
  ua    TEXT
);
CREATE INDEX IF NOT EXISTS idx_feedback_page ON feedback(page, ts DESC);
