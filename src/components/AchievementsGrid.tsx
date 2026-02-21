import { ACHIEVEMENTS } from "../data/achievements";
import { useUserProgress } from "../store/store";
import { Lock } from "lucide-react";

const AchievementsGrid = () => {
    const userProgress = useUserProgress();
    const unlocked = new Set(userProgress.achievements ?? []);

    return (
        <div className="grid grid-cols-3 gap-3">
            {ACHIEVEMENTS.map((achievement) => {
                const isUnlocked = unlocked.has(achievement.id);
                return (
                    <div
                        key={achievement.id}
                        className={`rounded-xl p-3 text-center border transition-all ${
                            isUnlocked
                                ? "bg-amber-50 border-amber-300 shadow-sm dark:bg-gray-700 dark:border-amber-600"
                                : "bg-gray-50 border-gray-200 opacity-50 dark:bg-gray-800 dark:border-gray-700"
                        }`}
                    >
                        <div className="text-2xl mb-1">
                            {isUnlocked ? (
                                achievement.icon
                            ) : (
                                <Lock
                                    size={20}
                                    className="mx-auto text-gray-400 dark:text-gray-600"
                                />
                            )}
                        </div>
                        <p
                            className={`text-xs font-semibold leading-tight ${
                                isUnlocked
                                    ? "text-gray-800 dark:text-gray-200"
                                    : "text-gray-400 dark:text-gray-500"
                            }`}
                        >
                            {achievement.title}
                        </p>
                        <p
                            className={`text-[10px] mt-0.5 leading-tight ${
                                isUnlocked
                                    ? "text-gray-500 dark:text-gray-400"
                                    : "text-gray-300 dark:text-gray-600"
                            }`}
                        >
                            {achievement.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default AchievementsGrid;
