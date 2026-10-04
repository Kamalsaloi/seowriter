import { LogoMark } from "./ui";

const COLUMNS = [
  [
    { label: "Product", href: "#product" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#" },
  ],
  [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact", href: "#" },
  ],
];

export function Footer() {
  return (
    <footer className="film-footer flex justify-center overflow-clip">
      <div className="shell flex flex-col justify-between gap-16 pt-16 desk:min-h-[640px] desk:pt-24">
        <div className="flex flex-col gap-10 desk:flex-row desk:items-start desk:justify-between desk:gap-12">
          <div className="flex flex-col gap-6">
            <LogoMark />
            <p className="text-body text-soft max-desk:text-pretty desk:max-w-[360px]">
              An AI-powered SEO writing platform for creating researched, optimised and
              human-sounding articles.
            </p>
          </div>
          <nav aria-label="Footer" className="flex items-start desk:shrink-0 desk:gap-24">
            {COLUMNS.map((column) => (
              <ul key={column[0].label} className="flex min-w-0 flex-1 flex-col gap-4 desk:flex-none">
                {column.map((link) => (
                  <li key={link.label} className="flex">
                    <a
                      href={link.href}
                      className="rounded-sm text-body text-text transition-colors duration-200 ease-out hover:text-soft"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        {/* The logo mark, large, running off the bottom of the page. */}
        <div
          aria-hidden="true"
          className="flex h-26 shrink-0 flex-col gap-4 overflow-clip desk:h-68 desk:gap-10"
        >
          <span className="block h-6 w-[44.444%] shrink-0 rounded-full bg-blue desk:h-16 desk:w-[44.872%]" />
          <span className="block h-6 shrink-0 self-stretch rounded-full bg-white-12 desk:h-16" />
          <span className="block h-6 shrink-0 self-stretch rounded-full bg-white-12 desk:h-16" />
          <span className="block h-6 w-[65.497%] shrink-0 rounded-full bg-white-12 desk:h-16 desk:w-[64.744%]" />
        </div>
      </div>
    </footer>
  );
}
