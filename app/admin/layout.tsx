import { requireAdminSession } from "../../lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await requireAdminSession();
  return (
    <div className="admin-authenticated">
      <div className="admin-session-bar">
        <span>Signed in as {session.email}</span>
        <form action="/api/admin/logout" method="post">
          <button type="submit">Sign out</button>
        </form>
      </div>
      {children}
    </div>
  );
}
