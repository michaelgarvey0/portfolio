'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useSpring, useTransform, type AnimationPlaybackControls } from 'framer-motion';

const S = 100;
const C = 0.8660254;
const CX = 650;
const CY = 470;
const T = 30 * 86.6;
const U = 30 * 50;
const HX = 3.4;
const DW = 2.4;
const DH = 4.8;
const M1 = 0.22;
const M2 = 0.1;
const REVEAL = 0.3;
const THICK = 0.12;
const XC = HX + DW / 2;
const ZC = DH / 2;

type V3 = [number, number, number];
type V2 = [number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const rad = (d: number) => (d * Math.PI) / 180;
const smooth = (n: number) => n * n * (3 - 2 * n);

const iso = (x: number, y: number, z: number): V2 => [CX + (x - y) * C * S, CY + (x + y) * 0.5 * S - z * S];
const [DCX, DCY] = iso(XC, 0, ZC);

const front = (x: number, y: number, z: number): V2 => {
  const s = 1 + 0.14 * Math.max(y, -1);
  return [DCX + (x - XC) * S * s, DCY - (z - ZC) * S * s];
};

const PM = (x: number, y: number, z: number, t: number): V2 => {
  const a = iso(x, y, z);
  const b = front(x, y, z);
  return [r2(a[0] + (b[0] - a[0]) * t), r2(a[1] + (b[1] - a[1]) * t)];
};

const str = (list: V2[]) => list.map((p) => p.join(',')).join(' ');
const poly3 = (list: V3[], t: number) => str(list.map(([x, y, z]) => PM(x, y, z, t)));

interface Plane {
  iso: V2[];
  front: V2[];
}

const lerpPlane = (pl: Plane, t: number) => str(pl.iso.map((a, i) => [r2(a[0] + (pl.front[i][0] - a[0]) * t), r2(a[1] + (pl.front[i][1] - a[1]) * t)] as V2));

const BASE_L = front(0, 0, 0);
const BASE_R = front(10, 0, 0);
const TOP_L = front(0, 0, 7);
const TOP_R = front(10, 0, 7);
const dirL: V2 = [-644, 336];
const dirR: V2 = [756, 336];
const dirTL: V2 = [-644, -644];
const dirTR: V2 = [756, -644];
const at = (b: V2, d: V2, k: number): V2 => [b[0] + d[0] * k, b[1] + d[1] * k];

const PLANES: Record<string, Plane> = {
  back: {
    iso: [[-3000, -3000], [5000, -3000], [5000, 4000], [-3000, 4000]],
    front: [TOP_L, TOP_R, BASE_R, BASE_L],
  },
  left: {
    iso: [[CX, -3000], [CX, CY], [CX - T, CY + U], [CX - T, -3000]],
    front: [TOP_L, BASE_L, at(BASE_L, dirL, 5), at(TOP_L, dirTL, 5)],
  },
  ceiling: {
    iso: [[-3000, -4200], [5000, -4200], [5000, -3000], [-3000, -3000]],
    front: [TOP_L, TOP_R, at(TOP_R, dirTR, 5), at(TOP_L, dirTL, 5)],
  },
  right: {
    iso: [[5100, -3000], [5100, 4000], [5600, 4000], [5600, -3000]],
    front: [TOP_R, BASE_R, at(BASE_R, dirR, 5), at(TOP_R, dirTR, 5)],
  },
  floor: {
    iso: [[CX, CY], [CX - T, CY + U], [CX - T, 4000], [CX + T, 4000], [CX + T, CY + U], [CX, CY]],
    front: [BASE_L, at(BASE_L, dirL, 5), [-3000, 4000], [4600, 4000], at(BASE_R, dirR, 5), BASE_R],
  },
};

const ECHOES = [
  { color: '#e3f0ff', delay: 0.06 },
  { color: '#d3e2ff', delay: 0.12 },
  { color: '#e4dcff', delay: 0.18 },
  { color: '#fde2f0', delay: 0.24 },
];

const SPARKLES = [
  { x: 4.9, y: 0.4, z: 4.5, s: 1, d: 0 },
  { x: 3.6, y: 1.8, z: 2.4, s: 0.7, d: 1.3 },
  { x: 6.2, y: 1.6, z: 3.4, s: 0.8, d: 2.1 },
  { x: 4.2, y: 3.4, z: 1.2, s: 0.6, d: 0.7 },
  { x: 5.6, y: 4.6, z: 0.3, s: 0.9, d: 1.8 },
];

const PULL = 0.64;
const camFor = (v: number) => {
  if (v < 0.4) return 1 - (1 - PULL) * smooth(clamp01(v / 0.4));
  return PULL * Math.exp(Math.log(14 / PULL) * clamp01((v - 0.4) / 0.6));
};

function leaf(a: number, t: number) {
  const ca = Math.cos(rad(a));
  const sa = Math.sin(rad(a));
  const n: V2 = [-sa, ca];
  const pt = (u: number, v: number, back = false): V3 => {
    const off = back ? -THICK : 0;
    return [HX + u * DW * ca + off * n[0], u * DW * sa + off * n[1], v * DH];
  };
  const quad = (u0: number, u1: number, v0: number, v1: number) => poly3([pt(u0, v0), pt(u1, v0), pt(u1, v1), pt(u0, v1)], t);
  return {
    face: quad(0, 1, 0, 1),
    hinge: quad(0, 0.07, 0, 1),
    plate: quad(0.76, 0.88, 0.4, 0.56),
    edge: poly3([pt(1, 0), pt(1, 1), pt(1, 1, true), pt(1, 0, true)], t),
    top: poly3([pt(0, 1), pt(1, 1), pt(1, 1, true), pt(0, 1, true)], t),
    knob: PM(...pt(0.85, 0.48), t),
  };
}

const ring = (a: number, b: number, t: number) => ({
  left: poly3([[HX - a, 0, 0], [HX - a, 0, DH + a], [HX - b, 0, DH + b], [HX - b, 0, 0]], t),
  top: poly3([[HX - a, 0, DH + a], [HX + DW + a, 0, DH + a], [HX + DW + b, 0, DH + b], [HX - b, 0, DH + b]], t),
  right: poly3([[HX + DW + a, 0, DH + a], [HX + DW + a, 0, 0], [HX + DW + b, 0, 0], [HX + DW + b, 0, DH + b]], t),
});

export default function TestDoorV6() {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle');
  const [duration, setDuration] = useState(2.4);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const camRef = useRef<SVGGElement>(null);
  const echoRefs = useRef<(SVGGElement | null)[]>([]);

  const crack = useMotionValue(0);
  const p = useMotionValue(0);
  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });

  const t = useTransform(p, (v) => smooth(clamp01((v - 0.02) / 0.4)));
  const angle = useTransform([crack, p], ([c, v]: number[]) => c + (92 - c) * clamp01(v / 0.5));
  const light = useTransform([crack, p], ([c, v]: number[]) => {
    const base = (c / 12) * 0.5;
    return base + (1 - base) * clamp01(v / 0.6);
  });

  const back = useTransform(t, (tt) => lerpPlane(PLANES.back, tt));
  const left = useTransform(t, (tt) => lerpPlane(PLANES.left, tt));
  const right = useTransform(t, (tt) => lerpPlane(PLANES.right, tt));
  const ceiling = useTransform(t, (tt) => lerpPlane(PLANES.ceiling, tt));
  const floor = useTransform(t, (tt) => lerpPlane(PLANES.floor, tt));

  const ring1 = useTransform(t, (tt) => ring(M1, M2, tt));
  const ring2 = useTransform(t, (tt) => ring(M2, 0, tt));
  const r1l = useTransform(ring1, (r) => r.left);
  const r1t = useTransform(ring1, (r) => r.top);
  const r1r = useTransform(ring1, (r) => r.right);
  const r2l = useTransform(ring2, (r) => r.left);
  const r2t = useTransform(ring2, (r) => r.top);
  const r2r = useTransform(ring2, (r) => r.right);
  const hole = useTransform(t, (tt) => poly3([[HX, 0, 0], [HX + DW, 0, 0], [HX + DW, 0, DH], [HX, 0, DH]], tt));
  const backPlane = useTransform(t, (tt) => poly3([[HX - 1, -REVEAL, -1], [HX + DW + 1, -REVEAL, -1], [HX + DW + 1, -REVEAL, DH + 1], [HX - 1, -REVEAL, DH + 1]], tt));
  const jambL = useTransform(t, (tt) => poly3([[HX, 0, 0], [HX, 0, DH], [HX, -REVEAL, DH], [HX, -REVEAL, 0]], tt));
  const jambR = useTransform(t, (tt) => poly3([[HX + DW, 0, 0], [HX + DW, 0, DH], [HX + DW, -REVEAL, DH], [HX + DW, -REVEAL, 0]], tt));
  const lintel = useTransform(t, (tt) => poly3([[HX, 0, DH], [HX + DW, 0, DH], [HX + DW, -REVEAL, DH], [HX, -REVEAL, DH]], tt));

  const geom = useTransform([angle, t], ([a, tt]: number[]) => leaf(a, tt));
  const leafFace = useTransform(geom, (g) => g.face);
  const leafEdge = useTransform(geom, (g) => g.edge);
  const leafTop = useTransform(geom, (g) => g.top);
  const leafHinge = useTransform(geom, (g) => g.hinge);
  const leafPlate = useTransform(geom, (g) => g.plate);
  const knobX = useTransform(geom, (g) => g.knob[0]);
  const knobY = useTransform(geom, (g) => g.knob[1]);
  const leafShade = useTransform(angle, (a) => Math.sin(rad(a)) * 0.3);

  const spillA = useTransform([angle, t], ([a, tt]: number[]) => {
    const s = 0.7 + Math.sin(rad(Math.min(a, 70))) * 3.2;
    return poly3([[HX, 0, 0], [HX + DW, 0, 0], [HX + DW + s * 1.4, 9, 0], [HX - s * 0.5, 9, 0]], tt);
  });
  const spillB = useTransform([angle, t], ([a, tt]: number[]) => {
    const s = 0.4 + Math.sin(rad(Math.min(a, 70))) * 1.8;
    return poly3([[HX + 0.1, 0, 0], [HX + DW - 0.1, 0, 0], [HX + DW + s * 1.2, 5, 0], [HX - s * 0.2, 5, 0]], tt);
  });
  const spillOpacity = useTransform(light, (l) => l);
  const tOpacity = useTransform(t, (tt) => tt);
  const bloom = useTransform(p, [0.74, 0.97], [0, 1]);
  const copyOpacity = useTransform(p, [0, 0.12], [1, 0]);
  const camX = useTransform(mx, (v) => v * 8);
  const camY = useTransform(my, (v) => v * 5);

  useEffect(() => {
    return p.on('change', (v) => {
      if (camRef.current) camRef.current.style.transform = `translate(${DCX}px, ${DCY}px) scale(${camFor(v)}) translate(${-DCX}px, ${-DCY}px)`;
      ECHOES.forEach((e, i) => {
        const g = echoRefs.current[i];
        if (!g) return;
        const q = clamp01((v - e.delay) / (1 - e.delay));
        g.style.transform = `translate(${DCX}px, ${DCY}px) scale(${camFor(v - e.delay)}) translate(${-DCX}px, ${-DCY}px)`;
        g.style.opacity = String(Math.sin(Math.PI * clamp01(q * 1.15)) * 0.32);
      });
    });
  }, [p]);

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
  const [ex0, ey1] = PM(HX - M1, 0, 0, 1);
  const [ex1, ey0] = PM(HX + DW + M1, 0, DH + M1, 1);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#102a4c' }}>
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.15;transform:scale(0.6)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes breathe { 0%,100%{opacity:0.88} 50%{opacity:1} }
        @keyframes rise { from{opacity:0;transform:translateY(1.2rem)} to{opacity:1;transform:none} }
      `}</style>

      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="opening" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e4efff" />
          </linearGradient>
          <clipPath id="holeClip">
            <motion.polygon points={hole} />
          </clipPath>
        </defs>

        <motion.g style={{ x: camX, y: camY }}>
          <g ref={camRef} style={{ transformOrigin: '0 0' }}>
            <rect x={-3000} y={-3000} width={9000} height={8000} fill="#102a4c" />
            <motion.polygon points={back} fill="#102a4c" />
            <motion.polygon points={left} fill="#0a1d38" />
            <motion.polygon points={right} fill="#0c2342" />
            <motion.polygon points={ceiling} fill="#0b2140" />
            <motion.polygon points={floor} fill="#1d3f68" />

            <motion.g style={{ opacity: spillOpacity }}>
              <g style={{ animation: 'breathe 7s ease-in-out infinite' }}>
                <motion.polygon points={spillA} fill="#2e5a8c" />
                <motion.polygon points={spillB} fill="#3f72aa" />
              </g>
            </motion.g>

            <motion.g style={{ opacity: spillOpacity }}>
              {SPARKLES.map((sp, i) => {
                const [x, y] = PM(sp.x, sp.y, sp.z, 0);
                return (
                  <g key={i} transform={`translate(${x} ${y})`}>
                    <path
                      d="M0,-14 C1.5,-5 5,-1.5 14,0 C5,1.5 1.5,5 0,14 C-1.5,5 -5,1.5 -14,0 C-5,-1.5 -1.5,-5 0,-14Z"
                      fill="#fff7dc"
                      style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: `twinkle 3.6s ease-in-out ${sp.d}s infinite`, scale: String(sp.s) }}
                    />
                  </g>
                );
              })}
            </motion.g>

            <motion.polygon points={r1l} fill="#2d5a87" />
            <motion.polygon points={r1t} fill="#3a6b9b" />
            <motion.polygon points={r1r} fill="#27517e" />
            <motion.polygon points={hole} fill="#17375f" />
            <g clipPath="url(#holeClip)">
              <motion.polygon points={backPlane} fill="url(#opening)" />
              <motion.polygon points={jambL} fill="#1c4373" />
              <motion.g style={{ opacity: tOpacity }}>
                <motion.polygon points={jambR} fill="#122f56" />
                <motion.polygon points={lintel} fill="#0f2a4e" />
              </motion.g>
            </g>

            <motion.polygon points={leafEdge} fill="#1d426d" />
            <motion.polygon points={leafTop} fill="#1d426d" />
            <motion.polygon points={leafFace} fill="#2e5b8a" />
            <motion.polygon points={leafFace} fill="#000" style={{ opacity: leafShade }} />
            <motion.polygon points={leafHinge} fill="#1e4373" />
            <motion.polygon points={leafPlate} fill="#1c4270" />
            <motion.circle cx={knobX} cy={knobY} r="6.5" fill="#0a1d38" />
          </g>

          {ECHOES.map((e, i) => (
            <g key={e.color} ref={(el) => { echoRefs.current[i] = el; }} style={{ transformOrigin: '0 0', opacity: 0 }}>
              <rect x={ex0} y={ey0} width={ex1 - ex0} height={ey1 - ey0} rx={22} fill={e.color} />
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
