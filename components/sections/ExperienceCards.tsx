"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Tag from "@/components/ui/Tag";
import { DUR, EASE } from "@/lib/motion";

type Card = {
  index: string;
  title: string;
  body: string[];
  tags: string[];
};

const cards: Card[] = [
  {
    index: "01",
    title: "Reading a system I did not write",
    body: [
      "My first week ended with a real work item in a codebase built on Clean Architecture, hundreds of screens deep and years older than me. Fixing one bug meant tracing a single value from the screen through the service layer, the API and the database before I was allowed to change anything.",
      "University never asks you to do that. Every project there starts empty. Learning to read a large system, and to find the one place a change belongs, turned out to be the skill that everything else depended on.",
    ],
    tags: ["Clean Architecture", "Git", "Code review", "Azure work items"],
  },
  {
    index: "02",
    title: "The business logic lived in SQL",
    body: [
      "A large part of what the system actually did was in stored procedures rather than application code. Over six months I wrote new ones, changed existing ones, added tables, and learned to follow a wrong number backwards from a report into the procedure that produced it.",
      "It taught me to distrust the assumption that logic lives where you expect. Now I read the schema and the queries before I read the service layer, because that is usually where the truth is.",
    ],
    tags: ["SQL Server", "Stored procedures", "Query debugging", "Schema design"],
  },
  {
    index: "03",
    title: "Features, not tickets",
    body: [
      "The work I am proudest of arrived as requirements, not instructions. A goods receive note screen handled seven types of item across four accept and reject actions, each one moving real inventory and settling against real purchase orders. A supplier rate configuration screen needed a new table, new procedures, new APIs and a new screen.",
      "I delivered those whole: layout, API, service layer, stored procedures, migrations and unit tests. Owning a feature end to end is a different job from closing a ticket, and it is the part of the work I want more of.",
    ],
    tags: ["C#", ".NET", "REST APIs", "Unit tests", "Feature ownership"],
  },
  {
    index: "04",
    title: "Reports are where finance meets code",
    body: [
      "Much of what I built was reporting: profit and loss, cost of production, arrears, balance payment reconciliation, and an arrears report that had to show either a predicted distribution or the executed payments depending on the situation, with grand totals calculated per route.",
      "Finance code has a property most code does not. There is a correct answer, someone already knows it, and being close is the same as being wrong. That made me slower and far more careful about validating output against what the business expected.",
    ],
    tags: ["Financial logic", "Excel and PDF export", "Data validation"],
  },
  {
    index: "05",
    title: "My first external integration",
    body: [
      "Sending SMS to customers when advance payments were made and items were issued meant working against the SLT gateway's own documentation rather than a tutorial, and handling what happens when a message does not go out.",
      "Then the client changed what the message should say. Twice. Once to include the total advance amount, once to change the content entirely, after the integration already worked in production. An integration is never finished on the day it first succeeds.",
    ],
    tags: ["SLT SMS gateway", "Third-party APIs", "Changing requirements"],
  },
  {
    index: "06",
    title: "Building the part that says no",
    body: [
      "I worked with a senior engineer on OTP verification: the screen, the business logic, and the rule that an account with verification enabled must confirm by SMS before it can proceed.",
      "Writing code whose entire job is to refuse people forces you to think about failure paths first. What if the SMS never arrives, what if the code is entered twice, what if the account has verification turned off. I had not thought that way before.",
    ],
    tags: ["Authentication", "OTP", "Security", "Pair work"],
  },
  {
    index: "07",
    title: "Releases, and one hot fix",
    body: [
      "I was given access to the QA server and made releases to it: preparing the build, checking it was stable, deploying, then watching what testing found afterwards. Doing that repeatedly is what made version control and deployment consistency feel like consequences rather than commands.",
      "Later I applied a hot fix directly to the production server under a senior's instruction. That is the moment deployment stops being a concept, and it is a large part of why I now build my own projects with a pipeline attached.",
    ],
    tags: ["QA releases", "Deployment", "Production support"],
  },
  {
    index: "08",
    title: "Knowing when to stop",
    body: [
      "An early loan settlement feature needed interest recalculated to the exact day a loan was settled. Doing that meant reversing installment transactions, which would have changed customer balances in a live financial system.",
      "I built what I could and then paused it and escalated for approval rather than shipping it. Nobody taught me that in a lecture. Judging when not to proceed is the most senior thing I took away from those six months.",
    ],
    tags: ["Financial systems", "Risk", "Judgement"],
  },
];

const INTERVAL = 8000;

export default function ExperienceCards() {
  const [[active, direction], setActive] = useState<[number, number]>([0, 1]);
  const [playing, setPlaying] = useState(true);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number, dir: number) => {
    setActive([(next + cards.length) % cards.length, dir]);
  }, []);

  useEffect(() => {
    if (!playing || reduce) return;
    timer.current = setInterval(() => {
      setActive(([i]) => [(i + 1) % cards.length, 1]);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, reduce]);

  const card = cards[active];

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onFocusCapture={() => setPlaying(false)}
      onBlurCapture={() => setPlaying(true)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1, 1);
        if (e.key === "ArrowLeft") go(active - 1, -1);
      }}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={card.index}
            custom={direction}
            initial={{ opacity: 0, x: reduce ? 0 : direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : direction * -40 }}
            transition={{ duration: DUR.base, ease: EASE }}
            className="flex min-h-[26rem] flex-col rounded-2xl border border-line bg-raised p-8 md:min-h-[24rem] md:p-12"
            aria-roledescription="slide"
            aria-label={`${card.index} of ${String(cards.length).padStart(2, "0")}: ${card.title}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="max-w-[24ch] text-2xl tracking-tight md:text-3xl">
                {card.title}
              </h3>
              <p className="font-mono text-sm text-faint tabular-nums">
                {card.index} / {String(cards.length).padStart(2, "0")}
              </p>
            </div>

            <div className="mt-8 max-w-[68ch] flex-1">
              {card.body.map((p, i) => (
                <p key={i} className="mt-5 leading-[1.75] text-muted first:mt-0">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
              {card.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="flex flex-1 flex-wrap items-center gap-2" role="tablist" aria-label="Experiences">
          {cards.map((c, i) => (
            <button
              key={c.index}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={c.title}
              onClick={() => go(i, i > active ? 1 : -1)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-10 bg-accent" : "w-4 bg-line hover:bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(active - 1, -1)}
            aria-label="Previous experience"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(active + 1, 1)}
            aria-label="Next experience"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
