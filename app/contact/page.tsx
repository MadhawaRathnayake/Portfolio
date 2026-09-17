import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to software engineering roles. Email, phone, GitHub and LinkedIn, or send a message directly.",
};

const channels = [
  { label: "Email", value: "madhawasoftnet@gmail.com", href: "mailto:madhawasoftnet@gmail.com" },
  { label: "Phone", value: "+94 71 154 4408", href: "tel:+94711544408" },
  { label: "GitHub", value: "MadhawaRathnayake", href: "https://github.com/MadhawaRathnayake" },
  { label: "LinkedIn", value: "madhawa-dhanusha", href: "https://linkedin.com/in/madhawa-dhanusha" },
];

export default function ContactPage() {
  return (
    <section className="px-6 pb-32 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 max-w-[16ch] text-4xl tracking-tight md:text-6xl">
          Open to software engineering roles
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
          Email is fastest, and I read everything. The form below reaches the same
          inbox if you would rather not leave the page.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <a
              href="mailto:madhawasoftnet@gmail.com"
              className="link-underline text-2xl text-accent md:text-3xl"
            >
              madhawasoftnet@gmail.com
            </a>

            <dl className="mt-12 flex flex-col divide-y divide-line border-y border-line">
              {channels.map((c) => (
                <div key={c.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-faint">
                    {c.label}
                  </dt>
                  <dd className="text-right text-sm">
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="link-underline text-ink hover:text-accent"
                    >
                      {c.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-2 text-sm text-muted">
              <p>Colombo, Sri Lanka &middot; UTC+05:30</p>
              <p>Open to on-site, hybrid and remote work.</p>
              <p className="text-faint">
                <a href="/cv.pdf" className="link-underline hover:text-ink">
                  Download CV
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
