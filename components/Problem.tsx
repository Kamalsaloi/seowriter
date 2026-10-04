"use client";

import { useEffect, useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  ARTICLE_H2,
  ARTICLE_LEAD,
  ARTICLE_TITLE,
  Bar,
  KEYWORD,
  PlusMinus,
  ResultRow,
  SearchIcon,
} from "./ui";

/* The glass card that sits on the film and runs off its right and bottom edge. */
function Card({ children }: { children: ReactNode }) {
  return (
    <div className="art-zoom flex min-w-0 flex-1 flex-col overflow-clip rounded-tl-md border-t border-l border-white-14 bg-page-85 backdrop-blur-[24px]">
      {children}
    </div>
  );
}

function ResultsCard() {
  return (
    <Card>
      <div className="flex h-12 shrink-0 items-center gap-2 self-stretch border-b border-white-8 px-4 desk:h-14 desk:px-6">
        <SearchIcon />
        <span className="text-body whitespace-nowrap text-text">{KEYWORD}</span>
      </div>
      <div className="flex flex-col gap-6 self-stretch px-4 py-6 desk:px-6">
        <ResultRow n={1} site={[80, 96]} title={[200, 256]} snippet={[[56, 72], [80, 96], [48, 64]]} />
        <ResultRow n={2} site={[104, 128]} title={[168, 208]} snippet={[[96, 120], [56, 64], [32, 40]]} />
        <ResultRow n={3} site={[64, 80]} title={[184, 232]} snippet={[[32, 40], [72, 80], [80, 96]]} />
        <ResultRow n={4} site={112} title={184} snippet={[96, 56, 72]} className="max-desk:hidden" />
      </div>
    </Card>
  );
}

function OutlineGroup({ children, lines }: { children: ReactNode; lines: number[] }) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <div className="flex flex-col gap-4 border-l border-white-14 pl-4">
        {lines.map((w) => (
          <Bar key={w} w={w} tone={24} />
        ))}
      </div>
    </div>
  );
}

function OutlineCard() {
  return (
    <Card>
      <div className="flex self-stretch border-b border-white-8 p-4 desk:p-6">
        <p className="max-w-[320px] text-title font-medium tracking-title text-text">
          {ARTICLE_TITLE}
        </p>
      </div>
      <div className="flex flex-col gap-6 self-stretch p-4 desk:p-6">
        <OutlineGroup lines={[208, 160, 184]}>
          <p className="text-ui font-medium text-text">{ARTICLE_H2}</p>
        </OutlineGroup>
        <OutlineGroup lines={[176, 216]}>
          <Bar w={240} h={8} tone={40} />
        </OutlineGroup>
        <OutlineGroup lines={[192, 144]}>
          <Bar w={200} h={8} tone={40} />
        </OutlineGroup>
      </div>
    </Card>
  );
}

function ArticleCard() {
  return (
    <Card>
      {/* The text gives way so the score row stays in view. At the drawn width (1440) it keeps its
          height, as in Paper, and the score row runs a few pixels off the bottom edge. */}
      <div className="flex min-h-0 flex-1 flex-col gap-6 self-stretch overflow-clip p-4 desk:p-6 wide:min-h-auto wide:shrink-0 wide:basis-auto">
        <div className="flex flex-col gap-2 self-stretch">
          <p className="max-w-[320px] text-title font-medium tracking-title text-text">
            {ARTICLE_TITLE}
          </p>
          <p className="text-small text-soft">{ARTICLE_LEAD}</p>
        </div>
        <div className="flex flex-col gap-4 self-stretch">
          <p className="text-ui font-medium text-text">{ARTICLE_H2}</p>
          <div className="flex flex-col gap-2 self-stretch">
            <Bar stretch />
            <Bar stretch />
            <Bar w={240} />
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-4 self-stretch border-t border-white-8 px-4 py-4 desk:px-6">
        <span className="shrink-0 text-score font-light text-text">82</span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-small font-medium whitespace-nowrap text-green">Strong</span>
          <span className="text-small whitespace-nowrap text-soft">Ready to publish</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {/* Shown where the card is wide enough for both buttons. */}
          <span className="hidden h-8 shrink-0 items-center rounded-sm border border-white-18 px-4 text-small font-medium text-text mid:flex">
            Improve
          </span>
          <span className="flex h-8 shrink-0 items-center rounded-sm bg-text px-4 text-small font-medium text-page">
            Publish
          </span>
        </div>
      </div>
    </Card>
  );
}

const POINTS = [
  {
    title: "Research what is ranking",
    text: "Understand the pages already performing for your target keyword.",
    picture: <ResultsCard />,
  },
  {
    title: "Build the article structure",
    text: "Turn search insights into a clear, SEO-focused outline.",
    picture: <OutlineCard />,
  },
  {
    title: "Write and optimise",
    text: "Generate the article, improve it and prepare it for publishing in one workspace.",
    picture: <ArticleCard />,
  },
];

export function Problem() {
  const [open, setOpen] = useState(0);
  const id = useId();

  // A mouse opens a point by resting on it; a short wait keeps it from opening
  // while the pointer is only passing over. Touch and keyboard still use the button.
  const hoverTimer = useRef(0);
  const onPointerEnter = (i: number) => (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(i), 90);
  };
  const onPointerLeave = () => window.clearTimeout(hoverTimer.current);
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  return (
    <section className="flex justify-center bg-page">
      <div className="shell flex flex-col gap-intro py-section">
        <div
          data-reveal=""
          className="photo-block photo-problem flex flex-col gap-4 desk:h-[520px] desk:justify-end desk:gap-6 desk:py-12 desk:pr-12"
        >
          <div className="photo-block-inner">
            <h2 className="text-heading font-light text-text max-desk:text-balance desk:max-w-[11.2727em]">
              Creating one SEO article shouldn’t take five different tools
            </h2>
          </div>
          <p className="text-lead text-soft max-desk:text-pretty desk:max-w-[min(480px,33.333vw)]">
            Researching competitors, planning the structure, writing the article, checking SEO and
            publishing should not require a collection of disconnected tools.
          </p>
        </div>

        <div data-reveal="" className="points">
          {POINTS.map((point, i) => {
            const isOpen = open === i;
            return (
              <div
                key={point.title}
                className="point"
                data-open={isOpen}
                onPointerEnter={onPointerEnter(i)}
                onPointerLeave={onPointerLeave}
              >
                <div className="point-copy">
                  <div className="point-text">
                    <h3 className="point-title text-title font-medium tracking-title">
                      <button
                        type="button"
                        id={`${id}-head-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`${id}-panel-${i}`}
                        aria-disabled={isOpen}
                        onClick={() => setOpen(i)}
                        className="rounded-sm"
                      >
                        {point.title}
                      </button>
                    </h3>
                    <div
                      className="point-desc"
                      id={`${id}-panel-${i}`}
                      role="region"
                      aria-labelledby={`${id}-head-${i}`}
                    >
                      <div>
                        <p className="text-body text-soft">{point.text}</p>
                      </div>
                    </div>
                  </div>
                  <span className="point-icon">
                    <PlusMinus open={isOpen} />
                  </span>
                </div>
                <div className="point-picture" aria-hidden="true">
                  <div>
                    <div className="point-plate-pad">
                      <div className="point-plate film-crop">{point.picture}</div>
                    </div>
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
