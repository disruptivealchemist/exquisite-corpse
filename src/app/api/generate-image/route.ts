export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/gemini';
import { BODY_PART_FRAMING } from '@/lib/prompt-templates';
import { BodyPart } from '@/types';

const VALID_PARTS: BodyPart[] = ['head', 'body', 'legs'];

export async function POST(request: NextRequest) {
  try {
    const { prompt, bodyPart } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid prompt' }, { status: 400 });
    }

    if (!bodyPart || !VALID_PARTS.includes(bodyPart)) {
      return NextResponse.json({ error: 'Invalid body part' }, { status: 400 });
    }

    const framing = BODY_PART_FRAMING[bodyPart as BodyPart];
    const fullPrompt = `${prompt}. ${framing} The image should have clean edges suitable for collaging. Simple background at the cut edges. Do not include any text or watermarks.`;

    const imageDataUri = await generateImage(fullPrompt);

    return NextResponse.json({ image: imageDataUri });
  } catch (error) {
    console.error('Image generation failed:', error);
    const message = error instanceof Error ? error.message : 'Image generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
