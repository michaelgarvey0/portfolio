import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LiveFlow (v3 exploration) | Michael Garvey',
  description: 'Layout exploration - three deep cuts plus a ledger.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
