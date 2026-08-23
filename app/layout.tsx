import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Avant Creative Group — Stories Worth Seeing", description: "Photography and film for brands, people and places. Avant Creative Group, Harare Zimbabwe.", metadataBase: new URL("https://avantgroup.co.zw") };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
