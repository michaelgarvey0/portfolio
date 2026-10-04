'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { inter } from './theme';

/**
 * Lets a demo (`children`) know whether it's currently shown inline
 * (collapsed) or in the fullscreen dialog. `children` is portaled to
 * different DOM containers depending on state, but React context flows
 * through the *component* tree, not the DOM tree, so this works regardless
 * of which container it's actually rendered into.
 *
 * Exists because inferring "am I expanded" from the demo's own rendered
 * width is a trap: the inline collapsed card is often wide enough on
 * desktop to cross the same threshold the fullscreen dialog would - so a
 * demo like the guided tour that only makes sense once expanded can't use
 * size as a proxy without misfiring while still collapsed.
 */
const PrototypeExpandedContext = createContext(false);
export const usePrototypeExpanded = () => useContext(PrototypeExpandedContext);

/**
 * Frame for an interactive prototype.
 *
 * Inline it sits in the page at a workable size. Expanded it takes the whole
 * viewport, with the prototype on the left and instructions and context on the
 * right - so someone can actually drive it rather than squinting at it inside
 * a text column.
 *
 * The overlay renders through a portal to document.body: `position: fixed`
 * breaks inside a transformed ancestor, and these pages animate their content
 * wrappers with Framer.
 *
 * Branding split: this chrome (badge, title, expand button, side panel) stays
 * in the case study's own voice and font, same as every other case study on
 * this site. Only `children` - the actual interactive prototype - renders in
 * LiveFlow's real product font (see ./theme), so the demo itself feels like
 * stepping into the product rather than reading about it.
 *
 * State-preserving expand/collapse
 * ---------------------------------
 * `children` is mounted in exactly ONE place at all times: a single
 * `createPortal(children, target)` call whose `target` DOM node changes
 * between an inline slot (collapsed) and a slot inside the fullscreen
 * dialog (expanded). Because the portal's position in the React tree never
 * changes - only which container it renders into - React treats it as the
 * same portal fiber across a toggle and re-parents the existing DOM subtree
 * instead of unmounting one instance and mounting another. That is what
 * keeps typed input, applied changes, undo history, etc. alive across
 * Expand/Close.
 *
 * Both target containers exist in the DOM unconditionally from first mount
 * (the dialog is always rendered, just invisible + `inert` while
 * collapsed) specifically so their refs are populated before any toggle can
 * happen - a portal target must already exist in the DOM when
 * `createPortal` runs. The dialog's open/close motion is driven by
 * `animate`/variants rather than AnimatePresence's mount/unmount, since the
 * dialog itself must stay mounted for this to work.
 */

export interface PrototypeStep {
  label: string;
  detail: string;
}

interface PrototypeStageProps {
  title: string;
  /** One line under the title - what this is. */
  summary: React.ReactNode;
  /** Walkthrough shown beside the prototype when expanded. */
  steps: PrototypeStep[];
  /** What the design decision was. Shown under the steps. */
  rationale?: React.ReactNode;
  /** Honest note about how this differs from production. */
  disclaimer: string;
  /** Expanded dialog fills edge-to-edge, no side panel, no main-area padding - just the top chrome. */
  fullBleed?: boolean;
  children: React.ReactNode;
}

export default function PrototypeStage({
  title,
  summary,
  steps,
  rationale,
  disclaimer,
  fullBleed,
  children,
}: PrototypeStageProps) {
  const [expanded, setExpanded] = useState(false);
  // Lags `expanded` on close so content leaves the dialog only after it fades out.
  const [contentInDialog, setContentInDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  // Portal targets are held in state (populated by callback refs) rather
  // than plain refs, specifically so the value used to choose where
  // `children` portals to is read from state during render - not from
  // `ref.current`, which React's hooks lint (rightly) flags as unsafe to
  // read during render.
  const [inlineSlotNode, setInlineSlotNode] = useState<HTMLDivElement | null>(null);
  const [dialogMainNode, setDialogMainNode] = useState<HTMLDivElement | null>(null);

  const open = () => {
    setContentInDialog(true);
    setExpanded(true);
  };

  const close = () => setExpanded(false);

  // Deferred a frame so this isn't a synchronous setState inside an effect,
  // and so both portal-target refs (inline slot + dialog main) are attached
  // before the content portal ever tries to render into either of them.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Escape to exit, and lock the page behind the overlay.
  useEffect(() => {
    if (!contentInDialog) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [contentInDialog]);

  const chrome = (
    <div
      className="flex items-center justify-between flex-wrap"
      style={{
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: '#fafafa',
      }}
    >
      <div className="flex items-center" style={{ gap: '0.5rem' }}>
        <span
          className="font-bold tracking-widest uppercase"
          style={{
            fontSize: '0.62rem',
            color: '#2E54AB',
            backgroundColor: 'rgba(46,84,171,0.10)',
            padding: '0.25rem 0.5rem',
          }}
        >
          Interactive
        </span>
        <span className="font-semibold text-[#333]" style={{ fontSize: '0.9rem' }}>
          {title}
        </span>
      </div>

      {/* Hover in state, not a `hover:` class: the button sets color and
          background inline for its own styling, and an inline style always
          beats a class, so hover:text-white would never apply. Icons use
          stroke="currentColor" so they invert with the label. */}
      <button
        onClick={() => (expanded ? close() : open())}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        onFocus={() => setBtnHover(true)}
        onBlur={() => setBtnHover(false)}
        className="inline-flex items-center font-semibold cursor-pointer"
        style={
          expanded
            ? {
                gap: '0.4rem',
                fontSize: '0.8rem',
                padding: '0.4rem 0.75rem',
                border: `1px solid ${btnHover ? '#2E54AB' : 'rgba(0,0,0,0.18)'}`,
                backgroundColor: btnHover ? '#2E54AB' : 'transparent',
                color: btnHover ? '#ffffff' : '#444',
                transition:
                  'background-color 150ms ease-out, border-color 150ms ease-out, color 150ms ease-out',
              }
            : {
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.5rem 0.9rem',
                border: '1px solid #2E54AB',
                backgroundColor: btnHover ? '#1f3f85' : '#2E54AB',
                color: '#ffffff',
                boxShadow: '0 1px 2px rgba(46,84,171,0.3)',
                transition: 'background-color 150ms ease-out',
              }
        }
      >
        {expanded ? (
          <>
            <ExitIcon />
            Close
          </>
        ) : (
          <>
            <Play size={14} fill="currentColor" />
            Play walkthrough
          </>
        )}
      </button>
    </div>
  );

  const sidePanel = (
    <aside
      className="lf-stage-side"
      style={{ padding: '1.5rem', overflowY: 'auto' }}
    >
      <h3
        className="font-bold text-[#1a1a1a]"
        style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}
      >
        {title}
      </h3>
      <p
        className="text-[#666] leading-[1.65]"
        style={{ fontSize: '0.95rem', marginBottom: '1.75rem' }}
      >
        {summary}
      </p>

      <div
        className="font-bold tracking-widest uppercase"
        style={{ fontSize: '0.65rem', color: '#999', marginBottom: '0.875rem' }}
      >
        Try this
      </div>
      <ol style={{ marginBottom: rationale ? '1.75rem' : '1rem' }}>
        {steps.map((step, i) => (
          <li
            key={step.label}
            className="flex"
            style={{ gap: '0.75rem', marginBottom: '1rem' }}
          >
            <span
              className="flex items-center justify-center font-bold flex-shrink-0"
              style={{
                width: '1.4rem',
                height: '1.4rem',
                backgroundColor: '#2E54AB',
                color: '#ffffff',
                fontSize: '0.7rem',
              }}
            >
              {i + 1}
            </span>
            <div style={{ minWidth: 0 }}>
              <div
                className="font-semibold text-[#333]"
                style={{ fontSize: '0.9rem', marginBottom: '0.15rem' }}
              >
                {step.label}
              </div>
              <div className="text-[#777] leading-[1.55]" style={{ fontSize: '0.85rem' }}>
                {step.detail}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {rationale && (
        <>
          <div
            className="font-bold tracking-widest uppercase"
            style={{ fontSize: '0.65rem', color: '#999', marginBottom: '0.625rem' }}
          >
            Why it works this way
          </div>
          <p
            className="text-[#666] leading-[1.7]"
            style={{ fontSize: '0.92rem', marginBottom: '1.75rem' }}
          >
            {rationale}
          </p>
        </>
      )}

      <p
        className="text-[#999] italic leading-[1.6]"
        style={{
          fontSize: '0.8rem',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          paddingTop: '1rem',
        }}
      >
        {disclaimer}
      </p>
    </aside>
  );

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .lf-stage-body { display: flex; flex-direction: column; min-height: 0; flex: 1; }
            .lf-stage-main { padding: 1.25rem; overflow: auto; flex: 1; min-height: 0; }
            .lf-stage-main.lf-stage-main--full { padding: 0; }
            .lf-stage-side { border-top: 1px solid rgba(0,0,0,0.1); flex-shrink: 0; }
            @media (min-width: 900px) {
              .lf-stage-body { flex-direction: row; }
              .lf-stage-main { padding: 2rem; }
              .lf-stage-main.lf-stage-main--full { padding: 0; }
              .lf-stage-side {
                width: 24rem;
                flex-shrink: 0;
                border-top: none;
                border-left: 1px solid rgba(0,0,0,0.1);
              }
            }
          `,
        }}
      />

      {/* Inline */}
      <div
        className="border border-[rgba(0,0,0,0.12)] bg-white"
        style={{ marginBottom: '1rem' }}
      >
        {!contentInDialog && chrome}
        <motion.div
          initial={false}
          animate={{ opacity: contentInDialog ? 0 : 1 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <div
            ref={setInlineSlotNode}
            className={inter.className}
            style={{ padding: '1.25rem', display: contentInDialog ? 'none' : undefined }}
          />
        </motion.div>
        {contentInDialog && (
          <div
            className="flex items-center justify-center text-[#999]"
            style={{ padding: '2.5rem 1rem', fontSize: '0.9rem' }}
          >
            Open in fullscreen - press Escape to come back
          </div>
        )}
      </div>

      {/* Expanded dialog - always mounted (just hidden + inert while
          collapsed) so its portal target ref exists before Expand is ever
          clicked. A plain opacity crossfade, same transition both ways. */}
      {mounted &&
        createPortal(
          <motion.div
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, pointerEvents: expanded ? 'auto' : 'none' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            onAnimationComplete={() => {
              if (!expanded) setContentInDialog(false);
            }}
            className="flex flex-col"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              boxShadow: '0 40px 120px rgba(0,0,0,0.25)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            aria-hidden={!expanded}
            inert={!expanded}
          >
            {chrome}
            <div className="lf-stage-body">
              <div ref={setDialogMainNode} className={`lf-stage-main ${fullBleed ? 'lf-stage-main--full' : ''} ${inter.className}`} />
              {!fullBleed && sidePanel}
            </div>
          </motion.div>,
          document.body
        )}

      {mounted &&
        (contentInDialog ? dialogMainNode : inlineSlotNode) &&
        createPortal(
          <PrototypeExpandedContext.Provider value={expanded}>{children}</PrototypeExpandedContext.Provider>,
          (contentInDialog ? dialogMainNode : inlineSlotNode)!
        )}
    </>
  );
}

function ExitIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" y1="10" x2="21" y2="3" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}
