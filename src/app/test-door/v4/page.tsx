'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useSpring, useTransform, type AnimationPlaybackControls } from 'framer-motion';

const S = 48;
const C = 0.8660254;
const CX = 1110;
const CY = 390;
const ROOM = 10;
const WALL_H = 7;
const HX = 3.4;
const DW = 2.4;
const DH = 4.8;

type V3 = [number, number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;
const P = (x: number, y: number, z: number): [number, number] => [r2(CX + (x - y) * C * S), r2(CY + (x + y) * 0.5 * S - z * S)];
const pts = (a: V3[]) => a.map(([x, y, z]) => P(x, y, z).join(',')).join(' ');
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const rad = (d: number) => (d * Math.PI) / 180;

function seeded(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function doorPoint(a: number, u: number, v: number): V3 {
  return [HX + u * DW * Math.cos(rad(a)), u * DW * Math.sin(rad(a)), v * DH];
}

function doorQuad(a: number, u0: number, u1: number, v0: number, v1: number) {
  return pts([doorPoint(a, u0, v0), doorPoint(a, u1, v0), doorPoint(a, u1, v1), doorPoint(a, u0, v1)]);
}

function box(x: number, y: number, z: number, w: number, d: number, h: number, c: { top: string; px: string; py: string }) {
  return (
    <g>
      <polygon points={pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={c.py} />
      <polygon points={pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={c.px} />
      <polygon points={pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={c.top} />
    </g>
  );
}

const BLOCKS = [
  { x: 1.3, y: 6.2, z: 0.9, w: 1.1, d: 1.1, h: 1.1, bob: 0 },
  { x: 2.4, y: 3.4, z: 0.5, w: 0.7, d: 0.7, h: 0.7, bob: 1.6 },
  { x: 6.9, y: 6.6, z: 1.1, w: 0.9, d: 0.9, h: 0.9, bob: 3.1 },
];

export default function TestDoorV4() {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle');
  const [duration, setDuration] = useState(2.6);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const camRef = useRef<SVGGElement>(null);

  const crack = useMotionValue(0);
  const p = useMotionValue(0);
  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });

  const angle = useTransform([crack, p], ([c, v]: number[]) => c + (96 - c) * clamp01(v / 0.55));
  const light = useTransform([crack, p], ([c, v]: number[]) => {
    const base = (c / 12) * 0.42;
    return base + (1 - base) * clamp01(v / 0.6);
  });

  const doorFace = useTransform(angle, (a) => doorQuad(a, 0, 1, 0, 1));
  const panelA = useTransform(angle, (a) => doorQuad(a, 0.16, 0.84, 0.09, 0.45));
  const panelB = useTransform(angle, (a) => doorQuad(a, 0.16, 0.84, 0.54, 0.91));
  const edge = useTransform(angle, (a) => doorQuad(a, 0.975, 1, 0, 1));
  const shade = useTransform(angle, (a) => Math.sin(rad(a)) * 0.38);
  const knobPos = useTransform(angle, (a) => {
    const [x, y] = P(...doorPoint(a, 0.86, 0.48));
    return { x, y };
  });
  const knobX = useTransform(knobPos, (k) => k.x);
  const knobY = useTransform(knobPos, (k) => k.y);
  const spill = useTransform(angle, (a) => {
    const spread = 0.8 + Math.sin(rad(Math.min(a, 70))) * 3.6;
    return pts([[HX, 0, 0], [HX + DW, 0, 0], [HX + DW + spread * 1.5, 9, 0], [HX - spread * 0.6, 9, 0]]);
  });
  const spillOpacity = useTransform(light, (l) => l * 0.95);
  const glowOpacity = useTransform(light, (l) => 0.35 + l * 0.65);
  const dustOpacity = useTransform(light, (l) => l);
  const camScale = useTransform(p, (v) => Math.exp(Math.log(13) * clamp01((v - 0.1) / 0.9)));
  const bloom = useTransform(p, [0.7, 0.97], [0, 1]);
  const copyOpacity = useTransform(p, [0, 0.14], [1, 0]);
  const camX = useTransform(mx, (v) => v * 10);
  const camY = useTransform(my, (v) => v * 6);
  const dustX = useTransform(mx, (v) => v * 22);
  const dustY = useTransform(my, (v) => v * 12);

  useEffect(() => {
    const [cx, cy] = P(HX + DW / 2, 0, DH / 2);
    return camScale.on("change", (s) => {
      if (camRef.current) camRef.current.style.transform = `translate(${cx}px, ${cy}px) scale(${s}) translate(${-cx}px, ${-cy}px)`;
    });
  }, [camScale]);

  useEffect(() => {
    const c = animate(crack, [0, 14, 10], { duration: 2.6, ease: 'easeOut', times: [0, 0.55, 1], delay: 0.6 });
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

  const specks = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => {
        const [sx, sy] = P(HX - 1 + seeded(i + 3) * 7, 0.5 + seeded(i + 40) * 8, seeded(i + 90) * 4.5);
        return {
          sx, sy,
          s: r2(1.4 + seeded(i + 200) * 2.8),
          o: r2(0.25 + seeded(i + 300) * 0.55),
          dx: r2((seeded(i + 400) - 0.5) * 60),
          dy: r2(-30 - seeded(i + 500) * 90),
          t: r2(8 + seeded(i + 600) * 10),
          d: r2(-seeded(i + 700) * 14),
        };
      }),
    [],
  );

  const open = () => {
    if (phase === 'opening') return;
    setPhase('opening');
    p.set(0);
    controls.current?.stop();
    controls.current = animate(p, 1, { duration, ease: [0.76, 0, 0.24, 1], onComplete: () => setPhase('done') });
  };

  const reset = () => {
    controls.current?.stop();
    p.set(0);
    setPhase('idle');
  };

  const [ox, oy] = P(HX + DW / 2, 0, DH / 2);
  const opening = phase !== 'idle';
  const [fa, fb, fc, fd] = [P(0, 0, 0), P(ROOM, 0, 0), P(ROOM, ROOM, 0), P(0, ROOM, 0)];
  const [gx0, gy0] = P(HX + DW / 2, 0, 0);
  const [gx1, gy1] = P(HX + DW / 2 + 0.8, 9, 0);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#050a14' }}>
      <style>{`
        @keyframes mote { 0%{transform:translate(0,0);opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{transform:translate(var(--mx),var(--my));opacity:0} }
        @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes breathe { 0%,100%{opacity:0.82} 50%{opacity:1} }
        @keyframes rise { from{opacity:0;transform:translateY(1.2rem);filter:blur(8px)} to{opacity:1;transform:none;filter:none} }
      `}</style>

      <motion.svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="wallR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#15305a" />
            <stop offset="1" stopColor="#102647" />
          </linearGradient>
          <linearGradient id="wallL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#081830" />
            <stop offset="1" stopColor="#0b1e3a" />
          </linearGradient>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b3a60" />
            <stop offset="1" stopColor="#14304f" />
          </linearGradient>
          <linearGradient id="opening" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#cfe3ff" />
          </linearGradient>
          <linearGradient id="spill" gradientUnits="userSpaceOnUse" x1={gx0} y1={gy0} x2={gx1} y2={gy1}>
            <stop offset="0" stopColor="#dcecff" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#bcd6ff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#bcd6ff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="floorClip">
            <polygon points={`${fa} ${fb} ${fc} ${fd}`.replace(/\] \[/g, ' ')} />
          </clipPath>
          <filter id="blur14"><feGaussianBlur stdDeviation="14" /></filter>
          <filter id="blur6"><feGaussianBlur stdDeviation="6" /></filter>
          <filter id="blur40"><feGaussianBlur stdDeviation="40" /></filter>
          <radialGradient id="vig" cx="0.62" cy="0.45" r="0.75">
            <stop offset="0.45" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        <motion.g style={{ x: camX, y: camY }}>
          <g ref={camRef} style={{ transformOrigin: "0 0" }}>
            <polygon points={pts([[0, 0, 0], [0, ROOM, 0], [0, ROOM, WALL_H], [0, 0, WALL_H]])} fill="url(#wallL)" />
            <polygon points={pts([[0, 0, 0], [ROOM, 0, 0], [ROOM, 0, WALL_H], [0, 0, WALL_H]])} fill="url(#wallR)" />
            <polygon points={pts([[0, 0, 0], [ROOM, 0, 0], [ROOM, ROOM, 0], [0, ROOM, 0]])} fill="url(#floor)" />

            <g stroke="rgba(160,200,255,0.07)" strokeWidth="1.2" fill="none">
              {Array.from({ length: ROOM - 1 }, (_, i) => i + 1).map((i) => (
                <g key={i}>
                  <polyline points={pts([[i, 0, 0], [i, ROOM, 0]])} />
                  <polyline points={pts([[0, i, 0], [ROOM, i, 0]])} />
                </g>
              ))}
            </g>

            <polygon points={pts([[0, 0, 0], [ROOM, 0, 0], [ROOM, 0, 0.35], [0, 0, 0.35]])} fill="rgba(255,255,255,0.05)" />
            <polygon points={pts([[0, 0, 0], [0, ROOM, 0], [0, ROOM, 0.35], [0, 0, 0.35]])} fill="rgba(255,255,255,0.03)" />

            <motion.g style={{ opacity: glowOpacity }}>
              <polygon points={pts([[HX - 0.1, 0, 0], [HX + DW + 0.1, 0, 0], [HX + DW + 0.1, 0, DH + 0.1], [HX - 0.3, 0, DH + 0.1]])} fill="#bcd6ff" opacity="0.55" filter="url(#blur40)" />
            </motion.g>

            <g clipPath="url(#floorClip)">
              <motion.polygon points={spill} fill="url(#spill)" style={{ opacity: spillOpacity }} filter="url(#blur14)" />
            </g>

            {BLOCKS.map((b, i) => (
              <g key={i}>
                <ellipse
                  cx={P(b.x + b.w / 2 + 0.2, b.y + b.d / 2, 0)[0]}
                  cy={P(b.x + b.w / 2 + 0.2, b.y + b.d / 2, 0)[1]}
                  rx={b.w * 26}
                  ry={b.w * 12}
                  fill="#000"
                  opacity="0.35"
                  filter="url(#blur6)"
                />
                <g style={{ animation: `bob ${6 + i}s ease-in-out ${b.bob}s infinite` }}>
                  {box(b.x, b.y, b.z, b.w, b.d, b.h, { top: '#5f8fc8', px: '#244a7c', py: '#37689f' })}
                </g>
              </g>
            ))}

            <polygon points={pts([[HX - 0.13, 0, 0], [HX + DW + 0.13, 0, 0], [HX + DW + 0.13, 0, DH + 0.13], [HX - 0.13, 0, DH + 0.13]])} fill="#2e5a87" />
            <polygon points={pts([[HX - 0.13, 0, DH], [HX + DW + 0.13, 0, DH], [HX + DW + 0.13, 0, DH + 0.13], [HX - 0.13, 0, DH + 0.13]])} fill="#3b6b9c" />
            <polygon points={pts([[HX - 0.13, 0, 0], [HX - 0.02, 0, 0], [HX - 0.02, 0, DH + 0.13], [HX - 0.13, 0, DH + 0.13]])} fill="#35638f" />
            <polygon points={pts([[HX, 0, 0], [HX + DW, 0, 0], [HX + DW, 0, DH], [HX, 0, DH]])} fill="url(#opening)" />
            <polygon points={pts([[HX, 0, DH - 0.07], [HX + DW, 0, DH - 0.07], [HX + DW, 0, DH], [HX, 0, DH]])} fill="rgba(30,70,115,0.35)" />

            <motion.polygon points={doorFace} fill="#35628f" />
            <motion.polygon points={panelA} fill="rgba(20,50,90,0.55)" />
            <motion.polygon points={panelB} fill="rgba(20,50,90,0.55)" />
            <motion.polygon points={doorFace} fill="#000" style={{ opacity: shade }} />
            <motion.polygon points={edge} fill="rgba(255,255,255,0.14)" />
            <motion.circle cx={knobX} cy={knobY} r="4.5" fill="#0c1f3a" />
            <motion.circle cx={knobX} cy={knobY} r="2" fill="rgba(255,255,255,0.35)" />
          </g>

          <motion.g style={{ x: dustX, y: dustY, opacity: dustOpacity }}>
            {specks.map((s, i) => (
              <circle
                key={i}
                cx={s.sx}
                cy={s.sy}
                r={s.s}
                fill={`rgba(220,236,255,${s.o})`}
                style={{ animation: `mote ${s.t}s linear ${s.d}s infinite`, ['--mx' as string]: `${s.dx}px`, ['--my' as string]: `${s.dy}px` }}
              />
            ))}
          </motion.g>
        </motion.g>

        <rect width="1600" height="1000" fill="url(#vig)" pointerEvents="none" />
      </motion.svg>

      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.07, mixBlendMode: 'overlay',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <motion.div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: bloom, pointerEvents: 'none', zIndex: 20 }} />

      <motion.div
        className="absolute flex flex-col justify-center"
        style={{ left: '7vw', top: 0, bottom: 0, maxWidth: '36vw', opacity: copyOpacity, zIndex: 30, pointerEvents: opening ? 'none' : 'auto' }}
      >
        <div style={{ fontSize: '0.8rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', animation: 'rise 1s cubic-bezier(.2,.7,.2,1) 0.5s both' }}>
          Michael Garvey · Product Designer
        </div>
        <h1
          style={{ marginTop: '1.4rem', color: '#fff', fontWeight: 700, fontSize: 'clamp(2.4rem, 4.8vw, 5rem)', lineHeight: 1.02, letterSpacing: '-0.035em', animation: 'rise 1.2s cubic-bezier(.2,.7,.2,1) 0.75s both' }}
        >
          Hey, I&apos;m Michael.
        </h1>
        <p style={{ marginTop: '1.4rem', color: 'rgba(255,255,255,0.62)', fontSize: 'clamp(1.05rem, 1.4vw, 1.45rem)', lineHeight: 1.45, maxWidth: '28ch', animation: 'rise 1.2s cubic-bezier(.2,.7,.2,1) 1s both' }}>
          Welcome to a little peek inside my brain.
        </p>
        <button
          onClick={open}
          onPointerEnter={() => phase === 'idle' && animate(crack, 30, { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] })}
          onPointerLeave={() => phase === 'idle' && animate(crack, 10, { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] })}
          className="mt-10 inline-flex w-fit cursor-pointer items-center gap-3 text-lg font-semibold text-white"
          style={{ animation: 'rise 1.2s cubic-bezier(.2,.7,.2,1) 1.25s both', padding: '0.85rem 1.6rem', border: '1px solid rgba(255,255,255,0.28)', borderRadius: 999, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(6px)' }}
        >
          Step inside
          <span>→</span>
        </button>
      </motion.div>

      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 rounded-lg bg-white/10 p-3 text-sm text-white backdrop-blur" style={{ zIndex: 50 }}>
        <label>
          {duration.toFixed(1)}s{' '}
          <input type="range" min={1.2} max={4.5} step={0.1} value={duration} onChange={(e) => setDuration(+e.target.value)} />
        </label>
        <button onClick={open} className="rounded bg-white/20 px-2 py-1">play</button>
        <button onClick={reset} className="rounded bg-white/20 px-2 py-1">reset</button>
      </div>
    </div>
  );
}
