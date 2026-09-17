import Reveal from "@/components/ui/Reveal";

export default function Quote() {
  return (
    <section className="px-6 py-32 md:px-12 md:py-48">
      <Reveal>
        <blockquote className="mx-auto max-w-[24ch] text-center text-3xl leading-tight tracking-tight text-muted md:text-5xl">
          I care about how software is built, not just whether it runs.
        </blockquote>
      </Reveal>
    </section>
  );
}
