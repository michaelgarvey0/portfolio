'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

type Particle = { x: number; y: number; len: number; speed: number; phase: number; alpha: number };

export default function Home() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<SVGSVGElement>(null);
  const midRef = useRef<SVGSVGElement>(null);
  const frontRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = sceneRef.current;
    const back = backRef.current;
    const mid = midRef.current;
    const front = frontRef.current;
    const canvas = canvasRef.current;
    if (!scene || !back || !mid || !front || !canvas) return;

    // Parallax — moving the front SVG moves the portal with it, since it's drawn inside the same viewBox.
    let cleanupParallax = () => {};
    if (!reduce && window.matchMedia('(hover: hover)').matches) {
      const onMove = (e: MouseEvent) => {
        const rect = scene.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        back.style.transform = `translateX(${nx * -6}px)`;
        mid.style.transform = `translateX(${nx * -14}px)`;
        front.style.transform = `translateX(${nx * -24}px)`;
      };
      const onLeave = () => {
        back.style.transform = '';
        mid.style.transform = '';
        front.style.transform = '';
      };
      scene.addEventListener('mousemove', onMove);
      scene.addEventListener('mouseleave', onLeave);
      cleanupParallax = () => {
        scene.removeEventListener('mousemove', onMove);
        scene.removeEventListener('mouseleave', onLeave);
      };
    }

    // Windblown sand particles
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(w: number, h: number): Particle {
      return {
        x: Math.random() * w,
        y: h * (0.4 + Math.random() * 0.5),
        len: 12 + Math.random() * 26,
        speed: 0.35 + Math.random() * 1.0,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.06 + Math.random() * 0.16,
      };
    }

    resize();
    window.addEventListener('resize', resize);

    const count = reduce ? 0 : 46;
    particles = Array.from({ length: count }, () => spawn(canvas.clientWidth, canvas.clientHeight));

    function tick(t: number) {
      if (!ctx || !canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.speed * 1.6;
        if (p.x > w + 40) {
          p.x = -40;
          p.y = h * (0.4 + Math.random() * 0.5);
        }
        const y = p.y + Math.sin(t / 900 + p.phase) * 3;
        ctx.strokeStyle = `rgba(220,233,251,${p.alpha})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(p.x, y);
        ctx.lineTo(p.x - p.len, y - p.len * 0.1);
        ctx.stroke();
      });
      if (!reduce) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cleanupParallax();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="home">
      <style jsx>{`
        .home {
          --sky-top: #0b1330;
          --sky-mid: #1e3a66;
          --sky-horizon: #7fa6c9;
          --ink: #101a2e;
          --paper: #eaf4ff;
          --portal: #4c86d6;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .scene {
          position: relative;
          width: 100%;
          height: min(100vh, 880px);
          min-height: 560px;
          overflow: hidden;
          background: var(--ink);
        }
        .sky {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 55%, var(--sky-horizon) 100%);
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: var(--paper);
          opacity: 0.5;
          z-index: 1;
        }
        @media (prefers-reduced-motion: no-preference) {
          .star {
            animation: twinkle 3.4s ease-in-out infinite;
          }
          :global(.portal-pulse) {
            animation: pulse 4.5s ease-in-out infinite;
            transform-origin: 1010px 185px;
          }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.75; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        .layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          will-change: transform;
          transition: transform 0.25s ease-out;
        }
        .back-dune { z-index: 2; }
        .mid-dune { z-index: 3; }
        .front-dune { z-index: 4; }
        .wind {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          width: 100%;
          height: 100%;
        }
        .hero-copy {
          position: absolute;
          z-index: 7;
          left: clamp(1.5rem, 6vw, 4.5rem);
          bottom: clamp(2rem, 8vh, 4.5rem);
          max-width: 30rem;
          color: var(--paper);
        }
        .eyebrow {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(234, 244, 255, 0.75);
          margin: 0 0 0.9rem;
        }
        h1 {
          font-family: ui-serif, "New York", Georgia, serif;
          font-weight: 600;
          font-size: clamp(2rem, 4.4vw, 3.1rem);
          line-height: 1.12;
          text-wrap: balance;
          margin: 0 0 1.1rem;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
        }
        .sub {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(234, 244, 255, 0.82);
          margin: 0 0 1.6rem;
          max-width: 34ch;
        }
        .cta {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          color: var(--ink);
          background: var(--paper);
          border: none;
          padding: 0.8rem 1.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px -8px rgba(0, 0, 0, 0.5);
        }
        .cta:focus-visible {
          outline: 2px solid var(--portal);
          outline-offset: 3px;
        }
      `}</style>

      <div className="scene" ref={sceneRef}>
        <div aria-hidden="true">
          <div className="sky" />
          <div className="star" style={{ left: '12%', top: '14%', animationDelay: '.2s' }} />
          <div className="star" style={{ left: '22%', top: '8%', animationDelay: '1.1s' }} />
          <div className="star" style={{ left: '35%', top: '20%', animationDelay: '.6s' }} />
          <div className="star" style={{ left: '48%', top: '10%', animationDelay: '1.6s' }} />
          <div className="star" style={{ left: '60%', top: '16%', animationDelay: '.3s' }} />
          <div className="star" style={{ left: '80%', top: '9%', animationDelay: '2s' }} />
          <div className="star" style={{ left: '90%', top: '18%', animationDelay: '.8s' }} />

          <svg ref={backRef} className="layer back-dune" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice">
            <path
              d="M0,420 C200,360 380,460 620,400 C860,340 1000,420 1200,380 C1320,360 1400,390 1440,380 L1440,700 L0,700 Z"
              fill="#8CA3BE"
            />
          </svg>

          <svg ref={midRef} className="layer mid-dune" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice">
            <defs>
              <clipPath id="midDuneClip">
                <path d="M0,520 C180,480 320,560 500,500 C680,440 780,300 950,260 C1080,230 1180,320 1300,360 C1380,385 1420,400 1440,400 L1440,700 L0,700 Z" />
              </clipPath>
              <filter id="grainMid">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="n" />
                <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0" />
              </filter>
            </defs>
            <path
              d="M0,520 C180,480 320,560 500,500 C680,440 780,300 950,260 C1080,230 1180,320 1300,360 C1380,385 1420,400 1440,400 L1440,700 L0,700 Z"
              fill="#5B7699"
            />
            {/* Grain clipped to the dune silhouette only — the sky and portal stay smooth. Faint here: atmospheric distance softens detail. */}
            <rect x="0" y="0" width="1440" height="700" filter="url(#grainMid)" clipPath="url(#midDuneClip)" />
          </svg>

          {/* Portal is drawn inside this SVG's own coordinate space, at the dune's actual peak (1010,255) —
              so it scales and positions together with the dune shape, and can never drift out of alignment. */}
          <svg ref={frontRef} className="layer front-dune" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice">
            <defs>
              <clipPath id="frontDuneClip">
                <path d="M0,620 C150,600 280,650 420,600 C560,550 680,420 820,340 C900,295 950,270 1010,255 C1070,270 1130,300 1220,360 C1320,420 1400,460 1440,470 L1440,700 L0,700 Z" />
              </clipPath>
              <filter id="grainFront">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="n" />
                <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.1 0" />
              </filter>
              <radialGradient id="portalHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EAF4FF" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#4C86D6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#4C86D6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="portalCore" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#BBD9FF" />
                <stop offset="55%" stopColor="#EAF4FF" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
            <path
              d="M0,620 C150,600 280,650 420,600 C560,550 680,420 820,340 C900,295 950,270 1010,255 C1070,270 1130,300 1220,360 C1320,420 1400,460 1440,470 L1440,700 L0,700 Z"
              fill="#22314A"
            />
            {/* Grain clipped to the dune silhouette — sits below the portal so the light itself stays clean. */}
            <rect x="0" y="0" width="1440" height="700" filter="url(#grainFront)" clipPath="url(#frontDuneClip)" />
            <circle className="portal-pulse" cx="1010" cy="185" r="150" fill="url(#portalHalo)" />
            <path
              d="M965,255 L965,185 C965,130 985,105 1010,105 C1035,105 1055,130 1055,185 L1055,255 Z"
              fill="url(#portalCore)"
              stroke="#EAF4FF"
              strokeWidth="2"
              strokeOpacity="0.9"
            />
          </svg>

          <canvas ref={canvasRef} className="wind" />
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Michael Garvey &mdash; Product &amp; UX</p>
          <h1>A peek inside my head.</h1>
          <p className="sub">I&apos;m Head of Product &amp; UX at Orgo. Step through to the work.</p>
          <Link href="/work" className="cta">
            Step through &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
