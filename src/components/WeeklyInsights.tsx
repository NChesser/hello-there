import { Calendar, Target, Zap, Users, TrendingUp } from "lucide-react";
import type { UserProgress } from "../types/types";
import { CHALLENGES } from "../data/challenges";
import Typography from "./Typography";

interface WeeklyInsightsProps {
    userProgress: UserProgress;
}

const WeeklyInsights = ({ userProgress }: WeeklyInsightsProps) => {
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
            <div className="rounded-2xl p-6 shadow-sm border-2 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 dark:from-gray-800 dark:to-gray-750 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                    <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                    <Typography as="h3" variant="subtitle" className="text-blue-900 dark:text-blue-300">
                        This Week
                    </Typography>
                </div>
                <Typography variant="body-sm" className="text-blue-700 dark:text-blue-400">
                    Start your journey today! Complete your first challenge to see weekly insights.
                </Typography>
            </div>
        );
    }

    return (
        <div className="rounded-2xl p-6 shadow-sm border-2 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 dark:from-gray-800 dark:to-gray-750 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
                <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                <Typography as="h3" variant="subtitle" className="text-blue-900 dark:text-blue-300">
                    This Week's Journey
                </Typography>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3 border bg-white/60 border-blue-200 dark:bg-gray-700/60 dark:border-gray-600">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={16} className="text-orange-500" />
                        <Typography as="p" variant="caption" className="text-blue-700 dark:text-blue-400">
                            Challenges
                        </Typography>
                    </div>
                    <Typography variant="title" className="text-blue-900 dark:text-blue-200">
                        {challengesCompleted}
                    </Typography>
                </div>
                
                <div className="rounded-lg p-3 border bg-white/60 border-blue-200 dark:bg-gray-700/60 dark:border-gray-600">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={16} className="text-amber-500" />
                        <Typography as="p" variant="caption" className="text-blue-700 dark:text-blue-400">
                            XP Earned
                        </Typography>
                    </div>
                    <Typography variant="title" className="text-blue-900 dark:text-blue-200">
                        {xpEarned}
                    </Typography>
                </div>
                
                <div className="rounded-lg p-3 border bg-white/60 border-blue-200 dark:bg-gray-700/60 dark:border-gray-600">
                    <div className="flex items-center gap-2 mb-1">
                        <Users size={16} className="text-green-500" />
                        <Typography as="p" variant="caption" className="text-blue-700 dark:text-blue-400">
                            People Met
                        </Typography>
                    </div>
                    <Typography variant="title" className="text-blue-900 dark:text-blue-200">
                        {peopleMet}
                    </Typography>
                </div>
                
                <div className="rounded-lg p-3 border bg-white/60 border-blue-200 dark:bg-gray-700/60 dark:border-gray-600">
                    <div className="flex items-center gap-2 mb-1">
                        <Target size={16} className="text-amber-500" />
                        <Typography as="p" variant="caption" className="text-blue-700 dark:text-blue-400">
                            Comfort Zone
                        </Typography>
                    </div>
                    <Typography
                        variant="caption"
                        className="font-semibold capitalize text-blue-900 dark:text-blue-200"
                    >
                        {mostComfortableCategory.replace('-', ' ')}
                    </Typography>
                </div>
            </div>
            
            {challengesCompleted >= 5 && (
                <div className="mt-4 rounded-lg p-3 border bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 dark:bg-purple-900/30 dark:from-purple-900/30 dark:to-purple-900/30 dark:border-purple-700">
                    <Typography
                        variant="caption"
                        className="font-medium text-center text-purple-900 dark:text-purple-300"
                    >
                        🌟 Amazing week! You're building real momentum!
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default WeeklyInsights;
