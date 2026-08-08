import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getLiveflowToken } from "@/lib/liveflowAuth";
import LiveFlowGate from "@/components/LiveFlowGate";

export const metadata: Metadata = {
  title: "LiveFlow - Michael Garvey",
  description: "Agentic accounting that closes the books on its own.",
  robots: {
    index: false,
    follow: false,
  },
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

// Second, independent check — the middleware already blocks this route, but
// this makes sure the actual page content is never rendered without the
// right cookie even if the middleware layer is ever bypassed or misconfigured.
export default async function LiveFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('liveflow_auth')?.value;
  const expected = await getLiveflowToken();

  if (cookie !== expected) {
    return <LiveFlowGate />;
  }

  return children;
}
