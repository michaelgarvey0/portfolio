'use client';

import { useState } from 'react';
import { LF } from '../theme';

/**
 * Small ring/donut + percentage, color-coded exactly like the real
 * ConfidencePill in accounting/.../ai-categorization/components.tsx:
 * green >= 90, primary blue >= 80, amber below that. Hover reveals the
 * same "why" reasoning line the real one shows in a tooltip - simplified
 * to a local absolute-positioned bubble instead of a document.body portal,
 * since this never needs to escape a scroll container in the demo.
 */

export default function ConfidencePill({
  confidence,
  reasoning,
}: {
  confidence: number;
  reasoning?: string;
}) {
  const [hover, setHover] = useState(false);
  const isHigh = confidence >= 90;
  const isMid = confidence >= 80;

  const fg = isHigh ? LF.secondary.green900 : isMid ? LF.primary[900] : LF.tertiary.peach900;
  const bg = isHigh ? `${LF.secondary.green900}1F` : isMid ? `${LF.primary[900]}1F` : `${LF.tertiary.peach900}1F`;
  const trackOpacity = isHigh ? 0.15 : 0.22;

  const r = 6;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - confidence / 100);

  return (
    <span className="relative inline-flex">
      <span
        className="inline-flex items-center rounded-full font-semibold tabular-nums cursor-default"
        style={{ gap: '0.35rem', padding: '0.25rem 0.6rem', fontSize: '0.72rem', background: bg, color: fg }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" className="flex-shrink-0">
          <circle cx="8" cy="8" r={r} fill="none" stroke="currentColor" strokeWidth="2" opacity={trackOpacity} />
          <circle
            cx="8"
            cy="8"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        {confidence}%
      </span>
      {hover && reasoning && (
        <span
          role="tooltip"
          className="absolute z-30 leading-relaxed"
          style={{
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '15rem',
            padding: '0.6rem 0.7rem',
            borderRadius: '0.6rem',
            border: `1px solid ${LF.grey[100]}`,
            backgroundColor: LF.grey[0],
            color: LF.grey[700],
            fontSize: '0.72rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}
        >
          <span className="block font-semibold" style={{ color: LF.primary[900], marginBottom: '0.2rem' }}>
            Flow reasoning
          </span>
          {reasoning}
        </span>
      )}
    </span>
  );
}
