import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects as seedProjects } from "../../../lib/content";
import { findProject } from "../../../lib/site-data";
import { PageIntro, SiteFooter, SiteHeader } from "../../../components/marketing";

export const dynamic = "force-dynamic";
async function projectFor(slug: string) { try { return await findProject(slug); } catch { return seedProjects.find(project => project.slug === slug) ?? null; } }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const project = await projectFor(slug);
  if (!project) return { title: "Project not found · Avant Creative Group" };
  return { title: project.title, description: project.summary, alternates: { canonical: `/work/${project.slug}` }, openGraph: { title: `${project.title} | Avant Creative Group`, description: project.summary, url: `/work/${project.slug}`, siteName: "Avant Creative Group", locale: "en_ZW", type: "article", images: [{ url: project.image, alt: project.title }] }, twitter: { card: "summary_large_image", title: `${project.title} | Avant Creative Group`, description: project.summary, images: [project.image] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = await projectFor(slug); if (!project) notFound();
  const supporting = seedProjects.filter(item => item.slug !== project.slug).slice(0, 2);
  return <main><SiteHeader /><PageIntro eyebrow={`Avant / ${project.label}`} title={<>{project.title}<br /><em>{project.category}.</em></>} image={project.image}><p>{project.year} · {project.location}</p><a className="button button-light" href="/contact">Start a project <span aria-hidden="true">→</span></a></PageIntro><section className="project-story"><div><p className="eyebrow">The story</p><h2>Work with a clear point of view.</h2></div><div><p className="project-lede">{project.summary}</p><dl><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Deliverables</dt><dd>{project.deliverables}</dd></div></dl></div></section><section className="project-gallery" aria-label={`${project.title} gallery`}><img src={project.image} alt={`${project.title}, primary project image`} width="1800" height="1200" /><div>{supporting.map((image, index) => <img key={image.slug} src={image.image} alt={`${project.title}, supporting view ${index + 1}`} width="1200" height="900" loading="lazy" />)}</div></section><section className="project-next"><p className="eyebrow">Continue exploring</p><a className="text-link dark" href="/work">Back to selected work <span aria-hidden="true">→</span></a></section><SiteFooter /></main>;
}
