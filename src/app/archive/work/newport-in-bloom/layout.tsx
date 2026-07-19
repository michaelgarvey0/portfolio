import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Newport in Bloom - Michael Garvey",
  description: "Designing and developing a responsive website for two nonprofits.",
  openGraph: {
    title: "Newport in Bloom - Michael Garvey",
    description: "Designing and developing a responsive website for two nonprofits.",
    url: "https://garvey.design/archive/work/newport-in-bloom",
    images: [{ url: "/newport-in-bloom-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/newport-in-bloom-og.png"],
  },
};

export default function NewportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={raleway.variable}>{children}</div>;
}
