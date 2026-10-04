'use client';

import { LOOP_STAGES, type LoopStage } from '@/content/liveflow';

interface LoopDiagramProps {
  activeStage: LoopStage | null;
  onSelect: (stage: LoopStage) => void;
  brandColor: string;
}

/**
 * The four-stage operating loop, rendered as a clickable strip that doubles as
 * navigation. Highlights whichever stage is currently in view.
 *
 * Deliberately not a circle - a circle looks like a stock diagram and forces
 * awkward text placement. A strip with a wrap-around marker reads as a loop
 * while staying legible at every width.
 */
export default function LoopDiagram({
  activeStage,
  onSelect,
  brandColor,
}: LoopDiagramProps) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div
        className="grid grid-cols-1 md:grid-cols-4"
        style={{ gap: '0.75rem' }}
      >
        {LOOP_STAGES.map((stage, i) => {
          const active = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => onSelect(stage.id)}
              aria-pressed={active}
              className="text-left transition-all duration-300 cursor-pointer"
              style={{
                padding: '1.25rem',
                border: `1px solid ${active ? brandColor : 'rgba(0,0,0,0.12)'}`,
                backgroundColor: active ? 'rgba(46,84,171,0.06)' : '#ffffff',
              }}
            >
              <div
                className="flex items-center"
                style={{ gap: '0.625rem', marginBottom: '0.5rem' }}
              >
                <span
                  className="flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors duration-300"
                  style={{
                    width: '22px',
                    height: '22px',
                    backgroundColor: active ? brandColor : '#e5e5e5',
                    color: active ? '#ffffff' : '#999',
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="font-bold text-[1.05rem] transition-colors duration-300"
                  style={{ color: active ? brandColor : '#333' }}
                >
                  {stage.title}
                </span>
              </div>
              <p className="text-[0.9rem] text-[#666] leading-[1.6]">{stage.blurb}</p>
            </button>
          );
        })}
      </div>

      <div
        className="flex items-center text-xs text-[#999]"
        style={{ gap: '0.5rem', marginTop: '0.875rem' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
        <span>Systematize feeds the next round of signal. It never runs once.</span>
      </div>
    </div>
  );
}
