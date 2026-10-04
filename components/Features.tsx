"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useInView } from "@/hooks/useInView";
import { ARTICLE_TITLE, Bar, Caret, KEYWORD, ResultRow, SearchIcon, cx, type W } from "./ui";

/** Wide enough for the desktop design and tall enough to hold the stage still. */
const PINNED = "(min-width: 68.75rem) and (min-height: 620px)";

const GLASS = "border border-white-14 bg-page-80 backdrop-blur-[24px]";

function Words({ widths, gap = "gap-2" }: { widths: number[]; gap?: string }) {
  return (
    <div className={cx("flex", gap)}>
      {widths.map((w, i) => (
        <Bar key={i} w={w} tone={40} />
      ))}
    </div>
  );
}

/* 1. Write with your own style: a writing sample, and a new article in the same voice. */
function StylePiece() {
  return (
    <>
      <div className="flex flex-col gap-3 self-start rounded-sm border border-white-12 bg-page-60 p-4 backdrop-blur-[24px]">
        <Words widths={[24, 40, 16]} gap="gap-1" />
        <Words widths={[40, 16, 24]} gap="gap-1" />
        <Words widths={[16, 32]} gap="gap-1" />
      </div>
      <div className={cx(GLASS, "flex shrink-0 flex-col gap-4 self-stretch rounded-md p-4 desk:w-[328px] desk:self-auto desk:p-6")}>
        <p className="text-small font-medium text-text">{ARTICLE_TITLE}</p>
        <Words widths={[48, 80, 32]} />
        <Words widths={[80, 32, 48]} />
        <div className="hidden desk:contents">
          <Words widths={[32, 64]} />
          <Words widths={[64, 48, 32]} />
        </div>
        <div className="flex h-1 shrink-0 items-center gap-2">
          <Bar w={48} tone={40} />
          <Bar w={80} tone={40} />
          <Caret h={16} />
        </div>
      </div>
    </>
  );
}

/* 2. Research top-ranking content: the search results for the keyword. */
function ResearchPiece() {
  return (
    <div className={cx(GLASS, "flex shrink-0 flex-col self-stretch overflow-clip rounded-md desk:w-[320px] desk:self-auto")}>
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-white-8 px-4">
        <SearchIcon />
        <span className="text-small whitespace-nowrap text-text">{KEYWORD}</span>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <ResultRow size="sm" n={1} title={208} snippet={[72, 88, 56]} />
        <ResultRow size="sm" n={2} title={176} snippet={[120, 56, 40]} />
        <ResultRow size="sm" n={3} title={192} snippet={[40, 72, 96]} />
        <ResultRow size="sm" n={4} title={160} snippet={[88, 48, 72]} />
      </div>
    </div>
  );
}

/* 3. Add internal links automatically: phrases in a paragraph, linked to your pages. */
function LinkLine({ w }: { w: W }) {
  return (
    <div className="flex h-1 shrink-0 items-center gap-1">
      <Bar w={w} tone={24} />
      <Bar tone="blue" grow />
    </div>
  );
}

function LinksPiece() {
  const pages: Array<[number, number]> = [
    [40, 24],
    [32, 48],
    [48, 32],
  ];
  return (
    <div className={cx(GLASS, "flex items-center self-stretch rounded-md p-4 desk:self-auto desk:p-6")}>
      <div className="flex h-44 min-w-0 flex-1 flex-col justify-center gap-4 rounded-md border border-white-14 bg-grey-3 px-4 desk:w-[240px] desk:flex-none desk:px-6">
        <Bar tone={24} stretch />
        <LinkLine w={[48, 72]} />
        <Bar w={[96, 152]} tone={24} />
        <LinkLine w={[72, 112]} />
        <Bar w={[104, 168]} tone={24} />
        <LinkLine w={[32, 48]} />
        <Bar w={[80, 128]} tone={24} />
      </div>
      <svg
        viewBox="0 0 64 176"
        preserveAspectRatio="none"
        className="block h-44 w-12 shrink-0 fill-none stroke-blue-70 desk:w-16"
      >
        <path vectorEffect="non-scaling-stroke" d="M0 48C32 48 32 24 64 24" />
        <path vectorEffect="non-scaling-stroke" d="M0 88H64" />
        <path vectorEffect="non-scaling-stroke" d="M0 128C32 128 32 152 64 152" />
      </svg>
      <div className="flex shrink-0 flex-col gap-4">
        {pages.map(([a, b]) => (
          <div
            key={a}
            className="flex h-12 w-18 shrink-0 flex-col justify-center gap-2 rounded-sm border border-white-14 bg-grey-4 px-3"
          >
            <Bar w={a} tone={40} />
            <Bar w={b} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* 4. Publish directly to your CMS: the article goes straight to your website. */
function PublishPiece() {
  return (
    <div className="flex flex-col items-start self-stretch desk:self-auto">
      <div
        className={cx(
          GLASS,
          "flex shrink-0 items-center gap-4 self-stretch rounded-md p-4 desk:h-48 desk:w-[280px] desk:flex-col desk:items-stretch desk:self-auto desk:p-6",
        )}
      >
        <p className="min-w-0 flex-1 text-small font-medium text-text desk:flex-none">
          {ARTICLE_TITLE}
        </p>
        <div className="hidden flex-col gap-2 desk:flex">
          <Bar tone={24} stretch />
          <Bar tone={24} stretch />
          <Bar w={120} tone={24} />
        </div>
        <span className="flex h-8 shrink-0 items-center justify-center rounded-sm bg-text px-4 text-small font-medium text-page desk:self-end">
          Publish
        </span>
      </div>
      <svg
        viewBox="0 0 280 32"
        className="block h-8 w-[280px] shrink-0 self-end fill-none stroke-blue desk:self-auto"
      >
        <path d="M224 0V28" />
        <path d="M220 24l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex shrink-0 flex-col self-stretch overflow-clip rounded-md border border-white-14 bg-page-90 backdrop-blur-[24px] desk:h-48 desk:w-[280px] desk:self-auto">
        <div className="flex h-8 shrink-0 items-center gap-2 border-b border-white-8 px-3">
          <span className="block size-1.5 shrink-0 rounded-full bg-white-16" />
          <span className="block size-1.5 shrink-0 rounded-full bg-white-16" />
          <span className="block size-1.5 shrink-0 rounded-full bg-white-16" />
          <span className="block h-4 min-w-0 flex-1 rounded-full bg-white-8" />
        </div>
        <div className="flex flex-col gap-4 px-4 py-4 desk:px-6">
          <div className="flex items-center justify-between">
            <Bar w={48} tone={32} />
            <div className="flex gap-2">
              <Bar w={24} />
              <Bar w={24} />
              <Bar w={24} />
            </div>
          </div>
          <p className="text-small font-medium text-text">{ARTICLE_TITLE}</p>
          <div className="hidden flex-col gap-2 desk:flex">
            <Bar tone={24} stretch />
            <Bar tone={24} stretch />
            <Bar w={136} tone={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES: Array<{ title: string; text: string; photo: string; piece: ReactNode }> = [
  {
    title: "Write with your own style",
    text: "Provide writing samples so the platform can learn your voice and apply it to future articles.",
    photo: "/images/feature-style.webp",
    piece: <StylePiece />,
  },
  {
    title: "Research top-ranking content",
    text: "Analyse competing pages and use their important topics to guide your article.",
    photo: "/images/feature-research.webp",
    piece: <ResearchPiece />,
  },
  {
    title: "Add internal links automatically",
    text: "Find relevant pages from your website and place internal links where they naturally fit.",
    photo: "/images/feature-links.webp",
    piece: <LinksPiece />,
  },
  {
    title: "Publish directly to your CMS",
    text: "Connect your website and publish completed articles without copying content between different tools.",
    photo: "/images/feature-publish.webp",
    piece: <PublishPiece />,
  },
];

export function Features() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inView = useInView(stageRef, 0.3);
  const id = useId();

  // Desktop only; a phone shows all four features at once (see the list at the end).
  // The scroll position picks the feature and fills its blue line.
  // The line is written straight to a CSS variable; React only hears about it
  // when the feature changes.
  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!track || !pin || !stage) return;

    const pinned = window.matchMedia(PINNED);
    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      if (!pinned.matches) {
        stage.style.removeProperty("--p");
        last = -1;
        return;
      }
      const runway = track.offsetHeight - pin.offsetHeight;
      if (runway <= 0) return;
      const pinTop = parseFloat(getComputedStyle(pin).top) || 0;
      const travelled = pinTop - track.getBoundingClientRect().top;
      const progress = Math.min(Math.max(travelled / runway, 0), 1) * FEATURES.length;
      const index = Math.min(FEATURES.length - 1, Math.floor(progress));
      stage.style.setProperty("--p", (progress - index).toFixed(4));
      if (index !== last) {
        last = index;
        setActive(index);
      }
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    pinned.addEventListener("change", request);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      pinned.removeEventListener("change", request);
    };
  }, []);

  const select = (i: number) => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (track && pin && window.matchMedia(PINNED).matches) {
      // Pinned: move the page to where that feature begins, so scroll and state agree.
      const runway = track.offsetHeight - pin.offsetHeight;
      const pinTop = parseFloat(getComputedStyle(pin).top) || 0;
      const start = track.getBoundingClientRect().top + window.scrollY - pinTop;
      window.scrollTo({ top: start + (runway * (i + 0.04)) / FEATURES.length });
      return;
    }
    setActive(i);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (event.key === "ArrowDown") next = (i + 1) % FEATURES.length;
    else if (event.key === "ArrowUp") next = (i - 1 + FEATURES.length) % FEATURES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = FEATURES.length - 1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section id="features" className="bg-page">
      <div ref={trackRef}>
        <div ref={pinRef} className="features-pin flex justify-center">
          <div className="shell flex flex-col gap-intro py-section">
            <div
              data-reveal=""
              className="flex flex-col gap-4 desk:flex-row desk:items-start desk:justify-between desk:gap-6"
            >
              <h2 className="text-heading font-light text-text max-desk:text-balance desk:max-w-[14.5455em]">
                Everything you need to publish content that performs
              </h2>
              <p className="text-lead text-soft max-desk:text-pretty desk:w-[400px] desk:shrink-0">
                Research, write, optimise and publish from one connected workspace.
              </p>
            </div>

            <div
              ref={stageRef}
              data-reveal=""
              data-inview={inView}
              className="features-stage hidden items-start gap-16 desk:flex"
            >
              <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="Everything you need to publish content that performs"
                className="flex w-[320px] shrink-0 flex-col gap-6"
              >
                {FEATURES.map((feature, i) => {
                  const isActive = i === active;
                  return (
                    <div key={feature.title} className="feature flex flex-col gap-4" data-active={isActive}>
                      <button
                        ref={(node) => {
                          tabRefs.current[i] = node;
                        }}
                        type="button"
                        role="tab"
                        id={`${id}-tab-${i}`}
                        aria-selected={isActive}
                        aria-controls={`${id}-panel`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => select(i)}
                        onKeyDown={(event) => onKeyDown(event, i)}
                        className="flex flex-col rounded-sm text-left"
                      >
                        <span className="feature-title text-title font-medium tracking-title">
                          {feature.title}
                        </span>
                        <span className="feature-desc">
                          <span className="block">
                            <span className="block pt-2 text-body text-soft">{feature.text}</span>
                          </span>
                        </span>
                      </button>
                      <span className="feature-track">
                        <span
                          className="feature-progress"
                          onAnimationEnd={() =>
                            setActive((current) => (current + 1) % FEATURES.length)
                          }
                        />
                      </span>
                    </div>
                  );
                })}
              </div>

              <div
                role="tabpanel"
                id={`${id}-panel`}
                aria-labelledby={`${id}-tab-${active}`}
                className="relative h-[560px] min-w-0 flex-1 shrink-0 overflow-clip rounded-lg bg-grey-3"
              >
                {FEATURES.map((feature, i) => (
                  <div
                    key={feature.title}
                    role="img"
                    aria-label={feature.title}
                    aria-hidden={i !== active}
                    data-active={i === active}
                    style={{ "--photo": `url("${feature.photo}")` } as CSSProperties}
                    className="feature-layer feature-photo flex flex-col items-start justify-center gap-4 p-12"
                  >
                    {feature.piece}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: the four features one under another, each with its own picture,
                so no feature is hidden behind a tap. */}
            <ol className="flex flex-col gap-12 desk:hidden">
              {FEATURES.map((feature) => (
                <li
                  key={feature.title}
                  data-reveal=""
                  className="flex flex-col gap-6 border-t border-white-14 pt-6"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-title font-medium tracking-title text-text">
                      {feature.title}
                    </h3>
                    <p className="text-body text-soft">{feature.text}</p>
                  </div>
                  <div
                    aria-hidden="true"
                    style={{ "--photo": `url("${feature.photo}")` } as CSSProperties}
                    className="feature-photo flex h-[440px] shrink-0 flex-col items-start justify-end gap-2 overflow-clip rounded-lg p-4"
                  >
                    {feature.piece}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div aria-hidden="true" className="features-runway" />
      </div>
    </section>
  );
}
