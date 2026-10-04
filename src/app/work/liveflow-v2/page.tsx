'use client';

import CaseStudyShell from '@/components/casestudy/CaseStudyShell';
import WorkIndex from '@/components/casestudy/WorkIndex';
import {
  Section,
  SectionHeading,
  Prose,
  MetaGrid,
} from '@/components/casestudy/Primitives';
import { LOOP_STAGES, WORK_ITEMS } from '@/content/liveflow';

const BRAND = '#2E54AB';
const GRADIENT_FROM = '#0C1163';
const GRADIENT_TO = '#2E54AB';

const SECTIONS = [
  { id: 'position', title: 'The Short Version' },
  { id: 'method', title: 'How I Work' },
  { id: 'index', title: 'The Work' },
];

export default function LiveFlowV2() {
  const shipped = WORK_ITEMS.filter((i) => i.kind === 'shipped').length;
  const prototypes = WORK_ITEMS.filter((i) => i.kind === 'prototype').length;

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
      {/* --------------------------------------------------------- positioning */}
      <Section id="position" animate>
        <SectionHeading>The Short Version</SectionHeading>

        <Prose>
          LiveFlow builds Flow, an AI-native agentic ERP for multi-entity businesses - it closes
          the books, reconciles accounts, and consolidates across entities in real time. I am the
          only designer on it.
        </Prose>
        <Prose spacing="3rem">
          That constraint is why this page is an index rather than a story. {shipped} shipped
          features, {prototypes} prototypes built to kill or confirm scope, plus the research
          instruments and design systems I built so this could happen at all. Filter it, expand
          whatever you care about, ignore the rest.
        </Prose>

        <MetaGrid
          items={[
            { label: 'ROLE', value: 'Product Designer - the only designer on the team' },
            { label: 'COMPANY', value: 'LiveFlow, Series A' },
            { label: 'PRODUCT', value: 'Flow - agentic ERP for multi-entity businesses' },
            { label: 'TIMELINE', value: '[CONFIRM] Add dates' },
          ]}
        />
      </Section>

      {/* ------------------------------------------------------------- method */}
      <Section id="method">
        <SectionHeading>How I Work</SectionHeading>
        <Prose spacing="3rem">
          Four moves, repeated. Every item in the index below sits somewhere in this loop.
        </Prose>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '1.5rem' }}
        >
          {LOOP_STAGES.map((stage, i) => (
            <div
              key={stage.id}
              className="bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm"
              style={{ padding: '1.75rem' }}
            >
              <div
                className="flex items-center"
                style={{ gap: '0.75rem', marginBottom: '0.75rem' }}
              >
                <span
                  className="flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ width: '28px', height: '28px', backgroundColor: BRAND }}
                >
                  {i + 1}
                </span>
                <h4 className="text-[1.2rem] font-bold text-[#333]">{stage.title}</h4>
              </div>
              <p className="text-[1rem] text-[#666] leading-[1.7]">{stage.blurb}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------------- index */}
      <Section id="index">
        <SectionHeading>The Work</SectionHeading>
        <Prose spacing="2rem">
          Everything I have shipped, prototyped, systematized, or researched here. Filter by type
          or theme; expand any row for the problem, what I did, and where it landed. Three of them
          carry a live demo you can actually use.
        </Prose>
        <WorkIndex brandColor={BRAND} />
      </Section>
    </CaseStudyShell>
  );
}
