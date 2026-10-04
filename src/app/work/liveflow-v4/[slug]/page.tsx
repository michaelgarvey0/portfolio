'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Demo } from '@/components/liveflow-demos';
import { Figure } from '@/components/casestudy/Primitives';
import CaseStudyNav from '@/components/casestudy/CaseStudyNav';
import WorkSwitcher from './WorkSwitcher';
import BadgePopover from './BadgePopover';
import {
  KIND_LABELS,
  WORK_ITEMS,
  LOOP_STAGES,
  type WorkKind,
} from '@/content/liveflow';

/**
 * v4 spoke - one work item, one URL.
 *
 * The point of this shape: "here is the intercompany mapping work" is a link
 * you can put in an email, not an instruction to scroll to the seventh
 * accordion on a long page.
 */

const KIND_TONE: Record<WorkKind, string> = {
  shipped: '#15803d',
  prototype: '#b45309',
  system: '#2E54AB',
  research: '#6d28d9',
};

export default function LiveFlowV4Detail() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0];

  const index = WORK_ITEMS.findIndex((i) => i.id === slug);
  const work = WORK_ITEMS[index];

  if (!work) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div
          className="mx-auto px-6 lg:px-12"
          style={{ maxWidth: 'var(--max-width)', paddingTop: '12rem', paddingBottom: '8rem' }}
        >
          <h1 className="text-[2rem] font-bold text-[#333]" style={{ marginBottom: '1rem' }}>
            Not found
          </h1>
          <Link href="/work/liveflow-v4" className="text-[#0066cc] underline">
            Back to all LiveFlow work
          </Link>
        </div>
      </div>
    );
  }

  const prev = WORK_ITEMS[index - 1];
  const next = WORK_ITEMS[index + 1];
  const stage = LOOP_STAGES.find((s) => s.id === work.loopStage);
  const related = WORK_ITEMS.filter(
    (i) => i.id !== work.id && i.themes.some((t) => work.themes.includes(t))
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div
        className="mx-auto px-6 lg:px-12"
        style={{ maxWidth: 'var(--max-width)', paddingTop: '10rem', paddingBottom: '5rem' }}
      >
        {/* Navigation sits outside the animated wrapper so it stays mounted and
            visually stable while only the content below transitions. */}
        <WorkSwitcher current={work} />

        <motion.div
          key={work.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
        <div
          className="flex flex-wrap items-center"
          style={{ gap: '0.5rem', marginBottom: '1.5rem' }}
        >
          <BadgePopover variant="kind" value={work.kind} current={work} />
          {work.themes.map((theme) => (
            <BadgePopover key={theme} variant="theme" value={theme} current={work} />
          ))}
        </div>

        <h1
          className="font-bold text-[#1a1a1a] tracking-tight leading-tight"
          style={{ fontSize: 'clamp(2rem,4.5vw,3.25rem)', marginBottom: '1.25rem' }}
        >
          {work.title}
        </h1>
        <p
          className="text-[#666] leading-[1.6]"
          style={{ fontSize: '1.35rem', marginBottom: '3rem' }}
        >
          {work.oneLiner}
        </p>

        {stage && (
          <div
            style={{
              borderLeft: '4px solid #2E54AB',
              paddingLeft: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            <div
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: '#2E54AB', marginBottom: '0.375rem' }}
            >
              {stage.title} stage
            </div>
            <p className="text-[0.95rem] text-[#666] leading-[1.7]">{stage.blurb}</p>
          </div>
        )}

        <Block label="The problem" body={work.problem} />
        <Block label="What I did" body={work.action} />

        {work.media?.map((media) =>
          media.type === 'demo' ? (
            <div key={media.src} style={{ marginBottom: '3rem' }}>
              {media.src === 'command-bar' && <Demo demoKey="command-bar" />}
              {media.caption && (
                <p
                  className="text-[0.85rem] text-[#999] italic"
                  style={{ marginTop: '0.75rem' }}
                >
                  {media.caption}
                </p>
              )}
            </div>
          ) : (
            <Figure key={media.src} type={media.type} src={media.src} caption={media.caption} />
          )
        )}

        <Block label="Outcome" body={work.outcome} />

        {/* Related by theme */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div
              className="text-xs font-bold tracking-widest uppercase text-[#999]"
              style={{ marginBottom: '1rem' }}
            >
              Related work
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: '0.75rem' }}
            >
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/work/liveflow-v4/${item.id}`}
                  className="group border border-[rgba(0,0,0,0.1)] transition-all duration-300 hover:border-[#2E54AB] hover:bg-[rgba(46,84,171,0.03)]"
                  style={{ padding: '1rem' }}
                >
                  <div
                    className="text-[0.6rem] font-bold tracking-widest uppercase"
                    style={{ color: KIND_TONE[item.kind], marginBottom: '0.375rem' }}
                  >
                    {KIND_LABELS[item.kind]}
                  </div>
                  <div className="font-semibold text-[#333] text-[0.95rem]">{item.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        </motion.div>
      </div>

      <CaseStudyNav
        prev={prev ? { href: `/work/liveflow-v4/${prev.id}`, title: prev.title } : undefined}
        next={next ? { href: `/work/liveflow-v4/${next.id}`, title: next.title } : undefined}
      />

      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <Footer />
      </div>
    </div>
  );
}

function Block({ label, body }: { label: string; body: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div
        className="text-xs font-bold tracking-widest uppercase text-[#999]"
        style={{ marginBottom: '0.75rem' }}
      >
        {label}
      </div>
      <p className="text-[1.15rem] text-[#666] leading-[1.8]" style={{ color: '#666' }}>
        {body}
      </p>
    </div>
  );
}
