import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LiveFlow (v5 exploration) | Michael Garvey',
  description: 'Layout exploration - a workspace with switchable lenses over the same work.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
