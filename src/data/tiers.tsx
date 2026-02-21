import type { TierRequirement } from "../types/types";

export const TIERS: TierRequirement[] = [
  {
    name: "Seedling",
    emoji: "🌱",
    minLevel: 1,
    maxDiscomfort: 2,
    color: "text-green-500",
    bgColor: "bg-green-100",
    darkBgColor: "bg-green-900/30",
  },
  {
    name: "Sprout",
    emoji: "🌿",
    minLevel: 3,
    maxDiscomfort: 3,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    darkBgColor: "bg-blue-900/30",
  },
  {
    name: "Bloom",
    emoji: "🌸",
    minLevel: 6,
    maxDiscomfort: 4,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    darkBgColor: "bg-purple-900/30",
  },
  {
    name: "Radiant",
    emoji: "🌟",
    minLevel: 10,
    maxDiscomfort: 5,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    darkBgColor: "bg-amber-900/30",
  },
];

/** Get the user's current tier based on their level. */
export const getUserTier = (level: number): TierRequirement => {
  // Walk backwards to find the highest tier they qualify for
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (level >= TIERS[i].minLevel) return TIERS[i];
  }
  return TIERS[0];
};

/** Get the next tier above the user's current one, or null if maxed. */
export const getNextTier = (level: number): TierRequirement | null => {
  const current = getUserTier(level);
  const idx = TIERS.indexOf(current);
  return idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
};
