import type { Metadata } from "next";
import "./globals.css";
import "./hero-layout.css";
import "./admin-auth.css";
import "./polish.css";
import CookieNotice from "./cookie-notice";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/seo";
const title = "Avant Creative Group | Photography & Film Zimbabwe";
const description = "Zimbabwe photography and film studio creating commercial, corporate, event and destination stories for brands, people and places worldwide.";
export const metadata: Metadata = { title: { default: title, template: `%s | ${SITE_NAME}` }, description, metadataBase: new URL(SITE_URL), applicationName: SITE_NAME, authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME, category: "Photography and film", keywords: ["photography Zimbabwe", "videography Zimbabwe", "creative agency Harare", "commercial photography", "film production Zimbabwe", "Avant Creative Group"], alternates: { canonical: "/" }, openGraph: { title, description, url: "/", siteName: SITE_NAME, locale: "en_ZW", type: "website", images: [OG_IMAGE] }, twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }, icons: { icon: "/avant-mark.svg", shortcut: "/avant-mark.svg", apple: "/avant-mark-transparent.png" } };
const structuredData = { "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], "@id": `${SITE_URL}/#business`, name: SITE_NAME, url: SITE_URL, image: `${SITE_URL}${OG_IMAGE.url}`, logo: `${SITE_URL}/avant-logo-transparent.png`, email: "hello@avantgroup.co.zw", address: { "@type": "PostalAddress", addressLocality: "Harare", addressCountry: "ZW" }, areaServed: ["Zimbabwe", "Worldwide"], knowsAbout: ["Commercial photography", "Corporate photography", "Videography", "Film production", "Event photography"], description };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><div id="main-content">{children}</div><CookieNotice /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>; }
