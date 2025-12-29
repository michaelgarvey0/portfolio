'use client';

import { useState } from 'react';

export default function Footer() {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText('michaelgarvey0@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <footer className="border-t border-[rgba(0,0,0,0.08)] pt-12 pb-12">
      <div className="flex justify-between items-center text-sm text-[#666]">
        <div className="flex items-center gap-8">
          <button
            onClick={copyEmail}
            className="hover:text-[#0066cc] transition-colors duration-300 cursor-pointer flex items-center gap-2 group"
            title={emailCopied ? 'Copied!' : 'Click to copy email'}
          >
            <span>michaelgarvey0@gmail.com</span>
            <span className="relative w-[14px] h-[14px] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`absolute transition-opacity ${emailCopied ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'}`}
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`absolute transition-opacity ${emailCopied ? 'opacity-100' : 'opacity-0'} text-green-600`}
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </button>
          <a
            href="https://www.linkedin.com/in/michaelgarvey0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0066cc] transition-colors duration-300"
          >
            LinkedIn
          </a>
        </div>
        <div>
          © 2025 Michael Garvey
        </div>
      </div>
    </footer>
  );
}
