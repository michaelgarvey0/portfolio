import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LiveFlow - Michael Garvey",
  description: "Agentic accounting that closes the books on its own.",
  openGraph: {
    title: "LiveFlow - Michael Garvey",
    description: "Agentic accounting that closes the books on its own.",
    url: "https://garvey.design/work/liveflow",
    images: [{ url: "/liveflow-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/liveflow-og.png"],
  },
};

export default function LiveFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
