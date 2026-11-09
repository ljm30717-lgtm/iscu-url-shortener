import { NextResponse } from "next/server";
import { authenticate, authenticationRequiredResponse } from "./lib/auth";
import { authorize } from "./lib/authorization";

export function proxy(request) {
  const user = authenticate(request);
  if (!user) return authenticationRequiredResponse();
  if (!authorize(user, "admin:page")) return new Response("Forbidden", { status: 403 });
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
