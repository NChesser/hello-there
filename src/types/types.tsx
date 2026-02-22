import type { LucideIcon } from "lucide-react";

// Types
export type ChallengeCategory = 'micro-social' | 'interaction' | 'vulnerability' | 'rejection' | 'exposure' | 'wellbeing' | 'growth' | 'assertiveness';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  exampleScript?: string[];
  remember?: string;
  discomfortRating: 1 | 2 | 3 | 4 | 5;
  category: ChallengeCategory;
  xpReward: number;
};

export type Mood = 'overwhelmed' | 'nervous' | 'okay' | 'good' | 'brave';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress, extra?: { lastCompletedDiscomfort?: number }) => boolean;
};

export type TierRequirement = {
  name: string;
  emoji: string;
  minLevel: number;
  maxDiscomfort: number;
  color: string;
  bgColor: string;
  darkBgColor: string;
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
  peopleMet: PersonMet[];
  logs: CompletionLog[];
  practiceLogs: PracticeLog[];
  excludedChallenges?: string[];
  excludedPractices?: string[];
  preferredCategories?: ChallengeCategory[];
  createdChallenges?: CreatedChallenge[];
  currentStreak?: number;
  longestStreak?: number;
  achievements?: string[];           // IDs of unlocked achievements
  moodLogs?: { date: string; mood: Mood }[];
};

export type Practice = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'social' | 'wellbeing' | 'growth' | 'mindset' | 'connection';
  hint?: string;
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
  category: ChallengeCategory;
  xpReward: number;
  createdAt: string;
};

/** Created practice by user */
export type CreatedPractice = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'social' | 'wellbeing' | 'growth' | 'mindset' | 'connection';
  createdAt: string;
};

/** Interaction log entry */
export type Interaction = {
  id: string;
  text: string;
  date: string;
};

/** Personal note entry (undated) */
export type PersonalNote = {
  id: string;
  text: string;
};

/** Person met tracking */
export type PersonMet = {
  id: string;
  name: string;
  meetDate: string;
  personalNotes?: PersonalNote[];
  somethingInteresting?: string;
  interactions?: Interaction[];
  isFavorite?: boolean;
  whereMet?: string;
  thingsTheyLike?: string[];
  tags?: string[];
  birthday?: string;
};

/** Preset relationship tags */
export const RELATIONSHIP_TAGS = [
  'Friend',
  'Coworker',
  'Classmate',
  'Neighbour',
  'Acquaintance',
  'Family',
  'Online',
  'Mentor',
  'Study buddy',
  'Gym buddy',
] as const;

/** Preset things they like options */
export const THINGS_THEY_LIKE_OPTIONS = [
  'Music',
  'Movies',
  'Gaming',
  'Reading',
  'Sports',
  'Cooking',
  'Travel',
  'Art',
  'Photography',
  'Nature',
  'Fitness',
  'Coffee',
  'Animals',
  'Tech',
  'Fashion',
] as const;

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


