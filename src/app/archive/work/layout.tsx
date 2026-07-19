import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work - Michael Garvey",
  description: "Portfolio of Michael Garvey, Head of Product and UX at Orgo, showcasing design systems, mobile apps, and digital experiences.",
  openGraph: {
    title: "Work - Michael Garvey",
    description: "Portfolio of Michael Garvey, Head of Product and UX at Orgo, showcasing design systems, mobile apps, and digital experiences.",
    url: "https://garvey.design/archive/work",
    images: [{ url: "/work-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/work-og.png"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
