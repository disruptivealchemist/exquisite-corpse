'use client';

import { useState, useCallback } from 'react';
import useGameState from '@/hooks/useGameState';
import StepIndicator from '@/components/StepIndicator';
import PromptBuilder from '@/components/PromptBuilder';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ImagePreview from '@/components/ImagePreview';
import FoldAnimation from '@/components/FoldAnimation';
import RevealAnimation from '@/components/RevealAnimation';
import SharePanel from '@/components/SharePanel';
import Footer from '@/components/Footer';

export default function PlayPage() {
  const { state, completedParts, submitPrompt, onPreviewComplete, onFoldComplete, reset } = useGameState();
  const [error, setError] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);

  const handleSubmit = useCallback(async (prompt: string) => {
    setError(null);
    try {
      await submitPrompt(prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  }, [submitPrompt]);

  const handleRevealComplete = useCallback(() => {
    setShowShare(true);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setShowShare(false);
    setError(null);
    reset();
  }, [reset]);

  const currentImage = state.images[state.currentPart];

  return (
    <div className="min-h-screen bg-[#292928] text-[#f4f4f4] flex flex-col">
      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-10 flex-1">
        {state.phase !== 'reveal' && (
          <div className="mb-7 md:mb-9 rounded-2xl border border-white/15 bg-black/15 px-3 py-4">
            <StepIndicator
              currentPart={state.currentPart}
              completedParts={completedParts}
            />
          </div>
        )}

        {state.phase !== 'reveal' && completedParts.length > 0 && (
          <div className="flex flex-col items-center gap-1.5 mb-6">
            {completedParts.map((part) => (
              <div
                key={part}
                className="w-64 h-3 bg-white/30 rounded-sm"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-[#8b1111]/35 border border-[#f4f4f4]/25 rounded-xl text-[#f4f4f4] text-center text-sm font-body">
            {error}
          </div>
        )}

        {state.phase === 'prompting' && (
          <PromptBuilder
            bodyPart={state.currentPart}
            onSubmit={handleSubmit}
          />
        )}

        {state.phase === 'generating' && <LoadingSpinner />}

        {state.phase === 'previewing' && currentImage && (
          <ImagePreview
            src={currentImage}
            bodyPart={state.currentPart}
            onComplete={onPreviewComplete}
          />
        )}

        {state.phase === 'folding' && currentImage && (
          <FoldAnimation
            imageSrc={currentImage}
            onComplete={onFoldComplete}
          />
        )}

        {state.phase === 'reveal' && state.images.head && state.images.body && state.images.legs && (
          <>
            <RevealAnimation
              images={{
                head: state.images.head,
                body: state.images.body,
                legs: state.images.legs,
              }}
              onRevealComplete={handleRevealComplete}
            />
            {showShare && (
              <SharePanel
                images={{
                  head: state.images.head!,
                  body: state.images.body!,
                  legs: state.images.legs!,
                }}
                onPlayAgain={handlePlayAgain}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
