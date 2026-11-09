import { createShortCode } from "../../../lib/code";
import { findByOriginalUrl, saveOrFindUrl } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const error = (code, message) => Response.json({ error: { code, message } }, { status: 400 });

export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return error("INVALID_URL", "올바른 JSON 요청이 필요합니다."); }
  const originalUrl = body?.originalUrl;
  if (typeof originalUrl !== "string" || !originalUrl.trim()) return error("MISSING_URL", "URL을 입력하세요.");
  if (originalUrl.length > 2048) return error("INVALID_URL", "URL이 너무 깁니다.");
  let parsed;
  try { parsed = new URL(originalUrl); }
  catch { return error("INVALID_URL", "올바른 URL이 아닙니다."); }
  if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname || parsed.username || parsed.password) {
    return error("INVALID_URL", "HTTP 또는 HTTPS 주소만 사용할 수 있습니다.");
  }
  // 요청이 들어온 실제 서비스 호스트와 일치하면 프로토콜·경로에 관계없이 거부.
  const requestHost = new URL(request.url).hostname.toLowerCase().replace(/\.$/, "");
  const forwarded = request.headers.get("x-forwarded-host")?.split(",")[0].trim().split(":")[0].toLowerCase();
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.toLowerCase();
  const aliases = new Set([requestHost, forwarded, vercelHost].filter(Boolean));
  if (aliases.has(parsed.hostname.toLowerCase().replace(/\.$/, ""))) {
    return error("SELF_URL", "자기 서비스 URL은 단축할 수 없습니다.");
  }
  try {
    let shortCode = await findByOriginalUrl(originalUrl);
    if (!shortCode) {
      for (let attempt = 0; attempt < 25; attempt++) {
        shortCode = await saveOrFindUrl(createShortCode(originalUrl, attempt), originalUrl);
        if (shortCode) break;
      }
    }
    if (!shortCode) return Response.json({ error: { code: "COLLISION", message: "코드 생성 실패" } }, { status: 503 });
    const baseUrl = new URL(request.url).origin;
    return Response.json({ shortCode, originalUrl, shortUrl: `${baseUrl}/${shortCode}` }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("Shorten DB error", e);
    return Response.json({ error: { code: "SERVER_ERROR", message: "데이터베이스 연결을 확인하세요." } }, { status: 500 });
  }
}
