'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoiLine from '@/components/liveflow/RoiLine';
import SlideMedia from '@/components/liveflow/SlideMedia';
import StoryViewer from '@/components/liveflow/StoryViewer';
import { CASE_STUDIES, getCaseStudy } from '@/content/liveflowCaseStudies';

export default function LiveFlowCaseStudy() {
  const { id } = useParams<{ id: string }>();
  const study = getCaseStudy(id);
  const [storyOpen, setStoryOpen] = useState(false);

  if (!study) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-48 text-center">
          <p className="text-[#666] mb-4">That project doesn&apos;t exist.</p>
          <Link href="/work/liveflow" className="text-[#2E54AB] font-bold">Back to LiveFlow</Link>
        </div>
      </div>
    );
  }

  const i = CASE_STUDIES.indexOf(study);
  const nextStudy = CASE_STUDIES[(i + 1) % CASE_STUDIES.length];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Navbar />

      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <header className="pt-40 pb-12 md:pt-48 max-w-[48rem]">
          <Link href="/work/liveflow" className="text-sm font-bold text-[#2E54AB] mb-6 inline-block">← LiveFlow</Link>
          <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.1] mb-5">{study.title}</h1>
          <p className="text-[1.15rem] leading-[1.7] text-[#666] mb-6">{study.oneLiner}</p>
          <div className="mb-8">
            <RoiLine text={study.roi} confirmed={study.roiConfirmed} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setStoryOpen(true)} className="px-4 py-2 text-sm font-bold bg-[#2E54AB] text-white">
              Watch as a story
            </button>
            {study.demoKey && (
              <Link
                href={`/work/liveflow/demo/${study.demoKey}`}
                className="px-4 py-2 text-sm font-bold border border-[#2E54AB]/30 text-[#2E54AB]"
              >
                Open the prototype
              </Link>
            )}
          </div>
        </header>

        <main className="pb-24">
          {study.slides.map((slide, n) => (
            <section key={slide.heading} className="py-14 border-t border-black/10">
              <div className="max-w-[44rem] mb-8">
                <div className="text-xs font-bold tracking-widest uppercase text-[#999] mb-3">
                  {String(n + 1).padStart(2, '0')}
                </div>
                <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-4">{slide.heading}</h2>
                <p className="text-[1.1rem] leading-[1.75] text-[#555]">{slide.body}</p>
              </div>
              {slide.media && (
                <figure>
                  <div className={slide.media.type === 'demo' ? '' : 'aspect-video'}>
                    <SlideMedia media={slide.media} />
                  </div>
                  {slide.caption && <figcaption className="mt-3 text-sm text-[#999]">{slide.caption}</figcaption>}
                </figure>
              )}
            </section>
          ))}
        </main>

        <Link
          href={`/work/liveflow/${nextStudy.id}`}
          className="flex flex-col items-end gap-2 p-6 mb-20 border border-[#2E54AB] transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(46,84,171,0.05)] md:w-1/2 md:ml-auto"
        >
          <span className="font-bold text-[#2E54AB]">Up next →</span>
          <span className="text-[1.5rem] font-bold text-[#666]">{nextStudy.title}</span>
        </Link>

        <Footer />
      </div>

      <StoryViewer study={study} open={storyOpen} onClose={() => setStoryOpen(false)} />
    </div>
  );
}
