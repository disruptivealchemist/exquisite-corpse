'use client';

import { useState } from 'react';
import { BodyPart, CategoryKey, PromptSelections } from '@/types';
import { CATEGORIES, REQUIRED_CATEGORIES, BODY_PART_LABELS, LEARNING_TIPS, SELECTION_INSIGHTS, buildPrompt } from '@/lib/prompt-templates';
import Chip from '@/components/ui/Chip';
import Button from '@/components/ui/Button';

interface PromptBuilderProps {
  bodyPart: BodyPart;
  onSubmit: (prompt: string) => void;
}

const EMPTY_SELECTIONS: PromptSelections = {
  style: '',
  character: '',
  accessory: '',
  material: '',
  artMovement: '',
};

const INSIGHT_HIGHLIGHT_WORD: Record<CategoryKey, string> = {
  style: 'style',
  character: 'subject',
  accessory: 'accessories',
  material: 'materials',
  artMovement: 'art movements',
};

export default function PromptBuilder({ bodyPart, onSubmit }: PromptBuilderProps) {
  const [selections, setSelections] = useState<PromptSelections>({ ...EMPTY_SELECTIONS });
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [lastSelectedCategory, setLastSelectedCategory] = useState<CategoryKey | null>(null);
  const [customInputs, setCustomInputs] = useState<Record<CategoryKey, string>>({
    style: '',
    character: '',
    accessory: '',
    material: '',
    artMovement: '',
  });
  const [freeformMode, setFreeformMode] = useState(false);
  const [freeformText, setFreeformText] = useState('');

  const isReady = freeformMode
    ? freeformText.trim().length > 0
    : REQUIRED_CATEGORIES.every((key) => selections[key]);

  const handleSelect = (category: CategoryKey, value: string) => {
    setSelections((prev) => ({ ...prev, [category]: value }));
    setLastSelectedCategory(category);
    setActiveCategory(null);
  };

  const handleCustomSubmit = (category: CategoryKey) => {
    const value = customInputs[category].trim();
    if (value) {
      handleSelect(category, value);
      setCustomInputs((prev) => ({ ...prev, [category]: '' }));
    }
  };

  const handleGenerate = () => {
    if (freeformMode) {
      onSubmit(freeformText.trim());
    } else {
      onSubmit(buildPrompt(selections, bodyPart));
    }
  };

  const previewPrompt = !freeformMode && (selections.style || selections.character)
    ? buildPrompt(selections, bodyPart)
    : null;

  const tip = LEARNING_TIPS[bodyPart];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-[2.1rem] md:text-[2.7rem] font-bold text-center mb-1 text-[#f4f4f4] font-display italic">
        Design the {BODY_PART_LABELS[bodyPart]}
      </h2>
      <p className="text-sm md:text-base text-[#f4f4f4]/80 text-center mb-6 font-display italic">
        {tip.tip}
      </p>

      {!freeformMode ? (
        <div className="space-y-2 md:space-y-3">
          <div className="bg-[#f4f4f4] rounded-2xl px-5 py-5 md:px-7 md:py-6 shadow-md border border-black/15">
            <p className="text-[1.02rem] md:text-[1.18rem] leading-relaxed text-[#292928]/85 font-body">
              A{' '}
              <SlotButton
                label={selections.style || 'style'}
                filled={!!selections.style}
                required
                active={activeCategory === 'style'}
                onClick={() => setActiveCategory(activeCategory === 'style' ? null : 'style')}
              />{' '}
              illustration of a{' '}
              <SlotButton
                label={selections.character || 'character'}
                filled={!!selections.character}
                required
                active={activeCategory === 'character'}
                onClick={() => setActiveCategory(activeCategory === 'character' ? null : 'character')}
              />
              &apos;s {BODY_PART_LABELS[bodyPart].toLowerCase()}, wearing{' '}
              <SlotButton
                label={selections.accessory || 'accessory'}
                filled={!!selections.accessory}
                active={activeCategory === 'accessory'}
                onClick={() => setActiveCategory(activeCategory === 'accessory' ? null : 'accessory')}
              />
              , made of{' '}
              <SlotButton
                label={selections.material || 'material'}
                filled={!!selections.material}
                active={activeCategory === 'material'}
                onClick={() => setActiveCategory(activeCategory === 'material' ? null : 'material')}
              />
              , in a{' '}
              <SlotButton
                label={selections.artMovement || 'art movement'}
                filled={!!selections.artMovement}
                active={activeCategory === 'artMovement'}
                onClick={() => setActiveCategory(activeCategory === 'artMovement' ? null : 'artMovement')}
              />{' '}
              style.
            </p>
          </div>

          {activeCategory && (
            <div className="bg-[#f4f4f4] rounded-2xl p-4 md:p-5 shadow-md border border-black/15">
              <p className="text-xs font-semibold text-[#292928]/65 uppercase tracking-[0.18em] mb-3 font-body">
                {CATEGORIES[activeCategory].label}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {CATEGORIES[activeCategory].options.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    selected={selections[activeCategory] === option}
                    onClick={() => handleSelect(activeCategory, option)}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Or type your own..."
                  value={customInputs[activeCategory]}
                  onChange={(e) =>
                    setCustomInputs((prev) => ({ ...prev, [activeCategory]: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit(activeCategory)}
                  className="flex-1 px-3 py-1.5 text-sm border border-[#292928]/30 rounded-full focus:outline-none focus:border-[#292928]/55 focus:ring-1 focus:ring-[#292928]/35 text-[#292928] font-body"
                />
                <button
                  type="button"
                  onClick={() => handleCustomSubmit(activeCategory)}
                  className="text-sm text-[#292928]/80 font-semibold px-3 hover:text-[#292928] cursor-pointer font-body"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {previewPrompt && (
            <div className="bg-white/10 rounded-xl p-4 text-sm md:text-base text-[#f4f4f4]/90 border border-white/20 font-body">
              <span className="font-bold text-[#f4f4f4]">Your prompt: </span>
              {lastSelectedCategory
                ? renderHighlightedInsight(
                    SELECTION_INSIGHTS[lastSelectedCategory],
                    INSIGHT_HIGHLIGHT_WORD[lastSelectedCategory]
                  )
                : 'Choose a category to see a prompt lesson here.'}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#f4f4f4] rounded-2xl p-6 shadow-md border border-black/15">
          <textarea
            value={freeformText}
            onChange={(e) => setFreeformText(e.target.value)}
            placeholder={`Describe the ${BODY_PART_LABELS[bodyPart].toLowerCase()} of your creature...`}
            className="w-full h-36 px-4 py-3 text-base border border-[#292928]/30 rounded-xl focus:outline-none focus:border-[#292928]/55 focus:ring-1 focus:ring-[#292928]/35 resize-none text-[#292928] font-body"
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => setFreeformMode(!freeformMode)}
          className="text-sm text-[#f4f4f4]/75 hover:text-[#f4f4f4] underline underline-offset-2 cursor-pointer font-body"
        >
          {freeformMode ? 'Use the prompt helper instead' : 'Or write your own prompt'}
        </button>

        <Button
          size="lg"
          disabled={!isReady}
          onClick={handleGenerate}
        >
          Generate {BODY_PART_LABELS[bodyPart]}
        </Button>
      </div>
    </div>
  );
}

function renderHighlightedInsight(text: string, highlightWord: string) {
  const lowered = text.toLowerCase();
  const target = highlightWord.toLowerCase();
  const start = lowered.indexOf(target);

  if (start === -1) {
    return text;
  }

  const end = start + highlightWord.length;
  return (
    <>
      {text.slice(0, start)}
      <span className="font-bold text-[#c71f2d]">{text.slice(start, end)}</span>
      {text.slice(end)}
    </>
  );
}

function SlotButton({
  label,
  filled,
  required,
  active,
  onClick,
}: {
  label: string;
  filled: boolean;
  required?: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex px-3 py-0.5 rounded-full text-base font-medium transition-all duration-150 cursor-pointer font-body',
        filled
          ? 'bg-[#c71f2d] text-[#f4f4f4]'
          : active
            ? 'bg-[#292928]/10 text-[#292928] ring-2 ring-[#292928]/35'
            : required
              ? 'border-2 border-dashed border-[#292928]/45 text-[#292928]/65 hover:border-[#292928]/75 hover:text-[#292928]'
              : 'border-2 border-dashed border-[#292928]/30 text-[#292928]/55 hover:border-[#292928]/45 hover:text-[#292928]/75',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
