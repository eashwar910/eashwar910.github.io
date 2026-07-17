import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ProjectFrontmatter } from "@/types/content";

// Server-only content loading. Reads content/projects/*.md and parses frontmatter with
// gray-matter. Phase 1 proves the pipeline end-to-end; runtime validation (e.g. zod) and the
// system files (TIMELINE/AWARDS/EXPERIENCE) come in later phases.

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface LoadedProject {
  frontmatter: ProjectFrontmatter;
  body: string;
}

function readProjectFile(filename: string): LoadedProject {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as ProjectFrontmatter, body: content.trim() };
}

export function getAllProjects(): LoadedProject[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readProjectFile)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}
