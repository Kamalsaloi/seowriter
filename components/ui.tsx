import type { CSSProperties, ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* Icons. All paths are taken from the Paper file.                     */
/* ------------------------------------------------------------------ */

export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      aria-hidden="true"
      className={cx("shrink-0", className)}
    >
      <rect x="4" y="5" width="9" height="3" rx="1.5" className="fill-blue" />
      <rect x="4" y="11" width="20" height="3" rx="1.5" className="fill-text" />
      <rect x="4" y="16" width="20" height="3" rx="1.5" className="fill-text" />
      <rect x="4" y="21" width="13" height="3" rx="1.5" className="fill-text" />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cx("shrink-0", className)}
    >
      <path
        d="M3.5 8h9M8.5 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="shrink-0 text-quiet"
    >
      <circle cx="7" cy="7" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.25 10.25L13 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A plus whose upright stroke turns and fades, leaving a minus. */
export function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="pm"
      data-open={open}
    >
      <path d="M2.5 8h11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        className="pm-v"
        d="M8 2.5v11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cx("shrink-0", className)}
    >
      <path d="M3 8h10M8 3v10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="shrink-0 text-soft"
    >
      <path
        d="M3.5 8.5l3 3 6-6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Status = "done" | "loading" | "idle" | "good";

/** The small round mark at the end of a search result row. */
export function StatusIcon({ state }: { state: Status }) {
  const ring = state === "good" ? "text-green" : state === "done" ? "text-quiet" : "text-white-16";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <circle
        cx="8"
        cy="8"
        r="6.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={ring}
      />
      {(state === "done" || state === "good") && (
        <path
          d="M5.5 8.2l1.7 1.7 3.3-3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={ring}
        />
      )}
      {state === "loading" && (
        <path
          d="M8 1.75a6.25 6.25 0 0 1 6.25 6.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-blue"
        />
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

/** Main button: paper white, dark text, arrow. */
export function MainButton({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(
        "group inline-flex h-12 shrink-0 items-center gap-2 rounded-btn bg-text px-6 text-ui font-medium text-page",
        "transition-colors duration-200 ease-out hover:bg-white active:bg-soft",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Drawn text. Grey bars stand in for words inside the product shots.  */
/* ------------------------------------------------------------------ */

/** One number, or [mobile, desktop] when the two designs differ. */
export type W = number | readonly [number, number];

function widthProps(w: W | undefined): { className?: string; style?: CSSProperties } {
  if (w === undefined) return {};
  if (typeof w === "number") return { style: { width: w } };
  return {
    className: "w-(--w) desk:w-(--dw)",
    style: { "--w": `${w[0]}px`, "--dw": `${w[1]}px` } as CSSProperties,
  };
}

const BAR_HEIGHT = { 4: "h-1", 6: "h-1.5", 8: "h-2" } as const;

const BAR_TONE = {
  8: "bg-white-8",
  12: "bg-white-12",
  14: "bg-white-14",
  16: "bg-white-16",
  24: "bg-white-24",
  28: "bg-white-28",
  32: "bg-white-32",
  40: "bg-white-40",
  blue: "bg-blue",
} as const;

export function Bar({
  w,
  h = 4,
  tone = 16,
  grow,
  stretch,
  className,
}: {
  w?: W;
  h?: keyof typeof BAR_HEIGHT;
  tone?: keyof typeof BAR_TONE;
  /** Take the rest of the row. */
  grow?: boolean;
  /** Take the full width of the column. */
  stretch?: boolean;
  className?: string;
}) {
  const width = widthProps(w);
  return (
    <span
      className={cx(
        "block max-w-full rounded-full",
        BAR_HEIGHT[h],
        BAR_TONE[tone],
        grow ? "min-w-0 flex-1" : "shrink-0",
        stretch && "self-stretch",
        width.className,
        className,
      )}
      style={width.style}
    />
  );
}

export function Dot({ className = "bg-white-28" }: { className?: string }) {
  return <span className={cx("block size-2 shrink-0 rounded-full", className)} />;
}

/** The blue text caret inside the product pictures. */
export function Caret({ h }: { h: 16 | 20 | 24 }) {
  const height = h === 16 ? "h-4" : h === 20 ? "h-5" : "h-6";
  return <span className={cx("block w-0.5 shrink-0 rounded-full bg-blue", height)} />;
}

/** One search result, drawn with bars. */
export function ResultRow({
  n,
  site,
  title,
  snippet,
  size = "md",
  status,
  className,
}: {
  n: number;
  site?: W;
  title: W;
  snippet: readonly [W, W, W];
  size?: "sm" | "md";
  status?: Status;
  className?: string;
}) {
  const sm = size === "sm";
  return (
    <div className={cx("flex items-center self-stretch", sm ? "gap-2" : "gap-4", className)}>
      <span className={cx("w-4 shrink-0 text-soft tabular-nums", sm ? "text-small" : "text-body")}>
        {n}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {site !== undefined && (
          <div className="flex items-center gap-2">
            <Dot />
            <Bar w={site} />
          </div>
        )}
        <Bar w={title} h={sm ? 6 : 8} tone={40} />
        <div className={cx("flex items-center", sm ? "gap-1" : "gap-2")}>
          <Bar w={snippet[0]} />
          <Bar w={snippet[1]} tone="blue" />
          <Bar w={snippet[2]} />
        </div>
      </div>
      {status && <StatusIcon state={status} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checks on the article screen                                        */
/* ------------------------------------------------------------------ */

export type CheckState = "pass" | "warn" | "fail";
export type Check = { text: string; state: CheckState; value?: string };

/** The mark before a check: a green tick, a short amber dash, or a red "!". A tick is kept quiet. */
export function CheckMark({ state }: { state: CheckState }) {
  return (
    <span className={cx("flex h-5 shrink-0 items-center", state === "pass" && "opacity-60")}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
        {state === "pass" && (
          <path
            d="M3.5 8.5l3 3 6-6.5"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-green"
          />
        )}
        {state === "warn" && (
          <path d="M4.5 8h7" fill="none" strokeWidth="1.5" strokeLinecap="round" className="stroke-amber" />
        )}
        {state === "fail" && (
          <path
            d="M8 3.5v5.5M8 12v.5"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="stroke-red"
          />
        )}
      </svg>
    </span>
  );
}

/** One group of checks. A check that passes is quiet; one that needs work is white. */
export function CheckGroup({
  title,
  checks,
  note,
  className,
  as: Title = "h2",
}: {
  title: string;
  checks: Check[];
  /** A plain line above the checks. */
  note?: string;
  className: string;
  /** A real heading on the article screen, plain text inside a product shot. */
  as?: "h2" | "p";
}) {
  const needsWork = checks.some((check) => check.state !== "pass");
  return (
    <div className={cx("flex shrink-0 flex-col gap-3", className)}>
      <Title className={cx("text-label font-medium", needsWork ? "text-text" : "text-text-65")}>
        {title}
      </Title>
      <div className="flex flex-col gap-2">
        {note && <p className="text-small text-text-65">{note}</p>}
        {checks.map((check) => (
          <div key={check.text} className="flex items-start gap-2">
            <CheckMark state={check.state} />
            <span
              className={cx(
                "min-w-0 flex-1 text-small",
                check.state === "pass" ? "text-text-65" : "text-text",
              )}
            >
              {check.text}
            </span>
            {check.value && <span className="shrink-0 text-small text-green">{check.value}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* The two groups that hold everything still to fix. Word for word from the reference screen. */
export const STRUCTURE_CHECKS: Check[] = [
  { text: "5 H1 titles found", state: "fail" },
  { text: "No comparison table", state: "warn" },
  { text: "No FAQ block", state: "warn" },
  { text: "Longest section: 434 words", state: "warn" },
  { text: "24 H2 subheadings", state: "pass" },
];

export const KEYWORD_CHECKS: Check[] = [
  { text: "In the H1 title", state: "pass" },
  { text: "In the opening paragraph", state: "pass" },
  { text: "In 1 H2 subheading", state: "warn" },
  { text: "In the closing paragraph", state: "pass" },
];

export const KEYWORD_NOTE = '"Make money online with AI" used 6 times';

/* Copy that repeats inside the product shots. Word for word from Paper. */
export const KEYWORD = "make money online with AI";
export const ARTICLE_TITLE = "Make Money Online with AI: Practical Ways to Start";
export const ARTICLE_LEAD =
  'Make money online with AI? Yes, absolutely, but not in the lazy, push-button, "set it and forget it" way that so much AI hype implies.';
export const ARTICLE_H2 = "Can You Really Make Money Online with AI?";
