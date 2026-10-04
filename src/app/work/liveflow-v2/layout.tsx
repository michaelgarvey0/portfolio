import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LiveFlow (v2 exploration) | Michael Garvey',
  description: 'Layout exploration - the work as a filterable index.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
