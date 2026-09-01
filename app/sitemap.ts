import type { MetadataRoute } from "next";
import { projects } from "../lib/content";
import { SITE_URL } from "../lib/seo";
export default function sitemap(): MetadataRoute.Sitemap { const pages = ["", "/work", "/gallery", "/services", "/photography", "/film", "/about", "/clients", "/contact"]; const lastModified = new Date("2026-09-01"); return [...pages.map(path => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: path === "" || path === "/gallery" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/gallery" ? .9 : .7 })), ...projects.map(project => ({ url: `${SITE_URL}/work/${project.slug}`, lastModified, changeFrequency: "monthly" as const, priority: .8 }))]; }
