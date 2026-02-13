export type BodyPart = 'head' | 'body' | 'legs';

export type GamePhase =
  | 'prompting'
  | 'generating'
  | 'previewing'
  | 'folding'
  | 'reveal';

export interface GameState {
  currentPart: BodyPart;
  phase: GamePhase;
  prompts: Record<BodyPart, string>;
  images: Record<BodyPart, string | null>;
}

export interface CategoryOption {
  label: string;
  options: string[];
}

export interface PromptSelections {
  style: string;
  character: string;
  accessory: string;
  material: string;
  artMovement: string;
}

export type CategoryKey = keyof PromptSelections;
