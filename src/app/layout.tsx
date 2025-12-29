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
