import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webster Bank - Michael Garvey",
  description: "Revamping our design system for scalability and accessibility during its migration from Sketch to Figma.",
  openGraph: {
    title: "Webster Bank - Michael Garvey",
    description: "Revamping our design system for scalability and accessibility during its migration from Sketch to Figma.",
    url: "https://garvey.design/work/webster",
    images: [{ url: "/webster-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/webster-og.png"],
  },
};

export default function WebsterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
