'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useSpring, useTransform, type AnimationPlaybackControls } from 'framer-motion';

const S = 100;
const C = 0.8660254;
const CX = 650;
const CY = 470;
const FAR = 30;
const HX = 3.4;
const DW = 2.4;
const DH = 4.8;

type V3 = [number, number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;
const P = (x: number, y: number, z: number): [number, number] => [r2(CX + (x - y) * C * S), r2(CY + (x + y) * 0.5 * S - z * S)];
const pts = (a: V3[]) => a.map(([x, y, z]) => P(x, y, z).join(',')).join(' ');
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const rad = (d: number) => (d * Math.PI) / 180;

function doorPoint(a: number, u: number, v: number): V3 {
  return [HX + u * DW * Math.cos(rad(a)), u * DW * Math.sin(rad(a)), v * DH];
}

function doorQuad(a: number, u0: number, u1: number, v0: number, v1: number) {
  return pts([doorPoint(a, u0, v0), doorPoint(a, u1, v0), doorPoint(a, u1, v1), doorPoint(a, u0, v1)]);
}

const ECHOES = [
  { color: '#00efff', delay: 0.05 },
  { color: '#0065ff', delay: 0.1 },
  { color: '#8200ff', delay: 0.15 },
  { color: '#ff00ff', delay: 0.2 },
];

const camFor = (v: number) => Math.exp(Math.log(13) * clamp01((v - 0.1) / 0.9));

export default function TestDoorV5() {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle');
  const [duration, setDuration] = useState(2.2);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const camRef = useRef<SVGGElement>(null);
  const echoRefs = useRef<(SVGGElement | null)[]>([]);

  const crack = useMotionValue(0);
  const p = useMotionValue(0);
  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });

  const angle = useTransform([crack, p], ([c, v]: number[]) => c + (96 - c) * clamp01(v / 0.55));
  const light = useTransform([crack, p], ([c, v]: number[]) => {
    const base = (c / 12) * 0.5;
    return base + (1 - base) * clamp01(v / 0.6);
  });

  const doorFace = useTransform(angle, (a) => doorQuad(a, 0, 1, 0, 1));
  const edge = useTransform(angle, (a) => doorQuad(a, 0.975, 1, 0, 1));
  const shade = useTransform(angle, (a) => Math.sin(rad(a)) * 0.34);
  const knobX = useTransform(angle, (a) => P(...doorPoint(a, 0.86, 0.48))[0]);
  const knobY = useTransform(angle, (a) => P(...doorPoint(a, 0.86, 0.48))[1]);
  const spillA = useTransform(angle, (a) => {
    const s = 0.7 + Math.sin(rad(Math.min(a, 70))) * 3.2;
    return pts([[HX, 0, 0], [HX + DW, 0, 0], [HX + DW + s * 1.4, 9, 0], [HX - s * 0.5, 9, 0]]);
  });
  const spillB = useTransform(angle, (a) => {
    const s = 0.4 + Math.sin(rad(Math.min(a, 70))) * 1.8;
    return pts([[HX + 0.1, 0, 0], [HX + DW - 0.1, 0, 0], [HX + DW + s * 1.2, 5, 0], [HX - s * 0.2, 5, 0]]);
  });
  const spillOpacity = useTransform(light, (l) => l);
  const openingTint = useTransform(light, (l) => 0.7 + l * 0.3);
  const bloom = useTransform(p, [0.72, 0.96], [0, 1]);
  const copyOpacity = useTransform(p, [0, 0.14], [1, 0]);
  const camX = useTransform(mx, (v) => v * 8);
  const camY = useTransform(my, (v) => v * 5);

  const [ox, oy] = P(HX + DW / 2, 0, DH / 2);

  useEffect(() => {
    return p.on('change', (v) => {
      if (camRef.current) camRef.current.style.transform = `translate(${ox}px, ${oy}px) scale(${camFor(v)}) translate(${-ox}px, ${-oy}px)`;
      ECHOES.forEach((e, i) => {
        const g = echoRefs.current[i];
        if (!g) return;
        const q = clamp01((v - e.delay) / (1 - e.delay));
        g.style.transform = `translate(${ox}px, ${oy}px) scale(${camFor(v - e.delay)}) translate(${-ox}px, ${-oy}px)`;
        g.style.opacity = String(Math.sin(Math.PI * clamp01(q * 1.15)) * 0.55);
      });
    });
  }, [p, ox, oy]);

  useEffect(() => {
    const c = animate(crack, [0, 14, 10], { duration: 2.2, ease: 'easeOut', times: [0, 0.55, 1], delay: 0.4 });
    return () => c.stop();
  }, [crack]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [mx, my]);

  const open = () => {
    if (phase === 'opening') return;
    setPhase('opening');
    p.set(0);
    controls.current?.stop();
    controls.current = animate(p, 1, { duration, ease: [0.7, 0, 0.2, 1], onComplete: () => setPhase('done') });
  };

  const reset = () => {
    controls.current?.stop();
    p.set(0);
    setPhase('idle');
  };

  const opening = phase !== 'idle';
  const T = FAR * 86.6;
  const U = FAR * 50;
  const frameOuter = pts([[HX - 0.13, 0, 0], [HX + DW + 0.13, 0, 0], [HX + DW + 0.13, 0, DH + 0.13], [HX - 0.13, 0, DH + 0.13]]);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#0e2340' }}>
      <style>{`
        @keyframes breathe { 0%,100%{opacity:0.88} 50%{opacity:1} }
        @keyframes rise { from{opacity:0;transform:translateY(1.2rem)} to{opacity:1;transform:none} }
      `}</style>

      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="opening" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e4efff" />
          </linearGradient>
        </defs>

        <motion.g style={{ x: camX, y: camY }}>
          <g ref={camRef} style={{ transformOrigin: '0 0' }}>
            <rect x={-3000} y={-3000} width={7600} height={7000} fill="#102a4c" />
            <polygon points={`${CX},-3000 ${CX},${CY} ${CX - T},${CY + U} ${CX - T},-3000`} fill="#0a1d38" />
            <polygon points={`${CX},${CY} ${CX - T},${CY + U} ${CX - T},4000 ${CX + T},4000 ${CX + T},${CY + U}`} fill="#1d3f68" />
            <polygon points={`${CX},${CY} ${CX + T},${CY + U} ${CX + T},${CY + U - 28} ${CX},${CY - 28}`} fill="#1a3a62" />
            <polygon points={`${CX},${CY} ${CX - T},${CY + U} ${CX - T},${CY + U - 28} ${CX},${CY - 28}`} fill="#0f2747" />

            <motion.g style={{ opacity: spillOpacity }}>
              <g style={{ animation: 'breathe 7s ease-in-out infinite' }}>
                <motion.polygon points={spillA} fill="#2e5a8c" />
                <motion.polygon points={spillB} fill="#3f72aa" />
              </g>
            </motion.g>

            <polygon points={frameOuter} fill="#2d5a88" />
            <motion.polygon
              points={pts([[HX, 0, 0], [HX + DW, 0, 0], [HX + DW, 0, DH], [HX, 0, DH]])}
              fill="url(#opening)"
              style={{ opacity: openingTint }}
            />
            <polygon points={pts([[HX, 0, DH - 0.1], [HX + DW, 0, DH - 0.1], [HX + DW, 0, DH], [HX, 0, DH]])} fill="rgba(30,70,115,0.3)" />

            <motion.polygon points={doorFace} fill="#2f5d8d" />
            <motion.polygon points={doorFace} fill="#000" style={{ opacity: shade }} />
            <motion.polygon points={edge} fill="rgba(255,255,255,0.18)" />
            <motion.circle cx={knobX} cy={knobY} r="6" fill="#0a1d38" />
          </g>

          {ECHOES.map((e, i) => (
            <g key={e.color} ref={(el) => { echoRefs.current[i] = el; }} style={{ transformOrigin: '0 0', opacity: 0 }}>
              <polygon points={frameOuter} fill="none" stroke={e.color} strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </motion.g>
      </svg>

      <motion.div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: bloom, pointerEvents: 'none', zIndex: 20 }} />

      <motion.div
        className="absolute flex flex-col justify-center"
        style={{ left: '7vw', top: 0, bottom: 0, maxWidth: '36vw', opacity: copyOpacity, zIndex: 30, pointerEvents: opening ? 'none' : 'auto' }}
      >
        <h1
          style={{ color: '#fff', fontWeight: 700, fontSize: 'clamp(2.4rem, 4.8vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.035em', animation: 'rise 0.9s cubic-bezier(.2,.7,.2,1) 0.3s both' }}
        >
          Hey, I&apos;m Michael.
        </h1>
        <p style={{ marginTop: '1.3rem', color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1.05rem, 1.4vw, 1.45rem)', lineHeight: 1.45, maxWidth: '28ch', animation: 'rise 0.9s cubic-bezier(.2,.7,.2,1) 0.5s both' }}>
          Welcome to a little peek inside my brain.
        </p>
        <button
          onClick={open}
          onPointerEnter={() => phase === 'idle' && animate(crack, 30, { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] })}
          onPointerLeave={() => phase === 'idle' && animate(crack, 10, { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] })}
          className="mt-9 inline-flex w-fit cursor-pointer items-center gap-3 text-lg font-semibold text-white"
          style={{ animation: 'rise 0.9s cubic-bezier(.2,.7,.2,1) 0.7s both', padding: '0.85rem 1.6rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 999, background: 'rgba(255,255,255,0.08)' }}
        >
          Step inside
          <span>→</span>
        </button>
      </motion.div>

      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 rounded-lg bg-white/10 p-3 text-sm text-white" style={{ zIndex: 50 }}>
        <label>
          {duration.toFixed(1)}s{' '}
          <input type="range" min={1} max={4} step={0.1} value={duration} onChange={(e) => setDuration(+e.target.value)} />
        </label>
        <button onClick={open} className="rounded bg-white/20 px-2 py-1">play</button>
        <button onClick={reset} className="rounded bg-white/20 px-2 py-1">reset</button>
      </div>
    </div>
  );
}
