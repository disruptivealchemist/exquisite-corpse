'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface RevealAnimationProps {
  images: { head: string; body: string; legs: string };
  onRevealComplete: () => void;
}

export default function RevealAnimation({ images, onRevealComplete }: RevealAnimationProps) {
  const [phase, setPhase] = useState<'anticipation' | 'unfolding' | 'celebration'>('anticipation');
  const [revealedParts, setRevealedParts] = useState<number>(0);

  useEffect(() => {
    const anticipationTimer = setTimeout(() => {
      setPhase('unfolding');
    }, 1500);

    return () => clearTimeout(anticipationTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'unfolding') return;

    const timers = [
      setTimeout(() => setRevealedParts(1), 300),
      setTimeout(() => setRevealedParts(2), 1100),
      setTimeout(() => setRevealedParts(3), 1900),
      setTimeout(() => {
        setPhase('celebration');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c71f2d', '#f4f4f4', '#d6d3d1', '#292928', '#ffffff'],
        });
        onRevealComplete();
      }, 2700),
    ];

    return () => timers.forEach(clearTimeout);
  }, [phase, onRevealComplete]);

  const parts = [
    { key: 'head', src: images.head },
    { key: 'body', src: images.body },
    { key: 'legs', src: images.legs },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence>
        {phase === 'anticipation' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-2xl md:text-3xl font-bold text-[#f4f4f4] animate-pulse font-display italic">
              Your creature is ready...
            </p>
            <div className="flex flex-col items-center gap-1 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-64 h-3 bg-white/35 rounded-sm"
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase !== 'anticipation' && (
        <div className="flex flex-col items-center" style={{ perspective: 1000 }}>
          <div className="w-64 overflow-hidden rounded-xl shadow-2xl border border-white/35 bg-black/20">
            {parts.map((part, index) => (
              <motion.div
                key={part.key}
                className="origin-top"
                initial={{ rotateX: -90, height: 0 }}
                animate={
                  revealedParts > index
                    ? { rotateX: 0, height: 'auto' }
                    : { rotateX: -90, height: 0 }
                }
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <img src={part.src} alt={part.key} className="w-full h-auto block" />
              </motion.div>
            ))}
          </div>

          {phase === 'celebration' && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#f4f4f4] font-display italic">
                Meet your creature!
              </h2>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
