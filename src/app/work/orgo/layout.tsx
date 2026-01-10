import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orgo: The App - Michael Garvey",
  description: "Building a scheduling engine for real life.",
  openGraph: {
    title: "Orgo: The App - Michael Garvey",
    description: "Building a scheduling engine for real life.",
    url: "https://garvey.design/work/orgo",
    images: [{ url: "/orgo-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/orgo-og.png"],
  },
};

export default function OrgoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
