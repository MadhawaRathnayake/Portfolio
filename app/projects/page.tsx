import type { Metadata } from "next";
import ProjectGrid from "@/components/sections/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A government health platform, a Jenkins delivery pipeline, microservices on Kubernetes, zero-knowledge voting, parallel computing, computer vision and a Flutter app.",
};

export default function ProjectsPage() {
  return (
    <section className="px-6 pb-32 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow">Work</p>
        <h1 className="mt-4 text-4xl tracking-tight md:text-6xl">Projects</h1>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">
          Four of these have a case study: what the problem was, how I built it,
          and what I would do differently. The rest link straight to their
          repositories.
        </p>

        <ProjectGrid />
      </div>
    </section>
  );
}
