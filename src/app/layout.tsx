import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-source-sans-3",
});

export const metadata: Metadata = {
  title: "Michael Garvey - Product Designer & UX Lead",
  description: "Portfolio of Michael Garvey, Head of Product and UX at Orgo, showcasing design systems, mobile apps, and digital experiences.",
  openGraph: {
    title: "Michael Garvey - Product Designer & UX Lead",
    description: "Portfolio of Michael Garvey, Head of Product and UX at Orgo, showcasing design systems, mobile apps, and digital experiences.",
    url: "https://garvey.design",
    siteName: "Michael Garvey",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Michael Garvey - Product Designer & UX Lead",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Garvey - Product Designer & UX Lead",
    description: "Portfolio of Michael Garvey, Head of Product and UX at Orgo, showcasing design systems, mobile apps, and digital experiences.",
    images: ["/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans3.variable} antialiased`}
        style={{ fontFamily: 'var(--font-source-sans-3)' }}
      >
        {children}
      </body>
    </html>
  );
}
