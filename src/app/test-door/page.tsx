'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls } from 'framer-motion';
import Lottie from 'lottie-react';
import backgroundAnimation from '../../../public/background.json';
import doorCrackAnimation from '../../../public/door.json';
import doorZoomAnimation from '../../../public/door-zoom.json';

const EASES: Record<string, [number, number, number, number]> = {
  cinematic: [0.76, 0, 0.24, 1],
  expo: [0.87, 0, 0.13, 1],
  push: [0.65, 0, 0.35, 1],
  gentle: [0.4, 0, 0.2, 1],
};

const LAST_FRAME = 299;

export default function TestDoor() {
  const [ease, setEase] = useState('cinematic');
  const [duration, setDuration] = useState(2.4);
  const [bloom, setBloom] = useState(true);
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle');

  const bgRef = useRef<any>(null);
  const zoomRef = useRef<any>(null);
  const crackRef = useRef<any>(null);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const p = useMotionValue(0);
  const panX = useTransform(p, [0, 1], ['0vw', '-25vw']);
  const bloomOpacity = useTransform(p, [0.72, 1], [0, 1]);
  const bloomScale = useTransform(p, [0.5, 1], [0.6, 2.4]);
  const copyOpacity = useTransform(p, [0, 0.18], [1, 0]);

  useEffect(() => {
    crackRef.current?.setSpeed(1.5);
    crackRef.current?.play();
    return p.on('change', (v) => {
      const f = v * LAST_FRAME;
      bgRef.current?.goToAndStop(f, true);
      zoomRef.current?.goToAndStop(f, true);
    });
  }, [p]);

  const open = () => {
    if (phase === 'opening') return;
    setPhase('opening');
    p.set(0);
    controls.current?.stop();
    controls.current = animate(p, 1, {
      duration,
      ease: EASES[ease],
      onComplete: () => setPhase('done'),
    });
  };

  const reset = () => {
    controls.current?.stop();
    p.set(0);
    bgRef.current?.goToAndStop(0, true);
    zoomRef.current?.goToAndStop(0, true);
    crackRef.current?.goToAndPlay(0, true);
    setPhase('idle');
  };

  const opening = phase !== 'idle';

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d2240]">
      <motion.div
        className="fixed"
        style={{ zIndex: 1, width: '200%', height: '100%', left: 0, bottom: 0, marginLeft: '-65%', x: panX, willChange: 'transform' }}
      >
        <Lottie
          lottieRef={bgRef}
          animationData={backgroundAnimation}
          loop={false}
          autoplay={false}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      <div
        className="fixed"
        style={{ zIndex: 2, width: '200%', height: '100%', left: '-25%', top: 0, opacity: opening ? 0 : 1 }}
      >
        <Lottie
          lottieRef={crackRef}
          animationData={doorCrackAnimation}
          loop={false}
          autoplay
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <motion.div
        className="fixed"
        style={{ zIndex: 2, width: '200%', height: '100%', left: 0, marginLeft: '-25%', x: panX, opacity: opening ? 1 : 0, willChange: 'transform' }}
      >
        <Lottie
          lottieRef={zoomRef}
          animationData={doorZoomAnimation}
          loop={false}
          autoplay={false}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      {bloom && (
        <motion.div
          className="pointer-events-none fixed inset-0"
          style={{
            zIndex: 5,
            opacity: bloomOpacity,
            scale: bloomScale,
            background: 'radial-gradient(circle at 56% 52%, #fff 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0) 70%)',
          }}
        />
      )}

      <motion.div className="fixed flex h-full w-full items-center" style={{ zIndex: 10, opacity: copyOpacity, pointerEvents: opening ? 'none' : 'auto' }}>
        <div style={{ marginLeft: '20%', width: '30%' }}>
          <h3 className="mb-8 text-3xl font-bold leading-relaxed text-white">
            Hey. I&apos;m Michael.<br />Welcome to a little peek inside my brain.
          </h3>
          <button
            onClick={open}
            className="cursor-pointer border border-white/20 bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm"
          >
            View my work
          </button>
        </div>
      </motion.div>

      <div
        className="fixed bottom-4 left-4 flex flex-wrap items-center gap-3 rounded-lg bg-black/60 p-3 text-sm text-white"
        style={{ zIndex: 50 }}
      >
        <label>
          ease{' '}
          <select value={ease} onChange={(e) => setEase(e.target.value)} className="bg-black/40">
            {Object.keys(EASES).map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label>
          {duration.toFixed(1)}s{' '}
          <input type="range" min={1.2} max={4} step={0.1} value={duration} onChange={(e) => setDuration(+e.target.value)} />
        </label>
        <label>
          <input type="checkbox" checked={bloom} onChange={(e) => setBloom(e.target.checked)} /> bloom
        </label>
        <button onClick={open} className="rounded bg-white/20 px-2 py-1">play</button>
        <button onClick={reset} className="rounded bg-white/20 px-2 py-1">reset</button>
      </div>
    </div>
  );
}
