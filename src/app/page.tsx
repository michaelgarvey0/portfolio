'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Lottie from 'lottie-react';
import ArrowForward from '@mui/icons-material/ArrowForward';
import backgroundAnimation from '../../public/background.json';
import backgroundMobileAnimation from '../../public/background-mobile.json';
import doorCrackAnimation from '../../public/door.json';
import doorMobileAnimation from '../../public/door-mobile.json';
import doorZoomAnimation from '../../public/door-zoom.json';
import doorZoomMobileAnimation from '../../public/door-zoom-mobile.json';

const DOOR_SETTLE_FRAME = 62;
const DOOR_OPEN_FRAME = 76;
const ENTRANCE_MS = 1700;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// The door swing is eased inside the animation, so most of the visible movement happens in the
// first frames. These map "how open it looks" (0-1) to a frame, so hover can ease evenly both ways.
const bezierY = (t: number) => {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const s = (lo + hi) / 2;
    const x = 3 * (1 - s) * (1 - s) * s * 0.33 + 3 * (1 - s) * s * s * 0.11 + s * s * s;
    if (x < t) lo = s;
    else hi = s;
  }
  const s = (lo + hi) / 2;
  return 1 - (1 - s) * (1 - s) * (1 - s);
};
const swingAt = (frame: number) => bezierY(Math.min(1, Math.max(0, (frame - 30) / 120)));
const SETTLE_SWING = swingAt(DOOR_SETTLE_FRAME);
const frameForSwing = (swing: number) => {
  let lo = 30;
  let hi = DOOR_OPEN_FRAME;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (swingAt(mid) < swing) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};
const OPEN_SWING = swingAt(DOOR_OPEN_FRAME);
const frameForOpenness = (u: number) => frameForSwing(SETTLE_SWING + (OPEN_SWING - SETTLE_SWING) * u);

export default function Home() {
  // Check sessionStorage immediately before rendering
  const isReturningFromStorage = typeof window !== 'undefined' && sessionStorage.getItem('isReturning') === 'true';

  const [isReturning] = useState(isReturningFromStorage);
  const [isFullyOpening, setIsFullyOpening] = useState(isReturningFromStorage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReversing, setIsReversing] = useState(isReturningFromStorage);
  const [reverseReady, setReverseReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const doorCrackRef = useRef<any>(null);
  const doorZoomRef = useRef<any>(null);
  const backgroundRef = useRef<any>(null);
  const doorFrame = useRef({ current: 0, target: 0, rate: 6, live: false });
  const overButtonRef = useRef(false);
  const entranceRef = useRef({ start: 0, done: false });
  const rootRef = useRef<HTMLDivElement>(null);
  const overDoorRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);

    // Check for mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Clear the sessionStorage flag immediately
    if (isReturning) {
      sessionStorage.removeItem('isReturning');
    }

    if (isReturning) {
      // Reverse animation sequence
      // Need to wait for Lottie instances to be ready
      setTimeout(() => {
        // Start with zoom/door open state, then reverse using getDuration
        if (backgroundRef.current && doorZoomRef.current) {
          const bgLastFrame = backgroundRef.current.getDuration(true) - 1;
          const doorLastFrame = doorZoomRef.current.getDuration(true) - 1;

          backgroundRef.current.goToAndStop(bgLastFrame, true);
          doorZoomRef.current.goToAndStop(doorLastFrame, true);

          // Mark as ready to show
          setReverseReady(true);

          // Small delay to ensure frames are set before playing
          setTimeout(() => {
            backgroundRef.current.setDirection(-1);
            backgroundRef.current.setSpeed(5);
            backgroundRef.current.play();

            doorZoomRef.current.setDirection(-1);
            doorZoomRef.current.setSpeed(5);
            doorZoomRef.current.play();

            // Immediately start reversing horizontal movement with the zoom
            setIsFullyOpening(false);

            // After zoom completes, fade in text/button and clear reversing state
            setTimeout(() => {
              setIsReversing(false);
              setShowButton(true);
            }, 1400);
          }, 50);
        }
      }, 100);

      return;
    }

    // Normal forward animation
    if (backgroundRef.current) {
      backgroundRef.current.goToAndStop(0, true);
      backgroundRef.current.setDirection(1);
      backgroundRef.current.setSpeed(5);
    }
    if (doorZoomRef.current) {
      doorZoomRef.current.goToAndStop(0, true);
      doorZoomRef.current.setDirection(1);
      doorZoomRef.current.setSpeed(5);
    }
    if (doorCrackRef.current) {
      doorCrackRef.current.goToAndStop(frameForSwing(0), true);
    }
    entranceRef.current = { start: performance.now(), done: false };

    // Debug: Log SVG structure after Lottie renders
    setTimeout(() => {
      const doorGlowDiv = document.querySelector('.door-glow');
      if (doorGlowDiv) {
        const svg = doorGlowDiv.querySelector('svg');
        if (svg) {
          console.log('=== SVG RENDERED ===');
          console.log('SVG HTML (first 3000 chars):', svg.innerHTML.substring(0, 3000));

          // Try to find white elements
          const allRects = svg.querySelectorAll('rect');
          const allPaths = svg.querySelectorAll('path');
          console.log('Total rects:', allRects.length);
          console.log('Total paths:', allPaths.length);

          allRects.forEach((rect, i) => {
            const fill = rect.getAttribute('fill');
            if (fill && (fill.includes('255') || fill.includes('FFF') || fill.includes('fff') || fill.includes('white'))) {
              console.log(`White rect ${i}:`, fill, rect);
            }
          });

          allPaths.forEach((path, i) => {
            const fill = path.getAttribute('fill');
            if (fill && (fill.includes('255') || fill.includes('FFF') || fill.includes('fff') || fill.includes('white'))) {
              console.log(`White path ${i}:`, fill, path);
            }
          });
        }
      }
    }, 3000);

    // Show button after animation completes (4s for 1.5x speed + small delay)
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 4200);

    // Hover only takes over once the entrance has settled, so it can never interrupt it
    const liveTimer = setTimeout(() => {
      doorFrame.current.current = 0;
      doorFrame.current.live = true;
      doorFrame.current.target = overDoorRef.current || overButtonRef.current ? 1 : 0;
    }, ENTRANCE_MS + 60);

    const onMove = (e: PointerEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw <= 767;
      const scale = Math.max((2 * vw) / 8000, vh / 2500);
      const offX = (2 * vw - 8000 * scale) / 2;
      const offY = (vh - 2500 * scale) / 2;
      const toX = (x: number) => (mobile ? -0.5 : -0.25) * vw + offX + scale * (3860 + (x - 4000) * 0.83333);
      const toY = (y: number) => offY + scale * (1250 + (y - 1500) * 0.83333);
      const inDoor = e.clientX >= toX(3694) && e.clientX <= toX(4641) && e.clientY >= toY(742) && e.clientY <= toY(2400);
      overDoorRef.current = inDoor;
      if (rootRef.current) rootRef.current.style.cursor = inDoor ? 'pointer' : '';
      if (doorFrame.current.live) {
        doorFrame.current.target = inDoor || overButtonRef.current ? 1 : 0;
      }
    };
    const onLeave = () => {
      overDoorRef.current = false;
      if (rootRef.current) rootRef.current.style.cursor = '';
      if (doorFrame.current.live) doorFrame.current.target = overButtonRef.current ? 1 : 0;
    };
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const d = doorFrame.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const ent = entranceRef.current;
      if (!ent.done && ent.start && doorCrackRef.current) {
        const t = Math.min(1, (now - ent.start) / ENTRANCE_MS);
        doorCrackRef.current.goToAndStop(frameForSwing(SETTLE_SWING * easeInOutCubic(t)), true);
        if (t >= 1) ent.done = true;
      }
      if (d.live && doorCrackRef.current) {
        const next = d.current + (d.target - d.current) * Math.min(1, dt * d.rate);
        if (Math.abs(next - d.current) > 0.02) {
          d.current = next;
          doorCrackRef.current.goToAndStop(frameForOpenness(next), true);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearTimeout(buttonTimer);
      clearTimeout(liveTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const handleDoorClick = () => {
    if (rootRef.current) rootRef.current.style.cursor = '';
    overDoorRef.current = false;
    const d = doorFrame.current;
    if (d.live && d.current < 0.97) {
      d.target = 1;
      d.rate = 24;
      setIsFadingOut(true);
      setTimeout(() => {
        d.live = false;
        startDoorOpen();
      }, 180);
      return;
    }
    d.live = false;
    startDoorOpen();
  };

  const startDoorOpen = () => {
    setIsFadingOut(true);

    // Reset Lotties to forward direction and starting position
    if (doorZoomRef.current) {
      doorZoomRef.current.goToAndStop(0, true);
      doorZoomRef.current.setDirection(1);
      doorZoomRef.current.setSpeed(5);
    }
    if (backgroundRef.current) {
      backgroundRef.current.goToAndStop(0, true);
      backgroundRef.current.setDirection(1);
      backgroundRef.current.setSpeed(5);
    }

    setIsFullyOpening(true);
    if (doorZoomRef.current) {
      doorZoomRef.current.play();
    }
    if (backgroundRef.current) {
      backgroundRef.current.play();
    }
    setTimeout(() => {
      sessionStorage.setItem('isFromHome', 'true');
      router.push('/work');
    }, 2200);
  };

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen overflow-hidden bg-white"
      onClick={() => {
        if (overDoorRef.current && !isFadingOut && !isReversing) handleDoorClick();
      }}
    >
      {/* Background Lottie animation */}
      <motion.div
        className="fixed background-lottie"
        initial={{ marginLeft: isMobile ? undefined : (isReturning ? '-90%' : '-65%') }}
        animate={{
          marginLeft: isMobile ? undefined : (isFullyOpening ? '-90%' : '-65%')
        }}
        transition={{
          duration: 2,
          delay: 0,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{
          zIndex: 1,
          width: '200%',
          height: '100%',
          inset: 'auto 0% 0%',
          objectFit: 'cover',
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <Lottie
          lottieRef={backgroundRef}
          animationData={isMobile ? backgroundMobileAnimation : backgroundAnimation}
          loop={false}
          autoplay={false}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice'
          }}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </motion.div>

      {/* Door crack animation - keep mounted, toggle visibility - hide completely when returning */}
      <div
        className="fixed door-glow door-crack-responsive"
        style={{
          zIndex: 2,
          width: '200%',
          height: '100%',
          left: '-25%',
          top: '0%',
          objectFit: 'cover',
          opacity: (isFullyOpening || isReturning) ? 0 : 1,
          pointerEvents: (isFullyOpening || isReturning) ? 'none' : 'auto',
          transform: 'translateZ(0)',
          willChange: 'opacity',
          backfaceVisibility: 'hidden',
          display: isReturning ? 'none' : 'block'
        }}
      >
        <style jsx>{`
          .door-crack-responsive {
            /* Mobile Landscape - 767px and below - center door */
            @media (max-width: 767px) {
              left: -50% !important;
              height: 100% !important;
              bottom: 0 !important;
              top: auto !important;
            }
          }
        `}</style>
        <Lottie
          lottieRef={doorCrackRef}
          animationData={isMobile ? doorMobileAnimation : doorCrackAnimation}
          loop={false}
          autoplay={true}
          renderer="svg"
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
            progressiveLoad: false,
            hideOnTransparent: true,
            filterSize: {
              width: '200%',
              height: '200%',
              x: '-50%',
              y: '-50%'
            }
          }}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      {/* Door zoom animation - keep mounted, toggle visibility */}
      <motion.div
        className="fixed door-zoom-responsive"
        initial={{ marginLeft: isMobile ? '-50%' : (isReturning ? '-50%' : '-25%') }}
        animate={{
          marginLeft: isMobile ? '-50%' : (isFullyOpening ? '-50%' : '-25%')
        }}
        transition={{
          duration: 2,
          delay: 0,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{
          zIndex: 2,
          width: '200%',
          height: '100%',
          objectFit: 'cover',
          opacity: (isFullyOpening || isReturning) ? 1 : 0,
          pointerEvents: (isFullyOpening || isReturning) ? 'auto' : 'none',
          transform: 'translateZ(0)',
          willChange: 'opacity',
          backfaceVisibility: 'hidden'
        }}
      >
        <Lottie
          lottieRef={doorZoomRef}
          animationData={isMobile ? doorZoomMobileAnimation : doorZoomAnimation}
          loop={false}
          autoplay={false}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice'
          }}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </motion.div>

      {/* Hero copy container - positioned on left */}
      <div
        className="fixed flex items-center hero-container"
        style={{
          zIndex: 10,
          width: '100%',
          height: '100%',
          perspective: '902px',
          perspectiveOrigin: '50%'
        }}
      >
        <style jsx>{`
          .hero-container {
            align-items: center;
          }
          .hero-content {
            /* Desktop (base) - left side */
            margin-left: 20%;
            width: 30%;
            align-items: flex-start;
          }
          .hero-content :global(h3) {
            text-align: left;
          }
          /* Tablet - 991px and below - closer to LEFT */
          @media (max-width: 991px) {
            .hero-content {
              margin-left: 10%;
              width: 40%;
            }
          }
          /* Mobile Landscape - 767px and below - centered ABOVE door */
          @media (max-width: 767px) {
            .hero-container {
              align-items: flex-start;
            }
            .hero-content {
              margin-left: 0;
              width: 100%;
              height: 50vh;
              align-items: center;
              justify-content: center;
              padding: 0 1.5rem;
            }
            .hero-content :global(h3) {
              text-align: center;
            }
          }
          /* Mobile Portrait - 478px and below */
          @media (max-width: 478px) {
            .hero-content {
              padding: 0 1rem;
            }
          }

          /* Mobile Lottie positioning */
          @media (max-width: 767px) {
            :global(.background-lottie) {
              height: 100% !important;
              bottom: 0 !important;
              top: auto !important;
            }
            :global(.door-zoom-responsive) {
              height: 100% !important;
              bottom: 0 !important;
              top: auto !important;
            }
          }
        `}</style>
        <div className="relative flex flex-col hero-content" style={{ zIndex: 100 }}>
          <motion.h3
            animate={{ opacity: (isFadingOut || isReversing || (isReturning && !showButton)) ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-2xl font-bold text-white leading-relaxed md:text-3xl"
          >
            <span className="hidden md:inline">Hey. I'm Michael.<br />Welcome to a little peek inside my brain.</span>
            <span className="md:hidden">Hey. I'm Michael.<br />Welcome to a little peek<br />inside my brain.</span>
          </motion.h3>

          {/* Button with icon */}
          <motion.button
            onClick={handleDoorClick}
            onPointerEnter={() => {
              overButtonRef.current = true;
              if (doorFrame.current.live) doorFrame.current.target = 1;
            }}
            onPointerLeave={() => {
              overButtonRef.current = false;
              if (doorFrame.current.live) doorFrame.current.target = overDoorRef.current ? 1 : 0;
            }}
            disabled={isFadingOut || isReversing || (isReturning && !showButton)}
            initial={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            animate={{
              opacity: (isFadingOut || isReversing || (isReturning && !showButton)) ? 0 : 1,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: { backgroundColor: { duration: 0.15 } }
            }}
            whileHover={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              color: '#000000',
              transition: { backgroundColor: { duration: 0.15, ease: 'easeOut' }, color: { duration: 0 } }
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{
              transform: 'translateZ(0)',
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              cursor: 'pointer'
            }}
            className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm border border-white/20 disabled:opacity-50 cursor-pointer"
          >
            <span>View my work</span>
            <ArrowForward />
          </motion.button>
        </div>
      </div>

      {/* Blue loading overlay - only show on initial load, NOT when returning */}
      {!isReturning && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 bg-[#1a2332]"
          style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
        />
      )}

      {/* White loading overlay when returning - hide content until reverse is ready */}
      {isReturning && !reverseReady && (
        <div className="fixed inset-0 z-50 bg-white" />
      )}
    </div>
  );
}
