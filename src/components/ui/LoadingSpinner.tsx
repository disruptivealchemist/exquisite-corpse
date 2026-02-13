'use client';

import { useEffect, useState } from 'react';
import { LOADING_MESSAGES } from '@/lib/prompt-templates';

export default function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#f4f4f4]/25" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#f4f4f4] animate-spin" />
      </div>
      <p className="text-[#f4f4f4]/90 text-lg animate-pulse font-display italic text-center px-4">
        {LOADING_MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
