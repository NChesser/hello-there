import { Calendar, Zap, Users, TrendingUp } from "lucide-react";
import type { UserProgress } from "../types/types";
import { CHALLENGES } from "../data/challenges";
import { useTheme } from "../context/ThemeContext";

interface WeeklyInsightsProps {
    userProgress: UserProgress;
}

const WeeklyInsights = ({ userProgress }: WeeklyInsightsProps) => {
    const { isDark } = useTheme();

    // Calculate week boundaries
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Filter logs from past 7 days
    const weekLogs = userProgress.logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= weekAgo && logDate <= now && log.completed;
    });

    // Calculate stats
    const challengesCompleted = weekLogs.length;
    const xpEarned = weekLogs.reduce((sum, log) => sum + (log.xpEarned || 0), 0);
    
    // Calculate people met this week
    const peopleMet = userProgress.peopleMet?.filter(person => {
        try {
            const personData = JSON.parse(person);
            const metDate = new Date(personData.date);
            return metDate >= weekAgo && metDate <= now;
        } catch {
            return false;
        }
    }).length || 0;

    // Find most comfortable category
    const categoryCounts: Record<string, number> = {};
    weekLogs.forEach(log => {
        const challenge = CHALLENGES.find(c => c.id === log.challengeId);
        if (challenge) {
            categoryCounts[challenge.category] = (categoryCounts[challenge.category] || 0) + 1;
        }
    });
    
    const mostComfortableCategory = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "none yet";

    // Don't show if no activity this week
    if (challengesCompleted === 0) {
        return (
            <div className={`rounded-2xl p-6 shadow-sm border-2 ${
                isDark 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' 
                    : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'
            }`}>
                <div className="flex items-center gap-2 mb-2">
                    <Calendar size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                    <h3 className={`font-semibold ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>This Week</h3>
                </div>
                <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    Start your journey today! Complete your first challenge to see weekly insights.
                </p>
            </div>
        );
    }

    return (
        <div className={`rounded-2xl p-6 shadow-sm border-2 ${
            isDark 
                ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'
        }`}>
            <div className="flex items-center gap-2 mb-4">
                <Calendar size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                <h3 className={`font-semibold ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>This Week's Journey</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-lg p-3 border ${
                    isDark ? 'bg-gray-700/60 border-gray-600' : 'bg-white/60 border-blue-200'
                }`}>
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={16} className="text-orange-500" />
                        <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>Challenges</p>
                    </div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>{challengesCompleted}</p>
                </div>
                
                <div className={`rounded-lg p-3 border ${
                    isDark ? 'bg-gray-700/60 border-gray-600' : 'bg-white/60 border-blue-200'
                }`}>
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={16} className="text-amber-500" />
                        <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>XP Earned</p>
                    </div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>{xpEarned}</p>
                </div>
                
                <div className={`rounded-lg p-3 border ${
                    isDark ? 'bg-gray-700/60 border-gray-600' : 'bg-white/60 border-blue-200'
                }`}>
                    <div className="flex items-center gap-2 mb-1">
                        <Users size={16} className="text-green-500" />
                        <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>People Met</p>
                    </div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>{peopleMet}</p>
                </div>
                
                <div className={`rounded-lg p-3 border ${
                    isDark ? 'bg-gray-700/60 border-gray-600' : 'bg-white/60 border-blue-200'
                }`}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">🎯</span>
                        <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>Comfort Zone</p>
                    </div>
                    <p className={`text-xs font-semibold capitalize ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
                        {mostComfortableCategory.replace('-', ' ')}
                    </p>
                </div>
            </div>
            
            {challengesCompleted >= 5 && (
                <div className={`mt-4 rounded-lg p-3 border ${
                    isDark 
                        ? 'bg-purple-900/30 border-purple-700' 
                        : 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200'
                }`}>
                    <p className={`text-xs font-medium text-center ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
                        🌟 Amazing week! You're building real momentum!
                    </p>
                </div>
            )}
        </div>
    );
};

export default WeeklyInsights;
