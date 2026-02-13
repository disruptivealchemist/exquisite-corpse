'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { stitchImages, downloadImage } from '@/lib/image-utils';
import Button from '@/components/ui/Button';

interface SharePanelProps {
  images: { head: string; body: string; legs: string };
  onPlayAgain: () => void;
}

export default function SharePanel({ images, onPlayAgain }: SharePanelProps) {
  const [stitchedImage, setStitchedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    stitchImages(images.head, images.body, images.legs)
      .then(setStitchedImage)
      .catch(console.error);
  }, [images]);

  const handleDownload = () => {
    if (stitchedImage) {
      downloadImage(stitchedImage);
    }
  };

  const handleShare = async () => {
    if (!stitchedImage) return;

    if (navigator.share) {
      try {
        const blob = await (await fetch(stitchedImage)).blob();
        const file = new File([blob], 'exquisite-creature.png', { type: 'image/png' });
        await navigator.share({
          title: 'My Exquisite Creature',
          text: 'Check out this bizarre AI creature I made!',
          files: [file],
        });
      } catch {
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      'I just made a bizarre AI creature! Try it yourself at ' + window.location.origin
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex gap-3 flex-wrap justify-center">
        <Button onClick={handleDownload} disabled={!stitchedImage}>
          Download
        </Button>
        <Button variant="secondary" onClick={handleShare} disabled={!stitchedImage}>
          {copied ? 'Copied!' : 'Share'}
        </Button>
      </div>
      <Button variant="ghost" onClick={onPlayAgain}>
        Play Again
      </Button>
    </motion.div>
  );
}
