import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not configured.');
}

const ai = new GoogleGenAI({ apiKey });

export async function generateImage(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp-image-generation',
    contents: prompt,
    config: {
      responseModalities: ['IMAGE', 'TEXT'],
    },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) {
    throw new Error('No response from Gemini');
  }

  const imagePart = parts.find((p) => p.inlineData);
  if (!imagePart?.inlineData) {
    throw new Error('No image generated. Try a different prompt.');
  }

  return `data:image/${imagePart.inlineData.mimeType?.split('/')[1] || 'png'};base64,${imagePart.inlineData.data}`;
}
