'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Demo } from '@/components/liveflow-demos';
import { WORK_ITEMS } from '@/content/liveflow';
import SlideDeck, { type Slide } from './SlideDeck';
import {
  ApproachDiagram,
  BankReconApproachDiagram,
  BankReconContextDiagram,
  BankReconProblemDiagram,
  ContextDiagram,
  ProblemDiagram,
  SlideBody,
} from './SlideGraphics';
import { SLIDE_COPY } from './slideCopy';

/** Per-item diagrams for the curated v7 decks. Items without an entry just skip the graphic. */
const SLIDE_DIAGRAMS: Record<string, { context?: () => React.ReactNode; problem?: () => React.ReactNode; approach?: () => React.ReactNode }> = {
  'ai-transaction-categorization': {
    context: () => <ContextDiagram />,
    problem: () => <ProblemDiagram />,
    approach: () => <ApproachDiagram />,
  },
  'bank-reconciliation': {
    context: () => <BankReconContextDiagram />,
    problem: () => <BankReconProblemDiagram />,
    approach: () => <BankReconApproachDiagram />,
  },
};

/**
 * v7 spoke - full-screen takeover, not a page section. Premise: a labeled
 * step sequence (Context/Problem/Approach/Try it/Outcome) you click or
 * arrow-key through, each one its own full-viewport slide. No drag/swipe
 * yet - see SlideDeck for why (state-preserving crossfade, not unmount).
 */
export default function LiveFlowV7Detail() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0];

  const work = WORK_ITEMS.find((i) => i.id === slug);

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
          <Link href="/work/liveflow-v7" className="text-[#0066cc] underline">
            Back to all LiveFlow work
          </Link>
        </div>
      </div>
    );
  }

  const demoMedia = work.media?.find((m) => m.type === 'demo');
  const copy = SLIDE_COPY[work.id];
  const diagrams = SLIDE_DIAGRAMS[work.id];
  const context = copy?.context;
  const problem = copy?.problem ?? work.problem;
  const action = copy?.action ?? work.action;
  const outcome = copy?.outcome ?? work.outcome;

  const slides: Slide[] = [];
  if (context) {
    slides.push({
      id: 'context',
      label: 'Context',
      content: (
        <SlideBody eyebrow="Context" graphic={diagrams?.context?.()}>
          {context}
        </SlideBody>
      ),
    });
  }
  slides.push({
    id: 'problem',
    label: 'Problem',
    content: (
      <SlideBody eyebrow="The problem" graphic={diagrams?.problem?.()}>
        {problem}
      </SlideBody>
    ),
  });
  slides.push({
    id: 'approach',
    label: 'Approach',
    content: (
      <SlideBody eyebrow="The approach" graphic={diagrams?.approach?.()}>
        {action}
      </SlideBody>
    ),
  });
  if (demoMedia) {
    slides.push({
      id: 'try-it',
      label: 'Try it',
      content: (
        <div style={{ padding: '1.5rem 2rem' }}>
          <Demo demoKey={demoMedia.src} />
        </div>
      ),
    });
  }
  slides.push({
    id: 'outcome',
    label: 'Outcome',
    content: <SlideBody eyebrow="Outcome">{outcome}</SlideBody>,
  });

  return <SlideDeck work={work} slides={slides} />;
}
