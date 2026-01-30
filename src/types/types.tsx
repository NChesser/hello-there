// Types
export type Challenge = {
  id: string;
  title: string;
  description: string;
  exampleScript?: string;
  discomfortRating: 1 | 2 | 3 | 4 | 5;
  category: 'micro-social' | 'interaction' | 'vulnerability' | 'rejection';
  xpReward: number;
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
  completedHabits: string[];
  peopleMet: string[];
  logs: CompletionLog[];
  habitLogs: HabitLog[];
};

export type Habit = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'social' | 'wellbeing' | 'growth';
};

export type HabitLog = {
  habitId: string;
  date: string;
  note?: string;
};


