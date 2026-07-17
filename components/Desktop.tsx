"use client";

import { useState } from "react";
import DesktopIcon from "./DesktopIcon";
import FileWindow from "./FileWindow";
import type { LoadedProject } from "@/lib/content";

// Phase 1 desktop: solid background color (no wallpaper — that's Phase 4), one hardcoded icon,
// click opens one modal. Open/close is intentionally local state; Phase 2 migrates window state
// into the Zustand store (store/desktopStore.ts) once real OS mechanics land.

interface DesktopProps {
  project: LoadedProject;
}

export default function Desktop({ project }: DesktopProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-base p-6">
      <DesktopIcon
        label={project.frontmatter.title}
        onOpen={() => setIsOpen(true)}
      />

      {isOpen && (
        <FileWindow project={project} onClose={() => setIsOpen(false)} />
      )}
    </main>
  );
}
