import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "About",
  description:
    "Computer Engineering graduate from the University of Ruhuna, with six months of production experience and a habit of designing before coding.",
};

const paragraphs = [
  "I graduated in Computer Engineering from the University of Ruhuna, and the six months I spent as a software engineering intern at Agrithmics are where the theory met a system real people depend on. I shipped production ERP features: OTP verification integrated with the SLT SMS gateway, an inventory module for secondary products, loan management, and new reporting modules. I worked across the full stack, a desktop client and the APIs behind it, and I learned how production-grade applications are actually built, deployed and kept alive.",
  "What I kept from that is a habit of designing before coding. I reach for design patterns and clear boundaries by default: Clean Architecture on the Ministry of Health survey backend, controller, service, repository and mapper layers on my Spring Boot work, and real service boundaries with a message broker on EventNet rather than four services quietly sharing one database.",
  "I also take delivery seriously. My Note Manager project carries a ten stage Jenkins pipeline, Docker images for both tiers, Terraform managing the AWS security groups and Ansible deploying the containers. EventNet runs on Azure Kubernetes Service behind an NGINX ingress with an eleven job pipeline that includes vulnerability scanning and smoke tests. I would rather learn that part now than pretend it belongs to someone else.",
  "I work in C#, Python, JavaScript, Java and SQL, across web, desktop and mobile, and I pick up whatever a problem needs. That is how a Noir circuit and a Go blockchain ended up on my list.",
];

const modules = [
  "High performance computing",
  "Computer vision and image processing",
  "Software architecture and design patterns",
  "Distributed systems",
];

const achievements = [
  {
    rank: "32nd in Sri Lanka",
    detail: "IEEE Xtreme 24-hour international programming competition, 2024",
  },
  { rank: "11th in Sri Lanka", detail: "Ruhuna Haxtreme competition" },
];

const certifications = [
  { name: "The Complete 2024 Web Development Bootcamp", href: "#" },
  { name: "The Complete Flutter Development Bootcamp with Dart", href: "#" },
  { name: "Google Project Management: Professional Certificate", href: "#" },
];

export default function AboutPage() {
  return (
    <section className="px-6 pb-32 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
          <div className="max-w-[68ch]">
            <p className="eyebrow">About</p>
            <h1 className="mt-4 text-4xl tracking-tight md:text-6xl">
              I care about how software is built
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-ink">
              I build systems end to end: the architecture, the code, and the
              pipeline that puts them in front of people. A system that is not
              deployed is not finished.
            </p>

            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.04}>
                <p className="mt-6 leading-[1.75] text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="lg:pt-24">
            <div className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-line bg-sunken">
              <Image
                src="/portrait.png"
                alt="Madhawa Rathnayake"
                width={900}
                height={900}
                sizes="(max-width: 1024px) 280px, 320px"
                className="h-auto w-full"
              />
            </div>
            <p className="mt-4 text-center font-mono text-xs text-faint">
              Colombo, Sri Lanka
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-12 border-t border-line pt-16 md:grid-cols-2">
          <Reveal>
            <h2 className="eyebrow">Education</h2>
            <h3 className="mt-4 text-xl tracking-tight">
              BSc (Hons) Computer Engineering
            </h3>
            <p className="mt-2 text-muted">
              Department of Electrical and Information Engineering, University of
              Ruhuna
            </p>
            <p className="mt-1 font-mono text-sm text-faint">
              April 2022 &ndash; August 2026
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {modules.map((m) => (
                <Tag key={m} label={m} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="eyebrow">Experience</h2>
            <h3 className="mt-4 text-xl tracking-tight">
              Software Engineering Intern
            </h3>
            <p className="mt-2 text-muted">Agrithmics (Pvt) Ltd, Colombo 08</p>
            <p className="mt-1 font-mono text-sm text-faint">
              May 2025 &ndash; November 2025
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              Four production modules delivered into an ERP already in daily use,
              across a desktop client, REST APIs and the data layer underneath.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 border-t border-line pt-16 md:grid-cols-2">
          <Reveal>
            <h2 className="eyebrow">Achievements</h2>
            <ul className="mt-6 flex flex-col gap-5">
              {achievements.map((a) => (
                <li key={a.rank}>
                  <p className="text-lg tracking-tight text-ink">{a.rank}</p>
                  <p className="mt-1 text-sm text-muted">{a.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="eyebrow">Certifications</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {certifications.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.href}
                    className="link-underline text-muted hover:text-ink"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-20 flex flex-wrap items-center gap-4 border-t border-line pt-16">
            <Button href="/cv.pdf" external>
              Download CV
            </Button>
            <Button href="/contact" variant="ghost">
              Get in touch
            </Button>
            <p className="font-mono text-xs text-faint">
              References available on request
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
