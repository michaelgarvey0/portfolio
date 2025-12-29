import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work - Michael Garvey",
  description: "Explore case studies of my work in product design, UX, and design systems including Orgo, Webster Bank, and more.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
