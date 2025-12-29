import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webster Bank - Michael Garvey",
  description: "Migrating and enhancing Webster Bank's design system from Sketch to Figma.",
};

export default function WebsterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
