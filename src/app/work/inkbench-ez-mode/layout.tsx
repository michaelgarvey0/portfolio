import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inkbench EZ Mode - Michael Garvey",
  description: "Rethinking the dashboard for both administrators and users.",
  openGraph: {
    title: "Inkbench EZ Mode - Michael Garvey",
    description: "Rethinking the dashboard for both administrators and users.",
    url: "https://garvey.design/work/inkbench-ez-mode",
    images: [{ url: "/inkbench-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/inkbench-og.png"],
  },
};

export default function InkbenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
