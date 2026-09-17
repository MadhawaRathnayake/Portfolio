"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import { DUR, EASE } from "@/lib/motion";

const stats = [
  { value: "6 months", label: "shipping features into production" },
  { value: "4", label: "production modules shipped" },
  { value: "7", label: "systems built end to end" },
  { value: "2026", label: "BSc Computer Engineering" },
];

const headline = ["I build systems", "end to end, then", "ship and run them."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.slow, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] items-center px-6 pt-24 md:px-12"
    >
      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="mx-auto w-full max-w-[1200px]"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <motion.p className="eyebrow" {...rise(0)}>
              Software Engineer &middot; Colombo, Sri Lanka
            </motion.p>

            <h1 className="mt-6 max-w-[15ch] text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-balance">
              {headline.map((line, i) => (
                <motion.span key={line} className="block" {...rise(0.08 + i * 0.07)}>
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-8 max-w-[48ch] text-lg leading-relaxed text-muted"
              {...rise(0.26)}
            >
              Computer Engineering graduate from the University of Ruhuna, with six
              months shipping features into a production ERP. I take the DevOps
              side seriously: Docker, Kubernetes, Jenkins and Terraform are part of
              how I deliver, not a separate skill list.
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap gap-3" {...rise(0.33)}>
              <Button href="/projects">
                View projects
                <span aria-hidden="true">&rarr;</span>
              </Button>
              <Button href="/cv.pdf" variant="ghost" external>
                Download CV
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative order-first mx-auto w-full max-w-[280px] lg:order-none lg:max-w-none"
            style={reduce ? undefined : { y: portraitY }}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: reduce ? 0 : 0.12 }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(58%_58%_at_50%_42%,var(--accent-soft),transparent_72%)]"
            />
            <Image
              src="/portrait.png"
              alt="Madhawa Rathnayake"
              width={900}
              height={900}
              priority
              sizes="(max-width: 1024px) 280px, 460px"
              className="h-auto w-full select-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, #000 78%, rgba(0,0,0,0.5) 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 78%, rgba(0,0,0,0.5) 92%, transparent 100%)",
              }}
            />
          </motion.div>
        </div>

        <motion.dl
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4"
          {...rise(0.4)}
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-bg p-5">
              <dt className="font-mono text-xl text-ink tabular-nums">{s.value}</dt>
              <dd className="mt-1 text-xs leading-snug text-faint">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
