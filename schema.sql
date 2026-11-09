-- Neon SQL Editor에서 한 번 실행합니다.
CREATE TABLE IF NOT EXISTS urls (
  short_code VARCHAR(6) PRIMARY KEY,
  original_url VARCHAR(2048) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  click_count INTEGER NOT NULL DEFAULT 0
);
CREATE UNIQUE INDEX IF NOT EXISTS urls_original_url_unique ON urls (original_url);
