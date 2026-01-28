
// Define DigitalCompetency enum to resolve errors in constants.tsx and CompetencySelector.tsx
export enum DigitalCompetency {
  INFO_LITERACY = 'INFO_LITERACY',
  COMMUNICATION = 'COMMUNICATION',
  CONTENT_CREATION = 'CONTENT_CREATION',
  SAFETY = 'SAFETY',
  PROBLEM_SOLVING = 'PROBLEM_SOLVING',
}

// Define GeneratedPlan interface to resolve error in ResultView.tsx
export interface GeneratedPlan {
  originalSummary: string;
  suggestedTools: { name: string; purpose: string }[];
  enhancedActivities: {
    step: string;
    digitalAction: string;
    competencyAddressed: string;
  }[];
  fullMarkdown: string;
}

export interface UserInfo {
  topic: string;
  subject: string;
  grade: string;
  school: string;
  textbook: string;
}

export enum GenerationStep {
  INPUT_FORM = 0,
  OUTLINE = 1,
  PART_I_II = 2,
  PART_III = 3,
  PART_IV_SOL1 = 4,
  PART_IV_SOL2 = 5,
  PART_V_VI = 6,
  APPENDIX = 7,
  COMPLETED = 8
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GenerationState {
  step: GenerationStep;
  messages: ChatMessage[];
  fullDocument: string;
  isStreaming: boolean;
  error: string | null;
}
