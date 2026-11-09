import { authenticate, authenticationRequiredResponse } from "../../../lib/auth";
import { authorize } from "../../../lib/authorization";
import { getStats } from "../../../lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request) {
  const user = authenticate(request);
  if (!user) return authenticationRequiredResponse();
  if (!authorize(user, "stats:read")) return new Response("Forbidden", { status: 403 });
  try { return Response.json({ urls: await getStats() }, { headers: { "Cache-Control": "no-store" } }); }
  catch (e) { console.error("Stats DB error", e); return Response.json({ error: "Database error" }, { status: 500 }); }
}
