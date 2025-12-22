'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import ArrowForward from '@mui/icons-material/ArrowForward';
import backgroundAnimation from '../../public/background.json';
import doorCrackAnimation from '../../public/door.json';
import doorZoomAnimation from '../../public/door-zoom.json';

export default function Home() {
  const [isFullyOpening, setIsFullyOpening] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const doorCrackRef = useRef<any>(null);
  const doorZoomRef = useRef<any>(null);
  const backgroundRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);

    // Initialize all animations
    if (backgroundRef.current) {
      backgroundRef.current.goToAndStop(0, true);
      backgroundRef.current.setSpeed(2);
    }
    if (doorZoomRef.current) {
      doorZoomRef.current.goToAndStop(0, true);
      doorZoomRef.current.setSpeed(2);
    }
    if (doorCrackRef.current) {
      doorCrackRef.current.setSpeed(1.5);
      doorCrackRef.current.play();
    }

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
    }, 2500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background Lottie animation */}
      <motion.div
        className="fixed"
        initial={{ marginLeft: '-65%' }}
        animate={{
          marginLeft: isFullyOpening ? '-90%' : '-65%'
        }}
        transition={{ duration: 2, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
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

      {/* Door crack animation - keep mounted, toggle visibility */}
      <div
        className="absolute"
        style={{
          zIndex: 2,
          width: '150%',
          height: '100%',
          inset: '0%',
          objectFit: 'cover',
          opacity: isFullyOpening ? 0 : 1,
          pointerEvents: isFullyOpening ? 'none' : 'auto',
          transform: 'translateZ(0)',
          willChange: 'opacity',
          backfaceVisibility: 'hidden'
        }}
      >
        <Lottie
          lottieRef={doorCrackRef}
          animationData={doorCrackAnimation}
          loop={false}
          autoplay={true}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice'
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
        animate={{
          marginLeft: isFullyOpening ? '-25%' : '0%'
        }}
        transition={{ duration: 2, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          zIndex: 2,
          width: '150%',
          height: '100%',
          objectFit: 'cover',
          opacity: isFullyOpening ? 1 : 0,
          pointerEvents: isFullyOpening ? 'auto' : 'none',
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
            animate={{ opacity: isFadingOut ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-3xl font-bold text-white leading-relaxed md:text-4xl"
          >
            Hey. I'm Michael.<br />Welcome to a little peek inside my brain.
          </motion.h3>

          {/* Button with icon */}
          <motion.button
            onClick={handleDoorClick}
            disabled={isFadingOut}
            animate={{ opacity: isFadingOut ? 0 : 1 }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 1)', color: '#000000' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{
              transform: 'translateZ(0)',
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              cursor: 'pointer'
            }}
            className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 disabled:opacity-50 cursor-pointer"
          >
            <span>View my work</span>
            <ArrowForward />
          </motion.button>
        </div>
      </div>

      {/* Blue loading overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 bg-[#1a2332]"
        style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
      />
    </div>
  );
}
