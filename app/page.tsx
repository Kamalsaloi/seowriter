import { preload } from "react-dom";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { HeroLaptop } from "@/components/HeroLaptop";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Problem } from "@/components/Problem";
import { RevealController } from "@/components/RevealController";
import { SearchData } from "@/components/SearchData";

export default function Home() {
  // The hero photo sits behind the first screen as a CSS background, so ask for it early, along
  // with the keyword patch that is typed onto it: the smaller files on ordinary screens, the large
  // ones on sharper screens, split as in globals.css.
  const sharp = "(min-resolution: 1.1dppx)";
  for (const [size, media] of [
    ["", `not ${sharp}`],
    ["-large", sharp],
  ]) {
    preload(`/images/photo-hero${size}.webp`, { as: "image", fetchPriority: "high", media });
    preload(`/images/photo-hero-keyword${size}.webp`, { as: "image", media });
  }

  return (
    <>
      <main>
        <HeroLaptop />
        <Problem />
        <HowItWorks />
        <SearchData />
        <Features />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <RevealController />
    </>
  );
}
