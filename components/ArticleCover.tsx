import { ArticleActions, BackLink } from "./ArticleActions";
import { CoverBar } from "./CoverBar";
import {
  ARTICLE_H2,
  ARTICLE_TITLE,
  CheckGroup,
  KEYWORD_CHECKS,
  KEYWORD_NOTE,
  STRUCTURE_CHECKS,
  type Check,
} from "./ui";

/* ------------------------------------------------------------------ */
/* Content. Word for word from the reference screen.                   */
/* ------------------------------------------------------------------ */

const STATS = [
  { label: "Word Count", value: "5,045", note: "SERP median 3,118 (±15%)" },
  { label: "Reading Time", value: "22 min", note: "Approx. at 230 words/min" },
  { label: "Readability", value: "Grade 11.6", note: "Fairly readable · Flesch 53.4" },
];

/* The two groups with something to fix, Structure and Keyword Signals, are in ui.tsx:
   the landing page draws them too. */
const AUTHENTICITY: Check[] = [
  { text: "AI detection bypass", state: "pass", value: "99.3%" },
  { text: "Plagiarism bypass", state: "pass", value: "100.0%" },
];

const WRITING_QUALITY: Check[] = [
  { text: "Avg sentence length: 18.1 words", state: "pass" },
  { text: "Avg paragraph: 3.8 sentences", state: "pass" },
  { text: "Passive voice: 4.1% of sentences", state: "pass" },
  { text: "Transition words: 64.4% of sentences", state: "pass" },
];

const OPENING = [
  'Make money online with AI? Yes, absolutely, but not in the lazy, push-button, "set it and forget it" way that so much AI hype implies. It turns out AI is usually a lever: it helps you write faster, research better, package services more clearly, design rough drafts, automate repetitive steps, etc., but it does not remove the need for judgment, positioning, sales, or actual usefulness. That distinction matters. A lot.',
  'The practical question is not "can AI make me rich," but "where does AI give me an unfair speed or quality advantage, given my skills, budget, and timeline?" Instead of another vague list of side hustles, this guide compares nine real methods by beginner fit, startup cost, time to first dollar, risk, and realistic income potential, including what $100, $500, and $1000 per day usually require, plus the scams and fantasy claims to ignore.',
];

type Block =
  | { kind: "h2"; heading: string; lead?: string; text: string }
  | { kind: "h3"; heading: string; text: string };

const BODY: Block[][] = [
  [
    {
      kind: "h2",
      heading: ARTICLE_H2,
      lead: 'Yes, you can make money online with AI, but usually not by letting AI "run itself." AI works best when it speeds up work, improves output, cuts costs, or helps you package a service or product people already want to buy.',
      text: 'That distinction matters. AI can draft, summarize, brainstorm, analyze, repurpose, design rough concepts, automate repetitive steps, and help you move faster. It cannot, by itself, create trust, pick a profitable niche with certainty, close clients, guarantee traffic, or fix a weak offer. I hate to say it but a lot of "AI income" content quietly skips that part.',
    },
  ],
  [
    {
      kind: "h3",
      heading: "What AI can and cannot do for income",
      text: "Roughly speaking, AI is useful where work has structure: writing first drafts, research support, image ideation, customer reply templates, lead list cleanup, workflow automation, etc. It is much less reliable where nuance is the whole job, in particular strategy, taste, fact-checking, compliance, and relationship-building.",
    },
    {
      kind: "h3",
      heading: "Why AI works best as a multiplier, not a button",
      text: 'The point here is that AI usually multiplies an existing advantage: your skill, your speed, your distribution, your sales ability, your niche knowledge. If you can already write decent copy, AI helps you write more of it. If you understand a business problem, AI helps you solve it faster. That is really quite different from "type a prompt, collect money."',
    },
    {
      kind: "h3",
      heading: "Who is most likely to succeed",
      text: "The people most likely to succeed are not necessarily the most technical. They are the ones who can spot a concrete problem, use AI to deliver a useful result, and keep quality high. Beginners can absolutely do this, of course, but the winners tend to be practical, patient, and willing to edit the machine instead of worshipping it.",
    },
  ],
  [
    {
      kind: "h2",
      heading: "How to Choose the Best AI Income Path for You",
      text: 'Once you stop treating AI like a magic ATM, the selection problem becomes much clearer, and honestly more interesting. You are not choosing "the best AI hustle" in the abstract. You are choosing a model that fits your skills, budget, patience, and tolerance for uncertainty. A method that is excellent for a designer with client experience may be terrible for someone who needs cash this month and has never sold anything online.',
    },
    {
      kind: "h3",
      heading: "Skill level: no-experience vs technical paths",
      text: "Roughly speaking, beginner-friendly paths are service-first: writing help, content repurposing, simple design, research support, admin assistance, etc. More technical paths, like automation setup, chatbot implementation, or SEO systems, can pay more, but they also punish shallow knowledge much faster.",
    },
  ],
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function ToolButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-10 shrink-0 items-center justify-center rounded-btn border border-white-14 text-soft transition-colors duration-200 ease-out hover:border-white-32 hover:text-text"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </button>
  );
}

/** The hairline between two groups on the cover. Only where they sit side by side. */
function Rule() {
  return <span aria-hidden="true" className="hidden w-px shrink-0 self-stretch bg-white-8 desk:block" />;
}

const READ = "text-read text-text-78";

/* ------------------------------------------------------------------ */
/* The screen                                                          */
/* ------------------------------------------------------------------ */

/**
 * Article 5 from Paper, "the cover": the screen opens on one film plate that answers
 * "can I publish this, and if not, what do I fix?", and the article follows under it.
 */
export function ArticleCover() {
  return (
    <main className="flex min-h-svh flex-col items-center bg-page">
      {/* While the article is being read, the two groups that hold every problem stay beside it. */}
      <CoverBar
        coverId="cover"
        dock={
          <>
            <CheckGroup title="STRUCTURE" checks={STRUCTURE_CHECKS} className="w-full" />
            <span className="block h-px shrink-0 bg-white-8" />
            <CheckGroup
              title="KEYWORD SIGNALS"
              note={KEYWORD_NOTE}
              checks={KEYWORD_CHECKS}
              className="w-full"
            />
          </>
        }
      />

      <div className="flex w-full max-w-[90rem] flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between px-6 desk:px-16">
          <BackLink />
          <div className="flex items-center gap-4">
            <span className="text-label font-medium text-soft">ARTICLE STATS</span>
            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded-sm border border-white-14 pr-2 pl-4 text-small font-medium text-text transition-colors duration-200 ease-out hover:border-white-32"
            >
              Version 1
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 text-soft">
                <path
                  d="M4.5 6.5L8 10l3.5-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Three layouts. Wide (1440 and up) is the Paper frame. Between 1100 and 1440 the large type
            and the paddings are a size smaller, so the five groups still sit side by side at full
            text size; the cover is never laid out narrower than 1280px there, and on a window too
            narrow for that it is scaled down as one piece (see .cover-fit in globals.css).
            Below 1100 it is one column. */}
        <div className="cover-fit flex px-4">
          <section
            id="cover"
            className="film-cover flex min-w-0 flex-1 flex-col gap-8 overflow-clip rounded-[24px] p-6 shadow-[inset_0_0_0_1px_var(--color-white-8)] desk:min-w-[1280px] desk:p-8 wide:gap-10 wide:p-12"
          >
            <div className="flex flex-col gap-6 self-stretch">
              {/* The verdict, the decision, and beside them the three numbers behind the score. */}
              <div className="flex flex-wrap gap-x-8 gap-y-8 self-stretch desk:flex-nowrap wide:gap-x-16">
                <div className="flex shrink-0 flex-col gap-6 desk:flex-row desk:gap-8 wide:gap-16">
                  {/* The numeral hangs a little left of its box, so its round edge lines up by eye. */}
                  <div className="flex shrink-0 items-start desk:h-[7.5rem] desk:w-44 desk:justify-end wide:h-40 wide:w-56">
                    <p className="w-max shrink-0 text-[7.5rem] leading-[6rem] font-light tracking-[-0.05em] text-text desk:text-[10rem] desk:leading-[7.5rem] wide:text-[13rem] wide:leading-[10rem]">
                      82
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-between gap-6 wide:pb-2">
                    <div className="flex flex-col items-start">
                      <p className="text-[1.5rem] leading-8 tracking-[-0.02em] text-green desk:text-[1.75rem] desk:leading-9 wide:text-[2rem] wide:leading-10">
                        Strong
                      </p>
                      <p className="text-[1.5rem] leading-8 font-light tracking-[-0.02em] text-text desk:text-[1.75rem] desk:leading-9 wide:text-[2rem] wide:leading-10">
                        Ready to publish
                      </p>
                    </div>
                    <ArticleActions />
                  </div>
                </div>

                <div className="flex min-w-0 flex-auto flex-wrap items-start gap-6 self-end desk:flex-nowrap desk:justify-end wide:gap-8 wide:pb-2">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="flex w-full shrink-0 flex-col gap-2 desk:w-44 wide:w-48">
                      <div className="flex flex-col items-start gap-2 wide:gap-4">
                        <span className="text-small text-text-65">{stat.label}</span>
                        <span className="w-max text-[1.75rem] leading-9 font-light tracking-[-0.02em] text-text-65 wide:text-[2rem] wide:leading-10">
                          {stat.value}
                        </span>
                      </div>
                      <span className="text-small text-text-50">{stat.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* The scale as one line across the cover, with a mark at the score. */}
              <div className="flex items-center gap-4 self-stretch">
                <span className="shrink-0 text-small text-text-65">0</span>
                <span className="flex h-0.5 min-w-0 flex-1 items-center rounded-[1px] bg-white-14">
                  <span className="cover-fill block h-0.5 w-[82%] shrink-0 rounded-[1px] bg-green" />
                  <span className="cover-mark block h-4 w-0.5 shrink-0 rounded-[1px] bg-text" />
                </span>
                <span className="shrink-0 text-small text-text-65">100</span>
              </div>
            </div>

            {/* Five groups, always side by side on desktop, a hairline between each, spread so the
                first and last line up with the two ends of the scale. */}
            <div className="flex flex-wrap items-start gap-x-3 gap-y-8 self-stretch desk:flex-nowrap desk:justify-between">
              <CheckGroup title="STRUCTURE" checks={STRUCTURE_CHECKS} className="w-full desk:w-[192px]" />
              <Rule />
              <CheckGroup
                title="KEYWORD SIGNALS"
                note={KEYWORD_NOTE}
                checks={KEYWORD_CHECKS}
                className="w-full desk:w-[248px]"
              />
              <Rule />
              <CheckGroup
                title="AUTHENTICITY"
                checks={AUTHENTICITY}
                className="w-full desk:w-[192px]"
              />
              <Rule />
              <CheckGroup
                title="WRITING QUALITY"
                checks={WRITING_QUALITY}
                className="w-full desk:w-[248px]"
              />
              <Rule />
              <div className="flex w-full shrink-0 flex-col gap-3 desk:w-[216px]">
                <h2 className="text-label font-medium text-text-65">TOPIC COVERAGE</h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-small text-text-65">SERP topics covered</span>
                    <span className="text-small text-text-65">11/11</span>
                  </div>
                  <p className="max-w-[216px] text-small text-text-50">
                    100% of topics common across competing pages
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <article className="flex w-full max-w-[640px] flex-col gap-10 self-center px-6 pt-10 pb-24 min-[43rem]:px-0 wide:pt-14">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-6">
              <h1 className="max-w-[520px] min-w-0 flex-1 text-[1.75rem] leading-9 font-medium tracking-[-0.02em] text-text desk:text-[2.25rem] desk:leading-[2.75rem]">
                {ARTICLE_TITLE}
              </h1>
              <div className="flex shrink-0 items-center gap-2">
                <ToolButton label="Copy">
                  <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
                  <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
                </ToolButton>
                <ToolButton label="Download">
                  <path d="M8 2.5v8M4.5 7L8 10.5 11.5 7M3 13.5h10" />
                </ToolButton>
              </div>
            </div>
            {OPENING.map((text) => (
              <p key={text} className={READ}>
                {text}
              </p>
            ))}
          </div>

          {BODY.map((blocks) => (
            <div key={blocks[0].heading} className="flex flex-col gap-10">
              {blocks.map((block) =>
                block.kind === "h2" ? (
                  <section key={block.heading} className="flex flex-col gap-4 pt-2">
                    <h2 className="text-[1.5rem] leading-8 font-medium tracking-[-0.02em] text-text">
                      {block.heading}
                    </h2>
                    {block.lead && <p className="text-read font-semibold text-text">{block.lead}</p>}
                    <p className={READ}>{block.text}</p>
                  </section>
                ) : (
                  <section key={block.heading} className="flex flex-col gap-2">
                    <h3 className="text-title font-medium tracking-title text-text">{block.heading}</h3>
                    <p className={READ}>{block.text}</p>
                  </section>
                ),
              )}
            </div>
          ))}
        </article>
      </div>
    </main>
  );
}
