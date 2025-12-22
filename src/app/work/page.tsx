'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Work() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex min-h-screen flex-col items-center justify-center px-6"
      >
        <button
          onClick={() => router.push('/')}
          className="absolute left-8 top-8 rounded-lg border-2 border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-900 transition-all hover:border-zinc-900 hover:bg-zinc-50"
        >
          ← Back
        </button>

        <h1 className="text-6xl font-bold text-zinc-900">My Work</h1>
        <p className="mt-4 text-xl text-zinc-600">
          You made it through the door! 🚪
        </p>
      </motion.div>
    </div>
  );
}
