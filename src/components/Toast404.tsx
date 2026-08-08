'use client';

import { useEffect, useState } from 'react';

export default function Toast404() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shouldShow = sessionStorage.getItem('show404Toast');
    if (!shouldShow) return;

    setShow(true);
    sessionStorage.removeItem('show404Toast');
    setTimeout(() => setVisible(true), 50);
    setTimeout(() => setVisible(false), 1500);
    setTimeout(() => setShow(false), 2000);
  }, []);

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black transition-opacity duration-500 ease-out"
        style={{
          opacity: visible ? 0.4 : 0,
          zIndex: 9999
        }}
      />
      <div
        className="fixed bottom-8 bg-white text-[#333] px-6 py-3 shadow-lg transition-all duration-500 ease-out"
        style={{
          zIndex: 10000,
          borderLeft: '4px solid #0066cc',
          left: '50%',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)'
        }}
      >
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span className="text-sm font-medium">Page not found</span>
        </div>
      </div>
    </>
  );
}
