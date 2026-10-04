'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import FloatingPanel from './FloatingPanel';
import { LF } from '../theme';

/**
 * Fully custom dropdown - not a native <select>.
 *
 * A native <select>'s closed control can be restyled with `appearance:
 * none`, but the OPEN popup is rendered by the OS and CSS cannot touch it
 * at all - so "styled select" was a lie for anything past the closed
 * state. This renders its own popup instead, same pattern as the
 * GL Account column's AccountSelect - and, like that one, the popup is
 * portaled via FloatingPanel rather than absolutely positioned in place,
 * since every table/grid ancestor here clips overflow.
 */
export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  color = LF.grey[800],
  minWidth,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  color?: string;
  minWidth?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = options.find((o) => o.value === value);

  return (
    <div className="relative inline-block" style={{ minWidth }}>
      <button
        ref={(el) => {
          triggerRef.current = el;
          setAnchorEl(el);
        }}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between"
        style={{
          gap: '0.5rem',
          fontSize: '0.75rem',
          border: `1px solid ${open ? LF.primary[900] : LF.grey[100]}`,
          borderRadius: '0.5rem',
          padding: '0.3rem 0.5rem',
          color: current ? color : LF.grey[600],
          backgroundColor: LF.grey[0],
        }}
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{current ? current.label : placeholder}</span>
        <ChevronDown size={12} style={{ color: LF.grey[600], flexShrink: 0 }} />
      </button>
      <FloatingPanel open={open} anchorEl={anchorEl}>
        <div
          ref={panelRef}
          style={{
            maxHeight: '16rem',
            overflowY: 'auto',
            borderRadius: '0.6rem',
            border: `1px solid ${LF.grey[100]}`,
            backgroundColor: LF.grey[0],
            boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
            padding: '0.3rem',
          }}
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className="flex w-full items-center text-left whitespace-nowrap"
              style={{
                fontSize: '0.8rem',
                padding: '0.4rem 0.5rem',
                borderRadius: '0.4rem',
                backgroundColor: o.value === value ? LF.grey[25] : 'transparent',
                color: LF.grey[800],
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LF.grey[25])}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = o.value === value ? LF.grey[25] : 'transparent')}
            >
              {o.label}
            </button>
          ))}
        </div>
      </FloatingPanel>
    </div>
  );
}
