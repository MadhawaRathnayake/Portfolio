import type { Variants } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN: [number, number, number, number] = [0.32, 0, 0.67, 0];

export const DUR = { fast: 0.2, base: 0.45, slow: 0.7 } as const;
export const STAGGER = 0.07;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE, delay },
  }),
};

export const viewportOnce = { once: true, margin: "-12% 0px" } as const;
