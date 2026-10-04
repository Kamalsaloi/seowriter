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
import {
  ARTICLE_H2,
  ARTICLE_LEAD,
  ARTICLE_TITLE,
  ArrowIcon,
  Bar,
  Caret,
  CheckGroup,
  Dot,
  KEYWORD,
  KEYWORD_CHECKS,
  KEYWORD_NOTE,
  LogoMark,
  MainButton,
  ResultRow,
  STRUCTURE_CHECKS,
  SearchIcon,
  cx,
} from "./ui";

const STEPS = [
  {
    title: "Start with a keyword",
    text: "Enter the keyword or search term you want your article to rank for.",
  },
  {
    title: "Research the search results",
    text: "Analyse the pages already ranking and identify the topics your article needs to cover.",
  },
  {
    title: "Generate your article",
    text: "Create a complete article using the research, structure and writing style you selected.",
  },
  {
    title: "Review and publish",
    text: "Edit the article, add internal links and references, then export it or publish it to your CMS.",
  },
];

/** Wide and tall enough to hold the stage still while the page scrolls through the steps. */
const PINNED = "(min-width: 68.75rem) and (min-height: 620px)";

export function HowItWorks() {
  return (
    <section id="product" className="bg-page">
      {/* The track is the pinned section plus a runway of empty scroll; see StepTabs. */}
      <div data-hiw-track="">
        <div data-hiw-pin="" className="hiw-pin flex justify-center">
          <div className="shell flex flex-col gap-intro py-section">
            <div
              data-reveal=""
              className="flex flex-col gap-4 desk:flex-row desk:items-start desk:justify-between desk:gap-6"
            >
              <h2 className="text-heading font-light text-text max-desk:text-balance desk:max-w-[14.5455em]">
                From keyword to published article in 4 easy steps
              </h2>
              <div className="flex flex-col items-start gap-6 desk:w-[400px] desk:shrink-0">
                <p className="text-lead text-soft max-desk:text-pretty">
                  Create a researched and optimised article without managing a complicated SEO
                  workflow.
                </p>
                <MainButton href="#pricing">Start Writing</MainButton>
              </div>
            </div>

            <StepTabs />
            <StepList />
          </div>
        </div>
        <div aria-hidden="true" className="hiw-runway" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: four tabs, a blue line that keeps time, one large screen.  */
/* ------------------------------------------------------------------ */

function StepTabs() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inView = useInView(stageRef, 0.35);
  const id = useId();

  // Pinned: the stage holds still and the scroll position picks the step and fills its
  // blue line, so the next section only arrives after step 4. The line is written
  // straight to a CSS variable; React only hears about it when the step changes.
  useEffect(() => {
    const stage = stageRef.current;
    const track = stage?.closest<HTMLElement>("[data-hiw-track]");
    const pin = stage?.closest<HTMLElement>("[data-hiw-pin]");
    if (!stage || !track || !pin) return;

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
      // Where the stage sits inside the section, so CSS can hold it in the middle of the window.
      // Read from the layout, not from the box on screen, so the reveal's slide does not shift it.
      let offset = 0;
      for (let node: HTMLElement | null = stage; node && node !== pin; ) {
        offset += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      pin.style.setProperty("--hiw-offset", `${offset}px`);
      pin.style.setProperty("--hiw-stage", `${stage.offsetHeight}px`);

      const runway = track.offsetHeight - pin.offsetHeight;
      if (runway <= 0) return;
      const pinTop = parseFloat(getComputedStyle(pin).top) || 0;
      const travelled = pinTop - track.getBoundingClientRect().top;
      const progress = Math.min(Math.max(travelled / runway, 0), 1) * STEPS.length;
      const index = Math.min(STEPS.length - 1, Math.floor(progress));
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
    const stage = stageRef.current;
    const track = stage?.closest<HTMLElement>("[data-hiw-track]");
    const pin = stage?.closest<HTMLElement>("[data-hiw-pin]");
    if (track && pin && window.matchMedia(PINNED).matches) {
      // Pinned: move the page to where that step begins, so scroll and state agree.
      const runway = track.offsetHeight - pin.offsetHeight;
      const pinTop = parseFloat(getComputedStyle(pin).top) || 0;
      const start = track.getBoundingClientRect().top + window.scrollY - pinTop;
      window.scrollTo({ top: start + (runway * (i + 0.04)) / STEPS.length });
      return;
    }
    setActive(i);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (i + 1) % STEPS.length;
    else if (event.key === "ArrowLeft") next = (i - 1 + STEPS.length) % STEPS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = STEPS.length - 1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div
      ref={stageRef}
      data-reveal=""
      data-inview={inView}
      className="hiw-stage hidden flex-col gap-8 desk:flex"
    >
      <div role="tablist" aria-label="From keyword to published article in 4 easy steps" className="flex min-h-32">
        {STEPS.map((step, i) => {
          const state = i === active ? "current" : i < active ? "done" : "next";
          return (
            <button
              key={step.title}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              data-state={state}
              onClick={() => select(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className="hiw-step"
            >
              <span className="hiw-track">
                <span
                  className="hiw-progress"
                  onAnimationEnd={() => setActive((current) => (current + 1) % STEPS.length)}
                />
              </span>
              <span className={cx("flex items-start gap-4", i < STEPS.length - 1 && "pr-8")}>
                <span className="hiw-num w-4 shrink-0 text-title">{i + 1}</span>
                <span className="flex min-w-0 flex-1 flex-col gap-2">
                  <span className="hiw-title text-title font-medium tracking-title">
                    {step.title}
                  </span>
                  <span className="hiw-desc text-body text-soft">{step.text}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="film-plate flex h-[560px] shrink-0 overflow-clip rounded-lg border border-white-8 px-[clamp(2rem,4.444vw,4rem)] pt-16"
      >
        <AppWindow className="art-zoom">
          <div className="relative min-h-0 flex-1 self-stretch">
            {SCREENS_WIDE.map((screen, i) => (
              <div
                key={STEPS[i].title}
                role="img"
                aria-label={STEPS[i].title}
                aria-hidden={i !== active}
                data-active={i === active}
                className="hiw-screen flex"
              >
                {screen}
              </div>
            ))}
          </div>
        </AppWindow>
      </div>
    </div>
  );
}

/** The product window: glass, open at the bottom, with its own top bar. */
function AppWindow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "flex min-w-0 flex-1 flex-col overflow-clip rounded-t-md border-x border-t border-white-14 bg-page-90 backdrop-blur-[24px]",
        className,
      )}
    >
      <div className="flex h-12 shrink-0 items-center justify-between self-stretch border-b border-white-8 px-4 desk:h-14 desk:px-6">
        <div className="flex items-center gap-8">
          <LogoMark size={24} />
          <div className="hidden items-center gap-6 desk:flex">
            <Bar w={56} tone={40} />
            <Bar w={48} />
            <Bar w={64} />
          </div>
        </div>
        <span className="block size-6 shrink-0 rounded-full bg-white-14" />
      </div>
      {children}
    </div>
  );
}

function SubmitSquare({ className }: { className: string }) {
  return (
    <span className={cx("flex shrink-0 items-center justify-center rounded-sm bg-text text-page", className)}>
      <ArrowIcon />
    </span>
  );
}

/* The slim bar of the article screen: what stays in view while the article is read. */

function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <path
        d="M12.5 8h-9M7.5 4l-4 4 4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SCREENS_WIDE: ReactNode[] = [
  /* 1. Start with a keyword */
  <div key="1" className="flex min-h-0 flex-1 flex-col items-center gap-12 self-stretch px-16 pt-16">
    <div className="flex h-16 w-[640px] shrink-0 items-center justify-between gap-4 rounded-md border border-blue bg-page pr-2 pl-6">
      <div className="flex items-center gap-1">
        <span className="text-title whitespace-nowrap text-text">{KEYWORD}</span>
        <Caret h={24} />
      </div>
      <SubmitSquare className="size-12" />
    </div>
    <div className="flex w-[640px] shrink-0 flex-col">
      {(
        [
          [264, 28, 144, 12, 12],
          [216, 24, 176, 12, 12],
          [296, 16, 120, 8, 8],
        ] as const
      ).map(([a, aTone, b, bTone, endTone]) => (
        <div key={a} className="flex items-center justify-between border-t border-white-8 py-6">
          <div className="flex flex-col gap-2">
            <Bar w={a} h={6} tone={aTone} />
            <Bar w={b} tone={bTone} />
          </div>
          <Bar w={48} tone={endTone} />
        </div>
      ))}
    </div>
  </div>,

  /* 2. Research the search results */
  <div key="2" className="flex min-h-0 flex-1 self-stretch">
    <div className="flex min-w-0 flex-1 flex-col gap-8 px-12 pt-8">
      <div className="flex h-12 shrink-0 items-center gap-2 self-stretch rounded-md border border-white-14 bg-page px-4">
        <SearchIcon />
        <span className="text-body whitespace-nowrap text-text">{KEYWORD}</span>
      </div>
      <div className="flex flex-col gap-8 self-stretch">
        <ResultRow n={1} site={120} title={384} snippet={[136, 112, 120]} status="done" />
        <ResultRow n={2} site={152} title={320} snippet={[200, 72, 96]} status="done" />
        <ResultRow n={3} site={96} title={352} snippet={[64, 128, 160]} status="done" />
        <ResultRow n={4} site={136} title={288} snippet={[160, 88, 120]} status="done" />
        <ResultRow n={5} site={104} title={336} snippet={[96, 120, 144]} status="loading" />
        <ResultRow n={6} site={128} title={304} snippet={[184, 64, 112]} status="idle" />
      </div>
    </div>
    <div className="flex w-[360px] shrink-0 flex-col gap-6 border-l border-white-8 p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-5 shrink-0 items-center">
          <Dot className="bg-blue" />
        </span>
        <span className="min-w-0 flex-1 text-small font-medium text-text">{ARTICLE_H2}</span>
      </div>
      {[200, 152, 224].map((w) => (
        <div key={w} className="flex h-5 shrink-0 items-center gap-4">
          <Dot className="bg-blue" />
          <Bar w={w} h={6} tone={40} />
        </div>
      ))}
      <div className="flex h-5 shrink-0 items-center gap-4">
        <Dot className="bg-blue-40" />
        <Bar w={176} h={6} tone={16} />
      </div>
      <div className="flex h-5 shrink-0 items-center gap-4">
        <Dot className="bg-blue-20" />
        <Bar w={136} h={6} tone={8} />
      </div>
    </div>
  </div>,

  /* 3. Generate your article */
  <div key="3" className="flex min-h-0 flex-1 self-stretch">
    <div className="flex w-[296px] shrink-0 flex-col gap-6 border-r border-white-8 px-6 py-8">
      <div className="flex gap-4">
        <span className="block w-0.5 shrink-0 rounded-full bg-blue" />
        <span className="min-w-0 flex-1 text-small font-medium text-text">{ARTICLE_H2}</span>
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <Bar w={176} h={6} tone={28} />
        <Bar w={128} tone={12} />
        <Bar w={152} tone={12} />
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <Bar w={200} h={6} tone={24} />
        <Bar w={144} tone={12} />
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <Bar w={160} h={6} tone={16} />
        <Bar w={184} tone={8} />
        <Bar w={120} tone={8} />
      </div>
    </div>
    <div className="flex min-w-0 flex-1 flex-col gap-6 px-16 pt-12">
      <p className="max-w-[560px] text-plan font-medium text-text">{ARTICLE_TITLE}</p>
      <p className="max-w-[640px] text-body text-soft">{ARTICLE_LEAD}</p>
      <div className="flex flex-col gap-4 self-stretch pt-2">
        <p className="text-title font-medium tracking-title text-text">{ARTICLE_H2}</p>
        <div className="flex max-w-[640px] flex-col gap-4">
          <Bar h={6} stretch />
          <Bar h={6} stretch />
          <div className="flex h-6 shrink-0 items-center gap-2">
            <Bar w={296} h={6} />
            <Caret h={24} />
          </div>
        </div>
      </div>
    </div>
  </div>,

  /* 4. Review and publish: the article screen while it is being read. The score and the two
     buttons ride on a slim bar, and the checks that still need work sit beside the article. */
  <div key="4" className="flex min-h-0 flex-1 flex-col self-stretch">
    <div className="flex h-14 shrink-0 items-center justify-between gap-6 self-stretch border-b border-white-8 px-8">
      <div className="flex shrink-0 items-center gap-6">
        <span className="flex items-center gap-2 text-small text-soft">
          <BackArrow />
          Back
        </span>
        <span className="block h-6 w-px shrink-0 bg-white-14" />
        <div className="flex items-center gap-3">
          <span className="text-[1.75rem] leading-8 font-light tracking-[-0.035em] text-text">82</span>
          <span className="text-small font-medium text-green">Strong</span>
          <span className="text-small whitespace-nowrap text-soft">Ready to publish</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="flex h-10 items-center justify-center rounded-btn border border-white-14 px-4 text-ui font-medium text-text">
          Improve
        </span>
        <span className="flex h-10 items-center justify-center gap-2 rounded-btn bg-text px-4 text-ui font-medium text-page">
          Publish
          <ArrowIcon />
        </span>
      </div>
    </div>
    <div className="flex min-h-0 flex-1 items-start justify-center gap-12 self-stretch px-8 pt-8">
      <div className="flex w-[584px] shrink-0 flex-col gap-6">
        {/* Held narrow, so the title breaks after "AI:" as it does on the real screen. */}
        <p className="max-w-[416px] text-plan font-medium text-text">{ARTICLE_TITLE}</p>
        <p className="text-body text-soft">{ARTICLE_LEAD}</p>
        <div className="flex flex-col gap-4 self-stretch pt-2">
          <p className="text-title font-medium tracking-title text-text">{ARTICLE_H2}</p>
          <Bar h={6} stretch />
          <Bar h={6} stretch />
          <Bar w={296} h={6} />
        </div>
        <div className="flex flex-col gap-4 self-stretch pt-2">
          <Bar w={280} h={8} tone={40} />
          <Bar h={6} stretch />
          <Bar h={6} stretch />
        </div>
      </div>
      <div className="flex w-[248px] shrink-0 flex-col gap-4">
        <CheckGroup as="p" title="STRUCTURE" checks={STRUCTURE_CHECKS} className="w-full" />
        <span className="block h-px shrink-0 bg-white-8" />
        <CheckGroup
          as="p"
          title="KEYWORD SIGNALS"
          note={KEYWORD_NOTE}
          checks={KEYWORD_CHECKS}
          className="w-full"
        />
      </div>
    </div>
  </div>,
];

/* ------------------------------------------------------------------ */
/* Mobile: the four steps stacked, each with its own screen.           */
/* ------------------------------------------------------------------ */

const SCREENS_TALL: Array<{ film: string; height: number; screen: ReactNode }> = [
  {
    film: "94% 9%",
    height: 360,
    screen: (
      <div className="flex flex-col gap-8 self-stretch px-4 pt-8">
        <div className="flex h-14 shrink-0 items-center justify-between gap-2 self-stretch rounded-md border border-blue bg-page pr-2 pl-4">
          <div className="flex items-center gap-1">
            <span className="text-body whitespace-nowrap text-text">{KEYWORD}</span>
            <Caret h={20} />
          </div>
          <SubmitSquare className="size-10" />
        </div>
        <div className="flex flex-col self-stretch">
          {(
            [
              [160, 28, 96, 12, 12],
              [136, 24, 112, 12, 12],
              [176, 16, 80, 8, 8],
            ] as const
          ).map(([a, aTone, b, bTone, endTone]) => (
            <div key={a} className="flex items-center justify-between border-t border-white-8 py-6">
              <div className="flex flex-col gap-2">
                <Bar w={a} h={6} tone={aTone} />
                <Bar w={b} tone={bTone} />
              </div>
              <Bar w={32} tone={endTone} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    film: "60% 0%",
    height: 360,
    screen: (
      <div className="flex flex-col gap-6 self-stretch px-4 pt-6">
        <div className="flex h-12 shrink-0 items-center gap-2 self-stretch rounded-md border border-white-14 bg-page px-4">
          <SearchIcon />
          <span className="text-body whitespace-nowrap text-text">{KEYWORD}</span>
        </div>
        <div className="flex flex-col gap-6 self-stretch">
          <ResultRow n={1} site={72} title={176} snippet={[48, 64, 40]} status="done" />
          <ResultRow n={2} site={96} title={144} snippet={[80, 40, 32]} status="done" />
          <ResultRow n={3} site={64} title={160} snippet={[32, 72, 56]} status="loading" />
          <ResultRow n={4} site={88} title={136} snippet={[72, 48, 40]} status="idle" />
        </div>
      </div>
    ),
  },
  {
    film: "100% 20%",
    height: 360,
    // 15px at the sides, not 16: Paper draws its hairlines thinner than a browser does,
    // and without these two pixels the intro runs to four lines and hides the caret.
    screen: (
      <div className="flex flex-col gap-6 self-stretch px-[15px] pt-6">
        <div className="flex flex-col gap-2 self-stretch">
          <p className="text-title font-medium tracking-title text-text">{ARTICLE_TITLE}</p>
          <p className="text-small text-soft">{ARTICLE_LEAD}</p>
        </div>
        <div className="flex flex-col gap-4 self-stretch">
          <p className="text-ui font-medium text-text">{ARTICLE_H2}</p>
          <div className="flex flex-col gap-4 self-stretch">
            <Bar h={6} stretch />
            <div className="flex h-6 shrink-0 items-center gap-2">
              <Bar w={144} h={6} />
              <Caret h={24} />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    film: "80% 0%",
    height: 448,
    // The same screen on a phone: the bar keeps the score and the two buttons, and the
    // article has the full width. There is no margin for the checks here.
    screen: (
      <>
        <div className="flex h-12 shrink-0 items-center justify-between gap-3 self-stretch border-b border-white-8 px-4">
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-[1.5rem] leading-7 font-light tracking-[-0.035em] text-text">82</span>
            <span className="text-small font-medium text-green">Strong</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 items-center justify-center rounded-sm border border-white-14 px-3 text-small font-medium text-text">
              Improve
            </span>
            <span className="flex h-8 items-center justify-center rounded-sm bg-text px-3 text-small font-medium text-page">
              Publish
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 self-stretch px-4 pt-6">
          <p className="text-title font-medium tracking-title text-text">{ARTICLE_TITLE}</p>
          <p className="text-small text-soft">{ARTICLE_LEAD}</p>
          <div className="flex flex-col gap-4 self-stretch pt-2">
            <p className="text-ui font-medium text-text">{ARTICLE_H2}</p>
            <Bar h={6} stretch />
            <Bar h={6} stretch />
            <Bar w={144} h={6} />
          </div>
        </div>
      </>
    ),
  },
];

function StepList() {
  return (
    <ol className="flex flex-col gap-12 desk:hidden">
      {STEPS.map((step, i) => (
        <li
          key={step.title}
          data-reveal=""
          className="flex flex-col gap-6 border-t border-white-14 pt-6"
        >
          <div className="flex items-start gap-4 self-stretch">
            <span aria-hidden="true" className="w-4 shrink-0 text-title text-quiet">
              {i + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h3 className="text-title font-medium tracking-title text-text">{step.title}</h3>
              <p className="text-body text-soft">{step.text}</p>
            </div>
          </div>
          <div
            aria-hidden="true"
            style={
              {
                "--film-pos": SCREENS_TALL[i].film,
                "--plate-h": `${SCREENS_TALL[i].height}px`,
              } as CSSProperties
            }
            className="film-step phone-plate flex shrink-0 self-stretch overflow-clip rounded-lg border border-white-8 px-6 pt-8"
          >
            <AppWindow className="phone-zoom">{SCREENS_TALL[i].screen}</AppWindow>
          </div>
        </li>
      ))}
    </ol>
  );
}
