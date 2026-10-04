import type { Metadata } from "next";
import { Dashboard } from "@/components/Dashboard";

// The product has no name, so the tab carries the screen's own heading.
export const metadata: Metadata = { title: "Recent Articles" };

export default function DashboardPage() {
  return <Dashboard />;
}
