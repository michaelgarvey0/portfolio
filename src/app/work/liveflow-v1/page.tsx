'use client';

import { useEffect, useState } from 'react';
import CaseStudyShell from '@/components/casestudy/CaseStudyShell';
import LoopDiagram from '@/components/casestudy/LoopDiagram';
import WorkIndex from '@/components/casestudy/WorkIndex';
import { Demo } from '@/components/liveflow-demos';
import {
  Section,
  SectionHeading,
  Eyebrow,
  Prose,
  MetaGrid,
} from '@/components/casestudy/Primitives';
import { LOOP_STAGES, WORK_ITEMS, type LoopStage, type WorkItem } from '@/content/liveflow';

const BRAND = '#2E54AB';
const GRADIENT_FROM = '#0C1163';
const GRADIENT_TO = '#2E54AB';

const SECTIONS = [
  { id: 'situation', title: 'The Situation' },
  ...LOOP_STAGES.map((s) => ({ id: s.id, title: s.title })),
  { id: 'ledger', title: 'Full Ledger' },
];

/** Items shown in full inside a stage - excluded from that stage's brief list. */
const FEATURED_BY_STAGE: Record<LoopStage, string[]> = {
  signal: ['gong-research-agents'],
  prototype: ['ai-transaction-categorization'],
  validate: ['intercompany-mapping'],
  systematize: ['design-system-claude-skill'],
};

function EvidenceList({ items }: { items: WorkItem[] }) {
  if (items.length === 0) return null;
  return (
    <div style={{ marginTop: '2rem' }}>
      <Eyebrow>Also at this stage</Eyebrow>
      <ul style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        {items.map((work) => (
          <li
            key={work.id}
            className="flex items-baseline"
            style={{
              gap: '1rem',
              padding: '0.75rem 0',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <span className="font-semibold text-[#333] text-[0.95rem] flex-shrink-0">
              {work.title}
            </span>
            <span className="text-[0.9rem] text-[#999] leading-relaxed">{work.oneLiner}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LiveFlowV1() {
  const [activeStage, setActiveStage] = useState<LoopStage | null>('signal');

  // Track which loop stage is in view so the diagram stays in sync with scroll.
  useEffect(() => {
    const handleScroll = () => {
      for (let i = LOOP_STAGES.length - 1; i >= 0; i--) {
        const el = document.getElementById(LOOP_STAGES[i].id);
        if (el && el.getBoundingClientRect().top <= 400) {
          setActiveStage(LOOP_STAGES[i].id);
          return;
        }
      }
      setActiveStage(null);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
      behavior: 'smooth',
    });
  };

  return (
    <CaseStudyShell
      sections={SECTIONS}
      brandColor={BRAND}
      sidebarTitle="LiveFlow"
      gradientFrom={GRADIENT_FROM}
      gradientTo={GRADIENT_TO}
      heroTitle="LiveFlow"
      heroDescription="Agentic accounting that closes the books on its own."
      heroImageSrc="/assets/case-studies/liveflow/placeholder.svg"
      heroImageAlt="LiveFlow"
      ctaText="Visit LiveFlow"
      ctaHref="https://liveflow.com"
      ctaColor="#374151"
      nextHref="/work/orgo"
      nextTitle="Orgo: The App"
    >
      {/* ------------------------------------------------------ the situation */}
      <Section id="situation" animate>
        <SectionHeading>The Situation</SectionHeading>

        <Prose>
          LiveFlow builds Flow, an AI-native agentic ERP for multi-entity businesses - it closes
          the books, reconciles accounts, and consolidates across entities in real time instead of
          the usual manual month-end grind. I am the only designer on it.
        </Prose>
        <Prose spacing="3rem">
          An ERP has more surface area than one designer can cover by making screens. So I stopped
          treating mockups as the deliverable. What follows is the loop I actually run - and the
          work is the evidence for it, not the other way around.
        </Prose>

        <LoopDiagram activeStage={activeStage} onSelect={scrollTo} brandColor={BRAND} />

        <MetaGrid
          items={[
            { label: 'ROLE', value: 'Product Designer - the only designer on the team' },
            { label: 'COMPANY', value: 'LiveFlow, Series A' },
            { label: 'PRODUCT', value: 'Flow - agentic ERP for multi-entity businesses' },
            { label: 'TIMELINE', value: '[CONFIRM] Add dates' },
          ]}
        />
      </Section>

      {/* -------------------------------------------------------- loop stages */}
      {LOOP_STAGES.map((stage) => {
        const featuredIds = FEATURED_BY_STAGE[stage.id];
        const featured = WORK_ITEMS.filter((i) => featuredIds.includes(i.id));
        const rest = WORK_ITEMS.filter(
          (i) => i.loopStage === stage.id && !featuredIds.includes(i.id)
        );

        return (
          <Section key={stage.id} id={stage.id}>
            <SectionHeading>{stage.title}</SectionHeading>
            <Prose spacing="3rem">{stage.blurb}</Prose>

            {featured.map((work) => (
              <div key={work.id} style={{ marginBottom: '2rem' }}>
                <h3
                  className="text-[1.8rem] font-bold text-[#333]"
                  style={{ marginBottom: '1.5rem' }}
                >
                  {work.title}
                </h3>
                <Eyebrow>The problem</Eyebrow>
                <Prose>{work.problem}</Prose>
                <Eyebrow>What I did</Eyebrow>
                <Prose>{work.action}</Prose>

                {work.media?.some((m) => m.src === 'command-bar') && (
                  <div style={{ marginBottom: '2rem' }}>
                    <Demo demoKey="command-bar" />
                  </div>
                )}

                <Eyebrow>Outcome</Eyebrow>
                <Prose spacing="0">{work.outcome}</Prose>
              </div>
            ))}

            <EvidenceList items={rest} />
          </Section>
        );
      })}

      {/* ------------------------------------------------------------- ledger */}
      <Section id="ledger">
        <SectionHeading>Full Ledger</SectionHeading>
        <Prose spacing="3rem">
          Everything, filterable, in one place. Expand any row for the problem, what I did, and
          where it landed.
        </Prose>
        <WorkIndex brandColor={BRAND} />
      </Section>
    </CaseStudyShell>
  );
}
