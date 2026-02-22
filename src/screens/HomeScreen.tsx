// Components
import { useMemo, useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import ChallengeCard from "../components/ChallengeCard";
import DailyQuote from "../components/DailyQuote";
import MoodCheckIn from "../components/MoodCheckIn";

// Store
import { useUserProgress, useUserProgressStore } from "../store/store";

// Data
import { getUserTier, getNextTier } from "../data/tiers";

// Helpers
import { getXpProgress, getXpForLevel } from "../utils/helpers";

// Types
import type { Mood } from "../types/types";

const HomeScreen = () => {
    const userProgress = useUserProgress();
    const logMood = useUserProgressStore((state) => state.logMood);

    // Load today's mood from persisted logs (if any)
    const todaysMood = useMemo(() => {
        const today = new Date().toDateString();
        const todayLog = (userProgress.moodLogs ?? [])
            .slice()
            .reverse()
            .find((entry) => new Date(entry.date).toDateString() === today);
        return todayLog?.mood ?? null;
    }, [userProgress.moodLogs]);

    const [selectedMood, setSelectedMood] = useState < Mood | null > (todaysMood);

    const completedToday = userProgress.logs.filter(
        (l) =>
            l.completed &&
            new Date(l.date).toDateString() === new Date().toDateString(),
    ).length;

    const tier = getUserTier(userProgress.level);
    const nextTier = getNextTier(userProgress.level);
    const xpInLevel = getXpProgress(userProgress.totalXp);
    const xpNeeded = getXpForLevel(userProgress.level);

    const handleMoodSelected = (mood: Mood) => {
        setSelectedMood(mood);
        logMood(mood);
    };

    return (
        <ScreenContainer>
            <div className="space-y-5">
                <DailyQuote />

                {/* Tier + XP progress bar */}
                {/* <div className="rounded-2xl p-4 border bg-white border-amber-100 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:shadow-none">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{tier.emoji}</span>
                            <span className={`text-sm font-semibold ${tier.color}`}>{tier.name}</span>
                        </div>
                        {nextTier && (
                            <span className="text-xs text-amber-400 dark:text-gray-500">
                                Next: {nextTier.emoji} {nextTier.name} (Lvl {nextTier.minLevel})
                            </span>
                        )}
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-amber-100 dark:bg-gray-700">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-500"
                            style={{ width: `${(xpInLevel / xpNeeded) * 100}%` }}
                        />
                    </div>
                    <p className="text-xs mt-1 text-amber-400 dark:text-gray-500">
                        {xpInLevel} / {xpNeeded} XP to next level
                    </p>
                </div> */}

                {/* The hero — today's challenge */}
                <ChallengeCard />

                {/* Compact stat pills */}
                {/* <div className="flex gap-2">
                    <div className="flex-1 rounded-xl px-4 py-3 text-center bg-white border border-amber-100 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:shadow-none">
                        <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                            {userProgress.level}
                        </p>
                        <p className="text-xs text-amber-600 dark:text-gray-400">
                            Level
                        </p>
                    </div>
                    <div className="flex-1 rounded-xl px-4 py-3 text-center bg-white border border-amber-100 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:shadow-none">
                        <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                            🔥 {userProgress.currentStreak ?? 0}
                        </p>
                        <p className="text-xs text-amber-600 dark:text-gray-400">
                            Streak
                        </p>
                    </div>
                    <div className="flex-1 rounded-xl px-4 py-3 text-center bg-white border border-amber-100 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:shadow-none">
                        <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                            {completedToday}
                        </p>
                        <p className="text-xs text-amber-600 dark:text-gray-400">
                            Today
                        </p>
                    </div>
                </div> */}

                <MoodCheckIn
                    selectedMood={selectedMood}
                    onMoodSelected={handleMoodSelected}
                />
            </div>
        </ScreenContainer>
    );
};

export default HomeScreen;
