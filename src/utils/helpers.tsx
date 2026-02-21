// Various helper functions used across the app

import type { CompletionLog, UserProgress } from "../types/types";
import { ACHIEVEMENTS } from "../data/achievements";

// Capitalizes the first letter of a string
export const capitalizeFirstLetter = (text: string): string => {
    if (text.length === 0) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
};

// --- XP & Leveling ---
// Single source of truth: 100 XP per level (linear).

const XP_PER_LEVEL = 100;

/** Calculate the player's level from their lifetime totalXp. */
export const getLevelFromTotalXp = (totalXp: number): number =>
    Math.floor(totalXp / XP_PER_LEVEL) + 1;

/** XP required to complete the current level. */
export const getXpForLevel = (_level: number): number => XP_PER_LEVEL;

/** How much XP into the current level the player is. */
export const getXpProgress = (totalXp: number): number =>
    totalXp % XP_PER_LEVEL;

// --- Streaks ---

/** Calculate the current streak (consecutive days with a completed challenge). */
export const calculateStreak = (logs: CompletionLog[]): { current: number; longest: number } => {
    const completedDates = new Set(
        logs
            .filter((l) => l.completed)
            .map((l) => new Date(l.date).toDateString()),
    );

    if (completedDates.size === 0) return { current: 0, longest: 0 };

    // Sort dates chronologically
    const sorted = [...completedDates]
        .map((d) => new Date(d))
        .sort((a, b) => a.getTime() - b.getTime());

    let current = 0;
    let longest = 0;
    let streak = 1;

    for (let i = 1; i < sorted.length; i++) {
        const diff = (sorted[i].getTime() - sorted[i - 1].getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
            streak++;
        } else {
            longest = Math.max(longest, streak);
            streak = 1;
        }
    }
    longest = Math.max(longest, streak);

    // Check if the streak is still active (includes today or yesterday)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastDate = sorted[sorted.length - 1];
    lastDate.setHours(0, 0, 0, 0);

    if (lastDate.getTime() === today.getTime() || lastDate.getTime() === yesterday.getTime()) {
        current = streak;
    } else {
        current = 0;
    }

    return { current, longest };
};

// --- Achievements ---

/** Check which new achievements the user has earned. Returns only newly-unlocked IDs. */
export const checkNewAchievements = (
    progress: UserProgress,
    extra?: { lastCompletedDiscomfort?: number },
): string[] => {
    const alreadyUnlocked = new Set(progress.achievements ?? []);
    const newlyUnlocked: string[] = [];

    for (const achievement of ACHIEVEMENTS) {
        if (alreadyUnlocked.has(achievement.id)) continue;
        if (achievement.condition(progress, extra)) {
            newlyUnlocked.push(achievement.id);
        }
    }

    return newlyUnlocked;
};

