"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Tag from "./Tag";
import type { Project } from "@/lib/projects";
import { DUR, EASE } from "@/lib/motion";

export default function ProjectCard({ project }: { project: Project }) {
  const href = project.caseStudy ? `/projects/${project.slug}` : project.repo;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: DUR.base, ease: EASE }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-raised transition-colors duration-200 hover:border-accent/40"
    >
      <div className="aspect-[16/10] w-full overflow-hidden border-b border-line bg-sunken">
        <div className="flex h-full items-center justify-center font-mono text-xs text-faint transition-transform duration-200 group-hover:scale-[1.03]">
          {project.slug}.png
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-accent">{project.index}</span>
          <span className="font-mono text-xs text-faint">
            {project.repoNote ?? project.team}
          </span>
        </div>

        <h3 className="mt-3 text-xl tracking-tight">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.blurb}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>

        <div className="mt-6 flex items-center gap-6 border-t border-line pt-5 text-sm">
          {project.caseStudy ? (
            <Link
              href={href as string}
              className="inline-flex items-center gap-2 text-ink hover:text-accent"
            >
              <span className="link-underline">Read case study</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          ) : (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-ink hover:text-accent"
            >
              <span className="link-underline">View repo</span>
              <span aria-hidden="true">&#8599;</span>
            </a>
          )}

          {project.caseStudy && project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-muted hover:text-ink"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
