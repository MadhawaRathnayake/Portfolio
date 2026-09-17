import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/lib/projects";

export default function WorkIndex() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Work"
          actionHref="/projects"
          actionLabel="All projects"
        />

        <ul className="mt-4">
          {projects.map((p, i) => {
            const href = p.caseStudy ? `/projects/${p.slug}` : p.repo ?? "/projects";
            const external = !p.caseStudy;

            const row = (
              <span className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,18rem)_4rem] md:py-7">
                <span className="font-mono text-xs text-faint transition-colors duration-200 group-hover:text-accent">
                  {p.index}
                </span>

                <span className="text-xl tracking-tight transition-colors duration-200 group-hover:text-accent md:text-2xl">
                  {p.title}
                </span>

                <span className="col-start-2 font-mono text-xs text-faint md:col-start-3">
                  {p.tags.slice(0, 3).join(" · ")}
                </span>

                <span className="col-start-2 font-mono text-xs text-faint md:col-start-4 md:text-right">
                  {external ? "Repo ↗" : "Case study →"}
                </span>
              </span>
            );

            return (
              <Reveal key={p.slug} delay={Math.min(i * 0.04, 0.2)}>
                <li className="border-b border-line">
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group block transition-[padding] duration-200 hover:pl-2"
                    >
                      {row}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="group block transition-[padding] duration-200 hover:pl-2"
                    >
                      {row}
                    </Link>
                  )}
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
