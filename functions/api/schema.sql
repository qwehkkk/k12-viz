-- 留言表：wrangler d1 execute tuzhi-feedback --file=functions/api/schema.sql --remote
CREATE TABLE IF NOT EXISTS feedback (
  id    TEXT PRIMARY KEY,
  ts    INTEGER NOT NULL,
  page  TEXT,
  title TEXT,
  trail TEXT,
  ctx   TEXT,          -- JSON：画面引用（组件类型、参数状态文字、缩略图 dataURL）
  text  TEXT NOT NULL,
  nick  TEXT,
  ua    TEXT
);
CREATE INDEX IF NOT EXISTS idx_feedback_page ON feedback(page, ts DESC);
