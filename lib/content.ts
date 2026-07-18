import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  ProjectFrontmatter,
  SystemFrontmatter,
  TimelineFrontmatter,
} from "@/types/content";

// Server-only content loading. Reads content/projects/*.md and content/system/*.md and parses
// frontmatter with gray-matter. Phase 3 adds the system files (TIMELINE/AWARDS/EXPERIENCE) on top
// of the Phase 1 project pipeline. Runtime schema validation (e.g. zod) is deferred to Phase 6.

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const SYSTEM_DIR = path.join(process.cwd(), "content", "system");

// Generic loaded-content shape; the concrete frontmatter type narrows per source.
export interface LoadedContent<F = ProjectFrontmatter> {
  frontmatter: F;
  body: string;
}

export type LoadedProject = LoadedContent<ProjectFrontmatter>;
export type LoadedSystemFile = LoadedContent<SystemFrontmatter | TimelineFrontmatter>;

function readFile<F>(dir: string, filename: string): LoadedContent<F> {
  const raw = fs.readFileSync(path.join(dir, filename), "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as F, body: content.trim() };
}

function listMarkdown(dir: string): string[] {
  // A missing directory just means "no files of this kind yet".
  if (!fs.existsSync(dir)) return [];
  // Skip dotfiles / underscore-prefixed drafts so scratch files don't become desktop icons.
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && !f.startsWith("."));
}

export function getAllProjects(): LoadedProject[] {
  return listMarkdown(PROJECTS_DIR)
    .map((f) => readFile<ProjectFrontmatter>(PROJECTS_DIR, f))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getAllSystemFiles(): LoadedSystemFile[] {
  return listMarkdown(SYSTEM_DIR)
    .map((f) => readFile<SystemFrontmatter | TimelineFrontmatter>(SYSTEM_DIR, f))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}
