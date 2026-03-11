import { Type } from '@google/genai';

export interface GeneratedContent {
  intro: string;
  serviceDescription: string;
  localContext: string;
  whyChooseUs: string;
  highlights: string[];
  metadata: {
    citySlug: string;
    serviceSlug: string;
    generatedAt: string;
    model: string;
    wordCount: number;
  };
}

export const contentSchema = {
  type: Type.OBJECT,
  properties: {
    intro: {
      type: Type.STRING,
      description: 'Opening paragraph mentioning the city by name, key neighborhoods, and how the service fits the local context. 60-80 words.',
    },
    serviceDescription: {
      type: Type.STRING,
      description: 'Detailed description of the service tailored to the city. Reference local housing stock, common project scenarios, and materials suited to the climate. 80-120 words.',
    },
    localContext: {
      type: Type.STRING,
      description: 'Why this service matters specifically in this city. Reference permits, HOA considerations, neighborhood character, and relevant landmarks. 60-80 words.',
    },
    whyChooseUs: {
      type: Type.STRING,
      description: 'Why cf.design is the right choice for this service in this city. Mention Peninsula expertise, nearby completed projects, and local knowledge. 40-60 words.',
    },
    highlights: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3-4 bullet points highlighting key benefits, each 10-20 words.',
    },
  },
  required: ['intro', 'serviceDescription', 'localContext', 'whyChooseUs', 'highlights'],
};
