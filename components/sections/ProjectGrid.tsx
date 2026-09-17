"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { categories, projects } from "@/lib/projects";

export default function ProjectGrid() {
  const [active, setActive] = useState("All");

  const shown =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
              active === c
                ? "border-accent bg-accent-soft text-accent"
                : "border-line text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs text-faint" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      <LayoutGroup>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </>
  );
}
