"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ARTICLE_TITLE, Bar, KEYWORD } from "./ui";

const SCORE = 82;

/**
 * Where the keyword is cut after 0, 1, 2 ... 25 characters, in % of the keyword patch's width.
 * Measured in the photo itself: each cut falls in the gap between two letters.
 */
const CUTS = [
  -1.3, 5.7, 10.1, 14.0, 18.3, 20.1, 26.9, 31.6, 35.8, 40.1, 44.0, 45.4, 50.1, 54.2, 56.2, 58.1, 62.2,
  66.5, 68.0, 74.1, 75.7, 78.5, 82.6, 84.4, 89.6, 92.0,
] as const;

/**
 * The hero photo, played as a loop: she types the keyword on the laptop, a thread rises
 * from the lid, the article card appears and writes itself, then a pause and it starts again.
 *
 * The keyword is not text laid over the photo. The photo has an empty field, and the letters
 * are a patch cut from the same photo, uncovered one letter at a time.
 *
 * The page is rendered in its finished state, so it reads fine without JavaScript and
 * with reduced motion. The loop writes straight to the DOM instead of going through
 * React state, and it rests while the photo is off screen.
 */
export function LaptopScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const field = el.querySelector<HTMLElement>("[data-field]");
    const title = el.querySelector<HTMLElement>("[data-title]");
    const score = el.querySelector<HTMLElement>("[data-score-num]");
    if (!field || !title || !score) return;
    const on = title.querySelector<HTMLElement>("[data-on]");
    const off = title.querySelector<HTMLElement>("[data-off]");

    let stopped = false;
    let timer = 0;
    let resume: (() => void) | null = null;
    let inView = false;
    const awake = () => inView && !document.hidden;

    /** Waits, and keeps waiting while the photo is off screen or the tab is hidden. */
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const tick = () => {
          if (stopped) return;
          if (awake()) resolve();
          else resume = tick;
        };
        timer = window.setTimeout(tick, ms);
      });

    const wakeUp = () => {
      if (!resume || !awake()) return;
      const next = resume;
      resume = null;
      next();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      wakeUp();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", wakeUp);

    const showKeyword = (count: number) => field.style.setProperty("--typed", String(CUTS[count]));

    const writeTitle = (count: number) => {
      if (on) on.textContent = ARTICLE_TITLE.slice(0, count);
      // The unwritten rest stays in place, unseen, so the lines never reflow.
      if (off) off.textContent = ARTICLE_TITLE.slice(count);
    };

    const typeKeyword = async () => {
      field.dataset.typing = "1";
      for (let count = 1; count <= KEYWORD.length; count += 1) {
        showKeyword(count);
        await wait(56 + Math.random() * 84);
        if (stopped) return;
      }
      delete field.dataset.typing;
    };

    const typeTitle = async () => {
      title.dataset.typing = "1";
      for (let count = 1; count <= ARTICLE_TITLE.length; count += 1) {
        writeTitle(count);
        await wait(20 + Math.random() * 22);
        if (stopped) return;
      }
      delete title.dataset.typing;
    };

    const countUp = async () => {
      for (let value = 0; value <= SCORE; value += 2) {
        score.textContent = String(value);
        // Slows down as it nears the score.
        await wait(10 + (value / SCORE) ** 3 * 34);
        if (stopped) return;
      }
    };

    const flags = ["thread", "card", "bars", "score", "done"] as const;

    const play = async () => {
      el.dataset.anim = "on";
      // The first round starts the way every round ends: with everything gone.
      el.dataset.leave = "1";
      let rest = 1700;
      while (!stopped) {
        // Back to an empty field, with no transitions so nothing slides backwards.
        el.dataset.reset = "1";
        for (const flag of flags) delete el.dataset[flag];
        showKeyword(0);
        writeTitle(0);
        score.textContent = "0";
        await wait(60);
        delete el.dataset.reset;
        // The cursor comes back, blinking in the empty field.
        delete el.dataset.leave;
        await wait(rest);
        rest = 1100;
        if (stopped) return;

        await typeKeyword();
        await wait(520);
        el.dataset.thread = "1";
        await wait(440);
        el.dataset.card = "1";
        await wait(480);
        if (stopped) return;

        await typeTitle();
        await wait(160);
        el.dataset.bars = "1";
        await wait(720);
        el.dataset.score = "1";
        await countUp();
        el.dataset.done = "1";
        if (stopped) return;

        await wait(3000);
        el.dataset.leave = "1";
        await wait(420);
      }
    };

    void play();

    return () => {
      stopped = true;
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", wakeUp);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="laptop-plate relative shrink-0 overflow-clip rounded-lg bg-grey-3 desk:absolute desk:inset-0 desk:bg-page"
    >
      <div className="laptop-scene">
        <div
          className="laptop-field"
          data-field
          style={{ "--typed": CUTS[KEYWORD.length] } as CSSProperties}
        >
          <span className="laptop-keyword" />
          <span className="laptop-caret" />
        </div>

        <span className="laptop-thread w-px bg-[linear-gradient(in_oklab_180deg,oklab(100%_0_0/16%)_0%,oklab(100%_0_0/60%)_100%)]" />

        <span className="laptop-shade absolute inset-0" />

        <div className="laptop-card flex w-[280px] flex-col gap-4 rounded-md border border-white-18 bg-white-8 p-6 shadow-[0_24px_64px_#00000066] backdrop-blur-[24px]">
          {/* Plain wrapping: the browser's "pretty" wrap moves a word when the last letter lands. */}
          <p className="text-title leading-[26px] font-medium tracking-title text-text" data-title>
            <span data-on>{ARTICLE_TITLE}</span>
            <span data-off className="invisible" />
          </p>
          <div className="flex flex-col gap-2 self-stretch">
            <Bar stretch tone={24} className="laptop-bar" />
            <Bar stretch tone={24} className="laptop-bar" />
            <Bar w={152} tone={24} className="laptop-bar" />
          </div>
          <span className="laptop-score h-px shrink-0 self-stretch bg-white-14" />
          <div className="laptop-score flex items-center gap-4 self-stretch">
            <span
              className="shrink-0 text-[2rem] leading-8 font-light tracking-[-0.03em] text-text"
              data-score-num
            >
              {SCORE}
            </span>
            <div className="laptop-done flex flex-col">
              <div className="flex items-center gap-2">
                <StrongTick />
                <span className="text-small font-medium text-text">Strong</span>
              </div>
              <span className="text-small text-soft">Ready to publish</span>
            </div>
          </div>
        </div>
      </div>

      {/* The hairline sits on top of the photo, so it is drawn as a layer, not as a border. */}
      <span className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_0_0_1px_var(--color-white-8)]" />
    </div>
  );
}

/** The green tick beside "Strong". Path from the Paper file. */
function StrongTick() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="7" className="fill-green" />
      <path
        d="M5 8.2l2 2 4-4.2"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-page"
      />
    </svg>
  );
}
