'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoiLine from '@/components/liveflow/RoiLine';
import StoryViewer from '@/components/liveflow/StoryViewer';
import { byTier, TIER_LABELS, type CaseStudy } from '@/content/liveflowCaseStudies';

const BRAND = '#2E54AB';

function Actions({ study, onStory, light = false }: { study: CaseStudy; onStory: () => void; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href={`/work/liveflow/${study.id}`}
        className="px-4 py-2 text-sm font-bold"
        style={light ? { backgroundColor: '#fff', color: BRAND } : { backgroundColor: BRAND, color: '#fff' }}
      >
        Read
      </Link>
      <button
        onClick={onStory}
        className={`px-4 py-2 text-sm font-bold border ${light ? 'border-white/40 text-white' : 'border-[#2E54AB]/30 text-[#2E54AB]'}`}
      >
        Story
      </button>
      {study.demoKey && (
        <Link
          href={`/work/liveflow/demo/${study.demoKey}`}
          className={`text-sm font-bold underline underline-offset-4 ${light ? 'text-white' : 'text-[#2E54AB]'}`}
        >
          Try the prototype
        </Link>
      )}
    </div>
  );
}

export default function LiveFlowHub() {
  const [story, setStory] = useState<CaseStudy | null>(null);
  const process = byTier(0)[0];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Navbar />

      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <header className="pt-40 pb-16 md:pt-48">
          <div className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">LiveFlow · Sole product designer</div>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] mb-6">Designing an ERP that closes its own books</h1>
          <p className="text-[1.15rem] leading-[1.7] text-[#666] max-w-[42rem]">
            Flow is an AI-native ERP for multi-entity businesses. I&apos;m the only designer on it, so here&apos;s how I work, then the projects
            that mattered most.
          </p>
        </header>

        {process && (
          <section
            className="p-8 md:p-12 mb-24 text-white"
            style={{ background: 'linear-gradient(135deg, #0C1163 0%, #2E54AB 100%)' }}
          >
            <div className="text-xs font-bold tracking-widest uppercase text-white/60 mb-3">Start here</div>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold mb-4">{process.title}</h2>
            <p className="text-white/80 leading-[1.7] max-w-[40rem] mb-8">{process.oneLiner}</p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {process.slides.slice(1).map((s) => (
                <li key={s.heading} className="bg-white/10 p-5">
                  <div className="font-bold mb-2">{s.heading}</div>
                  <div className="text-sm leading-[1.6] text-white/75">{s.body}</div>
                </li>
              ))}
            </ol>
            <div className="mb-8">
              <RoiLine text={process.roi} confirmed={process.roiConfirmed} light />
            </div>
            <Actions study={process} onStory={() => setStory(process)} light />
          </section>
        )}

        <section className="mb-24">
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-8">{TIER_LABELS[1]}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {byTier(1).map((s) => (
              <article key={s.id} className="flex flex-col border border-black/10 p-7 bg-[#FAFCFF]">
                <div className="aspect-[16/10] mb-6 border-2 border-dashed border-[#BED6FE] flex items-center justify-center text-xs font-semibold text-[#4778D1]">
                  Cover clip
                </div>
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-[#666] leading-[1.6] mb-5 flex-1">{s.oneLiner}</p>
                <div className="mb-6">
                  <RoiLine text={s.roi} confirmed={s.roiConfirmed} />
                </div>
                <Actions study={s} onStory={() => setStory(s)} />
              </article>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-8">{TIER_LABELS[2]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {byTier(2).map((s) => (
              <article key={s.id} className="flex flex-col border border-black/10 p-6">
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-[#666] text-[0.95rem] leading-[1.6] mb-4 flex-1">{s.oneLiner}</p>
                <div className="mb-5">
                  <RoiLine text={s.roi} confirmed={s.roiConfirmed} />
                </div>
                <Actions study={s} onStory={() => setStory(s)} />
              </article>
            ))}
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">{TIER_LABELS[3]}</h2>
          <ul className="border-t border-black/10">
            {byTier(3).map((s) => (
              <li key={s.id} className="border-b border-black/10">
                <Link href={`/work/liveflow/${s.id}`} className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-5">
                  <span className="font-bold md:w-72 group-hover:text-[#2E54AB] transition-colors">{s.title}</span>
                  <span className="text-[#666] text-[0.95rem] flex-1">{s.oneLiner}</span>
                  <span className="text-[#2E54AB] text-sm font-bold">Read →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Footer />
      </div>

      {story && <StoryViewer study={story} open={!!story} onClose={() => setStory(null)} />}
    </div>
  );
}
