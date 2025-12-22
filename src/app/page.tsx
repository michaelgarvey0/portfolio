'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Lottie from 'lottie-react';
import ArrowForward from '@mui/icons-material/ArrowForward';
import backgroundAnimation from '../../public/background.json';
import doorCrackAnimation from '../../public/door.json';
import doorZoomAnimation from '../../public/door-zoom.json';

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
  const doorCrackRef = useRef<any>(null);
  const doorZoomRef = useRef<any>(null);
  const backgroundRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);

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
            }, 1600);
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
      doorCrackRef.current.setDirection(1);
      doorCrackRef.current.setSpeed(1.5);
      doorCrackRef.current.play();
    }

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

    return () => {
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleDoorClick = () => {
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

    setTimeout(() => {
      setIsFullyOpening(true);
      if (doorZoomRef.current) {
        doorZoomRef.current.play();
      }
      if (backgroundRef.current) {
        backgroundRef.current.play();
      }
    }, 250);
    setTimeout(() => {
      router.push('/work');
    }, 2200);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background Lottie animation */}
      <motion.div
        className="fixed"
        initial={{ marginLeft: isReturning ? '-90%' : '-65%' }}
        animate={{
          marginLeft: isFullyOpening ? '-90%' : '-65%'
        }}
        transition={{
          duration: 1.2,
          delay: isReturning ? 0 : 0.25,
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
          animationData={backgroundAnimation}
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
        className="absolute door-glow"
        style={{
          zIndex: 2,
          width: '150%',
          height: '100%',
          inset: '0%',
          objectFit: 'cover',
          opacity: (isFullyOpening || isReturning) ? 0 : 1,
          pointerEvents: (isFullyOpening || isReturning) ? 'none' : 'auto',
          transform: 'translateZ(0)',
          willChange: 'opacity',
          backfaceVisibility: 'hidden',
          display: isReturning ? 'none' : 'block'
        }}
      >
        <Lottie
          lottieRef={doorCrackRef}
          animationData={doorCrackAnimation}
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
        className="fixed"
        initial={{ marginLeft: isReturning ? '-25%' : '0%' }}
        animate={{
          marginLeft: isFullyOpening ? '-25%' : '0%'
        }}
        transition={{
          duration: 1.2,
          delay: isReturning ? 0 : 0.25,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{
          zIndex: 2,
          width: '150%',
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
          animationData={doorZoomAnimation}
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
        className="fixed flex items-center justify-start"
        style={{
          zIndex: 10,
          width: '30%',
          height: '100%',
          marginLeft: '20%',
          perspective: '902px',
          perspectiveOrigin: '50%'
        }}
      >
        <div className="relative flex flex-col items-start" style={{ zIndex: 100 }}>
          <motion.h3
            animate={{ opacity: (isFadingOut || isReversing || (isReturning && !showButton)) ? 0 : 1 }}
            transition={{ duration: 0.2, delay: (isReversing && showButton) ? 0 : 0 }}
            className="mb-8 text-2xl font-bold text-white leading-relaxed md:text-3xl"
          >
            Hey. I'm Michael.<br />Welcome to a little peek inside my brain.
          </motion.h3>

          {/* Button with icon */}
          <motion.button
            onClick={handleDoorClick}
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
            transition={{
              duration: 0.5,
              delay: (isReversing && showButton) ? 0 : 0
            }}
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
