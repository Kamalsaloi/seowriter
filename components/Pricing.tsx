import Link from "next/link";
import { CheckIcon, cx } from "./ui";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    text: "For trying the platform and creating your first article.",
    action: "Start for Free",
    // The free plan needs no checkout, so it opens the app.
    href: "/dashboard",
    items: [
      "Monthly writing credits",
      "Search-result research",
      "SEO content checks",
      "Article generation",
      "Export articles",
    ],
  },
  {
    name: "Growth",
    note: "Most Popular",
    text: "For creators and businesses publishing content regularly.",
    action: "Choose Growth",
    items: [
      "More monthly writing credits",
      "Everything in Starter",
      "Writing-style matching",
      "Internal linking",
      "References",
      "CMS publishing",
    ],
  },
  {
    name: "Scale",
    text: "For teams and agencies managing a larger content workflow.",
    action: "Choose Scale",
    items: [
      "Higher monthly credit allowance",
      "Everything in Growth",
      "Automated workflows",
      "Multiple publishing projects",
      "Priority support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="flex justify-center bg-page">
      <div className="shell flex flex-col gap-intro py-section">
        <div
          data-reveal=""
          className="flex flex-col gap-4 desk:flex-row desk:items-start desk:justify-between desk:gap-6"
        >
          <h2 className="text-heading font-light text-text desk:max-w-[14.5455em]">
            Pricing &amp; Plans
          </h2>
          <p className="text-lead text-soft max-desk:text-pretty desk:w-[400px] desk:shrink-0">
            Select a plan based on how frequently you create and publish content.
          </p>
        </div>

        <div data-reveal="" className="flex flex-col gap-12 desk:flex-row desk:gap-0">
          {PLANS.map((plan, i) => {
            const popular = Boolean(plan.note);
            const action = cx(
              "flex h-12 shrink-0 items-center justify-center self-stretch rounded-btn px-6 text-ui font-medium whitespace-nowrap transition-colors duration-200 ease-out",
              popular
                ? "bg-text text-page hover:bg-white active:bg-soft"
                : "border border-white-18 text-text hover:border-white-40 hover:bg-white-8",
            );
            return (
              <div
                key={plan.name}
                className={cx(
                  "flex min-w-0 flex-col gap-8 border-t-2 pt-8 desk:flex-1",
                  popular ? "border-t-blue" : "border-t-white-14",
                  i > 0 && "desk:border-l desk:border-l-white-8 desk:pl-8",
                  i < PLANS.length - 1 && "desk:pr-8",
                )}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-plan font-medium text-text">{plan.name}</h3>
                    {plan.price && <p className="text-plan font-light text-soft">{plan.price}</p>}
                    {plan.note && (
                      <p className="text-small font-medium whitespace-nowrap text-blue">
                        {plan.note}
                      </p>
                    )}
                  </div>
                  <p className="text-body text-soft desk:h-12">{plan.text}</p>
                </div>

                {plan.href ? (
                  <Link href={plan.href} className={action}>
                    {plan.action}
                  </Link>
                ) : (
                  <button type="button" className={action}>
                    {plan.action}
                  </button>
                )}

                <ul className="flex flex-col gap-4">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="flex h-6 shrink-0 items-center">
                        <CheckIcon />
                      </span>
                      <span className="text-body text-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
