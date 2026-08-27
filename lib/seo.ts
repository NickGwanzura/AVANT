import type { Metadata } from "next";

export const SITE_URL = "https://avant.co.zw";
export const SITE_NAME = "Avant Creative Group";
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Avant Creative Group — Stories worth seeing",
};

export function pageMetadata(title: string, description: string, path: string, noIndex = false): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_ZW",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
