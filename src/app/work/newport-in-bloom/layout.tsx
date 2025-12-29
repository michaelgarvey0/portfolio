import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newport in Bloom - Michael Garvey",
  description: "Designing and developing a responsive website for Newport in Bloom nonprofit organization.",
};

export default function NewportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
