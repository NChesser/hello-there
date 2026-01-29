import React from "react";

// Store
import { useScreenStore } from "../store/store";

// Icons from lucide-react
import { Sparkles, Flower2, Book, Users, Settings } from "lucide-react";

const BottomNav = () => {
    const selectedScreen = useScreenStore((state) => {
        return state.selectedScreen;
    });
    console.log("🚀 ~ BottomNav ~ selectedScreen:", selectedScreen)
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );

    return (
        <div className="space-x-3 max-w-md mx-auto bg-white border-4 border-amber-100 rounded-3xl shadow-lg">
            <div className="flex justify-around p-4">
                <button
                    onClick={() => setSelectedScreen("home")}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                        selectedScreen === "home"
                            ? "text-amber-600 bg-amber-50"
                            : "text-amber-400"
                    }`}
                >
                    <Sparkles size={20} />
                    <span className="text-xs">Home</span>
                </button>
                <button
                    onClick={() => setSelectedScreen("habits")}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                        selectedScreen === "habits"
                            ? "text-amber-600 bg-amber-50"
                            : "text-amber-400"
                    }`}
                >
                    <Flower2 size={20} />
                    <span className="text-xs">Habits</span>
                </button>
                <button
                    onClick={() => setSelectedScreen("people")}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                        selectedScreen === "people"
                            ? "text-amber-600 bg-amber-50"
                            : "text-amber-400"
                    }`}
                >
                    <Users size={20} />
                    <span className="text-xs">People</span>
                </button>
                <button
                    onClick={() => setSelectedScreen("progress")}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                        selectedScreen === "progress"
                            ? "text-amber-600 bg-amber-50"
                            : "text-amber-400"
                    }`}
                >
                    <Book size={20} />
                    <span className="text-xs">Journey</span>
                </button>
                <button
                    onClick={() => setSelectedScreen("settings")}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                        selectedScreen === "settings"
                            ? "text-amber-600 bg-amber-50"
                            : "text-amber-400"
                    }`}
                >
                    <Settings size={20} />
                    <span className="text-xs">Settings</span>
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
