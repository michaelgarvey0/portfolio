import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orgo - Michael Garvey",
  description: "B2C mobile app for managing daily life. End-to-end product design from research to launch.",
};

export default function OrgoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
