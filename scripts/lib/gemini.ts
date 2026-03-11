import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import { contentSchema, type GeneratedContent } from './schemas';

const MODEL = 'gemini-2.5-flash';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates content using Gemini 2.5 Flash with structured JSON output.
 * Includes retry logic with exponential backoff for rate limit errors.
 */
export async function generateContent(
  prompt: string,
  maxRetries = 3
): Promise<Omit<GeneratedContent, 'metadata'>> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not set. Create a .env file with your API key.\n' +
      'Get one at: https://aistudio.google.com/apikey'
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: contentSchema,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response from Gemini API');
      }

      return JSON.parse(text) as Omit<GeneratedContent, 'metadata'>;
    } catch (error: unknown) {
      const status = (error as { status?: number }).status;
      if (status === 429 && attempt < maxRetries) {
        const backoff = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.warn(`Rate limited. Retrying in ${backoff / 1000}s... (attempt ${attempt}/${maxRetries})`);
        await delay(backoff);
        continue;
      }
      throw error;
    }
  }

  throw new Error('Max retries exceeded');
}
