"use client";
import { useEffect, useState } from "react";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(window.localStorage.getItem("avant-cookie-notice") !== "accepted"); }, []);
  if (!visible) return null;
  return <aside className="cookie-notice" role="dialog" aria-label="Cookie notice"><div><p className="eyebrow">A small note</p><p>We use essential cookies and local storage to keep this website working. Read our <a href="/privacy">Privacy Policy</a>.</p></div><button onClick={() => { window.localStorage.setItem("avant-cookie-notice", "accepted"); setVisible(false); }}>Got it</button></aside>;
}
