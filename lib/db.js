import { neon } from "@neondatabase/serverless";

function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  return neon(process.env.DATABASE_URL);
}

export async function findByOriginalUrl(originalUrl) {
  const sql = db();
  const rows = await sql`SELECT short_code FROM urls WHERE original_url = ${originalUrl} LIMIT 1`;
  return rows[0]?.short_code ?? null;
}

export async function saveOrFindUrl(shortCode, originalUrl) {
  const sql = db();
  const rows = await sql`
    INSERT INTO urls (short_code, original_url)
    VALUES (${shortCode}, ${originalUrl})
    ON CONFLICT DO NOTHING
    RETURNING short_code
  `;
  if (rows.length) return rows[0].short_code;
  const existing = await findByOriginalUrl(originalUrl);
  return existing; // null이면 코드 충돌: 호출 측에서 다음 후보를 시도
}

export async function findUrlByShortCode(shortCode) {
  const sql = db();
  const rows = await sql`SELECT original_url FROM urls WHERE short_code = ${shortCode} LIMIT 1`;
  return rows[0]?.original_url ?? null;
}

export async function recordClick(shortCode) {
  const sql = db();
  await sql`UPDATE urls SET click_count = click_count + 1 WHERE short_code = ${shortCode}`;
}

export async function getStats() {
  const sql = db();
  const rows = await sql`SELECT short_code, original_url, created_at, click_count FROM urls ORDER BY created_at DESC LIMIT 100`;
  return rows;
}
