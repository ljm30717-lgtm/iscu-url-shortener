export function authenticate(request) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return null;
  if (!process.env.ADMIN_PASSWORD) return null;
  try {
    const decoded = atob(auth.substring(6));
    const colon = decoded.indexOf(":");
    if (colon < 0) return null;
    const username = decoded.slice(0, colon);
    const password = decoded.slice(colon + 1);
    if (username === "admin" && password === process.env.ADMIN_PASSWORD) {
      return { username, role: "admin" };
    }
  } catch {}
  return null;
}

export function authenticationRequiredResponse() {
  return new Response("Authentication required", { status: 401, headers: {
    "WWW-Authenticate": 'Basic realm="Admin"', "Cache-Control": "no-store"
  }});
}
