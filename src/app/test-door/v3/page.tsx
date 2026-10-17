'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useSpring, useTransform, type AnimationPlaybackControls } from 'framer-motion';

const PROJECTS = [
  { name: 'Orgo', src: '/assets/case-studies/orgo/preview.png' },
  { name: 'Webster', src: '/assets/case-studies/webster/preview.png' },
  { name: 'Inkbench', src: '/assets/case-studies/inkbench/preview.png' },
  { name: 'Orgo Brand', src: '/assets/case-studies/orgo-brand/preview.png' },
  { name: 'Newport in Bloom', src: '/assets/case-studies/newport-in-bloom/preview.png' },
  { name: 'Beeline', src: '/assets/case-studies/beeline/preview.png' },
];

const COLUMNS = [
  { items: [0, 3, 1, 4], dir: -1, speed: 42, offset: '-6vh' },
  { items: [2, 5, 0, 3], dir: 1, speed: 52, offset: '-30vh' },
  { items: [4, 1, 5, 2], dir: -1, speed: 36, offset: '-14vh' },
];

function Column({ items, dir, speed, offset }: (typeof COLUMNS)[number]) {
  const list = [...items, ...items];
  return (
    <div style={{ width: '24vw', marginTop: offset }}>
      <div style={{ animation: `drift${dir > 0 ? 'Down' : 'Up'} ${speed}s linear infinite` }}>
        {list.map((idx, i) => (
          <div key={i} style={{ marginBottom: '2.4vw' }}>
            <div
              style={{
                aspectRatio: '4 / 3',
                borderRadius: '0.9vw',
                overflow: 'hidden',
                background: '#e5e7eb',
                boxShadow: '0 1.2vw 3vw rgba(15,23,42,0.18)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PROJECTS[idx].src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ marginTop: '0.7vw', fontSize: '0.9vw', fontWeight: 600, color: '#475569', letterSpacing: '0.02em' }}>
              {PROJECTS[idx].name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestDoorV3() {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle');
  const [duration, setDuration] = useState(1.3);
  const [follow, setFollow] = useState(true);
  const [near, setNear] = useState(false);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const slitX = 66;
  const mouseX = useMotionValue(-1);
  const pointerWidth = useMotionValue(6);
  const slitWidth = useSpring(pointerWidth, { stiffness: 140, damping: 22, mass: 0.6 });
  const open = useMotionValue(0);

  const intro = useMotionValue(0);
  const centerPct = useTransform(mouseX, (m) => (follow && m >= 0 ? slitX + (m - slitX) * 0.035 : slitX));
  const widthVw = useTransform([slitWidth, open], ([w, o]: number[]) => w + (112 - w) * o);
  const clip = useTransform([centerPct, widthVw, intro], ([c, w, i]: number[]) => {
    const half = (w * i) / 2;
    const l = Math.max(0, c - half);
    const r = Math.max(0, 100 - c - half);
    return `inset(0 ${r}vw 0 ${l}vw)`;
  });
  const glowW = useTransform([widthVw, intro], ([w, i]: number[]) => `${Math.max(4, w * i * 2.2 + 6)}vw`);
  const glowLeft = useTransform(centerPct, (c) => `${c}vw`);
  const glowOpacity = useTransform([slitWidth, open, intro], ([w, o, i]: number[]) => Math.min(1, (0.35 + w / 18) * i + o));
  const copyOpacity = useTransform(open, [0, 0.35], [1, 0]);
  const copyBlur = useTransform(open, [0, 0.35], ['blur(0px)', 'blur(10px)']);
  const innerScale = useTransform(open, [0, 1], [1.18, 1]);
  const innerFade = useTransform(open, [0.82, 1], [1, 0]);
  const edgeLeft = useTransform(centerPct, (c) => `${c}vw`);
  const edgeWidth = useTransform(widthVw, (w) => `${w}vw`);
  const edgeOpacity = useTransform(open, [0, 0.2], [1, 0]);

  useEffect(() => {
    const c = animate(intro, 1, { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 });
    return () => c.stop();
  }, [intro]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      mouseX.set(x);
      const d = Math.abs(x - slitX);
      const proximity = Math.exp(-Math.pow(d / 16, 2));
      pointerWidth.set(phase === 'idle' ? 5 + proximity * 22 : 5);
      setNear(proximity > 0.45);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [mouseX, pointerWidth, phase]);

  const go = () => {
    if (phase === 'opening') return;
    setPhase('opening');
    controls.current?.stop();
    controls.current = animate(open, 1, { duration, ease: [0.76, 0, 0.18, 1], onComplete: () => setPhase('done') });
  };

  const reset = () => {
    controls.current?.stop();
    open.set(0);
    pointerWidth.set(5);
    setPhase('idle');
  };

  const fill = { position: 'absolute', inset: 0 } as const;

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#06080c', cursor: near && phase === 'idle' ? 'pointer' : 'default' }}
      onClick={() => near && go()}
    >
      <style>{`
        @keyframes driftUp { from{transform:translateY(0)} to{transform:translateY(-50%)} }
        @keyframes driftDown { from{transform:translateY(-50%)} to{transform:translateY(0)} }
        @keyframes rise { from{opacity:0;transform:translateY(1.2rem);filter:blur(8px)} to{opacity:1;transform:none;filter:none} }
      `}</style>

      <div style={{ ...fill, background: 'radial-gradient(60vw 70vh at 66% 50%, rgba(120,150,200,0.08), transparent 70%)' }} />

      <motion.div
        style={{
          position: 'absolute', top: '-10%', bottom: '-10%', left: glowLeft, width: glowW, x: '-50%',
          opacity: glowOpacity,
          background: 'radial-gradient(closest-side, rgba(180,210,255,0.55), rgba(180,210,255,0.12) 55%, transparent 100%)',
          filter: 'blur(18px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div style={{ ...fill, clipPath: clip, background: '#f9fafb', willChange: 'clip-path' }}>
        <motion.div style={{ ...fill, scale: innerScale, opacity: innerFade, transformOrigin: '66% 50%' }}>
          <div style={{ position: 'absolute', left: '15vw', top: 0, display: 'flex', gap: '2.4vw', width: '78vw', transform: 'rotate(-4deg) scale(1.1)', transformOrigin: '50% 50%' }}>
            {COLUMNS.map((c, i) => <Column key={i} {...c} />)}
          </div>
        </motion.div>
        <div style={{ ...fill, background: 'linear-gradient(90deg, rgba(249,250,251,0.0), rgba(249,250,251,0) )' }} />
      </motion.div>

      <motion.div
        style={{
          position: 'absolute', top: 0, bottom: 0, left: edgeLeft, width: edgeWidth, x: "-50%",
          pointerEvents: "none", opacity: edgeOpacity,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.9), transparent 6%, transparent 94%, rgba(255,255,255,0.9))',
          mixBlendMode: 'screen',
        }}
      />

      <div
        style={{
          ...fill, pointerEvents: 'none', opacity: 0.08, mixBlendMode: 'overlay',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <motion.div
        className="absolute flex flex-col justify-center"
        style={{ left: '8vw', top: 0, bottom: 0, maxWidth: '44vw', opacity: copyOpacity, filter: copyBlur, pointerEvents: phase === 'idle' ? 'auto' : 'none', zIndex: 5 }}
      >
        <div style={{ fontSize: '0.8rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', animation: 'rise 1s cubic-bezier(.2,.7,.2,1) 0.5s both' }}>
          Michael Garvey · Product Designer
        </div>
        <h1
          style={{
            marginTop: '1.4rem', color: '#fff', fontWeight: 700, fontSize: 'clamp(2.6rem, 5.4vw, 5.6rem)', lineHeight: 1.02, letterSpacing: '-0.035em',
            animation: 'rise 1.2s cubic-bezier(.2,.7,.2,1) 0.75s both',
          }}
        >
          Hey, I&apos;m Michael.
        </h1>
        <p style={{ marginTop: '1.4rem', color: 'rgba(255,255,255,0.62)', fontSize: 'clamp(1.05rem, 1.4vw, 1.45rem)', lineHeight: 1.45, maxWidth: '28ch', animation: 'rise 1.2s cubic-bezier(.2,.7,.2,1) 1s both' }}>
          Welcome to a little peek inside my brain.
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); go(); }}
          onPointerEnter={() => phase === 'idle' && pointerWidth.set(34)}
          onPointerLeave={() => phase === 'idle' && pointerWidth.set(5)}
          className="mt-10 inline-flex w-fit cursor-pointer items-center gap-3 text-lg font-semibold text-white"
          style={{ animation: 'rise 1.2s cubic-bezier(.2,.7,.2,1) 1.25s both', padding: '0.85rem 1.6rem', border: '1px solid rgba(255,255,255,0.28)', borderRadius: 999, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(6px)' }}
        >
          Lean in
          <span>→</span>
        </button>
      </motion.div>

      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 rounded-lg bg-white/10 p-3 text-sm text-white backdrop-blur" style={{ zIndex: 50 }}>
        <label>
          {duration.toFixed(1)}s{' '}
          <input type="range" min={0.6} max={3} step={0.1} value={duration} onChange={(e) => setDuration(+e.target.value)} />
        </label>
        <label><input type="checkbox" checked={follow} onChange={(e) => setFollow(e.target.checked)} /> slit follows cursor</label>
        <button onClick={go} className="rounded bg-white/20 px-2 py-1">play</button>
        <button onClick={reset} className="rounded bg-white/20 px-2 py-1">reset</button>
      </div>
    </div>
  );
}
