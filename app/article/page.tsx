import type { Metadata } from "next";
import { ArticleCover } from "@/components/ArticleCover";
import { ARTICLE_TITLE } from "@/components/ui";

export const metadata: Metadata = { title: ARTICLE_TITLE };

export default function ArticlePage() {
  return <ArticleCover />;
}
