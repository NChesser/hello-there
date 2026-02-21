import { create } from "zustand";


// Screen store for navigation state
export type Screen = string;

interface ScreenStore {
    selectedScreen: Screen;
    previouslySelectedScreen: Screen;
    setSelectedScreen: (screen: Screen) => void;
    resetSelectedScreen: () => void;
}

export const useScreenStore = create<ScreenStore>((set, get) => ({
    selectedScreen: "home",
    previouslySelectedScreen: "home",
    setSelectedScreen: (screen: Screen) => set({ selectedScreen: screen, previouslySelectedScreen: get().selectedScreen }),
    resetSelectedScreen: () => set({ selectedScreen: "home", previouslySelectedScreen: "home" }),
}));

// Convenience selectors
export const useSelectedScreen = () => useScreenStore((s) => s.selectedScreen);
export const useSetSelectedScreen = () => useScreenStore((s) => s.setSelectedScreen);

// Today's Challenge store
import type { Challenge, CompletionLog, Mood, UserProgress } from "../types/types";
import { CHALLENGES } from "../data/challenges";
import { calculateStreak, checkNewAchievements, getLevelFromTotalXp } from "../utils/helpers";
import { getUserTier } from "../data/tiers";

const TODAY_CHALLENGE_KEY = 'cozy-quest-today-challenge';
const LAST_CHALLENGE_DATE_KEY = 'cozy-quest-last-challenge-date';

// Load today's challenge from localStorage
const loadTodayChallenge = (): Challenge | null => {
    try {
        const lastDate = localStorage.getItem(LAST_CHALLENGE_DATE_KEY);
        const today = new Date().toDateString();
        
        // Check if we have a challenge for today
        if (lastDate === today) {
            const saved = localStorage.getItem(TODAY_CHALLENGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        }
    } catch (error) {
        console.error('Failed to load today\'s challenge from localStorage:', error);
    }
    return null;
};

// Save today's challenge to localStorage
const saveTodayChallenge = (challenge: Challenge | null) => {
    try {
        if (challenge) {
            localStorage.setItem(TODAY_CHALLENGE_KEY, JSON.stringify(challenge));
            localStorage.setItem(LAST_CHALLENGE_DATE_KEY, new Date().toDateString());
        } else {
            localStorage.removeItem(TODAY_CHALLENGE_KEY);
            localStorage.removeItem(LAST_CHALLENGE_DATE_KEY);
        }
    } catch (error) {
        console.error('Failed to save today\'s challenge to localStorage:', error);
    }
};

export const useTodayChallengeStore = create<{ todayChallenge: Challenge | null; setTodayChallenge: (challenge: Challenge | null) => void }>((set) => ({
    todayChallenge: loadTodayChallenge(),
    setTodayChallenge: (challenge: Challenge | null) => {
        saveTodayChallenge(challenge);
        set({ todayChallenge: challenge });
    },
}));

// Convenience selectors
export const useTodayChallenge = () => useTodayChallengeStore((s) => s.todayChallenge);

export const useSetTodayChallenge = () => {
    const set = useTodayChallengeStore((s) => s.setTodayChallenge);
    const userProgress = useUserProgress();

    return () => {
        // Get user preferences
        const excludedChallenges = userProgress.excludedChallenges || [];
        const preferredCategories = userProgress.preferredCategories || [];
        const createdChallenges = (userProgress.createdChallenges || []).map<Challenge>(c => ({
            id: c.id,
            title: c.title,
            description: c.description,
            discomfortRating: c.discomfortRating,
            category: c.category,
            xpReward: c.xpReward,
        }));

        // Combine built-in + custom challenges
        const allChallenges = [...CHALLENGES, ...createdChallenges];

        // Filter challenges based on user preferences
        let availableChallenges = allChallenges.filter(challenge => 
            !excludedChallenges.includes(challenge.id)
        );

        // If user has preferred categories, filter by those
        if (preferredCategories.length > 0) {
            availableChallenges = availableChallenges.filter(challenge => 
                preferredCategories.includes(challenge.category)
            );
        }

        // Filter by tier — only show challenges up to the user's tier max discomfort
        const tier = getUserTier(userProgress.level);
        const tierFiltered = availableChallenges.filter(
            (c) => c.discomfortRating <= tier.maxDiscomfort,
        );
        // Fall back to unfiltered if tier filtering empties the pool
        if (tierFiltered.length > 0) {
            availableChallenges = tierFiltered;
        }

        // If no challenges available after filtering, fall back to all challenges
        if (availableChallenges.length === 0) {
            availableChallenges = allChallenges;
        }

        // Select random challenge
        const idx = Math.floor(Math.random() * availableChallenges.length);
        set(availableChallenges[idx]);
    };
};


// User progress store

/** Callback for when new achievements are unlocked */
let achievementCallback: ((ids: string[]) => void) | null = null;
export const onAchievementUnlocked = (cb: (ids: string[]) => void) => {
    achievementCallback = cb;
};

interface UserProgressStore extends UserProgress {
    setUserProgress: (progress: Partial<UserProgress>) => void;
    completeChallenge: (log: CompletionLog, discomfortRating: number) => void;
    attemptChallenge: (challengeId: string, partialXp: number) => void;
    logMood: (mood: Mood) => void;
}

// LocalStorage key
const USER_PROGRESS_KEY = 'cozy-quest-user-progress';

// Load initial state from localStorage
const loadUserProgress = (): UserProgress => {
    try {
        const saved = localStorage.getItem(USER_PROGRESS_KEY);
        if (saved) {
            const parsed = JSON.parse(saved) as Partial<UserProgress> & {
                completedHabits?: string[];
                habitLogs?: { habitId: string; date: string; note?: string }[];
            };

            const completedPractices = parsed.completedPractices || parsed.completedHabits || [];
            const practiceLogs = parsed.practiceLogs || (parsed.habitLogs || []).map((log) => ({
                practiceId: log.habitId,
                date: log.date,
                note: log.note,
            }));

            // Migrate peopleMet from old JSON-stringified string[] format
            const rawPeople = parsed.peopleMet || [];
            const peopleMet = (rawPeople as unknown[]).map((entry) => {
                if (typeof entry === 'string') {
                    try {
                        return JSON.parse(entry);
                    } catch {
                        return { id: entry, name: entry, meetDate: new Date().toLocaleDateString() };
                    }
                }
                // Normalise legacy "date" → "meetDate"
                if (entry.date && !entry.meetDate) {
                    return { ...entry, meetDate: entry.date };
                }
                return entry;
            });

            return {
                level: parsed.level ?? 1,
                totalXp: parsed.totalXp ?? 0,
                completedChallenges: parsed.completedChallenges || [],
                completedPractices,
                peopleMet,
                logs: parsed.logs || [],
                practiceLogs,
                excludedChallenges: parsed.excludedChallenges || [],
                excludedPractices: parsed.excludedPractices || [],
                preferredCategories: parsed.preferredCategories || [],
                currentStreak: parsed.currentStreak ?? 0,
                longestStreak: parsed.longestStreak ?? 0,
                achievements: parsed.achievements || [],
                moodLogs: parsed.moodLogs || [],
            };
        }
    } catch (error) {
        console.error('Failed to load user progress from localStorage:', error);
    }
    // Default state
    return {
        level: 1,
        totalXp: 0,
        completedChallenges: [],
        completedPractices: [],
        peopleMet: [],
        logs: [],
        practiceLogs: [],
        excludedChallenges: [],
        excludedPractices: [],
        preferredCategories: [],
        currentStreak: 0,
        longestStreak: 0,
        achievements: [],
        moodLogs: [],
    };
};

// Save to localStorage
const saveUserProgress = (state: UserProgress) => {
    try {
        const { level, totalXp, completedChallenges, completedPractices, peopleMet, logs, practiceLogs, excludedChallenges, excludedPractices, preferredCategories, currentStreak, longestStreak, achievements, moodLogs } = state;
        localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify({
            level,
            totalXp,
            completedChallenges,
            completedPractices,
            peopleMet,
            logs,
            practiceLogs,
            excludedChallenges,
            excludedPractices,
            preferredCategories,
            currentStreak,
            longestStreak,
            achievements,
            moodLogs,
        }));
    } catch (error) {
        console.error('Failed to save user progress to localStorage:', error);
    }
};

const initialProgress = loadUserProgress();

export const useUserProgressStore = create<UserProgressStore>((set) => ({
    ...initialProgress,
    setUserProgress: (progress: Partial<UserProgress>) => set((state) => {
        const newState = {
            ...state,
            ...progress,
        };
        saveUserProgress(newState);
        return newState;
    }),

    completeChallenge: (log: CompletionLog, discomfortRating: number) => set((state) => {
        const newLogs = [...state.logs, log];
        const newTotalXp = state.totalXp + log.xpEarned;
        const newLevel = getLevelFromTotalXp(newTotalXp);
        const { current, longest } = calculateStreak(newLogs);

        const draft: UserProgress = {
            ...state,
            logs: newLogs,
            totalXp: newTotalXp,
            level: newLevel,
            completedChallenges: [...state.completedChallenges, log.challengeId],
            currentStreak: current,
            longestStreak: Math.max(longest, state.longestStreak ?? 0),
        };

        // Check achievements
        const newAchievements = checkNewAchievements(draft, { lastCompletedDiscomfort: discomfortRating });
        if (newAchievements.length > 0) {
            draft.achievements = [...(draft.achievements ?? []), ...newAchievements];
            achievementCallback?.(newAchievements);
        }

        saveUserProgress(draft);
        return draft;
    }),

    attemptChallenge: (challengeId: string, partialXp: number) => set((state) => {
        const log: CompletionLog = {
            challengeId,
            date: new Date().toISOString(),
            beforeFeeling: 0,
            afterFeeling: 0,
            completed: false,
            attempted: true,
            xpEarned: partialXp,
        };
        const newLogs = [...state.logs, log];
        const newTotalXp = state.totalXp + partialXp;
        const newLevel = getLevelFromTotalXp(newTotalXp);

        const draft: UserProgress = {
            ...state,
            logs: newLogs,
            totalXp: newTotalXp,
            level: newLevel,
        };

        const newAchievements = checkNewAchievements(draft);
        if (newAchievements.length > 0) {
            draft.achievements = [...(draft.achievements ?? []), ...newAchievements];
            achievementCallback?.(newAchievements);
        }

        saveUserProgress(draft);
        return draft;
    }),

    logMood: (mood: Mood) => set((state) => {
        const entry = { date: new Date().toISOString(), mood };
        const newState = {
            ...state,
            moodLogs: [...(state.moodLogs ?? []), entry],
        };
        saveUserProgress(newState);
        return newState;
    }),
}));

// Convenience selectors
export const useUserPracticeLogs = () => useUserProgressStore((s) => s.practiceLogs);
export const useUserProgress = () => useUserProgressStore((s) => (s));
export const useSetUserProgressStore = () => useUserProgressStore((s) => s.setUserProgress);
