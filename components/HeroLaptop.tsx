import { LaptopScene } from "./LaptopScene";
import { Nav } from "./Nav";
import { MainButton } from "./ui";

/**
 * Hero 10 from Paper: her at the laptop. On desktop the copy sits on the photo, top left,
 * and the whole hero fits the first screen. On mobile the copy comes first and the photo
 * follows as its own plate.
 */
export function HeroLaptop() {
  return (
    <section id="top" className="laptop-hero flex flex-col bg-page">
      <Nav />

      <div className="flex justify-center desk:flex-1">
        <div className="laptop-stage shell flex flex-col pt-16 pb-12 desk:px-(--laptop-edge) desk:pt-0 desk:pb-(--laptop-edge)">
          <div className="relative flex flex-col gap-12 desk:flex-1">
            {/* On desktop this is the top layer of the plate; its left edge meets the page gutter. */}
            <div className="flex flex-col items-start gap-8 desk:relative desk:z-1 desk:gap-12 desk:pt-(--laptop-top) desk:pb-8 desk:pl-[calc(var(--gutter)-var(--laptop-edge))]">
              <div className="flex flex-col items-start gap-4 desk:gap-6">
                {/* 72px at 1440 wide; the width is in em so the three lines break as drawn. */}
                <h1 className="text-display font-light text-text max-desk:text-balance desk:max-w-[8.8889em] desk:text-(length:--laptop-display) desk:leading-[calc(76/72)]">
                  Turn a keyword into an article ready to rank #1 on Google
                </h1>
                {/* Narrow windows wrap this onto three lines; "SEO-ready" is kept in one piece. */}
                <p className="max-w-[320px] text-lead text-soft max-desk:text-pretty desk:max-w-[min(520px,36.111vw)]">
                  Turn one keyword into a fully researched,{" "}
                  <span className="whitespace-nowrap">SEO-ready</span> article without switching
                  between multiple tools.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <MainButton href="#pricing" className="max-desk:h-10 max-desk:px-5">
                  Start Writing
                </MainButton>
                <p className="text-small text-quiet desk:font-medium desk:text-soft">
                  No credit card required.
                </p>
              </div>
            </div>

            <LaptopScene />
          </div>
        </div>
      </div>
    </section>
  );
}
