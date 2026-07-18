import { getAllProjects, getAllSystemFiles } from "@/lib/content";
import Desktop from "@/components/Desktop";

// Server component: reads + parses the project and system .md files at build time, hands the plain
// (serializable) frontmatter + body arrays to the client Desktop, which turns them into the
// draggable icon grid and window manager (Phase 2) with real content (Phase 3).
export default function Home() {
  const projects = getAllProjects();
  const systemFiles = getAllSystemFiles();

  return <Desktop projects={projects} systemFiles={systemFiles} />;
}
