
export type IntentType = 'Travel' | 'Exams' | 'Career' | 'Migration' | 'Relationships' | 'Culture' | 'Survival';
export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CommitmentLevel = '10m' | '30m' | '1h';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface UserProfile {
  name: string;
  intent: IntentType;
  level: ProficiencyLevel;
  cefr: CEFRLevel;
  commitment: CommitmentLevel;
  targetLanguage: string;
  nativeLanguage: string;
  points: number;
  fluencyScore: number; // 0-100
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'Conversation' | 'Vocabulary' | 'Grammar' | 'Simulation';
  progress: number;
  isLocked: boolean;
  difficulty: number; // 1-10
}

export interface Scenario {
  id: string;
  title: string;
  icon: string;
  difficulty: CEFRLevel;
  prompt: string;
}

export interface ProgressStats {
  readiness: number;
  comprehension: number;
  confidence: number;
  retention: number;
  weeklyActivity: number[];
}
