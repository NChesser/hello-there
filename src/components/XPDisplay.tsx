import { useUserProgress } from "../store/store";
import { Users, Sparkles, Flower2 } from "lucide-react";
import { getXpForLevel, getXpProgress } from "../utils/helpers";
import Typography from "./Typography";

const XPDisplayCompact = () => {
    const userProgress = useUserProgress();

    const xpPercentage =
        (getXpProgress(userProgress.totalXp) / getXpForLevel(userProgress.level)) * 100;

    return (
        <div className="p-4 rounded-lg shadow-sm border bg-white border-amber-200 dark:bg-gray-800 dark:border-gray-700">
            {/* Level and XP in one row */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full flex items-center justify-center text-2xl shadow-sm">
                        🐨
                    </div>
                    <div>
                        <Typography as="p" variant="overline">
                            Level
                        </Typography>
                        <Typography
                            variant="title"
                            className="text-amber-900 dark:text-amber-200"
                        >
                            {userProgress.level}
                        </Typography>
                    </div>
                </div>
                <div className="text-right">
                    <Typography as="p" variant="overline">
                        XP
                    </Typography>
                    <Typography
                        variant="label"
                        className="text-amber-900 dark:text-amber-200"
                    >
                        {getXpProgress(userProgress.totalXp)} / {getXpForLevel(userProgress.level)}
                    </Typography>
                </div>
            </div>

            {/* Compact XP Bar */}
            <div className="w-full rounded-full h-2 overflow-hidden mb-3 bg-amber-100 dark:bg-gray-700">
                <div
                    className="bg-gradient-to-r from-orange-400 to-amber-400 h-full transition-all duration-500"
                    style={{ width: `${Math.min(xpPercentage, 100)}%` }}
                />
            </div>

            {/* Compact Stats Row */}
            <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg p-2 border text-center bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                    <Sparkles size={16} className="mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                    <Typography
                        variant="subtitle"
                        className="font-bold text-blue-900 dark:text-blue-300"
                    >
                        {userProgress.completedChallenges.length}
                    </Typography>
                    <Typography variant="caption" className="text-blue-700 dark:text-blue-400">
                        Challenges
                    </Typography>
                </div>

                <div className="rounded-lg p-2 border text-center bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                    <Flower2 size={16} className="mx-auto mb-1 text-green-600 dark:text-green-400" />
                    <Typography
                        variant="subtitle"
                        className="font-bold text-green-900 dark:text-green-300"
                    >
                        {userProgress.completedPractices.length}
                    </Typography>
                    <Typography variant="caption" className="text-green-700 dark:text-green-400">
                        Practices
                    </Typography>
                </div>

                <div className="rounded-lg p-2 border text-center bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                    <Users size={16} className="mx-auto mb-1 text-purple-600 dark:text-purple-400" />
                    <Typography
                        variant="subtitle"
                        className="font-bold text-purple-900 dark:text-purple-300"
                    >
                        {userProgress.peopleMet.length}
                    </Typography>
                    <Typography variant="caption" className="text-purple-700 dark:text-purple-400">
                        People
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default XPDisplayCompact;