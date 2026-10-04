/**
 * Single source of truth for LiveFlow case study content.
 *
 * All three exploration layouts (/work/liveflow-v1, -v2, -v3) render from this
 * file, so structure can be compared without rewriting content three times.
 * Whichever layout wins becomes /work/liveflow with no content migration.
 *
 * Prose marked [CONFIRM] is a first draft written from Michael's summary plus
 * domain knowledge - it needs his verification before this page is shown to
 * anyone. Outcomes especially: do not ship a claim he hasn't signed off on.
 */

import type { ReactNode } from 'react';

export type WorkKind = 'shipped' | 'prototype' | 'system' | 'research';

export type WorkTheme =
  | 'ai'
  | 'multi-entity'
  | 'data-integrity'
  | 'accounting-core'
  | 'design-ops';

export type LoopStage = 'signal' | 'prototype' | 'validate' | 'systematize';

export interface WorkMedia {
  type: 'image' | 'video' | 'demo';
  /** Path under /public for image|video, or a demo component key for 'demo'. */
  src: string;
  caption?: string;
}

export interface WorkItem {
  id: string;
  title: string;
  kind: WorkKind;
  themes: WorkTheme[];
  loopStage: LoopStage;
  /** One line for dense index rows. No period - matches site voice. */
  oneLiner: string;
  problem: ReactNode;
  action: ReactNode;
  outcome: ReactNode;
  /** 'deep' items get full narrative treatment and may carry a live demo. */
  depth: 'deep' | 'brief';
  media?: WorkMedia[];
  /**
   * Card thumbnail on the hub. Falls back to a labelled placeholder when
   * absent. Cropped with object-fit: cover to THUMB_HEIGHT.
   */
  thumbSrc?: string;
}

/**
 * Fixed thumbnail height on the hub cards, rather than an aspect ratio.
 *
 * Deep items span two grid columns, so an aspect ratio would make their
 * thumbnail roughly 2.7x the height of a single-column one and nothing below
 * would line up across a row. Locking height means the wide cards stay wide
 * and cinematic while every card's title, badge, and tags start at the same Y.
 *
 * Real screenshots should be at least 2x this tall and land wide - they get
 * cropped with object-fit: cover.
 */
export const THUMB_HEIGHT = '11.5rem';

export const KIND_LABELS: Record<WorkKind, string> = {
  shipped: 'Shipped',
  prototype: 'Prototype',
  system: 'System',
  research: 'Research',
};

export const THEME_LABELS: Record<WorkTheme, string> = {
  ai: 'AI',
  'multi-entity': 'Multi-entity',
  'data-integrity': 'Data integrity',
  'accounting-core': 'Accounting core',
  'design-ops': 'Design ops',
};

/** Shown when someone opens a badge - what the category actually means. */
export const KIND_DEFINITIONS: Record<WorkKind, string> = {
  shipped: 'Live in the product and in front of real customers.',
  prototype:
    'Built in working code to pressure-test scope before committing engineering. Some became roadmap, some got killed - killing one early is the point, not a failure.',
  system:
    'Leverage rather than features. Things that let the work happen without me in the loop, because no one person should be the bottleneck on a product this size.',
  research:
    'How signal gets in. Instruments and methods rather than screens - the input side of everything else on this list.',
};

export const THEME_DEFINITIONS: Record<WorkTheme, string> = {
  ai: 'Work where a model does something consequential. The hard design problem is never the model - it is scope preview, review, and undo.',
  'multi-entity':
    'Consolidating across separate legal entities. The reason this product exists, and where the hardest structural design work lives.',
  'data-integrity':
    'Keeping the ledger correct and auditable, which matters far more once an agent can modify it.',
  'accounting-core':
    'The fundamental accounting objects and workflows any ERP has to get right before anything clever is possible.',
  'design-ops':
    'The design system and the practices around it - consistency, enforcement, and enabling other people to build.',
};

export const LOOP_STAGES: { id: LoopStage; title: string; blurb: string }[] = [
  {
    id: 'signal',
    title: 'Research',
    blurb:
      'Every sales and customer call gets recorded. I query them with agents and pull research reports out of that corpus, pointed at whatever I am designing that week.',
  },
  {
    id: 'prototype',
    title: 'Prototype',
    blurb:
      'I build it in real code. Not a clickable mock - something an accountant can actually use badly and then tell me why.',
  },
  {
    id: 'validate',
    title: 'Test',
    blurb:
      'In front of real customers and our internal accounting SMEs, early. The point is finding out what breaks, not defending what I made.',
  },
  {
    id: 'systematize',
    title: 'Systematize',
    blurb:
      'Anything I do twice turns into a system, so it can happen again without me in the loop.',
  },
];

/**
 * Known-incomplete. More efforts exist that have not been captured yet -
 * appending one here is all that is required; every layout picks it up.
 */
export const WORK_ITEMS: WorkItem[] = [
  // ---------------------------------------------------------------- deep cuts
  {
    id: 'ai-transaction-categorization',
    title: 'AI transaction categorization',
    kind: 'shipped',
    themes: ['ai', 'accounting-core'],
    loopStage: 'prototype',
    depth: 'deep',
    oneLiner:
      'Natural-language categorization over the transaction ledger, driven from a command bar',
    problem: (
      <>
        Categorizing transactions is the single most repetitive thing an
        accountant does at close. The legacy pattern is row-by-row dropdown
        selection, thousands of times a month. Automating it is easy to
        describe and hard to design, because the failure mode is not &quot;the
        AI is slow&quot; - it is{' '}
        <strong>
          &quot;the AI silently miscategorized 400 transactions and nobody
          noticed until the books were wrong.&quot;
        </strong>
      </>
    ),
    action: (
      <>
        I designed the interaction around intent rather than rows: you
        describe what you want in a command bar and the system shows you the
        matching set before it touches anything. The design problem was
        almost entirely about the review step - how you preview scope, how
        you see what changed, how you{' '}
        <strong>undo at the batch level rather than per-row</strong>. I
        prototyped the command bar in real code so we could argue about the
        interaction with something running instead of a static frame.
      </>
    ),
    outcome:
      '[CONFIRM] Shipped as part of the categorization flow. Describe the reception here - what accountants said the first time they used it, and whether the batch-preview pattern carried into other features.',
    media: [
      { type: 'demo', src: 'command-bar' },
    ],
  },
  {
    id: 'rules-engine',
    title: 'Rules engine (AI and manual)',
    kind: 'shipped',
    themes: ['ai', 'accounting-core'],
    loopStage: 'prototype',
    depth: 'deep',
    oneLiner:
      'Automation that accountants can author themselves, in both an AI and a fully manual mode',
    problem:
      'Accountants do not trust automation they cannot inspect, and they should not. But requiring them to hand-author every rule means the automation never gets built. Both modes have to exist, and critically they have to produce the same underlying object - otherwise the AI mode is a toy that produces something the manual mode cannot edit.',
    action:
      'I designed a single rule object with two authoring surfaces on top of it. The AI path drafts a rule from a description; the manual path builds the same structure by hand; either one is editable in the other. The real design work was in making a drafted rule legible enough that someone would sign off on it - showing the conditions plainly, showing what it would have matched historically, and making the blast radius obvious before it runs.',
    outcome:
      '[CONFIRM] Outcome and adoption. Worth noting here whether accountants actually used the AI drafting path or defaulted to manual, since that is a genuinely interesting finding either way.',
  },
  {
    id: 'bank-reconciliation',
    title: 'Bank reconciliation',
    kind: 'shipped',
    themes: ['accounting-core', 'data-integrity'],
    loopStage: 'systematize',
    depth: 'deep',
    oneLiner:
      'Monthly bank-vs-books reconciliation, with variance called out account by account',
    problem: (
      <>
        Books and banks drift apart - a missed fee, a delayed deposit, a
        duplicate entry - and nobody notices until it&apos;s compounded
        across months. The failure mode isn&apos;t one wrong number in
        isolation; it&apos;s{' '}
        <strong>
          a small gap left unresolved that blocks every period after it
        </strong>
        , since each period&apos;s opening balance depends on the last one
        closing clean.
      </>
    ),
    action: (
      <>
        I designed the flow around forcing periods to close in order and
        making variance impossible to ignore: a calendar of periods with the
        current one front and center, a Bank/Flow/Deferred breakdown that
        flags exactly which line drifted, and a transaction list
        cross-referenced against the actual bank statement so{' '}
        <strong>you can see precisely which transactions are unresolved</strong>
        , not just that a total doesn&apos;t match.
      </>
    ),
    outcome: (
      <>
        [CONFIRM] Shipped as part of the reconciliation flow - real reception
        and results still need to go here.
      </>
    ),
    media: [{ type: 'demo', src: 'bank-reconciliation' }],
  },
  {
    id: 'intercompany-mapping',
    title: 'Intercompany mapping',
    kind: 'shipped',
    themes: ['multi-entity', 'accounting-core'],
    loopStage: 'validate',
    depth: 'deep',
    oneLiner:
      'Mapping accounts across entities so multi-entity organizations can consolidate',
    problem:
      'A multi-entity business has a separate chart of accounts per entity, and they never line up. Consolidation depends on knowing that entity A account 6100 and entity B account 6210 are the same thing. This is exactly the kind of deeply unglamorous structural work that legacy ERPs handle with a spreadsheet export and a prayer, and it is a gate on the entire product - nothing downstream consolidates correctly until it is right.',
    action:
      'I designed the mapping surface around the reality that this is a long, interrupted, error-prone task done once and then maintained forever. That meant designing for partial completion, for reviewing someone else\'s mapping decisions, and for making unmapped accounts loud rather than silently excluded. I worked this one closely with our internal accounting SMEs because the domain traps are not visible from the outside.',
    outcome:
      '[CONFIRM] Outcome. This is a good place for the implementation-gate framing - if mapping quality is what unblocks a customer going live, say so plainly.',
  },

  // ------------------------------------------------------------ shipped, brief
  {
    id: 'intercompany-transfers',
    title: 'Intercompany transfers',
    kind: 'shipped',
    themes: ['multi-entity', 'accounting-core'],
    loopStage: 'prototype',
    depth: 'brief',
    oneLiner: 'Moving money between entities so both sides net out correctly',
    problem:
      'A transfer between two entities has to book on both sides and eliminate on consolidation. Getting one side right and the other wrong is worse than not supporting it at all.',
    action:
      'Designed the transfer flow so the paired entries are visible as one object rather than two disconnected journal entries, and so the elimination is legible at the point of entry.',
    outcome: '[CONFIRM]',
  },
  {
    id: 'audit-logs-transactions',
    title: 'Audit logs for transactions',
    kind: 'shipped',
    themes: ['data-integrity', 'accounting-core'],
    loopStage: 'systematize',
    depth: 'brief',
    oneLiner: 'A defensible record of who changed what on every transaction',
    problem:
      'Once an agent can modify transactions, "what happened here" stops being a nice-to-have and becomes an audit requirement. Automation without a trail is not shippable to anyone who gets audited.',
    action:
      'Designed the log so agent actions and human actions read in the same timeline, with the same level of detail, rather than automation being a black box labeled "system".',
    outcome: '[CONFIRM]',
  },
  {
    id: 'audit-logs-journal-entries',
    title: 'Audit logs for journal entries',
    kind: 'shipped',
    themes: ['data-integrity', 'accounting-core'],
    loopStage: 'systematize',
    depth: 'brief',
    oneLiner: 'The same trail extended to journal entries',
    problem:
      'Journal entries are where corrections and adjustments live, which makes them the entries auditors care about most and the ones most likely to be touched repeatedly.',
    action:
      'Extended the transaction audit pattern to journal entries rather than inventing a second one - same mental model, same layout, no relearning.',
    outcome: '[CONFIRM]',
  },
  {
    id: 'invoice-bill-ocr',
    title: 'AI invoice and bill generation from documents',
    kind: 'shipped',
    themes: ['ai', 'accounting-core'],
    loopStage: 'prototype',
    depth: 'brief',
    oneLiner: 'Turning a PDF bill into a structured record without manual entry',
    problem:
      'Document extraction is never fully correct, so the design question is not "can we read the PDF" but "how does someone confirm or correct what we read, fast, without reading the whole document again."',
    action:
      'Designed the review step around confidence and correction - surfacing extracted fields next to the source document so verification is a glance rather than a re-entry.',
    outcome: '[CONFIRM]',
  },
  {
    id: 'invoice-discounts',
    title: 'Invoice discounts',
    kind: 'shipped',
    themes: ['accounting-core'],
    loopStage: 'prototype',
    depth: 'brief',
    oneLiner: 'Discount handling on invoices, line-level and total-level',
    problem:
      'Discounts sound trivial and are not - they interact with tax, with line items, and with how the invoice presents to the customer receiving it.',
    action:
      'Designed the discount model and its presentation on the rendered invoice so the arithmetic is obvious to whoever receives it.',
    outcome: '[CONFIRM]',
  },
  {
    id: 'vendor-merging',
    title: 'Vendor merging',
    kind: 'shipped',
    themes: ['data-integrity'],
    loopStage: 'signal',
    depth: 'brief',
    oneLiner: 'Collapsing duplicate vendor records without losing history',
    problem:
      'Real ledgers accumulate the same vendor five times under five spellings. Every report is subtly wrong until they are merged, and merging is destructive if done carelessly.',
    action:
      'Designed the merge flow around making the consequences visible before committing - what history moves, what name survives, what cannot be undone.',
    outcome: '[CONFIRM]',
  },
  {
    id: 'empty-states',
    title: 'Empty states',
    kind: 'shipped',
    themes: ['design-ops'],
    loopStage: 'systematize',
    depth: 'brief',
    oneLiner: 'The first screen of every surface, treated as a real design problem',
    problem:
      'A brand new multi-entity accounting product is almost entirely empty on day one. The empty state is not an edge case, it is the onboarding experience, and it was being treated as an afterthought.',
    action:
      'Went through the product systematically and designed empty states as instructional surfaces rather than apologies for missing data.',
    outcome: '[CONFIRM]',
  },

  // ---------------------------------------------------------------- prototypes
  {
    id: 'prototype-fixed-assets',
    title: 'Fixed assets',
    kind: 'prototype',
    themes: ['accounting-core'],
    loopStage: 'prototype',
    depth: 'brief',
    oneLiner: 'Depreciation schedules and asset lifecycle, prototyped to pressure-test scope',
    problem:
      'Fixed assets is a large module in every legacy ERP. Deciding whether and how to build it needed something more concrete than a scoping document.',
    action:
      'Built a working prototype so the team could evaluate the shape of the module against real accountant reactions rather than argue about it abstractly.',
    outcome: '[CONFIRM] Note whether this became roadmap, got deferred, or informed scope.',
  },
  {
    id: 'prototype-prepaid-expenses',
    title: 'Prepaid expenses',
    kind: 'prototype',
    themes: ['accounting-core'],
    loopStage: 'prototype',
    depth: 'brief',
    oneLiner: 'Amortization of prepaid expenses across periods, prototyped',
    problem:
      'Prepaids are a recurring manual close task - the kind of repetitive schedule work an agentic system should absorb entirely.',
    action: 'Prototyped the schedule and its interaction with the close.',
    outcome: '[CONFIRM]',
  },
  {
    id: 'prototype-leases',
    title: 'Leases',
    kind: 'prototype',
    themes: ['accounting-core'],
    loopStage: 'prototype',
    depth: 'brief',
    oneLiner: 'Lease accounting, prototyped against real requirements',
    problem:
      'Lease accounting carries heavy compliance requirements and is a common reason a growing company outgrows its current tooling.',
    action: 'Prototyped to understand the requirement surface before committing engineering.',
    outcome: '[CONFIRM]',
  },
  {
    id: 'prototype-inventory',
    title: 'Inventory',
    kind: 'prototype',
    themes: ['accounting-core'],
    loopStage: 'prototype',
    depth: 'brief',
    oneLiner: 'Inventory tracking and valuation, prototyped',
    problem:
      'Inventory determines whether an entire category of business can use the product at all.',
    action: 'Prototyped to test whether it was a viable near-term expansion.',
    outcome: '[CONFIRM]',
  },

  // ------------------------------------------------------------------- systems
  {
    id: 'design-system-claude-skill',
    title: 'A Claude skill for the design system',
    kind: 'system',
    themes: ['design-ops', 'ai'],
    loopStage: 'systematize',
    depth: 'deep',
    oneLiner:
      'Wrote a skill that enforces the design system, detects inconsistencies, and lets engineers ship small features without me',
    problem:
      'I am one designer against a full engineering org. The bottleneck was not my ability to design things - it was that every small feature had to route through me to stay consistent, and the ones that did not route through me drifted. Design systems solve this on paper. In practice a static Figma library does not stop anyone from writing a slightly-wrong component at 11pm.',
    action:
      'I wrote a Claude skill encoding the design system as enforceable rules - what the tokens are, which patterns are canonical, what the common drift looks like. It detects inconsistencies against the system and gives engineers enough guidance to build smaller features correctly without a designer in the loop. It moves the system from documentation someone might read to something present at the moment code is written.',
    outcome:
      '[CONFIRM] This is arguably the strongest single item on the page - it is the one that says "I do not just design, I build leverage." Worth real detail: what it catches, who uses it, what it freed you up to work on instead.',
  },
  {
    id: 'ai-prototyping-practice',
    title: 'Pioneering AI prototyping for design',
    kind: 'system',
    themes: ['design-ops', 'ai'],
    loopStage: 'systematize',
    depth: 'deep',
    oneLiner:
      'Established how design at LiveFlow builds working prototypes with AI, not just mockups',
    problem:
      'Engineering already used AI. Design did not. That gap meant design was still handing off static frames into a team that could build faster than design could specify - which makes design the bottleneck and, worse, makes design opinions cheap because they are untested.',
    action:
      'I changed what a design deliverable is here. Rather than mockups, I build working prototypes in real code and put them in front of people. Then I made that repeatable for design rather than a personal habit - showing how to do it, what it is good for, and where it is the wrong tool.',
    outcome:
      '[CONFIRM] Be precise about scope: this is design specifically, not the company. That is the honest version and it is also the more impressive one - it is rarer.',
  },
  {
    id: 'design-system-cleanup',
    title: 'Design system consistency work',
    kind: 'system',
    themes: ['design-ops'],
    loopStage: 'systematize',
    depth: 'brief',
    oneLiner: 'Ongoing cleanup of accumulated inconsistency across the product',
    problem:
      'A fast-moving Series A product accumulates drift faster than any one person can manually correct it.',
    action:
      'Systematic passes across the product to close the gaps, feeding the recurring ones back into the design system skill so they get caught automatically next time.',
    outcome: '[CONFIRM]',
  },

  // ------------------------------------------------------------------ research
  {
    id: 'gong-research-agents',
    title: 'Agent-generated research from sales calls',
    kind: 'research',
    themes: ['ai'],
    loopStage: 'signal',
    depth: 'deep',
    oneLiner:
      'Query every recorded customer call with agents and generate research reports on demand',
    problem:
      'Every call with a customer or prospect is recorded in Gong. That is an enormous, continuously growing corpus of exactly the primary research a product designer needs - and it was effectively write-only. Nobody has time to watch hundreds of hours of calls, so the insight sat there unused while design decisions got made on opinion.',
    action:
      'I query that corpus with agents and generate research reports against specific questions - what are accountants actually saying about a workflow, which objections recur, what language do they use for a concept. It turns a passive archive into a research instrument I can point at whatever I am designing this week.',
    outcome:
      '[CONFIRM] Strong item. Name a decision that changed because of something this surfaced - a specific one is worth more than the description of the method.',
  },
  {
    id: 'usability-testing',
    title: 'Usability testing with customers and internal SMEs',
    kind: 'research',
    themes: ['accounting-core'],
    loopStage: 'validate',
    depth: 'brief',
    oneLiner:
      'Sessions with real customers and with our own accountants, who catch different things',
    problem:
      'Accounting has domain traps that a general usability session will not surface - a flow can be perfectly usable and still produce the wrong books.',
    action:
      'Run sessions with both real customers and our internal accounting SMEs. Customers surface workflow and comprehension problems; the SMEs catch correctness problems that would otherwise ship.',
    outcome: '[CONFIRM]',
  },
];

/** Real, verified numbers only. Everything here must survive an interview. */
export const ANCHORS: { value: string; label: string }[] = [
  {
    value: '$60K',
    label: '[CONFIRM] Contract closed with prototype work contributing',
  },
  {
    value: '$1.4M',
    label: '[CONFIRM] Pipeline, partially prototype-driven',
  },
  {
    value: 'Sole designer',
    label: 'Only designer on the product team',
  },
];

export const byKind = (kind: WorkKind) => WORK_ITEMS.filter((i) => i.kind === kind);
export const byStage = (stage: LoopStage) => WORK_ITEMS.filter((i) => i.loopStage === stage);
export const deepItems = () => WORK_ITEMS.filter((i) => i.depth === 'deep');
