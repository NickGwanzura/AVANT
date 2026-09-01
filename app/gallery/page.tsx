import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../components/marketing";
import { galleryImages } from "../../lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore Avant Creative Group's photography catalogue, from portraits and live events to aerial work across Zimbabwe.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Avant Photography Gallery",
    description: "Portraits, events and aerial stories photographed by Avant Creative Group.",
    url: "/gallery",
    images: [{ url: galleryImages[2].src, alt: galleryImages[2].alt }],
  },
};

export default function GalleryPage() {
  return <main>
    <SiteHeader />
    <section className="gallery-hero">
      <div>
        <p className="eyebrow">Avant Catalogue · Zimbabwe / Worldwide</p>
        <h1>Stories,<br /><em>frame by frame.</em></h1>
      </div>
      <div className="gallery-hero-copy">
        <p>A living archive of portraits, gatherings, live performance and places seen from above.</p>
        <span>{String(galleryImages.length).padStart(2, "0")} selected frames · 2026 catalogue</span>
      </div>
    </section>
    <section className="gallery-index" aria-label="Photography catalogue">
      <div className="gallery-index-head">
        <p className="eyebrow">The catalogue</p>
        <div aria-label="Collections"><span>Portraits</span><span>Events</span><span>Aerial</span></div>
      </div>
      <div className="gallery-masonry">
        {galleryImages.map((image, index) => <figure className={`gallery-frame gallery-frame-${image.collection.toLowerCase()}`} key={image.src}>
          <div>
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={index < 4 ? "eager" : "lazy"} />
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <figcaption>{image.collection}</figcaption>
        </figure>)}
      </div>
    </section>
    <section className="gallery-close">
      <p className="eyebrow">Your story belongs here</p>
      <h2>Need a frame<br /><em>that feels like yours?</em></h2>
      <div>
        <p>Tell us what you are making, launching or celebrating. We will shape the visual language around it.</p>
        <a className="button button-accent" href="/contact">Start a project <span aria-hidden="true">→</span></a>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
