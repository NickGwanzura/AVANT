import type { Metadata } from "next";
import "./globals.css";
import CookieNotice from "./cookie-notice";
export const metadata: Metadata = { title: "Avant Creative Group — Stories Worth Seeing", description: "Photography and film for brands, people and places. Avant Creative Group, Harare Zimbabwe.", metadataBase: new URL("https://avantgroup.co.zw"), icons: { icon: "/avant-mark-transparent.png", shortcut: "/avant-mark-transparent.png", apple: "/avant-mark-transparent.png" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}<CookieNotice /></body></html>; }
