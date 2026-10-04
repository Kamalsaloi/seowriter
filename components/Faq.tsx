"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { PlusMinus, cx } from "./ui";

const QUESTIONS = [
  {
    q: "What does this platform do?",
    a: "It turns a target keyword into a researched, structured and SEO-ready article that you can edit and publish.",
  },
  {
    q: "Do I need SEO experience?",
    a: "No. The platform guides the research, structure and writing process for you.",
  },
  {
    q: "Where does the research come from?",
    a: "The platform analyses live search results and the pages already ranking for your target keyword.",
  },
  {
    q: "Can I edit the generated article?",
    a: "Yes. You can review, rewrite and improve every part of the article before publishing it.",
  },
  {
    q: "Can it match my writing style?",
    a: "Yes. You can provide writing samples and use the learned style across future articles.",
  },
  {
    q: "Can I add my own references?",
    a: "Yes. You can add selected sources and references to guide the article.",
  },
  {
    q: "Does it support internal linking?",
    a: "Yes. It can identify relevant pages from your website and suggest suitable internal links.",
  },
  {
    q: "Can I publish directly to my website?",
    a: "Yes. You can connect a supported CMS and publish completed articles from the platform.",
  },
];

export function Faq() {
  // One row open at a time. The first is open to begin with.
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  // A mouse opens a row by resting on it; a short wait keeps rows from opening one after
  // another while the pointer travels down the list. The row stays open when the pointer leaves.
  // It listens for the pointer moving, not entering: when a row opens the list shifts, and a
  // row that slides under a still pointer has not been asked for.
  const hover = useRef({ row: -1, timer: 0 });
  const onPointerMove = (i: number) => (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || hover.current.row === i) return;
    window.clearTimeout(hover.current.timer);
    hover.current = { row: i, timer: window.setTimeout(() => setOpen(i), 120) };
  };
  const onPointerLeave = () => {
    window.clearTimeout(hover.current.timer);
    hover.current.row = -1;
  };
  useEffect(() => () => window.clearTimeout(hover.current.timer), []);

  // Touch and keyboard toggle the row. Under a resting mouse the row is already open,
  // so a click there keeps it open.
  const onClick = (i: number) => () =>
    setOpen((current) => (current === i && hover.current.row !== i ? null : i));

  return (
    <section className="flex justify-center bg-page">
      <div className="shell flex flex-col gap-intro py-section desk:flex-row desk:items-start desk:gap-[clamp(3rem,6.667vw,6rem)]">
        {/* Stays in view on desktop while the questions scroll past. */}
        <div
          data-reveal=""
          className="flex flex-col gap-4 desk:sticky desk:top-24 desk:w-[400px] desk:shrink-0 desk:gap-6"
        >
          <h2 className="text-heading font-light text-text">Questions, answered</h2>
          <p className="text-lead text-soft max-desk:text-pretty desk:max-w-[360px]">
            Everything you need to know before creating your first article.
          </p>
        </div>

        <div data-reveal="" className="flex min-w-0 flex-col desk:flex-1">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                data-open={isOpen}
                onPointerMove={onPointerMove(i)}
                onPointerLeave={onPointerLeave}
                className={cx(
                  "faq-item flex flex-col border-t border-white-14",
                  i === QUESTIONS.length - 1 && "border-b",
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={`${id}-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a-${i}`}
                    onClick={onClick(i)}
                    className="faq-button flex w-full items-start gap-4 rounded-sm text-left desk:gap-6"
                  >
                    <span className="min-w-0 flex-1 text-title font-medium tracking-title text-text">
                      {item.q}
                    </span>
                    <span className="faq-icon flex h-7 w-4 shrink-0 items-center justify-center">
                      <PlusMinus open={isOpen} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${id}-a-${i}`}
                  role="region"
                  aria-labelledby={`${id}-q-${i}`}
                  className="faq-panel"
                >
                  <div>
                    <p className="max-w-[560px] pr-8 pb-6 text-body text-soft desk:box-content desk:pr-10">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
