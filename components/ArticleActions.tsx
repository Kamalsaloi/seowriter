import Link from "next/link";
import { ArrowIcon, cx } from "./ui";

/* The pieces the article screen shows twice: on the cover, and on the slim bar that
   takes over once the cover has scrolled away. Paths are taken from the Paper file. */

export function BackLink() {
  return (
    <Link
      href="/dashboard"
      className="group flex shrink-0 items-center gap-2 rounded-sm text-small text-soft transition-colors duration-200 ease-out hover:text-text"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
      >
        <path
          d="M12.5 8h-9M7.5 4l-4 4 4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </Link>
  );
}

/** "Improve" and "Publish". Publish is the main action, so it is the white one. */
export function ArticleActions({
  className,
  compact,
}: {
  className?: string;
  /** A size smaller on phones, for the slim bar. */
  compact?: boolean;
}) {
  const size = compact ? "h-10 px-4 max-desk:h-9 max-desk:px-3" : "h-10 px-4";
  return (
    <div className={cx("flex shrink-0 items-center gap-2", className)}>
      <button
        type="button"
        className={cx(
          "flex items-center justify-center rounded-btn border border-white-14 text-ui font-medium text-text transition-colors duration-200 ease-out hover:border-white-32",
          size,
        )}
      >
        Improve
      </button>
      <button
        type="button"
        className={cx(
          "group flex items-center justify-center gap-2 rounded-btn bg-text text-ui font-medium text-page transition-colors duration-200 ease-out hover:bg-white active:bg-soft",
          size,
        )}
      >
        Publish
        <ArrowIcon className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
