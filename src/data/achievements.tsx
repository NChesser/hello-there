import type { Achievement } from "../types/types";

export const ACHIEVEMENTS: Achievement[] = [
  // --- Completion milestones ---
  {
    id: "first-step",
    title: "First Step",
    description: "Complete your first challenge",
    icon: "🌱",
    condition: (p) => p.completedChallenges.length >= 1,
  },
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Complete 5 challenges",
    icon: "🌿",
    condition: (p) => p.completedChallenges.length >= 5,
  },
  {
    id: "on-a-roll",
    title: "On a Roll",
    description: "Complete 10 challenges",
    icon: "🔥",
    condition: (p) => p.completedChallenges.length >= 10,
  },
  {
    id: "halfway-hero",
    title: "Halfway Hero",
    description: "Complete 25 challenges",
    icon: "⭐",
    condition: (p) => p.completedChallenges.length >= 25,
  },
  {
    id: "challenge-champion",
    title: "Challenge Champion",
    description: "Complete 50 challenges",
    icon: "🏆",
    condition: (p) => p.completedChallenges.length >= 50,
  },

  // --- Streak milestones ---
  {
    id: "three-day-streak",
    title: "Three-Day Streak",
    description: "Complete challenges 3 days in a row",
    icon: "🔥",
    condition: (p) => (p.currentStreak ?? 0) >= 3,
  },
  {
    id: "week-warrior",
    title: "Week Warrior",
    description: "Complete challenges 7 days in a row",
    icon: "💪",
    condition: (p) => (p.currentStreak ?? 0) >= 7,
  },
  {
    id: "fortnight-force",
    title: "Fortnight Force",
    description: "Complete challenges 14 days in a row",
    icon: "🌟",
    condition: (p) => (p.currentStreak ?? 0) >= 14,
  },
  {
    id: "monthly-master",
    title: "Monthly Master",
    description: "Complete challenges 30 days in a row",
    icon: "👑",
    condition: (p) => (p.currentStreak ?? 0) >= 30,
  },

  // --- Level milestones ---
  {
    id: "level-5",
    title: "Rising Star",
    description: "Reach level 5",
    icon: "✨",
    condition: (p) => p.level >= 5,
  },
  {
    id: "level-10",
    title: "Confident Climber",
    description: "Reach level 10",
    icon: "🧗",
    condition: (p) => p.level >= 10,
  },
  {
    id: "level-20",
    title: "Social Butterfly",
    description: "Reach level 20",
    icon: "🦋",
    condition: (p) => p.level >= 20,
  },

  // --- Category exploration ---
  {
    id: "category-explorer",
    title: "Category Explorer",
    description: "Complete a challenge from 4 different categories",
    icon: "🗺️",
    condition: (p) => {
      const categories = new Set(
        p.logs.filter((l) => l.completed).map((l) => {
          // We can't look up the challenge category from the log alone,
          // so we count unique challenge prefixes as a proxy
          return l.challengeId.split("-")[0];
        }),
      );
      return categories.size >= 4;
    },
  },

  // --- People milestones ---
  {
    id: "first-friend",
    title: "First Friend",
    description: "Add your first person to People Met",
    icon: "🤝",
    condition: (p) => p.peopleMet.length >= 1,
  },
  {
    id: "social-circle",
    title: "Social Circle",
    description: "Meet 5 people",
    icon: "👥",
    condition: (p) => p.peopleMet.length >= 5,
  },

  // --- Reflection milestones ---
  {
    id: "deep-thinker",
    title: "Deep Thinker",
    description: "Write a reflection note on 5 challenges",
    icon: "📝",
    condition: (p) =>
      p.logs.filter((l) => l.note && l.note.length > 0).length >= 5,
  },
  {
    id: "journaler",
    title: "Dedicated Journaler",
    description: "Write a reflection note on 15 challenges",
    icon: "📖",
    condition: (p) =>
      p.logs.filter((l) => l.note && l.note.length > 0).length >= 15,
  },

  // --- Courage milestones ---
  {
    id: "brave-heart",
    title: "Brave Heart",
    description: "Complete a challenge rated 4+ discomfort",
    icon: "💜",
    condition: (_p, extra) =>
      extra?.lastCompletedDiscomfort !== undefined &&
      extra.lastCompletedDiscomfort >= 4,
  },
  {
    id: "fearless",
    title: "Fearless",
    description: "Complete a challenge rated 5 discomfort",
    icon: "🦁",
    condition: (_p, extra) =>
      extra?.lastCompletedDiscomfort !== undefined &&
      extra.lastCompletedDiscomfort >= 5,
  },

  // --- Attempt milestones ---
  {
    id: "showed-up",
    title: "Showed Up",
    description: "Use 'I Tried Today' for the first time",
    icon: "🫶",
    condition: (p) =>
      p.logs.filter((l) => l.attempted && !l.completed).length >= 1,
  },
];
