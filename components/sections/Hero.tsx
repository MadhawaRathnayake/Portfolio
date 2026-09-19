"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
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
  const reduce = useReducedMotion();
  const [viewportH, setViewportH] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    let lastWidth = window.innerWidth;

    const sync = () => {
      lastWidth = window.innerWidth;
      setIsDesktop(query.matches);
      setViewportH(window.innerHeight);
    };

    sync();

    // Only re-measure when the WIDTH changes. On mobile, the browser
    // address bar collapsing and expanding fires resize with a new height
    // on almost every scroll gesture; re-measuring there is what made the
    // hero fade out and then snap back to visible.
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      sync();
    };

    window.addEventListener("resize", onResize);
    query.addEventListener("change", sync);
    return () => {
      window.removeEventListener("resize", onResize);
      query.removeEventListener("change", sync);
    };
  }, []);

  // Document scroll in pixels: no element measurement, so nothing to
  // recalculate when the viewport height changes mid-scroll.
  const { scrollY } = useScroll();

  const fadeEnd = Math.max(1, viewportH * 0.55);
  const driftEnd = Math.max(1, viewportH * 0.9);

  const y = useTransform(scrollY, [0, driftEnd], [0, driftEnd * 0.16], {
    clamp: true,
  });
  const opacity = useTransform(scrollY, [0, fadeEnd], [1, 0], { clamp: true });
  const portraitY = useTransform(scrollY, [0, driftEnd], [0, driftEnd * -0.08], {
    clamp: true,
  });

  // The scroll-linked fade is a large-screen flourish only. On phones the
  // hero is taller than the viewport, so fading the whole block hid content
  // that was still on screen.
  const parallax = isDesktop && !reduce && viewportH > 0;

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.slow, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section className="relative flex min-h-[92svh] items-center px-6 pt-24 md:px-12">
      <motion.div
        style={parallax ? { y, opacity } : undefined}
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
            style={parallax ? { y: portraitY } : undefined}
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
