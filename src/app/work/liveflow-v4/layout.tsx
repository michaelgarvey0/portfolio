import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LiveFlow (v4 exploration) | Michael Garvey',
  description: 'Layout exploration - hub and spoke, every piece of work its own page.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
