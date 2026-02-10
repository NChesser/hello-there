import { useUserProgress } from "../store/store";
import { Trophy, Zap, Users } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const XPDisplayCompact = () => {
    const { isDark } = useTheme();
    const userProgress = useUserProgress();

    const xpPercentage =
        (userProgress.totalXp / calculateXpForLevel(userProgress.level)) * 100;

    return (
        <div className={`p-4 rounded-lg shadow-sm border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-200'
        }`}>
            {/* Level and XP in one row */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full flex items-center justify-center text-2xl shadow-sm">
                        🐨
                    </div>
                    <div>
                        <p className={`text-xs font-medium uppercase ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>Level</p>
                        <p className={`text-2xl font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>{userProgress.level}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className={`text-xs font-medium ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>XP</p>
                    <p className={`text-sm font-semibold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                        {userProgress.totalXp} / {calculateXpForLevel(userProgress.level)}
                    </p>
                </div>
            </div>

            {/* Compact XP Bar */}
            <div className={`w-full rounded-full h-2 overflow-hidden mb-3 ${isDark ? 'bg-gray-700' : 'bg-amber-100'}`}>
                <div
                    className="bg-gradient-to-r from-orange-400 to-amber-400 h-full transition-all duration-500"
                    style={{ width: `${Math.min(xpPercentage, 100)}%` }}
                />
            </div>

            {/* Compact Stats Row */}
            <div className="grid grid-cols-3 gap-2">
                <div className={`rounded-lg p-2 border text-center ${
                    isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
                }`}>
                    <Zap size={16} className={`mx-auto mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <p className={`text-lg font-bold ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                        {userProgress.completedChallenges.length}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>Challenges</p>
                </div>

                <div className={`rounded-lg p-2 border text-center ${
                    isDark ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'
                }`}>
                    <Trophy size={16} className={`mx-auto mb-1 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    <p className={`text-lg font-bold ${isDark ? 'text-green-300' : 'text-green-900'}`}>
                        {userProgress.completedHabits.length}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-green-400' : 'text-green-700'}`}>Habits</p>
                </div>

                <div className={`rounded-lg p-2 border text-center ${
                    isDark ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
                }`}>
                    <Users size={16} className={`mx-auto mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <p className={`text-lg font-bold ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
                        {userProgress.peopleMet.length}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>People</p>
                </div>
            </div>
        </div>
    );
};

export default XPDisplayCompact;

const calculateXpForLevel = (level: number) => {
    return level * 300;
};