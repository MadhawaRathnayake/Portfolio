import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceCards from "./ExperienceCards";

export default function Experience() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="In production"
          title="What six months on a live system taught me"
        />

        <Reveal>
          <p className="mt-8 max-w-[62ch] leading-relaxed text-muted">
            My first production code went into an ERP that was already in daily
            use, across several client deployments. Over six months I shipped bug
            fixes, reports, screens and integrations into it. These are the eight
            things that stayed with me.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ExperienceCards />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-faint">
            BSc (Hons) Computer Engineering, University of Ruhuna, 2022 to 2026.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
