'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem('show404Toast', 'true');

    // If we have somewhere in-app to go back to, stay put instead of bouncing to /work.
    if (window.history.length > 1 && window.history.state) {
      router.back();
    } else {
      router.push('/work');
    }
  }, [router]);

  return null;
}
