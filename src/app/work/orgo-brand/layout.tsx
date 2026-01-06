import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orgo: The Brand - Michael Garvey",
  description: "Defining a brand for a B2C mobile app.",
};

export default function OrgoBrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
