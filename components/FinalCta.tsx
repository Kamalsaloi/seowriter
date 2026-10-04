import { MainButton } from "./ui";

export function FinalCta() {
  return (
    <section className="flex justify-center bg-page">
      <div className="shell flex flex-col py-section">
        <div
          data-reveal=""
          className="photo-block photo-cta flex flex-col items-start gap-6 desk:h-[560px] desk:justify-center desk:gap-8 desk:py-12 desk:pr-12"
        >
          <div className="flex flex-col gap-4 self-stretch desk:gap-6 desk:self-auto">
            <div className="photo-block-inner">
              <h2 className="text-heading font-light text-text max-desk:text-balance desk:max-w-[11.8182em]">
                Turn your next keyword into an article ready to publish
              </h2>
            </div>
            <p className="text-lead text-soft max-desk:text-pretty desk:max-w-[440px]">
              Research, write and optimise your next SEO article from one workspace.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <MainButton href="#pricing">Start Writing</MainButton>
            <p className="text-small text-quiet desk:text-soft">No credit card required.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
