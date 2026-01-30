import { create } from "zustand";


// Screen store for navigation state
export type Screen = "home" | "challenge" | "reflect" | "progress" | "people" | "habits" | "settings";

interface Store {
    selectedScreen: Screen;
    previouslySelectedScreen: Screen;
    setSelectedScreen: (screen: Screen) => void;
    resetSelectedScreen: () => void;
}

export const useScreenStore = create<Store>((set) => ({
    selectedScreen: "home",
    previouslySelectedScreen: "home",
    setSelectedScreen: (screen: Screen) => set({ selectedScreen: screen, previouslySelectedScreen: screen }),
    resetSelectedScreen: () => set({ selectedScreen: "home" }),
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

