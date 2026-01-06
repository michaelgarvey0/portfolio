import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beeline - Michael Garvey",
  description: "A GPS for your grocery shopping experience.",
};

export default function BeelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
