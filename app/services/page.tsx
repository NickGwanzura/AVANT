import { PageIntro, ServicesList, SiteFooter, SiteHeader } from "../../components/marketing";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata("Photography & Film Services", "Commercial photography, video production, events, portraits and campaign content from Avant Creative Group in Harare, Zimbabwe.", "/services");
export default function ServicesPage() { return <main><SiteHeader /><PageIntro eyebrow="Avant / Services" title={<>Built for the<br /><em>big picture.</em></>}><p>Photography, film and short-form content for brands, people and places.</p></PageIntro><section className="content-section services-page"><p className="eyebrow">How we help</p><ServicesList /></section><SiteFooter /></main>; }
