export interface FAQ {
  question: string;
  answer: string;
}

export interface GeneratedContent {
  intro: string;
  serviceDescription: string;
  localContext: string;
  whyChooseUs: string;
  highlights: string[];
  faqs: FAQ[];
  metadata: {
    citySlug: string;
    serviceSlug: string;
    generatedAt: string;
    researchModel: string;
    writingModel: string;
    wordCount: number;
  };
}
