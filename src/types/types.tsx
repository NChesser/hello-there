import type { LucideIcon } from "lucide-react";

// Types
export type Challenge = {
  id: string;
  title: string;
  description: string;
  exampleScript?: string[];
  discomfortRating: 1 | 2 | 3 | 4 | 5;
  category: 'micro-social' | 'interaction' | 'vulnerability' | 'rejection' | 'exposure' | 'wellbeing' | 'growth' | 'assertiveness';
  xpReward: number;
};

export type CompletedChallenge = {
  id: string;
  title: string;
  description: string;
  beforeFeeling: number;
  afterFeeling: number;
  note?: string;
  completedAt: string;
};

export type CompletionLog = {
  challengeId: string;
  date: string;
  beforeFeeling: number;
  afterFeeling: number;
  note?: string;
  completed: boolean;
  attempted: boolean;
  xpEarned: number;
};

export type UserProgress = {
  level: number;
  totalXp: number;
  completedChallenges: string[];
  completedPractices: string[];
  peopleMet: string[];
  logs: CompletionLog[];
  practiceLogs: PracticeLog[];
  excludedChallenges?: string[];
  preferredCategories?: ('micro-social' | 'interaction' | 'vulnerability' | 'rejection' | 'exposure' | 'wellbeing' | 'growth' | 'assertiveness')[];
};

export type Practice = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'social' | 'wellbeing' | 'growth';
};

export type PracticeLog = {
  practiceId: string;
  date: string;
  note?: string;
};

/** Created challenge by user */
export type CreatedChallenge = {
  id: string;
  title: string;
  description: string;
  discomfortRating: 1 | 2 | 3 | 4 | 5;
  category: 'micro-social' | 'interaction' | 'vulnerability' | 'rejection';
  xpReward: number;
  createdAt: string;
};

/** Created practice by user */
export type CreatedPractice = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'social' | 'wellbeing' | 'growth';
  createdAt: string;
};

/** Person met tracking */
export type PersonMet = {
  id: string;
  name: string;
  meetDate: string;
  notes?: string;
};

/** Complete user data structure */
export type User = {
  level: number;
  xp: number;
  totalXp: number;
  completedChallenges: string[];
  createdChallenges: CreatedChallenge[];
  completedPractices: string[];
  createdPractices: CreatedPractice[];
  chosenPractices: string[];
  peopleMet: PersonMet[];
  logs: CompletionLog[];
  practiceLogs: PracticeLog[];
};

/**
 * @deprecated Use User type instead. Kept for backwards compatibility during migration.
 */
export type UserProgress = {
  level: number;
  xp: number;
  totalXp: number;
  completedChallenges: string[];
  logs: CompletionLog[];
  practiceLogs: PracticeLog[];
};


