import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Michael Garvey",
  description: "User-centered design, gymnastics, the cello, Christmas, and puppies. Learn more about Michael Garvey's background in UX design and cognitive science.",
  openGraph: {
    title: "About - Michael Garvey",
    description: "User-centered design, gymnastics, the cello, Christmas, and puppies. Learn more about Michael Garvey's background in UX design and cognitive science.",
    url: "https://garvey.design/about",
    images: [{ url: "/about-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/about-og.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
