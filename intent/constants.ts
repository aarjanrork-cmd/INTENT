
import { IntentType, ProficiencyLevel, CommitmentLevel, Lesson, Scenario } from './types';

export const INTENTS: { id: IntentType; label: string; icon: string }[] = [
  { id: 'Travel', label: 'Travel & Exploration', icon: '✈️' },
  { id: 'Career', label: 'Professional Growth', icon: '💼' },
  { id: 'Exams', label: 'Academic Goals', icon: '🎓' },
  { id: 'Relationships', label: 'Family & Friends', icon: '❤️' },
  { id: 'Culture', label: 'Cultural Immersion', icon: '🎨' },
  { id: 'Migration', label: 'Moving Abroad', icon: '🏠' },
  { id: 'Survival', label: 'Survival Basics', icon: '🆘' },
];

export const LEVELS: ProficiencyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
export const COMMITMENTS: { id: CommitmentLevel; label: string }[] = [
  { id: '10m', label: '10 mins / day' },
  { id: '30m', label: '30 mins / day' },
  { id: '1h', label: '1 hour / day' },
];

export const SCENARIOS: Scenario[] = [
  { id: 's1', title: 'Airport Security', icon: '🛂', difficulty: 'A2', prompt: 'You are passing through security at Madrid Barajas. The officer asks about your luggage content.' },
  { id: 's2', title: 'Tech Interview', icon: '💻', difficulty: 'B2', prompt: 'Simulate a job interview for a Senior Engineer role in Berlin. Discuss your architectural choices.' },
  { id: 's3', title: 'Medical Emergency', icon: '🚑', difficulty: 'A1', prompt: 'You need to describe a sudden allergy symptom to a pharmacist in Rome.' },
  { id: 's4', title: 'Date Night', icon: '🍷', difficulty: 'B1', prompt: 'Practice smooth transitions and storytelling during a first date in Paris.' },
];

export const MOCK_ROADMAP: Lesson[] = [
  { id: '1', title: 'The Silent Connection', description: 'Mastering greetings and context-aware introductions.', category: 'Conversation', progress: 100, isLocked: false, difficulty: 1 },
  { id: '2', title: 'Ordering like a Local', description: 'Beyond the menu: Handling special requests and tone.', category: 'Simulation', progress: 45, isLocked: false, difficulty: 2 },
  { id: '3', title: 'Professional Dynamics', description: 'Navigating formal hierarchies and professional courtesy.', category: 'Conversation', progress: 0, isLocked: false, difficulty: 4 },
  { id: '4', title: 'The Grammar of Intent', description: 'Understanding how mood and aspect change your meaning.', category: 'Grammar', progress: 0, isLocked: true, difficulty: 6 },
  { id: '5', title: 'Complex Negotiations', description: 'Holding your ground while maintaining cultural etiquette.', category: 'Simulation', progress: 0, isLocked: true, difficulty: 8 },
];
