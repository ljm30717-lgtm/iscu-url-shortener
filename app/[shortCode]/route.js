import { findUrlByShortCode, recordClick } from "../../lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request, { params }) {
  const { shortCode } = await params;
  if (!/^[A-Za-z0-9]{6}$/.test(shortCode)) return new Response("Not Found", { status: 404 });
  try {
    const originalUrl = await findUrlByShortCode(shortCode);
    if (!originalUrl) return new Response("Not Found", { status: 404 });
    // 기록 실패 때문에 리다이렉트가 막히지 않도록 처리
    await recordClick(shortCode).catch(e => console.error("Click stats error", e));
    return new Response(null, { status: 307, headers: { Location: originalUrl, "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("Redirect DB error", e);
    return new Response("Server Error", { status: 500 });
  }
}
