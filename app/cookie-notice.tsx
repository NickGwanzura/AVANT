"use client";
import { useEffect, useState } from "react";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(window.localStorage.getItem("avant-cookie-notice") !== "accepted"); }, []);
  if (!visible) return null;
  return <aside className="cookie-notice" role="region" aria-label="Privacy notice"><p>We use essential storage to keep the website working. <a href="/privacy">Privacy policy</a></p><button onClick={() => { window.localStorage.setItem("avant-cookie-notice", "accepted"); setVisible(false); }}>Got it</button></aside>;
}
