'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { inter } from '../theme';

/**
 * Portals a dropdown panel to document.body, positioned `fixed` under its
 * trigger via a measured rect - instead of `position: absolute` inside the
 * trigger's own ancestor chain.
 *
 * Every grid/table container in this demo has `overflow: hidden` (to clip
 * content to its rounded corners), and several ancestors are animated by
 * Framer Motion, which creates new stacking contexts. A dropdown positioned
 * absolute inside any of that gets clipped by the overflow or painted
 * beneath later siblings regardless of its own z-index - a portal escapes
 * all of it in one move, same technique PrototypeStage/GuidedTour already
 * use for their own overlays.
 */
export default function FloatingPanel({
  open,
  anchorEl,
  children,
  minWidth,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  minWidth?: number;
}) {
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    if (!open || !anchorEl) return;
    const update = () => {
      const r = anchorEl.getBoundingClientRect();
      setRect({ top: r.bottom + 4, left: r.left, width: r.width });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, anchorEl]);

  if (!open || !rect || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={inter.className}
      style={{
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        minWidth: minWidth ?? rect.width,
        zIndex: 10100,
      }}
    >
      {children}
    </div>,
    document.body
  );
}
