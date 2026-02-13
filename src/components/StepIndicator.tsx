'use client';

import { BodyPart } from '@/types';
import { BODY_PART_LABELS } from '@/lib/prompt-templates';

const STEPS: BodyPart[] = ['head', 'body', 'legs'];

interface StepIndicatorProps {
  currentPart: BodyPart;
  completedParts: BodyPart[];
}

export default function StepIndicator({ currentPart, completedParts }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-3">
      {STEPS.map((part, index) => {
        const isCompleted = completedParts.includes(part);
        const isCurrent = part === currentPart;

        return (
          <div key={part} className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-2 md:gap-3">
              <div
                className={[
                  'w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 font-body',
                  isCompleted
                    ? 'bg-[#c71f2d] text-[#f4f4f4]'
                    : isCurrent
                      ? 'bg-[#f4f4f4] text-[#292928] ring-2 ring-[#f4f4f4]/60'
                      : 'bg-[#f4f4f4]/15 text-[#f4f4f4]/70 border border-[#f4f4f4]/35',
                ].join(' ')}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span
                className={[
                  'text-xs sm:text-sm md:text-base transition-colors font-subhead',
                  isCurrent ? 'text-[#f4f4f4]' : isCompleted ? 'text-[#f4f4f4]/90' : 'text-[#f4f4f4]/65',
                ].join(' ')}
              >
                {BODY_PART_LABELS[part]}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={[
                  'w-4 sm:w-6 md:w-8 h-0.5',
                  isCompleted ? 'bg-[#f4f4f4]/70' : 'bg-[#f4f4f4]/30',
                ].join(' ')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
