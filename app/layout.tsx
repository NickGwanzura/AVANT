import type { Metadata } from "next";
import "./globals.css";
import "./hero-layout.css";
import "./admin-auth.css";
import "./polish.css";
import CookieNotice from "./cookie-notice";
const title = "Avant Creative Group · Stories Worth Seeing";
const description = "Photography and film for brands, people and places. Avant Creative Group, Harare, Zimbabwe.";
export const metadata: Metadata = { title, description, metadataBase: new URL("https://avantgroup.co.zw"), alternates: { canonical: "/" }, openGraph: { title, description, url: "/", siteName: "Avant Creative Group", locale: "en_ZW", type: "website", images: [{ url: "/og.png", width: 1732, height: 908, alt: "Avant Creative Group — Stories worth seeing" }] }, twitter: { card: "summary_large_image", title, description, images: ["/og.png"] }, icons: { icon: "/avant-mark.svg", shortcut: "/avant-mark.svg", apple: "/avant-mark-transparent.png" } };
const structuredData = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Avant Creative Group", url: "https://avantgroup.co.zw", image: "https://avantgroup.co.zw/og.png", email: "hello@avantgroup.co.zw", address: { "@type": "PostalAddress", addressLocality: "Harare", addressCountry: "ZW" }, areaServed: "Worldwide", description };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><div id="main-content">{children}</div><CookieNotice /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>; }
