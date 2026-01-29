import create from "zustand";

export type Screen = "home" | "list" | "detail" | "settings";

interface Store {
    selectedScreen: Screen;
    setSelectedScreen: (screen: Screen) => void;
    resetSelectedScreen: () => void;
}

export const useScreenStore = create<Store>((set) => ({
    selectedScreen: "home",
    setSelectedScreen: (screen: Screen) => set({ selectedScreen: screen }),
    resetSelectedScreen: () => set({ selectedScreen: "home" }),
}));

// Convenience selectors
export const useSelectedScreen = () => useScreenStore((s) => s.selectedScreen);
export const useSetSelectedScreen = () => useScreenStore((s) => s.setSelectedScreen);