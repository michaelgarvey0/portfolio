import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inkbench EZ Mode - Michael Garvey",
  description: "Converting wireframes to high-fidelity designs for Inkbench's EZ Mode web application.",
};

export default function InkbenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
