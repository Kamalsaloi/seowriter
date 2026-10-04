import type { CSSProperties, ReactNode } from "react";
import { ARTICLE_H2, ARTICLE_TITLE, Bar, Dot, MainButton, PlusIcon, cx, type W } from "./ui";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

function Note({
  title,
  children,
  blue,
  className,
}: {
  title: string;
  children: ReactNode;
  /** The blue leader marks the note that the outline's added row belongs to. */
  blue?: boolean;
  className?: string;
}) {
  return (
    <div className={cx("flex items-start gap-2", className)}>
      <span aria-hidden="true" className="flex h-7 w-6 shrink-0 items-center">
        <span className={cx("block h-px min-w-0 flex-1", blue ? "bg-blue" : "bg-white-32")} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="text-title font-medium tracking-title text-text">{title}</h3>
        <p className="text-body text-soft">{children}</p>
      </div>
    </div>
  );
}

/** Four ranking pages, stacked. Only the front one is drawn in detail. */
function RankingPages() {
  const back = [
    { n: 4, k: 0, tone: "border-white-8 bg-grey-1 text-quiet" },
    { n: 3, k: 1, tone: "border-white-10 bg-grey-2 text-quiet" },
    { n: 2, k: 2, tone: "border-white-12 bg-grey-3 text-soft" },
  ];
  return (
    <div className="sd-stack">
      {back.map((card) => (
        <div key={card.n} className={cx("sd-card", card.tone)} style={{ "--k": card.k } as CSSProperties}>
          <div className="flex h-6 shrink-0 items-center px-2 desk:h-8">
            <span className="text-small">{card.n}</span>
          </div>
        </div>
      ))}
      <div className="sd-card border-white-18 bg-grey-4" style={{ "--k": 3 } as CSSProperties}>
        <div className="flex h-8 shrink-0 items-center px-2">
          <span className="text-small text-text">1</span>
        </div>
        <div className="flex flex-col gap-4 px-6 pb-6">
          <div className="flex h-2 shrink-0 items-center gap-2">
            <Dot />
            <Bar w={88} />
          </div>
          <Bar w={[168, 160]} h={8} tone={40} />
          <div className="flex flex-col gap-3">
            <Bar w={[196, 176]} />
            <MatchLine w={[64, 56]} />
            <Bar w={[168, 152]} />
            <MatchLine w={[112, 96]} />
            <Bar w={[188, 168]} />
            <MatchLine w={[80, 72]} />
            <Bar w={[160, 144]} tone={12} />
            <Bar w={[196, 176]} tone={12} />
            <Bar w={[128, 112]} tone={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** A line of the page where part of the text (blue) feeds the outline. */
function MatchLine({ w }: { w: W }) {
  return (
    <div className="flex h-1 shrink-0 items-center gap-1">
      <Bar w={w} />
      <Bar tone="blue" grow />
    </div>
  );
}

function OutlineRow({ i, heading, sub }: { i: number; heading: W; sub: W }) {
  return (
    <div className="sd-row flex shrink-0 flex-col desk:h-10" style={order(i)}>
      <div className="flex h-6 shrink-0 items-center gap-2">
        <Dot className="bg-blue" />
        <Bar w={heading} h={6} tone={40} />
      </div>
      <div className="flex h-4 shrink-0 items-center pl-4">
        <Bar w={sub} />
      </div>
    </div>
  );
}

export function SearchData() {
  return (
    <section className="flex justify-center bg-page">
      <div className="shell flex flex-col gap-intro py-section">
        <div
          data-reveal=""
          className="flex flex-col gap-4 desk:flex-row desk:items-start desk:justify-between desk:gap-6"
        >
          <h2 className="text-heading font-light text-text max-desk:text-balance desk:max-w-[12.7273em]">
            Build every article on live search data
          </h2>
          <div className="flex flex-col items-start gap-6 desk:w-[400px] desk:shrink-0">
            <p className="text-lead text-soft max-desk:text-pretty">
              Create articles using information from pages currently ranking for your target
              keyword.
            </p>
            <MainButton href="#pricing">Start Writing</MainButton>
          </div>
        </div>

        <div data-reveal="" className="flex flex-col gap-6 desk:flex-row desk:items-start desk:gap-4">
          <Note
            title="Analyse ranking content"
            className="sd-note-1 desk:shrink-0 desk:flex-row-reverse"
          >
            See what successful articles cover before creating your own.
          </Note>

          <div
            aria-hidden="true"
            data-stage=""
            className="sd-flow flex flex-col desk:shrink-0 desk:flex-row desk:items-start"
          >
            <RankingPages />

            <svg
              viewBox="0 0 120 400"
              preserveAspectRatio="none"
              className="sd-lines-d hidden h-[400px] shrink-0 desk:block"
            >
              <path className="sd-line" style={order(0)} pathLength={1} d="M0 194C60 194 60 140 120 140" />
              <path className="sd-line" style={order(1)} pathLength={1} d="M0 226C60 226 60 204 120 204" />
              <path className="sd-line" style={order(2)} pathLength={1} d="M0 258C60 258 60 268 120 268" />
            </svg>
            <svg
              viewBox="0 0 342 64"
              preserveAspectRatio="none"
              className="block h-16 w-full shrink-0 desk:hidden"
            >
              <path className="sd-line" style={order(0)} pathLength={1} d="M159 0C159 36 139 28 139 64" />
              <path className="sd-line" style={order(1)} pathLength={1} d="M207 0C207 36 171 28 171 64" />
              <path className="sd-line" style={order(2)} pathLength={1} d="M255 0C255 36 203 28 203 64" />
            </svg>

            <div className="flex flex-col self-stretch desk:w-[304px] desk:shrink-0 desk:self-auto desk:pt-10">
              <div className="flex flex-col gap-6 self-stretch rounded-md border border-white-14 bg-grey-3 p-6">
                <div className="flex shrink-0 items-start desk:h-10">
                  <p className="max-w-[216px] text-ui font-medium text-text desk:max-w-none">
                    {ARTICLE_TITLE}
                  </p>
                </div>
                <OutlineRow i={0} heading={[168, 144]} sub={[120, 104]} />
                <OutlineRow i={1} heading={[136, 120]} sub={[160, 136]} />
                <OutlineRow i={2} heading={[184, 160]} sub={[104, 88]} />
                <div className="sd-row flex shrink-0 items-start gap-2 desk:h-10" style={order(3)}>
                  <span className="flex h-5 shrink-0 items-center desk:h-7">
                    <PlusIcon className="text-blue" />
                  </span>
                  <p className="min-w-0 flex-1 text-small font-medium text-text desk:pt-1">
                    {ARTICLE_H2}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="sd-notes flex flex-col gap-6 desk:min-w-0 desk:flex-1 desk:gap-0">
            <Note title="Create stronger outlines" className="sd-note-2 self-stretch">
              Use search data to build a structure that matches the reader’s intent.
            </Note>
            <Note title="Cover important topics" blue className="self-stretch">
              Find useful subjects and questions that competing articles may have missed.
            </Note>
          </div>
        </div>
      </div>
    </section>
  );
}
