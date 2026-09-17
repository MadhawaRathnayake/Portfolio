import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import ReadingProgress from "@/components/ui/ReadingProgress";
import { caseStudySlugs, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return caseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.blurb };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  const caseStudies = projects.filter((p) => p.caseStudy);
  const position = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(position + 1) % caseStudies.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
    { label: "Timeline", value: project.timeline },
    { label: "Source", value: project.repo ? "GitHub" : project.repoNote ?? "Private" },
  ];

  return (
    <article className="pb-32 pt-32 md:pt-40">
      <ReadingProgress />

      <header className="px-6 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/projects"
            className="link-underline font-mono text-xs text-faint hover:text-accent"
          >
            &larr; All projects
          </Link>

          <p className="eyebrow mt-8">
            {project.index} &middot; {project.categories.join(" · ")}
          </p>
          <h1 className="mt-4 max-w-[20ch] text-4xl tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            {project.blurb}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-bg p-5">
                <dt className="font-mono text-xs uppercase tracking-wider text-faint">
                  {m.label}
                </dt>
                <dd className="mt-2 text-sm text-ink">
                  {m.label === "Source" && project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline text-accent"
                    >
                      GitHub &#8599;
                    </a>
                  ) : (
                    m.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mt-16 px-6 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-sunken">
              <div className="flex h-full items-center justify-center font-mono text-xs text-faint">
                {project.slug}-cover.png
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {project.glance && (
        <section className="mt-20 px-6 md:px-12">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <h2 className="eyebrow">At a glance</h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {project.glance.map((g) => (
                  <li
                    key={g}
                    className="flex gap-3 rounded-xl border border-line bg-raised p-4 text-sm leading-relaxed text-muted"
                  >
                    <span className="text-accent" aria-hidden="true">&#8212;</span>
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section className="mt-20 px-6 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[68ch]">
            {project.sections?.map((s, i) => (
              <Reveal key={s.heading} delay={i === 0 ? 0 : 0.04}>
                <div className="mt-14 first:mt-0">
                  <h2 className="text-2xl tracking-tight md:text-3xl">{s.heading}</h2>
                  {s.body.map((p) => (
                    <p key={p.slice(0, 32)} className="mt-5 leading-[1.75] text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {project.stack && (
        <section className="mt-24 px-6 md:px-12">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <h2 className="eyebrow">Stack</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {project.stack.map((group) => (
                  <div key={group.group}>
                    <h3 className="text-sm text-ink">{group.group}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Tag key={item} label={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="mt-32 border-t border-line bg-sunken">
        <Link
          href={`/projects/${next.slug}`}
          className="group block px-6 py-20 md:px-12"
        >
          <div className="mx-auto max-w-[1200px]">
            <p className="eyebrow">Next project</p>
            <div className="mt-4 flex flex-wrap items-baseline gap-4">
              <h2 className="text-3xl tracking-tight transition-colors duration-200 group-hover:text-accent md:text-5xl">
                {next.title}
              </h2>
              <span
                className="text-2xl text-accent transition-transform duration-200 group-hover:translate-x-2"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}
