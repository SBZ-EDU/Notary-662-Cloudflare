-- Migration to create the tables for Cloudflare D1
CREATE TABLE IF NOT EXISTS professionals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  specialty TEXT,
  address TEXT,
  contact TEXT,
  website TEXT,
  summary TEXT,
  type TEXT -- 'lawyer' or 'notary'
);

CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  title TEXT,
  docType TEXT,
  timestamp INTEGER,
  messages TEXT -- JSON string
);

CREATE TABLE IF NOT EXISTS checkpoints (
  id TEXT PRIMARY KEY,
  name TEXT,
  timestamp INTEGER,
  state TEXT -- JSON string
);
