'use client';

import CaseStudyShell from '@/components/casestudy/CaseStudyShell';
import WorkIndex from '@/components/casestudy/WorkIndex';
import { Demo } from '@/components/liveflow-demos';
import {
  Section,
  SectionHeading,
  SubHeading,
  Eyebrow,
  Prose,
  Card,
  MetaGrid,
} from '@/components/casestudy/Primitives';
import { WORK_ITEMS, type WorkItem } from '@/content/liveflow';

const BRAND = '#2E54AB';
const GRADIENT_FROM = '#0C1163';
const GRADIENT_TO = '#2E54AB';

const item = (id: string) => WORK_ITEMS.find((i) => i.id === id) as WorkItem;

const CATEGORIZATION = item('ai-transaction-categorization');
const RULES = item('rules-engine');
const INTERCOMPANY = item('intercompany-mapping');
const CLAUDE_SKILL = item('design-system-claude-skill');
const AI_PRACTICE = item('ai-prototyping-practice');
const GONG = item('gong-research-agents');

/** Items already told in full above - excluded from the ledger below. */
const TOLD_IN_FULL = [
  CATEGORIZATION.id,
  RULES.id,
  INTERCOMPANY.id,
  CLAUDE_SKILL.id,
  AI_PRACTICE.id,
  GONG.id,
];

const SECTIONS = [
  { id: 'situation', title: 'The Situation' },
  { id: 'categorization', title: 'Categorization' },
  { id: 'rules', title: 'Rules Engine' },
  { id: 'intercompany', title: 'Intercompany' },
  { id: 'scaling', title: 'Scaling Myself' },
  { id: 'ledger', title: 'Everything Else' },
];

function DeepCut({ work, children }: { work: WorkItem; children?: React.ReactNode }) {
  return (
    <>
      <Eyebrow>The problem</Eyebrow>
      <Prose>{work.problem}</Prose>
      <Eyebrow>What I did</Eyebrow>
      <Prose>{work.action}</Prose>
      {children}
      <Eyebrow>Outcome</Eyebrow>
      <Prose spacing="0">{work.outcome}</Prose>
    </>
  );
}

export default function LiveFlowV3() {
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

        <MetaGrid
          items={[
            { label: 'ROLE', value: 'Product Designer - the only designer on the team' },
            { label: 'COMPANY', value: 'LiveFlow, Series A' },
            { label: 'PRODUCT', value: 'Flow - an AI-native, agentic ERP for multi-entity businesses' },
            { label: 'TIMELINE', value: '[CONFIRM] Add dates' },
          ]}
        />

        <Prose>
          LiveFlow builds Flow, an AI-native agentic ERP for multi-entity businesses. It closes
          the books, reconciles accounts, and consolidates across entities in real time instead of
          the usual manual month-end grind.
        </Prose>
        <Prose>
          I am the only designer on it. That is the constraint that shapes everything below - not
          as a complaint, but because it dictated how I chose to work. The surface area of an ERP
          is enormous and a single designer cannot be the bottleneck on all of it. So I stopped
          producing mockups as the primary deliverable and started producing working prototypes,
          research instruments, and systems that let other people move without me.
        </Prose>
        <Prose spacing="3rem">
          The other thing worth stating plainly: this is not a funnel problem company. There is
          real pipeline. What gates growth is implementation - whether a multi-entity business can
          actually get their books into the product and trust what comes out. Nearly everything I
          worked on points at that.
        </Prose>

        <Card>
          <SubHeading>What I want you to take from this</SubHeading>
          <Prose spacing="1rem">
            I work like a design engineer: I pull signal from data rather than waiting for a
            brief, I build the thing in real code to find out if it works, and I turn anything
            repeated into a system. The volume below is the evidence, not the point.
          </Prose>
        </Card>
      </Section>

      {/* ---------------------------------------------------- deep cut one */}
      <Section id="categorization">
        <SectionHeading>AI Transaction Categorization</SectionHeading>
        <DeepCut work={CATEGORIZATION}>
          <div style={{ marginBottom: '2rem' }}>
            <Demo demoKey="command-bar" />
            <p className="text-[0.85rem] text-[#999] italic" style={{ marginTop: '0.75rem' }}>
              Simplified rebuild running locally against a fixture ledger - deterministic
              matching, not the production feature. Try one of the suggested commands, or type
              your own.
            </p>
          </div>
        </DeepCut>
      </Section>

      {/* ---------------------------------------------------- deep cut two */}
      <Section id="rules">
        <SectionHeading>Rules Engine</SectionHeading>
        <DeepCut work={RULES} />
      </Section>

      {/* -------------------------------------------------- deep cut three */}
      <Section id="intercompany">
        <SectionHeading>Intercompany</SectionHeading>
        <DeepCut work={INTERCOMPANY} />
      </Section>

      {/* ------------------------------------------------------ scaling myself */}
      <Section id="scaling">
        <SectionHeading>Scaling Myself</SectionHeading>
        <Prose spacing="3rem">
          One designer, a full engineering org, and an ERP&apos;s worth of surface area. The only
          way that math works is leverage. Three things did most of the work.
        </Prose>

        <SubHeading>{AI_PRACTICE.title}</SubHeading>
        <Prose>{AI_PRACTICE.problem}</Prose>
        <Prose spacing="3rem">{AI_PRACTICE.action}</Prose>

        <SubHeading>{CLAUDE_SKILL.title}</SubHeading>
        <Prose>{CLAUDE_SKILL.problem}</Prose>
        <Prose spacing="3rem">{CLAUDE_SKILL.action}</Prose>

        <SubHeading>{GONG.title}</SubHeading>
        <Prose>{GONG.problem}</Prose>
        <Prose spacing="0">{GONG.action}</Prose>
      </Section>

      {/* ------------------------------------------------------------- ledger */}
      <Section id="ledger">
        <SectionHeading>Everything Else</SectionHeading>
        <Prose spacing="3rem">
          The rest of the work, in brief. Expand any row for the problem, what I did, and where it
          landed.
        </Prose>
        <WorkIndex
          brandColor={BRAND}
          filterable={false}
          items={WORK_ITEMS.filter((i) => !TOLD_IN_FULL.includes(i.id))}
        />
      </Section>
    </CaseStudyShell>
  );
}
