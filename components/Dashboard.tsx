import type { ReactNode } from "react";
import { RecentArticles } from "./RecentArticles";
import { ArrowIcon, LogoMark } from "./ui";

/* Icons. All paths are taken from the Paper file. */

function Icon20({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

const WorkflowIcon = () => (
  <Icon20>
    <rect x="7.5" y="3" width="5" height="4" rx="1" />
    <rect x="3" y="13" width="5" height="4" rx="1" />
    <rect x="12" y="13" width="5" height="4" rx="1" />
    <path d="M10 7v3M5.5 13v-1.5A1.5 1.5 0 0 1 7 10h6a1.5 1.5 0 0 1 1.5 1.5V13" />
  </Icon20>
);

/* The four features have no names in the reference, so they have none here. */
const FEATURE_ICONS = [
  <path
    key="link"
    d="M8.5 11.5a3 3 0 0 0 4.24 0l2.5-2.5a3 3 0 0 0-4.24-4.24l-.75.75M11.5 8.5a3 3 0 0 0-4.24 0l-2.5 2.5a3 3 0 0 0 4.24 4.24l.75-.75"
  />,
  <g key="globe">
    <circle cx="10" cy="10" r="7" />
    <path d="M3 10h14M10 3c2 2.2 3 4.5 3 7s-1 4.8-3 7c-2-2.2-3-4.5-3-7s1-4.8 3-7z" />
  </g>,
  <path
    key="pen"
    d="M4 16l1-4 8.5-8.5a1.41 1.41 0 0 1 2 0l1 1a1.41 1.41 0 0 1 0 2L8 15l-4 1zM12 5l3 3"
  />,
  <path
    key="book"
    d="M10 5.5C8.5 4.5 6.5 4 4 4v11c2.5 0 4.5.5 6 1.5 1.5-1 3.5-1.5 6-1.5V4c-2.5 0-4.5.5-6 1.5zM10 5.5v11"
  />,
];

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 text-soft">
      <path
        d="M6 3.5L10.5 8 6 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A square outline that holds one icon. */
function IconBox({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-btn border border-white-14 text-text">
      {children}
    </span>
  );
}

/* Glass, like the article card on the landing page's hero: a light see-through fill over the
   blurred film, a fine edge, and a faint highlight along the top. No dark box, no glow. */
const PANEL =
  "flex items-center gap-4 self-stretch rounded-md border border-white-18 bg-white-8 p-(--panel-pad) text-left shadow-[inset_0_1px_0_var(--color-white-12)] backdrop-blur-[24px] transition-colors duration-200 ease-out hover:border-white-32 hover:bg-white-12";

/**
 * Dashboard 5 from Paper: everything the writer does sits on the film desk at the left,
 * and the right side holds only the articles.
 */
export function Dashboard() {
  return (
    <main className="flex min-h-svh flex-col gap-8 bg-page p-4 desk:flex-row desk:items-start desk:gap-0 desk:pr-0">
      {/* Every gap on the desk comes from a variable set in globals.css, so the desk can tighten
          on a short window and still show everything without scrolling. */}
      <div className="film-desk app-desk flex shrink-0 flex-col justify-between gap-(--desk-gap) overflow-clip rounded-lg border border-white-8 p-(--desk-pad) desk:w-[416px]">
        <div className="flex flex-col gap-(--desk-gap)">
          <LogoMark />
          <div className="flex flex-col gap-(--desk-gap-2)">
            <h1 className="max-w-[280px] text-(length:--desk-greet) leading-[calc(50/44)] font-light tracking-[-0.03em] text-text">
              Good morning Rituraj
            </h1>
            <div className="flex flex-col items-start gap-(--desk-gap-3)">
              <p className="text-title text-text-80">Let&rsquo;s write something new</p>
              <button
                type="button"
                className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-btn bg-text px-6 text-ui font-medium text-page transition-colors duration-200 ease-out hover:bg-white active:bg-soft"
              >
                <span>Create new article</span>
                <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-(--desk-foot) self-stretch">
          <div className="flex flex-col gap-2 self-stretch">
            <button type="button" className={PANEL}>
              <IconBox>
                <WorkflowIcon />
              </IconBox>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-body font-medium text-text">Automated Workflows</span>
                <span className="text-small text-soft">
                  Write and publish blogs automatically on a schedule.
                </span>
              </span>
              <Chevron />
            </button>

            <button type="button" className={PANEL}>
              <span className="flex min-w-0 flex-1 flex-col gap-3">
                <span className="text-body font-medium text-text">Explore more features</span>
                <span className="flex items-center gap-2">
                  {FEATURE_ICONS.map((icon) => (
                    <IconBox key={icon.key}>
                      <Icon20>{icon}</Icon20>
                    </IconBox>
                  ))}
                </span>
              </span>
              <Chevron />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white-32 text-small font-medium text-text">
              RP
            </span>
            <p className="flex items-baseline gap-1 text-body">
              <span className="font-medium text-text">3.5k</span>
              <span className="text-text-80">credits</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-2 pb-6 desk:px-8 desk:py-6 mid:px-16">
        <RecentArticles />
      </div>
    </main>
  );
}
