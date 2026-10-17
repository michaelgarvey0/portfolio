'use client';

import Link from 'next/link';
import type { SlideMedia as Media } from '@/content/liveflowCaseStudies';
import { Demo, DEMOS } from '@/components/liveflow-demos';

export default function SlideMedia({ media, story = false }: { media: Media; story?: boolean }) {
  if (media.type === 'video') {
    return (
      <video
        src={story && media.storySrc ? media.storySrc : media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-contain bg-black"
      />
    );
  }

  if (media.type === 'image') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={media.src} alt={media.alt} className="w-full h-full object-contain" />;
  }

  if (media.type === 'demo') {
    if (story) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-center bg-[#F0F6FF]">
          <span className="text-xs font-bold tracking-widest uppercase text-[#2E54AB]">Interactive prototype</span>
          <span className="text-lg font-bold text-[#1a1a1a]">{DEMOS[media.demoKey]?.title}</span>
          <Link
            href={`/work/liveflow/demo/${media.demoKey}`}
            className="px-4 py-2 bg-[#2E54AB] text-white text-sm font-bold"
          >
            Try it
          </Link>
        </div>
      );
    }
    return <Demo demoKey={media.demoKey} />;
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center p-6 text-center border-2 border-dashed border-[#BED6FE] bg-[#FAFCFF]"
      style={{ minHeight: story ? undefined : '14rem' }}
    >
      <span className="text-sm font-semibold text-[#4778D1]">{media.label}</span>
    </div>
  );
}
