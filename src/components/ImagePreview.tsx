'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BODY_PART_LABELS, LEARNING_TIPS } from '@/lib/prompt-templates';
import { BodyPart } from '@/types';

interface ImagePreviewProps {
  src: string;
  bodyPart: BodyPart;
  onComplete: () => void;
}

export default function ImagePreview({ src, bodyPart, onComplete }: ImagePreviewProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const tip = LEARNING_TIPS[bodyPart];

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
    >
      <p className="text-[#f4f4f4] font-semibold text-lg text-center font-display italic px-4">
        Nice {BODY_PART_LABELS[bodyPart].toLowerCase()}! Now let&apos;s hide it...
      </p>
      <div className="w-64 h-auto rounded-xl overflow-hidden shadow-xl border border-white/35 bg-black/20">
        <img src={src} alt={`Generated ${bodyPart}`} className="w-full h-auto" />
      </div>
      <motion.div
        className="max-w-sm bg-[#f4f4f4] border border-black/15 rounded-xl p-3 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs font-bold text-[#292928]/75 uppercase tracking-[0.2em] mb-1 font-body">
          What you just learned
        </p>
        <p className="text-sm text-[#292928]/90 font-body">{tip.skill}</p>
      </motion.div>
    </motion.div>
  );
}
