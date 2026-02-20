import { create } from "zustand";
import type { User, CompletionLog, PracticeLog, CreatedChallenge, CreatedPractice, PersonMet } from "../types/types";
import * as userService from "./userService";


// Screen store for navigation state
export type Screen = string;

interface ScreenStore {
    selectedScreen: Screen;
    previouslySelectedScreen: Screen;
    setSelectedScreen: (screen: Screen) => void;
    resetSelectedScreen: () => void;
}

interface UserStore {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    
    // Initialization
    initializeUser: () => Promise<void>;
    
    // Challenge operations
    logChallengeCompletion: (log: CompletionLog) => Promise<void>;
    createChallenge: (challenge: Omit<CreatedChallenge, "id" | "createdAt">) => Promise<void>;
    deleteCreatedChallenge: (challengeId: string) => Promise<void>;
    
    // Practice operations
    logPracticeCompletion: (practiceLog: PracticeLog) => Promise<void>;
    choosePractice: (practiceId: string) => Promise<void>;
    unchoosePractice: (practiceId: string) => Promise<void>;
    createPractice: (practice: Omit<CreatedPractice, "id" | "createdAt">) => Promise<void>;
    deleteCreatedPractice: (practiceId: string) => Promise<void>;
    
    // People operations
    addPersonMet: (person: Omit<PersonMet, "id">) => Promise<void>;
    removePersonMet: (personId: string) => Promise<void>;
}

export const useScreenStore = create<ScreenStore>((set, get) => ({
    selectedScreen: "home",
    previouslySelectedScreen: "home",
    setSelectedScreen: (screen: Screen) => set({ selectedScreen: screen, previouslySelectedScreen: get().selectedScreen }),
    resetSelectedScreen: () => set({ selectedScreen: "home", previouslySelectedScreen: "home" }),
}));

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    isLoading: true,
    error: null,

    initializeUser: async () => {
        try {
            set({ isLoading: true, error: null });
            const user = await userService.loadUser();
            set({ user, isLoading: false });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to load user data";
            set({ error: message, isLoading: false });
        }
    },

    logChallengeCompletion: async (log: CompletionLog) => {
        try {
            set((state) => {
                if (!state.user) return state;
                const updatedUser = { ...state.user };
                userService.logChallengeCompletion(updatedUser, log).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to log challenge completion";
            set({ error: message });
        }
    },

    createChallenge: async (challenge: Omit<CreatedChallenge, "id" | "createdAt">) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.createChallenge(state.user, challenge).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to create challenge";
            set({ error: message });
        }
    },

    deleteCreatedChallenge: async (challengeId: string) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.deleteCreatedChallenge(state.user, challengeId).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete challenge";
            set({ error: message });
        }
    },

    logPracticeCompletion: async (practiceLog: PracticeLog) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.logPracticeCompletion(state.user, practiceLog).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to log practice completion";
            set({ error: message });
        }
    },

    choosePractice: async (practiceId: string) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.choosePractice(state.user, practiceId).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to choose practice";
            set({ error: message });
        }
    },

    unchoosePractice: async (practiceId: string) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.unchoosePractice(state.user, practiceId).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to unchoose practice";
            set({ error: message });
        }
    },

    createPractice: async (practice: Omit<CreatedPractice, "id" | "createdAt">) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.createPractice(state.user, practice).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to create practice";
            set({ error: message });
        }
    },

    deleteCreatedPractice: async (practiceId: string) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.deleteCreatedPractice(state.user, practiceId).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete practice";
            set({ error: message });
        }
    },

    addPersonMet: async (person: Omit<PersonMet, "id">) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.addPersonMet(state.user, person).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to add person";
            set({ error: message });
        }
    },

    removePersonMet: async (personId: string) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.removePersonMet(state.user, personId).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to remove person";
            set({ error: message });
        }
    },
}));

// Convenience selectors
export const useSelectedScreen = () => useScreenStore((s) => s.selectedScreen);
export const useSetSelectedScreen = () => useScreenStore((s) => s.setSelectedScreen);
export const usePreviouslySelectedScreen = () => useScreenStore((s) => s.previouslySelectedScreen);

// Today's Challenge store
import type { Challenge } from "../types/types";
import { CHALLENGES } from "../data/challenges";

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

        // Filter challenges based on user preferences
        let availableChallenges = CHALLENGES.filter(challenge => 
            !excludedChallenges.includes(challenge.id)
        );

        // If user has preferred categories, filter by those
        if (preferredCategories.length > 0) {
            availableChallenges = availableChallenges.filter(challenge => 
                preferredCategories.includes(challenge.category)
            );
        }

        // If no challenges available after filtering, fall back to all challenges
        if (availableChallenges.length === 0) {
            availableChallenges = CHALLENGES;
        }

        // Select random challenge
        const idx = Math.floor(Math.random() * availableChallenges.length);
        set(availableChallenges[idx]);
    };
};


// User progress store
import type { UserProgress } from "../types/types";

interface UserProgressStore extends UserProgress {
    setUserProgress: (progress: Partial<UserProgress>) => void;
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

            return {
                level: parsed.level ?? 1,
                totalXp: parsed.totalXp ?? 0,
                completedChallenges: parsed.completedChallenges || [],
                completedPractices,
                peopleMet: parsed.peopleMet || [],
                logs: parsed.logs || [],
                practiceLogs,
                excludedChallenges: parsed.excludedChallenges || [],
                preferredCategories: parsed.preferredCategories || [],
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
        preferredCategories: [],
    };
};

// Save to localStorage
const saveUserProgress = (state: UserProgress) => {
    console.log("🚀 ~ saveUserProgress ~ state:", state)
    try {
        const { level, totalXp, completedChallenges, completedPractices, peopleMet, logs, practiceLogs, excludedChallenges, preferredCategories } = state;
        localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify({
            level,
            totalXp,
            completedChallenges,
            completedPractices,
            peopleMet,
            logs,
            practiceLogs,
            excludedChallenges,
            preferredCategories,
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
        // Save to localStorage whenever state changes
        saveUserProgress(newState);
        return newState;
    }),
}));

// Convenience selectors
export const useUserLevel = () => useUserProgressStore((s) => s.level);
export const useUserTotalXp = () => useUserProgressStore((s) => s.totalXp);
export const useUserCompletedChallenges = () => useUserProgressStore((s) => s.completedChallenges);
export const useUserLogs = () => useUserProgressStore((s) => s.logs);
export const useSetUserProgress = () => useUserProgressStore((s) => s.setUserProgress);
export const useUserCompletedPractices = () => useUserProgressStore((s) => s.completedPractices);
export const useUserPracticeLogs = () => useUserProgressStore((s) => s.practiceLogs);
export const useSetUserPracticeLogs = () => useUserProgressStore((s) => s.practiceLogs);
export const useSetUserCompletedChallenges = () => useUserProgressStore((s) => s.completedChallenges);
export const useSetUserCompletedPractices = () => useUserProgressStore((s) => s.completedPractices);
export const useSetUserLogs = () => useUserProgressStore((s) => s.logs);
export const useSetUserTotalXp = () => useUserProgressStore((s) => s.totalXp);
export const useSetUserLevel = () => useUserProgressStore((s) => s.level);
export const useUserProgress = () => useUserProgressStore((s) => (s));
export const useSetUserProgressStore = () => useUserProgressStore((s) => s.setUserProgress);
export const useResetUserProgressStore = () => useUserProgressStore((s) => s.setUserProgress({
    level: 1,
    totalXp: 0,
    completedChallenges: [],
    completedPractices: [],
    logs: [],
    practiceLogs: [],
}));

