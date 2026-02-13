'use client';

import { useState, useCallback } from 'react';
import { BodyPart, GamePhase, GameState } from '@/types';

const PART_ORDER: BodyPart[] = ['head', 'body', 'legs'];

const INITIAL_STATE: GameState = {
  currentPart: 'head',
  phase: 'prompting',
  prompts: { head: '', body: '', legs: '' },
  images: { head: null, body: null, legs: null },
};

export default function useGameState() {
  const [state, setState] = useState<GameState>({ ...INITIAL_STATE });

  const setPhase = useCallback((phase: GamePhase) => {
    setState((prev) => ({ ...prev, phase }));
  }, []);

  const submitPrompt = useCallback(async (prompt: string) => {
    const part = state.currentPart;

    setState((prev) => ({
      ...prev,
      phase: 'generating',
      prompts: { ...prev.prompts, [part]: prompt },
    }));

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, bodyPart: part }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Generation failed');
      }

      const { image } = await res.json();

      setState((prev) => ({
        ...prev,
        phase: 'previewing',
        images: { ...prev.images, [part]: image },
      }));
    } catch (error) {
      // Revert to prompting so user can retry
      setState((prev) => ({ ...prev, phase: 'prompting' }));
      throw error;
    }
  }, [state.currentPart]);

  const onPreviewComplete = useCallback(() => {
    setPhase('folding');
  }, [setPhase]);

  const onFoldComplete = useCallback(() => {
    const currentIndex = PART_ORDER.indexOf(state.currentPart);

    if (currentIndex < PART_ORDER.length - 1) {
      // Move to next body part
      setState((prev) => ({
        ...prev,
        currentPart: PART_ORDER[currentIndex + 1],
        phase: 'prompting',
      }));
    } else {
      // All parts done — reveal!
      setPhase('reveal');
    }
  }, [state.currentPart, setPhase]);

  const reset = useCallback(() => {
    setState({ ...INITIAL_STATE });
  }, []);

  const completedParts = PART_ORDER.filter((part) => state.images[part] !== null);

  return {
    state,
    completedParts,
    submitPrompt,
    onPreviewComplete,
    onFoldComplete,
    reset,
  };
}
