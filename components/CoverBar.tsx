"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArticleActions, BackLink } from "./ArticleActions";

/**
 * The cover answers "can I publish this?" on arrival, and then gets out of the way. Once it has
 * scrolled off, two things take over, so the article has the whole screen and nothing is lost:
 * a slim bar with the verdict and the two buttons, and, beside the article, the checks that
 * still need work. Both repeat words that are already on the cover.
 */
export function CoverBar({ coverId, dock }: { coverId: string; dock: ReactNode }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const cover = document.getElementById(coverId);
    if (!cover) return;
    // "Off" means its foot has passed under where the bar sits.
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), {
      rootMargin: "-56px 0px 0px 0px",
    });
    observer.observe(cover);
    return () => observer.disconnect();
  }, [coverId]);

  return (
    <>
      <div
        inert={!shown}
        data-shown={shown}
        className="cover-bar fixed inset-x-0 top-0 z-10 flex justify-center border-b border-white-8 bg-page-90 backdrop-blur-[24px]"
      >
        <div className="flex h-14 w-full max-w-[90rem] items-center justify-between gap-3 px-4 desk:gap-6 desk:px-16">
          <div className="flex min-w-0 items-center gap-6">
            {/* A phone has no room for Back here: the score and the two buttons take the bar. */}
            <div className="flex shrink-0 items-center gap-6 max-desk:hidden">
              <BackLink />
              <span className="block h-6 w-px shrink-0 bg-white-14" />
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 text-[1.75rem] leading-8 font-light tracking-[-0.035em] text-text">
                82
              </span>
              <span className="shrink-0 text-small font-medium text-green">Strong</span>
              <span className="truncate text-small text-soft max-desk:hidden">Ready to publish</span>
            </div>
          </div>
          <ArticleActions compact />
        </div>
      </div>

      {/* Sits in the margin to the right of the article. Only where the window has that margin. */}
      <aside
        inert={!shown}
        data-shown={shown}
        className="cover-dock fixed top-[5.5rem] left-[calc(50%+22.5rem)] z-10 hidden w-64 flex-col gap-4 min-[79rem]:flex"
      >
        {dock}
      </aside>
    </>
  );
}
