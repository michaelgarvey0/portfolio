'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Demo } from '@/components/liveflow-demos';
import {
  KIND_LABELS,
  LOOP_STAGES,
  THEME_LABELS,
  WORK_ITEMS,
  type WorkItem,
  type WorkKind,
} from '@/content/liveflow';

/**
 * v6 - Ask the work.
 *
 * The premise: my actual research practice at LiveFlow is querying a corpus
 * (every recorded customer call) with agents instead of reading it linearly.
 * So this case study is the same shape - you ask it questions and it assembles
 * an answer from structured data about the work.
 *
 * This is deterministic retrieval, not a model call, and the page says so
 * plainly. Claiming an LLM where there is a keyword matcher is exactly the
 * kind of thing that falls apart in a follow-up question.
 */

const KIND_TONE: Record<WorkKind, string> = {
  shipped: '#4ade80',
  prototype: '#fbbf24',
  system: '#818cf8',
  research: '#c084fc',
};

interface Answer {
  question: string;
  /** Written synthesis - the actual argument, not generated text. */
  response: string;
  items: WorkItem[];
}

interface Intent {
  id: string;
  question: string;
  keywords: string[];
  respond: () => Answer;
}

const has = (item: WorkItem, ...ids: string[]) => ids.includes(item.id);

const INTENTS: Intent[] = [
  {
    id: 'shipped',
    question: 'What have you actually shipped?',
    keywords: ['ship', 'shipped', 'launch', 'production', 'built', 'real'],
    respond: () => ({
      question: 'What have you actually shipped?',
      response:
        'Ten features live in the product, spanning the accounting core, data integrity, and multi-entity consolidation. The through-line: most of them exist because automation created a new design problem. Once an agent can modify a transaction, "what happened here" stops being a nice-to-have and becomes an audit requirement - that is why audit logs and batch-level preview and undo show up repeatedly.',
      items: WORK_ITEMS.filter((i) => i.kind === 'shipped'),
    }),
  },
  {
    id: 'ai',
    question: 'How do you actually use AI in your work?',
    keywords: ['ai', 'agent', 'llm', 'claude', 'automat', 'model', 'prompt'],
    respond: () => ({
      question: 'How do you actually use AI in your work?',
      response:
        'Three distinct ways, and they are worth separating. First, as a research instrument: I query every recorded customer call with agents and generate reports against specific questions, instead of waiting for someone to hand me a brief. Second, as a build tool: I prototype in real code, so a design opinion arrives as something you can use rather than something you have to imagine. Third, as leverage: I wrote a Claude skill encoding the design system so engineers can ship small features correctly without a designer in the loop. I also design AI features - categorization, the rules engine, document extraction - where the hard part is never the model, it is the review and undo path around it.',
      items: WORK_ITEMS.filter((i) => i.themes.includes('ai')),
    }),
  },
  {
    id: 'process',
    question: 'How do you work?',
    keywords: ['process', 'how do you work', 'method', 'approach', 'workflow', 'loop'],
    respond: () => ({
      question: 'How do you work?',
      response:
        LOOP_STAGES.map((s, i) => `${i + 1}. ${s.title} - ${s.blurb}`).join('\n\n') +
        '\n\nIt runs continuously. Systematize feeds the next round of signal.',
      items: WORK_ITEMS.filter((i) => i.depth === 'deep'),
    }),
  },
  {
    id: 'research',
    question: 'How do you do research?',
    keywords: ['research', 'user', 'customer', 'interview', 'usability', 'test', 'gong', 'data'],
    respond: () => ({
      question: 'How do you do research?',
      response:
        'Two channels, deliberately different. Every sales and customer call is recorded, which is an enormous and continuously growing corpus of primary research that was effectively write-only - nobody has time to watch hundreds of hours. I query it with agents against specific questions, which turns a passive archive into an instrument I can point at whatever I am designing this week. Then usability sessions with both real customers and our own internal accounting SMEs, because they catch different failures: customers surface workflow and comprehension problems, the SMEs catch correctness problems that would otherwise ship. In accounting a flow can be perfectly usable and still produce the wrong books.',
      items: WORK_ITEMS.filter((i) => i.kind === 'research'),
    }),
  },
  {
    id: 'prototype',
    question: 'What did you prototype and never ship?',
    keywords: ['prototype', 'kill', 'killed', 'scrap', 'explore', 'never ship', 'discard'],
    respond: () => ({
      question: 'What did you prototype and never ship?',
      response:
        'Four modules that every legacy ERP has, prototyped to pressure-test whether and how we should build them: fixed assets, prepaid expenses, leases, inventory. The point of building these in real code was to replace an argument about a scoping document with a reaction from an actual accountant. A prototype that kills a roadmap item early is worth as much as one that confirms it - it is cheaper to find out here than two engineering quarters in.',
      items: WORK_ITEMS.filter((i) => i.kind === 'prototype'),
    }),
  },
  {
    id: 'technical',
    question: 'How technical are you really?',
    keywords: ['technical', 'code', 'engineer', 'develop', 'build', 'programming'],
    respond: () => ({
      question: 'How technical are you really?',
      response:
        'Technical enough that "prototype" means working code, not a linked frame. Technical enough to write a Claude skill that encodes the design system as enforceable rules and detects drift in a codebase. Technical enough to build research tooling over a call corpus rather than requesting it. The demo on this page is a working rebuild of a feature I designed - you can type into it. This portfolio is Next.js and TypeScript I wrote myself.',
      items: WORK_ITEMS.filter((i) =>
        has(i, 'design-system-claude-skill', 'gong-research-agents', 'ai-transaction-categorization', 'rules-engine', 'ai-prototyping-practice')
      ),
    }),
  },
  {
    id: 'multi-entity',
    question: 'Show me the multi-entity work',
    keywords: ['multi-entity', 'entity', 'consolidat', 'intercompany', 'group'],
    respond: () => ({
      question: 'Show me the multi-entity work',
      response:
        'Multi-entity is the whole reason this product exists and it is where the hardest structural design work lives. Every entity has its own chart of accounts and they never line up, so consolidation depends on mapping that a human has to author and maintain forever. I designed for the reality of that task - long, interrupted, error-prone, done once and maintained indefinitely - which meant designing for partial completion, for reviewing someone else\'s decisions, and for making unmapped accounts loud rather than silently excluded.',
      items: WORK_ITEMS.filter((i) => i.themes.includes('multi-entity')),
    }),
  },
  {
    id: 'scale',
    question: 'You are the only designer. How does that work?',
    keywords: ['only designer', 'alone', 'solo', 'team', 'outnumbered', 'scale', 'leverage'],
    respond: () => ({
      question: 'You are the only designer. How does that work?',
      response:
        'It works by refusing to be the bottleneck. An ERP has more surface area than one person can cover by making screens, so anything I did twice became a system. The design system became a Claude skill that enforces itself and lets engineers build smaller features correctly without me. Research became an agent-driven query over a corpus instead of scheduled studies. Design deliverables became working prototypes, which removed the specification round-trip entirely. I did not scale by working more hours, I scaled by moving work out of my own hands.',
      items: WORK_ITEMS.filter((i) => i.kind === 'system'),
    }),
  },
];

function search(query: string): Answer {
  const q = query.toLowerCase().trim();

  const intent = INTENTS.find((i) => i.keywords.some((k) => q.includes(k)));
  if (intent) return intent.respond();

  // Fall back to keyword retrieval across the corpus.
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  const matches = WORK_ITEMS.filter((item) => {
    const haystack = [
      item.title,
      item.oneLiner,
      item.problem,
      item.action,
      ...item.themes.map((t) => THEME_LABELS[t]),
      KIND_LABELS[item.kind],
    ]
      .join(' ')
      .toLowerCase();
    return tokens.some((t) => haystack.includes(t));
  });

  return {
    question: query,
    response:
      matches.length > 0
        ? `${matches.length} ${matches.length === 1 ? 'piece' : 'pieces'} of work match that. Expand any of them below.`
        : 'Nothing in the corpus matches that. Try one of the suggested questions, or ask about AI, research, prototypes, multi-entity work, or what I shipped.',
    items: matches,
  };
}

export default function LiveFlowV6() {
  const [input, setInput] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const started = answers.length > 0;

  const ask = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setAnswers((prev) => [...prev, search(trimmed)]);
    setInput('');
    setExpanded(null);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0c1a', color: '#e5e7eb' }}>
      {/* Minimal chrome */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between flex-wrap"
        style={{
          padding: '1rem 1.5rem',
          gap: '1rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(10,12,26,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <Link
          href="/work"
          className="inline-flex items-center text-sm font-semibold transition-colors"
          style={{ gap: '0.5rem', color: 'rgba(255,255,255,0.6)' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Work
        </Link>
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {WORK_ITEMS.length} pieces of work indexed
        </span>
      </header>

      <div
        className="mx-auto px-6"
        style={{
          maxWidth: '48rem',
          paddingTop: started ? '3rem' : 'min(18vh, 9rem)',
          paddingBottom: '10rem',
          transition: 'padding-top 400ms ease-out',
        }}
      >
        {/* Intro - collapses once you start asking */}
        <AnimatePresence initial={false}>
          {!started && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <h1
                className="font-bold tracking-tight"
                style={{
                  fontSize: 'clamp(2rem,5vw,3.25rem)',
                  color: '#ffffff',
                  marginBottom: '1rem',
                  lineHeight: 1.15,
                }}
              >
                Ask about my work at LiveFlow
              </h1>
              <p
                className="leading-relaxed"
                style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '2.5rem',
                }}
              >
                I am the only designer on an AI-native agentic ERP. My actual research practice
                here is querying a corpus of recorded customer calls with agents rather than
                reading it front to back - so this case study works the same way. Ask it
                something.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversation */}
        {answers.map((answer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '3.5rem' }}
          >
            <div
              className="font-semibold"
              style={{
                fontSize: '1.15rem',
                color: '#ffffff',
                marginBottom: '1.25rem',
                paddingLeft: '1rem',
                borderLeft: '3px solid #4f7cff',
              }}
            >
              {answer.question}
            </div>

            <p
              className="leading-[1.8] whitespace-pre-line"
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.78)',
                marginBottom: answer.items.length ? '1.75rem' : '0',
              }}
            >
              {answer.response}
            </p>

            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {answer.items.map((item) => {
                const key = `${i}-${item.id}`;
                const isOpen = expanded === key;
                return (
                  <div
                    key={key}
                    style={{
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <button
                      onClick={() => setExpanded(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className="w-full text-left cursor-pointer transition-colors"
                      style={{ padding: '0.875rem 1rem' }}
                    >
                      <div className="flex items-center" style={{ gap: '0.625rem' }}>
                        <span
                          className="flex-shrink-0"
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: KIND_TONE[item.kind],
                          }}
                        />
                        <span
                          className="font-semibold flex-1"
                          style={{ fontSize: '0.95rem', color: '#ffffff' }}
                        >
                          {item.title}
                        </span>
                        <span
                          className="text-[0.65rem] font-bold tracking-widest uppercase flex-shrink-0"
                          style={{ color: KIND_TONE[item.kind] }}
                        >
                          {KIND_LABELS[item.kind]}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '0.85rem',
                          color: 'rgba(255,255,255,0.45)',
                          paddingLeft: '1.25rem',
                          marginTop: '0.25rem',
                        }}
                      >
                        {item.oneLiner}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            style={{
                              padding: '0 1rem 1.5rem 2.25rem',
                            }}
                          >
                            <DarkField label="The problem" body={item.problem} />
                            <DarkField label="What I did" body={item.action} />
                            {item.media?.some((m) => m.src === 'command-bar') && (
                              <div style={{ marginBottom: '1.5rem' }}>
                                <Demo demoKey="command-bar" />
                                <p
                                  className="italic"
                                  style={{
                                    fontSize: '0.8rem',
                                    color: 'rgba(255,255,255,0.4)',
                                    marginTop: '0.625rem',
                                  }}
                                >
                                  Simplified rebuild, running locally. Not the production
                                  feature.
                                </p>
                              </div>
                            )}
                            <DarkField label="Outcome" body={item.outcome} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Suggested questions */}
        <div
          className="flex flex-wrap"
          style={{ gap: '0.5rem', marginBottom: '1.5rem' }}
        >
          {INTENTS.filter((intent) => !answers.some((a) => a.question === intent.question)).map(
            (intent) => (
              <button
                key={intent.id}
                onClick={() => ask(intent.question)}
                className="transition-colors cursor-pointer"
                style={{
                  fontSize: '0.85rem',
                  padding: '0.5rem 0.875rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.7)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
              >
                {intent.question}
              </button>
            )
          )}
        </div>
      </div>

      {/* Fixed ask bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          padding: '1rem 1.5rem 1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(10,12,26,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <form
          className="mx-auto"
          style={{ maxWidth: '48rem' }}
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <div
            className="flex items-center"
            style={{
              gap: '0.5rem',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '0.5rem 0.5rem 0.5rem 1rem',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about this work..."
              aria-label="Ask about the work"
              style={{
                flex: 1,
                minWidth: 0,
                background: 'transparent',
                outline: 'none',
                color: '#ffffff',
                fontSize: '0.95rem',
                padding: '0.5rem 0',
              }}
            />
            <button
              type="submit"
              aria-disabled={!input.trim()}
              className="font-bold flex-shrink-0"
              style={{
                fontSize: '0.85rem',
                padding: '0.5rem 1.125rem',
                backgroundColor: '#4f7cff',
                color: '#ffffff',
                opacity: input.trim() ? 1 : 0.4,
                cursor: input.trim() ? 'pointer' : 'default',
              }}
            >
              Ask
            </button>
          </div>
          <p
            style={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.3)',
              marginTop: '0.625rem',
              textAlign: 'center',
            }}
          >
            Deterministic retrieval over structured data about my work. No model call, no network
            request - the answers are written, the matching is code.
          </p>
        </form>
      </div>
    </div>
  );
}

function DarkField({ label, body }: { label: string; body: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div
        className="text-[0.65rem] font-bold tracking-widest uppercase"
        style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '0.375rem' }}
      >
        {label}
      </div>
      <p
        className="leading-[1.75]"
        style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.72)' }}
      >
        {body}
      </p>
    </div>
  );
}
