'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls } from 'framer-motion';

const EASES: Record<string, [number, number, number, number]> = {
  cinematic: [0.76, 0, 0.24, 1],
  expo: [0.87, 0, 0.13, 1],
  push: [0.65, 0, 0.35, 1],
  gentle: [0.4, 0, 0.2, 1],
};

interface Palette {
  wallTop: string;
  wallBottom: string;
  side: string;
  floorTop: string;
  floorBottom: string;
  frame: string;
  frameInner: string;
  door: string;
  doorShade: string;
  light: string;
  lightRgb: string;
}

const PALETTES: Record<string, Palette> = {
  navy: {
    wallTop: '#12294a', wallBottom: '#0b1d36', side: '#071429',
    floorTop: '#1f4168', floorBottom: '#15304f',
    frame: '#2e5a87', frameInner: '#1c426f', door: '#35628f', doorShade: '#1f4670',
    light: '#e6f1ff', lightRgb: '190,220,255',
  },
  dusk: {
    wallTop: '#2b1a30', wallBottom: '#1b1023', side: '#120a18',
    floorTop: '#3c2434', floorBottom: '#281824',
    frame: '#8a5442', frameInner: '#5f3729', door: '#a2634c', doorShade: '#6e4034',
    light: '#fff1d6', lightRgb: '255,214,150',
  },
  ink: {
    wallTop: '#151515', wallBottom: '#0b0b0b', side: '#050505',
    floorTop: '#222', floorBottom: '#151515',
    frame: '#3b3b3b', frameInner: '#262626', door: '#454545', doorShade: '#2c2c2c',
    light: '#ffffff', lightRgb: '255,255,255',
  },
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function seeded(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function TestDoorV2() {
  const [paletteKey, setPaletteKey] = useState('navy');
  const [ease, setEase] = useState('cinematic');
  const [duration, setDuration] = useState(2.6);
  const [rays, setRays] = useState(true);
  const [dust, setDust] = useState(true);
  const [grain, setGrain] = useState(true);
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle');
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const pal = PALETTES[paletteKey];

  const crack = useMotionValue(0);
  const p = useMotionValue(0);

  const angle = useTransform([crack, p], ([c, v]: number[]) => c + (80 - c) * clamp01(v / 0.55));
  const light = useTransform([crack, p], ([c, v]: number[]) => {
    const base = (c / 9) * 0.45;
    return base + (1 - base) * clamp01(v / 0.6);
  });
  const doorTransform = useTransform(angle, (a) => `rotateY(${-a}deg)`);
  const doorBrightness = useTransform(angle, (a) => `brightness(${(0.72 + 0.32 * Math.cos((a * Math.PI) / 180)).toFixed(3)})`);
  const camScale = useTransform(p, (v) => Math.exp(Math.log(11) * clamp01((v - 0.08) / 0.92)));
  const bloom = useTransform(p, [0.7, 0.96], [0, 1]);
  const copyOpacity = useTransform(p, [0, 0.14], [1, 0]);
  const spillOpacity = useTransform(light, (l) => l * 0.9);
  const raysOpacity = useTransform(light, (l) => l * 0.5);
  const dustOpacity = useTransform(light, (l) => l);
  const openingGlow = useTransform(light, (l) => `inset 0 0 ${2 + l * 6}vh ${l * 1.5}vh rgba(255,255,255,${0.35 + l * 0.5})`);

  useEffect(() => {
    const c = animate(crack, [0, 9, 7.5], { duration: 2.4, ease: 'easeOut', times: [0, 0.55, 1], delay: 0.5 });
    return () => c.stop();
  }, [crack]);

  const specks = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        x: seeded(i + 1) * 46,
        y: 18 + seeded(i + 90) * 82,
        s: 1.5 + seeded(i + 200) * 3.5,
        o: 0.25 + seeded(i + 300) * 0.5,
        dx: (seeded(i + 400) - 0.5) * 7,
        dy: -3 - seeded(i + 500) * 8,
        t: 7 + seeded(i + 600) * 9,
        d: -seeded(i + 700) * 12,
      })),
    [],
  );

  const open = () => {
    if (phase === 'opening') return;
    setPhase('opening');
    p.set(0);
    controls.current?.stop();
    controls.current = animate(p, 1, { duration, ease: EASES[ease], onComplete: () => setPhase('done') });
  };

  const reset = () => {
    controls.current?.stop();
    p.set(0);
    setPhase('idle');
  };

  const vars = {
    '--dh': '54vh',
    '--dw': 'calc(var(--dh) * 0.62)',
    '--dx': '58vw',
    '--floor': '76vh',
    '--dtop': 'calc(var(--floor) - var(--dh))',
    '--wallTop': pal.wallTop, '--wallBottom': pal.wallBottom, '--side': pal.side,
    '--floorTop': pal.floorTop, '--floorBottom': pal.floorBottom,
    '--frame': pal.frame, '--frameInner': pal.frameInner,
    '--door': pal.door, '--doorShade': pal.doorShade,
    '--light': pal.light, '--lrgb': pal.lightRgb,
  } as React.CSSProperties;

  const opening = phase !== 'idle';
  const fill = { position: 'absolute', inset: 0 } as const;

  return (
    <div className="fixed inset-0 overflow-hidden bg-black" style={vars}>
      <style>{`
        @keyframes mote { 0%{transform:translate(0,0);opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{transform:translate(var(--mx),var(--my));opacity:0} }
        @keyframes rise { from{opacity:0;transform:translateY(1.4rem);filter:blur(8px)} to{opacity:1;transform:none;filter:none} }
      `}</style>

      <motion.div
        style={{ ...fill, scale: camScale, transformOrigin: 'calc(var(--dx) + var(--dw) * 0.6) calc(var(--dtop) + var(--dh) * 0.45)', willChange: 'transform' }}
      >
        <div style={{ ...fill, background: 'linear-gradient(180deg, var(--wallTop) 0%, var(--wallBottom) 76%)' }} />
        <div
          style={{ ...fill, background: 'var(--side)', clipPath: 'polygon(0 0, 13vw 0, 13vw var(--floor), 0 100vh)' }}
        />
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 'var(--floor)', bottom: 0,
            background: 'linear-gradient(180deg, var(--floorTop), var(--floorBottom))',
          }}
        />
        <div
          style={{ ...fill, clipPath: 'polygon(0 100vh, 13vw var(--floor), 13vw calc(var(--floor) + 0.4vh), 0 calc(100vh + 0.4vh))', background: 'rgba(255,255,255,0.05)' }}
        />

        <motion.div
          style={{
            ...fill,
            opacity: spillOpacity,
            background: 'linear-gradient(200deg, rgba(var(--lrgb),0.75) 0%, rgba(var(--lrgb),0.18) 55%, rgba(var(--lrgb),0) 100%)',
            clipPath: 'polygon(var(--dx) var(--floor), calc(var(--dx) + var(--dw) * 0.9) var(--floor), calc(var(--dx) + var(--dw) + 14vw) 100vh, calc(var(--dx) - 40vw) 100vh)',
            filter: 'blur(14px)',
          }}
        />

        {rays && (
          <motion.div style={{ ...fill, opacity: raysOpacity, mixBlendMode: 'screen', pointerEvents: 'none' }}>
            {[
              { a: -14, b: -9, o: 0.5 },
              { a: -22, b: -17, o: 0.35 },
              { a: -31, b: -27, o: 0.28 },
              { a: -6, b: -3, o: 0.3 },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  ...fill,
                  background: `linear-gradient(190deg, rgba(var(--lrgb),${r.o}), rgba(var(--lrgb),0) 70%)`,
                  clipPath: `polygon(calc(var(--dx) + var(--dw) * 0.1) calc(var(--dtop) + var(--dh) * 0.25), ${r.a * 4 + 18}vw 100vh, ${r.b * 4 + 18}vw 100vh)`,
                  filter: 'blur(7px)',
                }}
              />
            ))}
          </motion.div>
        )}

        <div
          style={{
            position: 'absolute', left: 'var(--dx)', top: 'var(--dtop)', width: 'var(--dw)', height: 'var(--dh)',
            perspective: '110vh', perspectiveOrigin: 'calc(50vw - var(--dx)) calc(50vh - var(--dtop))',
          }}
        >
          <div style={{ position: 'absolute', inset: '-4.2vh', border: '2.2vh solid var(--frame)', background: 'var(--frame)' }}>
            <div style={{ position: 'absolute', inset: 0, border: '1.1vh solid var(--frameInner)' }} />
          </div>
          <motion.div
            style={{
              ...fill,
              background: 'linear-gradient(180deg, #fff 0%, rgba(var(--lrgb),0.55) 100%), #fff',
              boxShadow: openingGlow,
            }}
          />
          <motion.div
            style={{
              ...fill,
              transformOrigin: '0% 50%',
              transform: doorTransform,
              filter: doorBrightness,
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(90deg, var(--doorShade), var(--door) 18%, var(--door))',
              boxShadow: 'inset 0 0 0 0.5vh rgba(0,0,0,0.12)',
            }}
          >
            <div style={{ position: 'absolute', left: '14%', right: '14%', top: '8%', height: '36%', background: 'var(--doorShade)', opacity: 0.55, boxShadow: 'inset 0 0.5vh 1vh rgba(0,0,0,0.35), 0 0.2vh 0 rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', left: '14%', right: '14%', top: '52%', height: '38%', background: 'var(--doorShade)', opacity: 0.55, boxShadow: 'inset 0 0.5vh 1vh rgba(0,0,0,0.35), 0 0.2vh 0 rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', right: '7%', top: '50%', width: '4.2vh', height: '4.2vh', marginTop: '-2.1vh', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4), rgba(0,0,0,0.65))', boxShadow: '0 0.5vh 1vh rgba(0,0,0,0.5)' }} />
          </motion.div>
        </div>

        {dust && (
          <motion.div style={{ ...fill, opacity: dustOpacity, pointerEvents: 'none' }}>
            {specks.map((s, i) => (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  left: `calc(var(--dx) - 40vw + ${s.x}vw)`,
                  top: `${s.y}vh`,
                  width: s.s, height: s.s, borderRadius: '50%',
                  background: `rgba(var(--lrgb),${s.o})`,
                  boxShadow: `0 0 ${s.s * 2}px rgba(var(--lrgb),0.6)`,
                  ['--mx' as string]: `${s.dx}vw`, ['--my' as string]: `${s.dy}vh`,
                  animation: `mote ${s.t}s linear ${s.d}s infinite`,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      <div
        style={{ ...fill, pointerEvents: 'none', background: 'radial-gradient(ellipse at 62% 48%, transparent 38%, rgba(0,0,0,0.5) 100%)' }}
      />
      {grain && (
        <div
          style={{
            ...fill, pointerEvents: 'none', opacity: 0.07, mixBlendMode: 'overlay',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      )}

      <motion.div style={{ ...fill, background: '#fff', opacity: bloom, pointerEvents: 'none', zIndex: 20 }} />

      <motion.div
        className="absolute flex items-center"
        style={{ left: 0, top: 0, bottom: 0, width: '100%', opacity: copyOpacity, zIndex: 30, pointerEvents: opening ? 'none' : 'auto' }}
      >
        <div style={{ marginLeft: '9vw', maxWidth: '34vw' }}>
          <h1
            className="font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 3.6vw, 3.6rem)', lineHeight: 1.12, letterSpacing: '-0.02em', animation: 'rise 1.1s cubic-bezier(.2,.7,.2,1) 0.9s both' }}
          >
            Hey, I&apos;m Michael.
          </h1>
          <p
            style={{ marginTop: '1.1rem', fontSize: 'clamp(1.05rem, 1.35vw, 1.4rem)', lineHeight: 1.45, color: 'rgba(255,255,255,0.78)', animation: 'rise 1.1s cubic-bezier(.2,.7,.2,1) 1.15s both' }}
          >
            Welcome to a little peek inside my brain.
          </p>
          <button
            onClick={open}
            className="group mt-9 inline-flex cursor-pointer items-center gap-3 border border-white/25 bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white hover:text-black"
            style={{ animation: 'rise 1.1s cubic-bezier(.2,.7,.2,1) 1.45s both' }}
          >
            Step inside
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 rounded-lg bg-black/70 p-3 text-sm text-white" style={{ zIndex: 50 }}>
        <label>
          palette{' '}
          <select value={paletteKey} onChange={(e) => setPaletteKey(e.target.value)} className="bg-black/40">
            {Object.keys(PALETTES).map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label>
          ease{' '}
          <select value={ease} onChange={(e) => setEase(e.target.value)} className="bg-black/40">
            {Object.keys(EASES).map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label>
          {duration.toFixed(1)}s{' '}
          <input type="range" min={1.2} max={4.5} step={0.1} value={duration} onChange={(e) => setDuration(+e.target.value)} />
        </label>
        <label><input type="checkbox" checked={rays} onChange={(e) => setRays(e.target.checked)} /> rays</label>
        <label><input type="checkbox" checked={dust} onChange={(e) => setDust(e.target.checked)} /> dust</label>
        <label><input type="checkbox" checked={grain} onChange={(e) => setGrain(e.target.checked)} /> grain</label>
        <button onClick={open} className="rounded bg-white/20 px-2 py-1">play</button>
        <button onClick={reset} className="rounded bg-white/20 px-2 py-1">reset</button>
      </div>
    </div>
  );
}
