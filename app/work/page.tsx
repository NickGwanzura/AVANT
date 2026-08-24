"use client";
import { useEffect, useState } from "react";
import { projects as seedProjects, type Project } from "../../lib/content";
import { SiteFooter, SiteHeader } from "../../components/marketing";

const filters = ["All", "Photography", "Videography", "Events", "Corporate", "Real Estate", "Campaigns"];
export default function Work() {
  const [active, setActive] = useState("All"); const [projects, setProjects] = useState<Project[]>(seedProjects);
  useEffect(() => { fetch("/api/projects").then(response => response.ok ? response.json() : Promise.reject()).then(value => { const data = value as { projects?: Project[] }; if (data.projects?.length) setProjects(data.projects); }).catch(() => undefined); }, []);
  const visible = active === "All" ? projects : projects.filter(project => project.category === active || project.label === active);
  return <main><SiteHeader /><section className="archive-head"><p className="eyebrow">Avant Creative Group · Portfolio archive</p><h1>Selected<br /><em>work.</em></h1><p className="body-copy">A collection of moments, campaigns and stories captured by Avant. Filter by the kind of story you need to tell.</p></section><section className="archive-grid-section"><div className="filters" aria-label="Filter projects">{filters.map(filter => <button key={filter} className={active === filter ? "active" : ""} onClick={() => setActive(filter)} aria-pressed={active === filter}>{filter}</button>)}</div><div className="project-grid archive-grid">{visible.map((project, index) => <a className={`project-card ${project.layout}`} href={`/work/${project.slug}`} key={project.slug}><img src={project.image} alt="" loading="lazy" width="1200" height="900" /><div className="project-overlay"><span>{project.label}</span><strong>{project.title}</strong><small>{project.year} · {project.location}</small></div><div className="project-index" aria-hidden="true">0{index + 1}</div></a>)}</div></section><SiteFooter /></main>;
}
