"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon, SearchIcon } from "./ui";

/* Word for word from the reference screen. */
const ARTICLES = [
  { title: "Make money online with AI", created: "Created 3 months ago" },
  { title: "Building a second brain", created: "Created 3 months ago" },
  { title: "Learning to learn with AI", created: "Created 3 months ago" },
  { title: "Learning to speed read", created: "Created 4 months ago" },
  { title: "The art of bookmarking", created: "Created 4 months ago" },
  { title: "The power of good sleep", created: "Created 4 months ago" },
];

function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
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

/** The ledger: one row per article, with title, state, date and arrow in straight columns. */
export function RecentArticles() {
  const [query, setQuery] = useState("");
  const wanted = query.trim().toLowerCase();
  const shown = wanted ? ARTICLES.filter((a) => a.title.toLowerCase().includes(wanted)) : ARTICLES;

  return (
    <div className="flex flex-col gap-6 desk:max-w-[1040px]">
      <div className="flex flex-col gap-4 desk:h-10 desk:flex-row desk:items-center desk:justify-between">
        <h2 className="text-title font-medium tracking-title text-text">Recent Articles</h2>
        {/* The field shows it is in use with a thin blue border, with no ring around it. */}
        <label className="flex h-10 shrink-0 items-center gap-2 rounded-btn border border-white-14 px-3 transition-colors duration-200 ease-out focus-within:border-blue desk:w-[320px]">
          <SearchIcon />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blogs here"
            aria-label="Search blogs here"
            className="min-w-0 flex-1 bg-transparent text-ui text-text outline-none placeholder:text-quiet"
          />
        </label>
      </div>

      <ul className="flex flex-col border-t border-white-14">
        {shown.map((article) => (
          <li key={article.title} className="border-b border-white-8">
            {/* Every row opens the one article screen there is. */}
            <Link
              href="/article"
              className="group flex flex-wrap items-center gap-x-6 gap-y-1 py-4 desk:h-[72px] desk:flex-nowrap desk:py-0"
            >
              <span className="min-w-0 basis-full text-title font-medium tracking-title text-text desk:flex-1 desk:basis-0">
                {article.title}
              </span>
              <span className="flex w-24 shrink-0 items-center gap-2 text-small font-medium text-green">
                <Tick />
                Done
              </span>
              <span className="min-w-0 flex-1 text-body text-soft desk:w-[176px] desk:flex-none">
                {article.created}
              </span>
              <ArrowIcon className="text-quiet transition-[translate,color] duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-text" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
