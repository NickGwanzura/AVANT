"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending"); setMessage("");
    const form = event.currentTarget; const data = new FormData(form);
    try { const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) }); const body = await response.json() as { error?: string }; if (!response.ok) throw new Error(body.error || "We could not send your enquiry."); setState("success"); setMessage("Thank you. Your enquiry is safely with us, and we’ll be in touch soon."); form.reset(); }
    catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "We could not send your enquiry. Please try again."); }
  }
  return <form className="contact-form" onSubmit={submit} aria-busy={state === "sending"}>
    <label htmlFor="contact-name">Name</label><input id="contact-name" name="name" required autoComplete="name" minLength={2} placeholder="Your name" />
    <label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@company.com" />
    <label htmlFor="contact-message">What can we create together?</label><textarea id="contact-message" name="message" rows={5} required minLength={20} placeholder="Tell us about the project, timing and what success looks like" />
    <label className="form-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
    <button className="button button-accent" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"} <span aria-hidden="true">→</span></button>
    {message ? <p className={`form-status ${state}`} role={state === "error" ? "alert" : "status"}>{message}</p> : null}
  </form>;
}
