'use client';

import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import doorZoomAnimation from '../../../public/door-zoom.json';

export default function TestReverse() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handlePlayReverse = () => {
    console.log('=== PLAY REVERSE CLICKED ===');

    if (!lottieRef.current) {
      console.error('Lottie ref is null!');
      return;
    }

    console.log('Lottie instance:', lottieRef.current);
    console.log('Total frames:', lottieRef.current.getDuration(true));

    // Go to last frame first
    const lastFrame = lottieRef.current.getDuration(true) - 1;
    lottieRef.current.goToAndStop(lastFrame, true);
    console.log(`Jumped to frame ${lastFrame}`);

    // Set playback direction to reverse
    lottieRef.current.setDirection(-1);
    console.log('Set direction to -1 (reverse)');

    // Set speed
    lottieRef.current.setSpeed(2);
    console.log('Set speed to 2');

    // Play
    lottieRef.current.play();
    console.log('Called play() - should be playing backward now');
  };

  const handlePlayForward = () => {
    console.log('=== PLAY FORWARD CLICKED ===');

    if (!lottieRef.current) {
      console.error('Lottie ref is null!');
      return;
    }

    lottieRef.current.goToAndStop(0, true);
    lottieRef.current.setDirection(1);
    lottieRef.current.setSpeed(2);
    lottieRef.current.play();
    console.log('Playing forward from frame 0');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <h1 className="fixed top-4 left-4 z-50 text-white text-2xl">
        Door Zoom - Reverse Test
      </h1>

      {/* Door Zoom ONLY */}
      <div className="fixed inset-0">
        <Lottie
          lottieRef={lottieRef}
          animationData={doorZoomAnimation}
          loop={false}
          autoplay={false}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="fixed bottom-4 left-4 z-50 flex gap-4">
        <button
          onClick={handlePlayForward}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
        >
          Play Forward
        </button>
        <button
          onClick={handlePlayReverse}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
        >
          Play Reverse
        </button>
      </div>

      <div className="fixed bottom-20 left-4 z-50 text-white text-sm">
        <p>Open console for logs</p>
      </div>
    </div>
  );
}
