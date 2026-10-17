// One source for the LiveFlow hub, the scroll view, and story mode.
// Anything marked [CONFIRM] is a placeholder - never ship an invented number.

export type Tier = 0 | 1 | 2 | 3;

export type SlideMedia =
  | { type: 'video'; src: string; storySrc?: string; poster?: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'demo'; demoKey: string }
  | { type: 'placeholder'; label: string };

export interface Slide {
  heading: string;
  body: string;
  media?: SlideMedia;
  caption?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  tier: Tier;
  oneLiner: string;
  roi: string;
  roiConfirmed: boolean;
  demoKey?: string;
  slides: Slide[];
}

export const TIER_LABELS: Record<Exclude<Tier, 0>, string> = {
  1: 'Core work',
  2: 'Also shipped',
  3: 'Smaller pieces',
};

const clip = (label: string): SlideMedia => ({ type: 'placeholder', label });

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'process',
    title: 'How I work',
    tier: 0,
    oneLiner: 'Research from every customer call, real-code prototypes, testing with accountants, then a system so it runs without me',
    roi: '[CONFIRM] e.g. prototype work contributed to a $60K contract and $1.4M in pipeline',
    roiConfirmed: false,
    slides: [
      {
        heading: 'One designer, a whole product',
        body: "I'm the only designer at LiveFlow, building Flow, an AI-native ERP that closes the books for multi-entity businesses. That shapes how I work: fast loops, real code, and systems that keep quality up when I'm not in the room.",
        media: clip('Overview clip: Flow at a glance'),
      },
      {
        heading: '1. Research from every call',
        body: 'Every sales and customer call is recorded. I query that corpus with agents and pull research reports aimed at whatever I am designing that week, so decisions start from what accountants actually say.',
        media: clip('Clip: querying calls with an agent'),
      },
      {
        heading: '2. Prototype in real code',
        body: 'Not a clickable mock. I build something an accountant can actually use badly and then tell me why.',
        media: clip('Clip: a prototype being built'),
      },
      {
        heading: '3. Test with customers and SMEs',
        body: 'Customers surface workflow and comprehension problems. Our internal accountants catch correctness problems that would otherwise ship.',
        media: clip('Clip: a testing session'),
      },
      {
        heading: '4. Turn it into a system',
        body: 'Anything I do twice becomes a system. I wrote a Claude skill that enforces the design system, so engineers can ship smaller features correctly without me in the loop.',
        media: clip('Clip: the design system skill catching drift'),
      },
    ],
  },

  {
    id: 'flow-studio',
    title: 'Flow Studio',
    tier: 1,
    oneLiner: '[CONFIRM] One line on what Flow Studio is',
    roi: '[CONFIRM] Outcome for Flow Studio',
    roiConfirmed: false,
    slides: [
      {
        heading: 'The problem',
        body: '[CONFIRM] What was broken before Flow Studio, and who felt it.',
        media: clip('Clip: the old way'),
      },
      {
        heading: 'What I designed',
        body: '[CONFIRM] The core idea and the key interaction.',
        media: clip('Clip: Flow Studio walkthrough'),
      },
      {
        heading: 'The result',
        body: '[CONFIRM] What changed, with a real number.',
        media: clip('Clip: the result'),
      },
    ],
  },
  {
    id: 'ai-rules',
    title: 'AI rules and categorization',
    tier: 1,
    oneLiner: 'Describe what to categorize, preview the exact scope, and apply it as one reversible batch',
    roi: '[CONFIRM] e.g. rules engine cut manual categorization by X%, saving Y hours a month',
    roiConfirmed: false,
    demoKey: 'command-bar',
    slides: [
      {
        heading: 'The problem',
        body: "Categorizing transactions is the most repetitive thing an accountant does at close. The danger isn't that AI is slow. It's that it silently miscategorizes 400 transactions and nobody notices until the books are wrong.",
        media: clip('Clip: row-by-row categorization today'),
      },
      {
        heading: 'Intent, not rows',
        body: 'You describe what you want in a command bar and see the matching set before anything changes. Undo works on the whole batch, not row by row.',
        media: { type: 'demo', demoKey: 'command-bar' },
        caption: 'Interactive prototype, running on fixture data',
      },
      {
        heading: 'One rule, two ways to write it',
        body: 'AI drafts a rule from a description; the manual editor builds the same object by hand. Either can edit the other, and every rule shows what it would have matched before it runs.',
        media: clip('Clip: drafting a rule with AI, then editing it by hand'),
      },
      {
        heading: 'The result',
        body: '[CONFIRM] Adoption and time saved. Worth saying whether accountants used AI drafting or stayed manual.',
      },
    ],
  },
  {
    id: 'audit-log',
    title: 'Audit log and context assignment',
    tier: 1,
    oneLiner: 'A record of who changed what, with agent and human actions in one timeline',
    roi: '[CONFIRM] Outcome for audit log and context assignment',
    roiConfirmed: false,
    slides: [
      {
        heading: 'The problem',
        body: 'Once an agent can change transactions, "what happened here" becomes an audit requirement. Automation without a trail is not shippable to anyone who gets audited.',
        media: clip('Clip: tracing a change today'),
      },
      {
        heading: 'One timeline',
        body: 'Agent actions and human actions read in the same timeline, with the same detail. Nothing is a black box labeled "system". The same pattern extends to journal entries.',
        media: clip('Clip: the audit timeline'),
      },
      {
        heading: 'Context assignment',
        body: '[CONFIRM] What context assignment is and how it connects to the log.',
        media: clip('Clip: assigning context'),
      },
      {
        heading: 'The result',
        body: '[CONFIRM] Real outcome.',
      },
    ],
  },

  {
    id: 'bank-reconciliation',
    title: 'Bank reconciliation',
    tier: 2,
    oneLiner: 'Monthly bank-vs-books reconciliation with variance called out account by account',
    roi: '[CONFIRM] Outcome for bank reconciliation',
    roiConfirmed: false,
    demoKey: 'bank-reconciliation',
    slides: [
      {
        heading: 'The problem',
        body: "Books and banks drift apart: a missed fee, a delayed deposit, a duplicate entry. A small gap left alone blocks every period after it, because each period's opening balance depends on the last one closing clean.",
      },
      {
        heading: 'What I designed',
        body: 'Periods close in order, and variance is impossible to ignore. A Bank / Flow / Deferred breakdown flags the line that drifted, and the transaction list is matched against the statement.',
        media: { type: 'demo', demoKey: 'bank-reconciliation' },
        caption: 'Interactive prototype, running on fixture data',
      },
      {
        heading: 'The result',
        body: '[CONFIRM] Real outcome.',
      },
    ],
  },
  {
    id: 'month-end-checklist',
    title: 'Month-end checklist',
    tier: 2,
    oneLiner: '[CONFIRM] One line on the month-end checklist',
    roi: '[CONFIRM] Outcome for the month-end checklist',
    roiConfirmed: false,
    slides: [
      { heading: 'The problem', body: '[CONFIRM]', media: clip('Clip: month-end today') },
      { heading: 'What I designed', body: '[CONFIRM]', media: clip('Clip: the checklist') },
      { heading: 'The result', body: '[CONFIRM]' },
    ],
  },
  {
    id: 'data-health',
    title: 'Data health',
    tier: 2,
    oneLiner: '[CONFIRM] One line on data health',
    roi: '[CONFIRM] Outcome for data health',
    roiConfirmed: false,
    slides: [
      { heading: 'The problem', body: '[CONFIRM]', media: clip('Clip: bad data today') },
      { heading: 'What I designed', body: '[CONFIRM]', media: clip('Clip: data health') },
      { heading: 'The result', body: '[CONFIRM]' },
    ],
  },

  {
    id: 'intercompany-mapping',
    title: 'Intercompany mapping',
    tier: 3,
    oneLiner: 'Mapping accounts across entities so multi-entity businesses can consolidate',
    roi: '[CONFIRM] e.g. whether mapping quality is what unblocks a customer going live',
    roiConfirmed: false,
    slides: [
      {
        heading: 'The problem',
        body: 'Each entity has its own chart of accounts and they never line up. Nothing consolidates correctly until entity A 6100 and entity B 6210 are known to be the same thing.',
      },
      {
        heading: 'What I designed',
        body: 'A surface built for a long, interrupted task: partial completion, reviewing someone else\'s mapping, and unmapped accounts that are loud instead of silently excluded.',
        media: clip('Clip: mapping accounts'),
      },
      { heading: 'The result', body: '[CONFIRM]' },
    ],
  },
  {
    id: 'invoice-generation',
    title: 'AI invoice and bill generation',
    tier: 3,
    oneLiner: 'Turning a PDF bill into a structured record without manual entry',
    roi: '[CONFIRM] Outcome for invoice and bill generation',
    roiConfirmed: false,
    slides: [
      {
        heading: 'The problem',
        body: 'Extraction is never fully correct, so the question is how someone confirms or fixes what was read, fast, without re-reading the whole document.',
      },
      {
        heading: 'What I designed',
        body: 'Extracted fields sit next to the source document with confidence shown, so checking is a glance rather than re-entry.',
        media: clip('Clip: a bill becoming a record'),
      },
      { heading: 'The result', body: '[CONFIRM]' },
    ],
  },
];

export const getCaseStudy = (id: string) => CASE_STUDIES.find((c) => c.id === id);
export const byTier = (tier: Tier) => CASE_STUDIES.filter((c) => c.tier === tier);
