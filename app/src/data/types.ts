export interface SpreadsheetTemplate {
  id: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  category: 'core' | 'tax' | 'reports' | 'property' | 'business';
  categoryLabel: string;
  icon: string;
  color: string;
  features: string[];
  fileName: string;
  sheetName: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface WhatIsSection {
  title: string;
  definition: string;
  useCases: string[];
}

export interface WhatIncludedItem {
  label: string;
  description: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TemplateLandingContent {
  whatIs: WhatIsSection;
  whenToUse: string[];
  whatIncluded: WhatIncludedItem[];
  howToUse: string[];
  benefits: BenefitItem[];
  relatedTemplates: string[];
  faqs: FaqItem[];
}
