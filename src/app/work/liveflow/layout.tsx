import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getLiveflowToken } from "@/lib/liveflowAuth";
import LiveFlowGate from "@/components/LiveFlowGate";

export const metadata: Metadata = {
  title: "LiveFlow - Michael Garvey",
  description: "I'm a product designer at LiveFlow, building Flow - an AI-native ERP that automates financial close for growing businesses. I design and build the AI features myself, prompts included, with real business context behind every decision.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "LiveFlow - Michael Garvey",
    description: "I'm a product designer at LiveFlow, building Flow - an AI-native ERP that automates financial close for growing businesses. I design and build the AI features myself, prompts included, with real business context behind every decision.",
    url: "https://garvey.design/work/liveflow",
    images: [{ url: "/liveflow-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/liveflow-og.png"],
  },
};

// Gate is fail-safe: any problem checking auth (missing env var, etc.) falls
// through to "not authenticated" and shows the password prompt - never an
// error page, never a redirect, never the real content.
export default async function LiveFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let authed = false;
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('liveflow_auth')?.value;
    const expected = await getLiveflowToken();
    authed = cookie === expected;
  } catch {
    authed = false;
  }

  if (!authed) {
    return <LiveFlowGate />;
  }

  return children;
}
