# AI SEO writer: landing page and two app screens

A design assignment, built from the Paper design file `AI_sero_writer`: one landing page, one dashboard screen and one article screen for an AI SEO writing web app. Dark mode only. The product has no name, so none is used.

## Screens

| Route | Screen |
| --- | --- |
| `/` | Landing page: hero, problem, how it works, search data, features, pricing, FAQ, final call to action, footer |
| `/dashboard` | Dashboard. "Start for Free" on the Starter plan opens it. Every article row opens the article screen |
| `/article` | Article screen. It opens on a cover that answers "can I publish this?". Scroll, and the score and the two buttons move to a slim bar while the checks that still need work stay beside the article |

Every word on the landing page comes from the brief, and every label on the two app screens comes from the reference screens, unchanged.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the build
npm run lint
npx tsc --noEmit
```

## Stack

- Next.js 16 (App Router, TypeScript), React 19, Tailwind CSS v4
- Geist, self-hosted through the `geist` package (no Google Fonts request)
- No animation library. Motion is CSS, `IntersectionObserver` and a few small effects. It is switched off when the system asks for reduced motion

## Design system in code

All tokens are in `app/globals.css`, in the `@theme` block: colours, radii, type sizes and easing.

- **Colour:** black and greys carry every surface and line. White is the text and the main button. One blue marks the product at work. Warm tones appear only inside photographs. Green, amber and red appear only where the app reports a result.
- **Type:** Geist only. Light for headlines and large numbers, regular for reading, medium for labels and buttons.
- **Layout:** flexbox with gap and padding on an 8px grid, never margins. One breakpoint at 1100px separates the phone and desktop designs; `1280` and `1440` only tidy details inside the desktop design.

## Where things are

| Path | What it holds |
| --- | --- |
| `app/globals.css` | Design tokens, picture crops, all motion |
| `app/layout.tsx`, `app/page.tsx` | Font, metadata, section order of the landing page |
| `app/dashboard/page.tsx`, `app/article/page.tsx` | The two app screens |
| `components/HeroLaptop.tsx`, `LaptopScene.tsx` | Hero: the keyword is typed on the laptop in the photograph, then the article card appears |
| `components/Nav.tsx` | Navigation and the full-screen mobile menu |
| `components/Problem.tsx` | Three points that open on hover: sideways on desktop, stacked on mobile |
| `components/HowItWorks.tsx` | Desktop: pinned while the page scrolls through four steps. Mobile: four stacked steps |
| `components/SearchData.tsx` | Diagram whose lines draw in when it enters the view |
| `components/Features.tsx` | Desktop: pinned while the page scrolls through four features. Mobile: four stacked features, each with its picture |
| `components/Pricing.tsx`, `Faq.tsx`, `FinalCta.tsx`, `Footer.tsx` | The remaining sections |
| `components/Dashboard.tsx`, `RecentArticles.tsx` | Dashboard: the film desk and the ledger of articles with its search |
| `components/ArticleCover.tsx`, `CoverBar.tsx`, `ArticleActions.tsx` | Article screen: the cover, the slim bar and docked checks, the two buttons |
| `components/RevealController.tsx` | Section entrances |
| `components/ui.tsx` | Icons, buttons, the check group, and the grey bars that stand in for text in the product pictures |
| `hooks/useInView.ts` | Starts and pauses timed motion |

## Known limits

- "Create new article", "Improve", "Publish", the version menu, copy, download, "Choose Growth", "Choose Scale", "Blog" and the footer links have no destination: the assignment covers three screens.
- Every row on the dashboard opens the same article, since there is one article screen.
- Tested in Chromium browsers (Edge, Brave). Not yet checked in Firefox or Safari.
