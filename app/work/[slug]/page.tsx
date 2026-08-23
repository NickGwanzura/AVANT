import { notFound } from "next/navigation";
import { projects } from "../../../lib/content";
import { PageIntro, SiteFooter, SiteHeader } from "../../../components/marketing";

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(item => item.slug === params.slug);
  if (!project) notFound();
  return <main><SiteHeader /><PageIntro eyebrow={`Avant / ${project.label}`} title={<>{project.title}<br /><em>{project.category}.</em></>} image={project.image}><p>{project.year} · {project.location}</p><a className="button button-light" href="/contact">Start a project <span>↗</span></a></PageIntro><section className="project-detail"><p className="eyebrow">The story</p><h2>Work with a clear point of view.</h2><p className="body-copy">A considered visual story shaped around the people, place and purpose behind {project.title}.</p><a className="text-link dark" href="/work">Back to featured work <span>↗</span></a></section><SiteFooter /></main>;
}
