import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminConfigured } from "../../lib/admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin Login · Avant Creative Group",
  description: "Secure access to the Avant content studio.",
};

const errors: Record<string, string> = {
  invalid: "The email or password is incorrect. Please try again.",
  "not-configured": "Admin access is not configured yet. Add the admin credentials in Dokploy first.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getAdminSession()) redirect("/admin");
  const { error } = await searchParams;
  const configured = isAdminConfigured();

  return (
    <main className="login-shell">
      <section className="login-brand" aria-label="Avant Creative Group">
        <a className="login-wordmark" href="/">AVANT<span>©</span></a>
        <div>
          <p className="eyebrow">Content studio · Secure access</p>
          <h1>Behind every<br /><em>great story.</em></h1>
        </div>
        <p>Manage projects, services and enquiries from one private workspace.</p>
      </section>
      <section className="login-panel">
        <div className="login-card">
          <p className="eyebrow">Avant administration</p>
          <h2>Welcome back.</h2>
          <p className="login-intro">Sign in to open the content studio.</p>
          {error && errors[error] ? <p className="login-error" role="alert">{errors[error]}</p> : null}
          {!configured && !error ? <p className="login-notice" role="status">Admin credentials must be configured in Dokploy before the first sign-in.</p> : null}
          <form className="login-form" action="/api/admin/login" method="post">
            <label htmlFor="admin-email">Email address</label>
            <input id="admin-email" name="email" type="email" autoComplete="username" inputMode="email" required />
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" name="password" type="password" autoComplete="current-password" required />
            <button className="button button-accent" type="submit" disabled={!configured}>Sign in <span>→</span></button>
          </form>
          <a className="login-back" href="/">← Back to the website</a>
        </div>
      </section>
    </main>
  );
}
