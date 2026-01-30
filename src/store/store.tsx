import { create } from "zustand";
import type { User, CompletionLog, HabitLog, CreatedChallenge, CreatedHabit, PersonMet } from "../types/types";
import * as userService from "./userService";


// Screen store for navigation state
export type Screen = "home" | "challenge" | "reflect" | "progress" | "people" | "habits" | "settings";

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
    
    // Habit operations
    logHabitCompletion: (habitLog: HabitLog) => Promise<void>;
    chooseHabit: (habitId: string) => Promise<void>;
    unchooseHabit: (habitId: string) => Promise<void>;
    createHabit: (habit: Omit<CreatedHabit, "id" | "createdAt">) => Promise<void>;
    deleteCreatedHabit: (habitId: string) => Promise<void>;
    
    // People operations
    addPersonMet: (person: Omit<PersonMet, "id">) => Promise<void>;
    removePersonMet: (personId: string) => Promise<void>;
}

export const useScreenStore = create<ScreenStore>((set) => ({
    selectedScreen: "home",
    previouslySelectedScreen: "home",
    setSelectedScreen: (screen: Screen) => set({ selectedScreen: screen, previouslySelectedScreen: screen }),
    resetSelectedScreen: () => set({ selectedScreen: "home" }),
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

    logHabitCompletion: async (habitLog: HabitLog) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.logHabitCompletion(state.user, habitLog).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to log habit completion";
            set({ error: message });
        }
    },

    chooseHabit: async (habitId: string) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.chooseHabit(state.user, habitId).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to choose habit";
            set({ error: message });
        }
    },

    unchooseHabit: async (habitId: string) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.unchooseHabit(state.user, habitId).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to unchoose habit";
            set({ error: message });
        }
    },

    createHabit: async (habit: Omit<CreatedHabit, "id" | "createdAt">) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.createHabit(state.user, habit).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to create habit";
            set({ error: message });
        }
    },

    deleteCreatedHabit: async (habitId: string) => {
        try {
            set((state) => {
                if (!state.user) return state;
                userService.deleteCreatedHabit(state.user, habitId).then((user) => {
                    set({ user });
                });
                return state;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete habit";
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


// User progress store
import type { UserProgress } from "../types/types";

export const useUserProgressStore = create<UserProgress>((set) => ({
    level: 1,
    totalXp: 0,
    completedChallenges: [],
    completedHabits: [],
    peopleMet: [],
    logs: [],
    habitLogs: [],
    setUserProgress: (progress: Partial<UserProgress>) => set((state) => ({
        ...state,
        ...progress,
    })),
}));

// Convenience selectors
export const useUserLevel = () => useUserProgressStore((s) => s.level);
export const useUserTotalXp = () => useUserProgressStore((s) => s.totalXp);
export const useUserCompletedChallenges = () => useUserProgressStore((s) => s.completedChallenges);
export const useUserLogs = () => useUserProgressStore((s) => s.logs);
export const useSetUserProgress = () => useUserProgressStore((s) => s.setUserProgress);
export const useUserCompletedHabits = () => useUserProgressStore((s) => s.completedHabits);
export const useUserHabitLogs = () => useUserProgressStore((s) => s.habitLogs);
export const useSetUserHabitLogs = () => useUserProgressStore((s) => s.habitLogs);
export const useSetUserCompletedChallenges = () => useUserProgressStore((s) => s.completedChallenges);
export const useSetUserCompletedHabits = () => useUserProgressStore((s) => s.completedHabits);
export const useSetUserLogs = () => useUserProgressStore((s) => s.logs);
export const useSetUserTotalXp = () => useUserProgressStore((s) => s.totalXp);
export const useSetUserLevel = () => useUserProgressStore((s) => s.level);
export const useUserProgress = () => useUserProgressStore((s) => (s));
export const useSetUserProgressStore = () => useUserProgressStore((s) => s.setUserProgress);
export const useResetUserProgressStore = () => useUserProgressStore((s) => s.setUserProgress({
    level: 1,
    totalXp: 0,
    completedChallenges: [],
    completedHabits: [],
    logs: [],
    habitLogs: [],
}));

