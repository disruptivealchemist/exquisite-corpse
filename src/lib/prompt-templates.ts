import { CategoryKey, CategoryOption, BodyPart } from '@/types';

export const CATEGORIES: Record<CategoryKey, CategoryOption> = {
  style: {
    label: 'Style',
    options: [
      'watercolor', 'pixel art', 'oil painting', 'neon',
      'pencil sketch', 'claymation', 'retro comic', 'stained glass',
      'graffiti', 'embroidery', 'collage', 'woodcut',
    ],
  },
  character: {
    label: 'Character',
    options: [
      'robot', 'dragon', 'astronaut', 'pirate', 'wizard',
      'alien', 'dinosaur', 'mermaid', 'yeti', 'samurai',
      'fairy', 'cowboy', 'mad scientist', 'vampire',
    ],
  },
  accessory: {
    label: 'Accessory',
    options: [
      'a top hat', 'sunglasses', 'a bow tie', 'a cape',
      'roller skates', 'boxing gloves', 'a tutu', 'a crown',
      'headphones', 'a jetpack', 'a scarf', 'cowboy boots',
    ],
  },
  material: {
    label: 'Material',
    options: [
      'jelly', 'metal', 'clouds', 'crystals', 'lava',
      'candy', 'moss', 'ice', 'cardboard', 'marble',
      'rubber ducks', 'spaghetti',
    ],
  },
  artMovement: {
    label: 'Art Movement',
    options: [
      'Art Nouveau', 'Pop Art', 'Surrealism', 'Cubism',
      'Vaporwave', 'Ukiyo-e', 'Art Deco', 'Psychedelic',
      'Minimalism', 'Bauhaus', 'Impressionism', 'Brutalism',
    ],
  },
};

export const REQUIRED_CATEGORIES: CategoryKey[] = ['style', 'character'];

export const CATEGORY_ORDER: CategoryKey[] = [
  'style', 'character', 'accessory', 'material', 'artMovement',
];

export const BODY_PART_LABELS: Record<BodyPart, string> = {
  head: 'Head',
  body: 'Body',
  legs: 'Legs',
};

export const BODY_PART_CONTEXT: Record<BodyPart, string> = {
  head: "head and face, shown from the neck up",
  body: "torso and arms, shown from the neck down to the waist",
  legs: "legs and feet, shown from the waist down",
};

export const BODY_PART_FRAMING: Record<BodyPart, string> = {
  head: "Show only the head and face, framed from the neck up. The face MUST have big expressive cartoon doodle-style eyes, a fun exaggerated mouth expression (grinning, surprised, or silly), and other playful hand-drawn facial features scribbled on top as if doodled with a black marker. The bottom edge should be a clean horizontal line at the neck.",
  body: "Show only the torso and arms, framed from the neck to the waist. Add playful cartoon doodle-style details scribbled on top as if hand-drawn with a black marker, such as silly buttons, a doodled pocket, scribbled patterns, or fun little cartoon arms with expressive hand gestures. Both the top and bottom edges should be clean horizontal lines.",
  legs: "Show only the legs and feet, framed from the waist down. Add playful cartoon doodle-style details scribbled on top as if hand-drawn with a black marker, such as silly doodled shoes, scribbled knee patches, fun motion lines, or quirky cartoon toes. The top edge should be a clean horizontal line at the waist.",
};

export const LEARNING_TIPS: Record<BodyPart, { title: string; tip: string; skill: string }> = {
  head: {
    title: "Prompt Skill: Subject & Style",
    tip: "Pick WHAT you want and HOW it should look. These two choices are the foundation of every image prompt.",
    skill: "Being specific about your subject and visual style is the foundation of every great AI image prompt.",
  },
  body: {
    title: "Prompt Skill: Adding Detail",
    tip: "Layer in details! The more specific you are, the more unique the result.",
    skill: "Adding descriptive details like materials and accessories gives the AI more to work with and makes your images more surprising.",
  },
  legs: {
    title: "Prompt Skill: Art Direction",
    tip: "Art movements set the entire visual tone in just a couple of words.",
    skill: "Referencing art movements in your prompts is a power move. It sets the entire visual tone in just a few words.",
  },
};

// Contextual education blurbs shown when a user selects a category value
export const SELECTION_INSIGHTS: Record<CategoryKey, string> = {
  style: "Use style to control the entire visual feel of your image.",
  character: "Use subject to tell the AI exactly what to create.",
  accessory: "Use accessories to add personality and storytelling.",
  material: "Use materials to transform textures and surprise the viewer.",
  artMovement: "Use art movements to unlock centuries of visual language.",
};

export const LOADING_MESSAGES = [
  "Teaching the AI to draw...",
  "Mixing the paints...",
  "Consulting the muse...",
  "Adding extra weirdness...",
  "Summoning creativity...",
  "Warming up the brushes...",
  "Almost there...",
];

export function buildPrompt(
  selections: Record<CategoryKey, string>,
  bodyPart: BodyPart
): string {
  const { style, character, accessory, material, artMovement } = selections;
  const partContext = BODY_PART_CONTEXT[bodyPart];

  let prompt = `A ${style} illustration of a ${character}'s ${partContext}`;

  if (accessory) {
    prompt += `, wearing ${accessory}`;
  }
  if (material) {
    prompt += `, made of ${material}`;
  }
  if (artMovement) {
    prompt += `, in a ${artMovement} style`;
  }

  return prompt;
}
