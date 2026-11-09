const ROLE_PERMISSIONS = { admin: ["admin:page", "stats:read"] };
export function authorize(user, permission) {
  return (ROLE_PERMISSIONS[user?.role] ?? []).includes(permission);
}
