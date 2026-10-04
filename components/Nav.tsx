"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { LogoMark, MainButton } from "./ui";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#" },
];

const DESKTOP = "(min-width: 68.75rem)";

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // While the menu is open: lock the page scroll, close on Escape, keep Tab inside.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const items = menuRef.current.querySelectorAll<HTMLElement>("a[href], button");
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // The menu only exists in the mobile design.
    const desktop = window.matchMedia(DESKTOP);
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  // Move focus into the menu when it opens and back to the menu button when it closes.
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus({ preventScroll: true });
    } else if (wasOpen.current) {
      openButtonRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <header className="flex justify-center">
      <div className="shell flex h-16 items-center justify-between max-desk:pr-4 desk:h-18">
        <div className="flex items-center gap-12">
          <a href="#top" aria-label="Home" className="flex rounded-sm">
            <LogoMark />
          </a>
          <nav aria-label="Main" className="hidden items-center gap-8 desk:flex">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-sm text-ui text-soft transition-colors duration-200 ease-out hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <a
          href="#pricing"
          className="hidden h-10 shrink-0 items-center rounded-btn border border-white-18 px-4 text-small font-medium text-text transition-colors duration-200 ease-out hover:border-white-40 hover:bg-white-8 desk:flex"
        >
          Start Writing
        </a>

        <button
          ref={openButtonRef}
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="flex size-10 shrink-0 items-center justify-center rounded-sm text-text desk:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 9h16M4 15h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Full-screen menu, mobile only. */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={open}
        inert={!open}
        className="menu fixed inset-0 z-50 flex flex-col items-center overflow-y-auto bg-page desk:hidden"
      >
        <div className="shell flex h-16 shrink-0 items-center justify-between pr-4">
          <a href="#top" aria-label="Home" onClick={close} className="flex rounded-sm">
            <LogoMark />
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="flex size-10 shrink-0 items-center justify-center rounded-sm text-text"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="shell flex flex-1 flex-col justify-between gap-12 pt-8 pb-12">
          <nav aria-label="Menu" className="flex flex-col border-t border-white-14">
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={close}
                style={{ "--i": i } as CSSProperties}
                className="menu-row flex items-center border-b border-white-14 py-6 text-heading font-light text-text"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="menu-row flex flex-col" style={{ "--i": LINKS.length } as CSSProperties}>
            <MainButton href="#pricing" onClick={close} className="justify-center">
              Start Writing
            </MainButton>
          </div>
        </div>
      </div>
    </header>
  );
}
