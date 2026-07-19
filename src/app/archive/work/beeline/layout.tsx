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
  openGraph: {
    title: "Beeline - Michael Garvey",
    description: "A GPS for your grocery shopping experience.",
    url: "https://garvey.design/archive/work/beeline",
    images: [{ url: "/beeline-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/beeline-og.png"],
  },
};

export default function BeelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={dmSans.variable}>{children}</div>;
}
