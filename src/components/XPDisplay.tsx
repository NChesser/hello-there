import { useUserProgress } from "../store/store";
import { Trophy, Zap, Users } from "lucide-react";

const XPDisplayCompact = () => {
    const userProgress = useUserProgress();

    const xpPercentage =
        (userProgress.totalXp / calculateXpForLevel(userProgress.level)) * 100;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-200">
            {/* Level and XP in one row */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full flex items-center justify-center text-2xl shadow-sm">
                        🐨
                    </div>
                    <div>
                        <p className="text-xs text-amber-600 font-medium uppercase">Level</p>
                        <p className="text-2xl font-bold text-amber-900">{userProgress.level}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-amber-600 font-medium">XP</p>
                    <p className="text-sm font-semibold text-amber-900">
                        {userProgress.totalXp} / {calculateXpForLevel(userProgress.level)}
                    </p>
                </div>
            </div>

            {/* Compact XP Bar */}
            <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden mb-3">
                <div
                    className="bg-gradient-to-r from-orange-400 to-amber-400 h-full transition-all duration-500"
                    style={{ width: `${Math.min(xpPercentage, 100)}%` }}
                />
            </div>

            {/* Compact Stats Row */}
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-50 rounded-lg p-2 border border-blue-200 text-center">
                    <Zap size={16} className="text-blue-600 mx-auto mb-1" />
                    <p className="text-lg font-bold text-blue-900">
                        {userProgress.completedChallenges.length}
                    </p>
                    <p className="text-xs text-blue-700">Challenges</p>
                </div>

                <div className="bg-green-50 rounded-lg p-2 border border-green-200 text-center">
                    <Trophy size={16} className="text-green-600 mx-auto mb-1" />
                    <p className="text-lg font-bold text-green-900">
                        {userProgress.completedHabits.length}
                    </p>
                    <p className="text-xs text-green-700">Habits</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-2 border border-purple-200 text-center">
                    <Users size={16} className="text-purple-600 mx-auto mb-1" />
                    <p className="text-lg font-bold text-purple-900">
                        {userProgress.peopleMet.length}
                    </p>
                    <p className="text-xs text-purple-700">People</p>
                </div>
            </div>
        </div>
    );
};

export default XPDisplayCompact;

const calculateXpForLevel = (level: number) => {
    return level * 300;
};