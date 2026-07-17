import { getAllProjects } from "@/lib/content";
import Desktop from "@/components/Desktop";

// Server component: reads + parses the .md file(s) at request/build time, hands the plain
// (serializable) frontmatter + body to the client Desktop.
export default function Home() {
  const projects = getAllProjects();

  // Phase 1 is deliberately a single hardcoded icon — render only the first project.
  // Phase 2 turns this into the full draggable icon grid.
  const project = projects[0];

  return <Desktop project={project} />;
}
