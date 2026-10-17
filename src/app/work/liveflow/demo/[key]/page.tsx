'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Play } from 'lucide-react';
import { DEMOS } from '@/components/liveflow-demos';
import { inter } from '@/components/liveflow-demos/theme';
import { CASE_STUDIES } from '@/content/liveflowCaseStudies';

export default function LiveFlowDemoPage() {
  const { key } = useParams<{ key: string }>();
  const demo = DEMOS[key];
  const [started, setStarted] = useState(false);
  const study = CASE_STUDIES.find((c) => c.demoKey === key);

  if (!demo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link href="/work/liveflow" className="text-[#2E54AB] font-bold">That prototype doesn&apos;t exist. Back to LiveFlow</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a]">
      <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-black/10 bg-[#fafafa]">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={study ? `/work/liveflow/${study.id}` : '/work/liveflow'} className="text-sm font-bold text-[#2E54AB] flex-shrink-0">
            ← Back
          </Link>
          <span className="font-semibold truncate">{demo.title}</span>
        </div>
        <span className="text-xs text-[#999] hidden md:block">{demo.disclaimer}</span>
      </div>

      <div className="relative flex-1 min-h-0">
        <div
          className={`${inter.className} h-full overflow-auto ${demo.fullBleed ? '' : 'p-6 md:p-10'}`}
          inert={!started}
          style={{ filter: started ? 'none' : 'blur(1px)', transition: 'filter 200ms ease-out' }}
        >
          {demo.render()}
        </div>

        {!started && (
          <button
            onClick={() => setStarted(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/60 cursor-pointer"
          >
            <span className="w-16 h-16 rounded-full bg-[#2E54AB] text-white flex items-center justify-center shadow-lg">
              <Play size={24} fill="currentColor" />
            </span>
            <span className="font-bold text-lg">Click to start the prototype</span>
            <span className="text-sm text-[#666] max-w-[28rem] text-center px-6">{demo.summary}</span>
          </button>
        )}
      </div>
    </div>
  );
}
