import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminConfigured } from "../../lib/admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin Login · Avant Creative Group",
  description: "Secure access to the Avant content studio.",
  robots: { index: false, follow: false },
};

const errors: Record<string, string> = {
  invalid: "The email or password is incorrect. Please try again.",
  locked: "Too many sign-in attempts. Please wait 15 minutes and try again.",
  "not-configured": "Admin access is temporarily unavailable. Please contact the site administrator.",
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
          <a className="login-mobile-wordmark" href="/" aria-label="Avant Creative Group home">AVANT</a>
          <p className="eyebrow">Avant administration</p>
          <h1>Welcome back.</h1>
          <p className="login-intro">Sign in to open the content studio.</p>
          {error && errors[error] ? <p className="login-error" role="alert">{errors[error]}</p> : null}
          {!configured && !error ? <p className="login-notice" role="status">Admin access is temporarily unavailable. Please contact the site administrator.</p> : null}
          <form className="login-form" action="/api/admin/login" method="post">
            <label htmlFor="admin-email">Email address</label>
            <input id="admin-email" name="email" type="email" autoComplete="username" inputMode="email" required />
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" name="password" type="password" autoComplete="current-password" required />
            <button className="button button-accent" type="submit" disabled={!configured}>Sign in <span aria-hidden="true">→</span></button>
          </form>
          <a className="login-back" href="/">← Back to the website</a>
        </div>
      </section>
    </main>
  );
}
