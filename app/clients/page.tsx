import { SiteFooter, SiteHeader } from "../../components/marketing";

const clients = [
  ["National Foods", "client-1.png"], ["African Sun", "client-2.png"], ["Generation Health", "client-3.png"], ["Elevate Trust", "client-4.png"], ["Sir Albert Nyabinde", "client-5.png"], ["BeraMasamba", "client-6.png"],
  ["Holiday Inn", "client-7.png"], ["Agricon", "client-8.png"], ["K.P.A.C.", "client-9.png"], ["Zimbabwe Olympic Committee", "client-10.png"], ["Bronte The Garden Hotel", "client-11.png"], ["Hwange Safari Lodge", "client-12.png"],
  ["Tendo", "client-13.png"], ["Zimbabwe Swimming", "client-14.png"], ["Gateway Primary", "client-15.png"], ["RE/MAX", "client-17.png"], ["Zimpost", "client-18.png"]
];

export default function ClientsPage() { return <main><SiteHeader /><section className="clients-hero"><p className="eyebrow">Avant / Clients</p><h1>Trusted by<br /><em>good people.</em></h1><p className="body-copy">From national brands to independent businesses, we work with people who care about how their story is told.</p></section><section className="clients-wall-section"><div className="clients-wall-head"><p className="eyebrow">Selected clients</p><p>Partnerships built on trust, clarity and work that makes an impression.</p></div><div className="clients-wall">{clients.map(([name, asset], index) => <div className="client-tile" key={`${name}-${index}`}><img src={`/clients/${asset}`} alt={name} loading="lazy" /></div>)}</div></section><section className="clients-cta"><p className="eyebrow">Your story belongs here</p><h2>Let’s make<br /><em>something lasting.</em></h2><a className="button button-accent" href="/contact">Work with Avant <span aria-hidden="true">→</span></a></section><SiteFooter /></main>; }
