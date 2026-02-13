'use client';

import { motion } from 'framer-motion';

interface FoldAnimationProps {
  imageSrc: string;
  onComplete: () => void;
}

export default function FoldAnimation({ imageSrc, onComplete }: FoldAnimationProps) {
  return (
    <div className="flex justify-center" style={{ perspective: 800 }}>
      <motion.div
        className="w-64 rounded-xl overflow-hidden shadow-xl origin-top border border-white/35 bg-black/20"
        initial={{ rotateX: 0, height: 'auto', opacity: 1 }}
        animate={{ rotateX: -90, height: 40, opacity: 0.35 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        onAnimationComplete={onComplete}
      >
        <img src={imageSrc} alt="Folding" className="w-full h-auto" />
      </motion.div>
    </div>
  );
}
