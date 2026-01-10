import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orgo: The Brand - Michael Garvey",
  description: "Defining a brand for a B2C mobile app.",
  openGraph: {
    title: "Orgo: The Brand - Michael Garvey",
    description: "Defining a brand for a B2C mobile app.",
    url: "https://garvey.design/work/orgo-brand",
    images: [{ url: "/orgo-brand-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/orgo-brand-og.png"],
  },
};

export default function OrgoBrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
