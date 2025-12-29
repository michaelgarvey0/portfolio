'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem('show404Toast', 'true');
    router.push('/work');
  }, [router]);

  return null;
}
