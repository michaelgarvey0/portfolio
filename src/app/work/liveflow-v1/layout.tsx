import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LiveFlow (v1 exploration) | Michael Garvey',
  description: 'Layout exploration - the operating loop as the spine.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
