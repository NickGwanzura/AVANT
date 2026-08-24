import { env } from "cloudflare:workers";
import { projects as seedProjects, type Project } from "./content";

type D1Result<T> = { results?: T[] };
type Database = { prepare(query: string): { bind(...values: unknown[]): { run(): Promise<unknown>; all<T>(): Promise<D1Result<T>> }; run(): Promise<unknown>; all<T>(): Promise<D1Result<T>> }; batch(statements: unknown[]): Promise<unknown> };

function database() {
  const db = (env as unknown as { DB?: Database }).DB;
  if (!db) throw new Error("Content storage is unavailable.");
  return db;
}

let ready: Promise<void> | undefined;
export function ensureSiteData() {
  if (ready) return ready;
  ready = (async () => {
    const db = database();
    await db.batch([
      db.prepare("CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY NOT NULL, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, category TEXT NOT NULL, label TEXT NOT NULL, year TEXT NOT NULL, location TEXT NOT NULL, image TEXT NOT NULL, layout TEXT NOT NULL DEFAULT 'wide', summary TEXT NOT NULL DEFAULT '', deliverables TEXT NOT NULL DEFAULT '', published INTEGER NOT NULL DEFAULT 0, position INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"),
      db.prepare("CREATE INDEX IF NOT EXISTS projects_published_position_idx ON projects (published, position)"),
      db.prepare("CREATE TABLE IF NOT EXISTS enquiries (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', ip_hash TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"),
      db.prepare("CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC)"),
      db.prepare("CREATE INDEX IF NOT EXISTS enquiries_ip_hash_idx ON enquiries (ip_hash, created_at DESC)"),
      db.prepare("CREATE TABLE IF NOT EXISTS login_attempts (ip_hash TEXT PRIMARY KEY NOT NULL, failures INTEGER NOT NULL DEFAULT 0, locked_until TEXT, updated_at TEXT NOT NULL)"),
    ]);
    const count = await db.prepare("SELECT COUNT(*) AS count FROM projects").all<{ count: number }>();
    if (Number(count.results?.[0]?.count ?? 0) === 0) {
      const now = new Date().toISOString();
      await db.batch(seedProjects.map((project, index) => db.prepare("INSERT INTO projects (id, slug, title, category, label, year, location, image, layout, summary, deliverables, published, position, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)").bind(crypto.randomUUID(), project.slug, project.title, project.category, project.label, project.year, project.location, project.image, project.layout, project.summary, project.deliverables, index, now, now)));
    }
  })().catch(error => { ready = undefined; throw error; });
  return ready;
}

type ProjectRow = Omit<Project, "published" | "position"> & { id: string; published: number; position: number };
export async function listProjects(includeDrafts = false) {
  await ensureSiteData();
  const statement = includeDrafts ? "SELECT * FROM projects ORDER BY position, created_at DESC" : "SELECT * FROM projects WHERE published = 1 ORDER BY position, created_at DESC";
  const result = await database().prepare(statement).all<ProjectRow>();
  return (result.results ?? []).map(row => ({ ...row, published: Boolean(row.published) }));
}

export async function findProject(slug: string) {
  await ensureSiteData();
  const result = await database().prepare("SELECT * FROM projects WHERE slug = ? AND published = 1 LIMIT 1").bind(slug).all<ProjectRow>();
  const row = result.results?.[0];
  return row ? { ...row, published: Boolean(row.published) } : null;
}

export async function listEnquiries() {
  await ensureSiteData();
  const result = await database().prepare("SELECT id, name, email, message, status, created_at AS createdAt, updated_at AS updatedAt FROM enquiries ORDER BY created_at DESC LIMIT 100").all();
  return result.results ?? [];
}

export { database };
