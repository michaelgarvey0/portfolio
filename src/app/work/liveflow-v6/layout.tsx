import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LiveFlow (v6 exploration) | Michael Garvey',
  description: 'Layout exploration - ask questions, the page answers from the work.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
