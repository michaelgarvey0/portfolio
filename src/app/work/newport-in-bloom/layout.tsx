import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Newport in Bloom - Michael Garvey",
  description: "Designing and developing a responsive website for Newport in Bloom nonprofit organization.",
};

export default function NewportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={raleway.variable}>{children}</div>;
}
