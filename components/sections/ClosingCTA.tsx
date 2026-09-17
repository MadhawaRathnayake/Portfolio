import Reveal from "@/components/ui/Reveal";

export default function ClosingCTA() {
  return (
    <section className="border-t border-line bg-sunken px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 max-w-[18ch] text-4xl tracking-tight md:text-6xl">
            Looking for someone who finishes things?
          </h2>
          <p className="mt-6 max-w-[48ch] text-muted">
            Open to software engineering roles. Email is the fastest way to reach
            me, and I read everything.
          </p>

          <a
            href="mailto:madhawasoftnet@gmail.com"
            className="link-underline mt-10 inline-block text-2xl text-accent md:text-3xl"
          >
            madhawasoftnet@gmail.com
          </a>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted">
            <a href="https://github.com/MadhawaRathnayake" className="link-underline hover:text-ink">GitHub</a>
            <a href="https://linkedin.com/in/madhawa-dhanusha" className="link-underline hover:text-ink">LinkedIn</a>
            <a href="/cv.pdf" className="link-underline hover:text-ink">Download CV</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
