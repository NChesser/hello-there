// Store
import { useUserProgress, useUserProgressStore } from "../store/store";

//  XP Display Component
const XPDisplay = () => {
    const userProgress = useUserProgress();
    console.log("🚀 ~ XPDisplay ~ userProgress:", userProgress);

    return (
        <div className="bg-gradient-to-r from-orange-200 to-amber-200 p-4 rounded-3xl shadow-sm">
            <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
                        🐨
                    </div>
                    <div>
                        <div className="text-sm text-amber-900 opacity-75">
                            Level {userProgress.level}
                        </div>
                        <div className="text-xs text-amber-800 opacity-60">
                            {userProgress.totalXp} /{" "}
                            {calculateXpForLevel(userProgress.level)} XP
                        </div>
                    </div>
                    <div className="ml-4 text-3xl font-bold text-amber-900">
                        ⭐ {userProgress.totalXp}
                    </div>
                </div>
            </div>

            {/* XP Bar */}
            <div className="mt-3 bg-amber-100 rounded-full h-2 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-orange-400 to-amber-400 h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${(userProgress.totalXp / calculateXpForLevel(userProgress.level)) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default XPDisplay;

// Helper function to calculate XP needed for next level
const calculateXpForLevel = (level: number) => {
    return level * 300; // Example: each level requires 300 more XP
};
