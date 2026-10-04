import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

// The page has no product name, so the title and description reuse the hero copy.
export const metadata: Metadata = {
  title: "Turn a keyword into an article ready to rank #1 on Google",
  description:
    "Turn one keyword into a fully researched, SEO-ready article without switching between multiple tools.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
