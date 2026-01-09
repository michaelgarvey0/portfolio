import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Beeline - Michael Garvey",
  description: "A GPS for your grocery shopping experience.",
};

export default function BeelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={dmSans.variable}>{children}</div>;
}
