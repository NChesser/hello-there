import { useMemo, useState } from "react";

// Components
import CompletedChallenges from "../components/CompletedChallenges";
import DateComplete from "../components/DateComplete";
import ScreenContainer from "../components/ScreenContainer";
import XPDisplay from "../components/XPDisplay";
import AchievementsGrid from "../components/AchievementsGrid";

// Store
import { useUserProgress } from "../store/store";

// Icons
import { BookOpen, Trophy, TrendingUp } from "lucide-react";

type Tab = "journal" | "badges" | "insights";

const TABS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "badges", label: "Badges", icon: Trophy },
    { id: "insights", label: "Insights", icon: TrendingUp },
];

// --- Insights helpers ---

const MOOD_EMOJI: Record<string, string> = {
    overwhelmed: "😰",
    nervous: "😟",
    okay: "😊",
    good: "😄",
    brave: "🦁",
};

const MoodTrends = () => {
    const userProgress = useUserProgress();
    const moodLogs = userProgress.moodLogs ?? [];

    // Last 7 moods
    const recent = moodLogs.slice(-7);

    if (recent.length === 0) {
        return (
            <p className="text-sm text-center py-4 text-amber-400 dark:text-gray-500">
                Use the mood check-in on the home screen to start tracking trends.
            </p>
        );
    }

    return (
        <div className="rounded-xl p-4 border bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-3 text-amber-800 dark:text-amber-300">
                Recent Moods
            </h4>
            <div className="flex justify-between gap-1">
                {recent.map((entry, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-xl">{MOOD_EMOJI[entry.mood] ?? "😊"}</span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                            {new Date(entry.date).toLocaleDateString(undefined, { weekday: "short" })}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const WeeklyChart = () => {
    const userProgress = useUserProgress();

    // Count completions per day for last 7 days
    const data = useMemo(() => {
        const days: { label: string; count: number }[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const ds = d.toDateString();
            const count = userProgress.logs.filter(
                (l) => l.completed && new Date(l.date).toDateString() === ds,
            ).length;
            days.push({
                label: d.toLocaleDateString(undefined, { weekday: "short" }),
                count,
            });
        }
        return days;
    }, [userProgress.logs]);

    const max = Math.max(1, ...data.map((d) => d.count));

    return (
        <div className="rounded-xl p-4 border bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-3 text-amber-800 dark:text-amber-300">
                This Week
            </h4>
            <div className="flex items-end gap-2 h-24">
                {data.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                            className={`w-full rounded-t-md transition-all ${
                                day.count > 0
                                    ? "bg-gradient-to-t from-amber-400 to-orange-300"
                                    : "bg-gray-100 dark:bg-gray-700"
                            }`}
                            style={{ height: `${(day.count / max) * 100}%`, minHeight: 4 }}
                        />
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                            {day.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const InsightsTab = () => {
    const userProgress = useUserProgress();

    // Feeling improvement: average before vs. after across all completions
    const feelingData = useMemo(() => {
        const completed = userProgress.logs.filter((l) => l.completed && l.beforeFeeling && l.afterFeeling);
        if (completed.length === 0) return null;
        const avgBefore =
            completed.reduce((s, l) => s + l.beforeFeeling, 0) / completed.length;
        const avgAfter =
            completed.reduce((s, l) => s + l.afterFeeling, 0) / completed.length;
        return { avgBefore: avgBefore.toFixed(1), avgAfter: avgAfter.toFixed(1), count: completed.length };
    }, [userProgress.logs]);

    return (
        <div className="space-y-4">
            {/* Streak */}
            <div className="rounded-xl p-4 border bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-amber-600 dark:text-gray-400">
                            Current Streak
                        </p>
                        <p className="text-2xl font-bold text-amber-800 dark:text-amber-300">
                            🔥 {userProgress.currentStreak ?? 0} days
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-medium text-amber-600 dark:text-gray-400">
                            Longest
                        </p>
                        <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                            {userProgress.longestStreak ?? 0} days
                        </p>
                    </div>
                </div>
            </div>

            <WeeklyChart />
            <MoodTrends />

            {/* Feeling improvement */}
            {feelingData && (
                <div className="rounded-xl p-4 border bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
                    <h4 className="text-sm font-medium mb-2 text-amber-800 dark:text-amber-300">
                        Anxiety Trend
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Across {feelingData.count} challenges, your average anxiety went from{" "}
                        <span className="font-semibold">{feelingData.avgBefore}</span> →{" "}
                        <span className="font-semibold">{feelingData.avgAfter}</span>
                        {Number(feelingData.avgAfter) < Number(feelingData.avgBefore) ? " 📉 Great progress!" : ""}
                    </p>
                </div>
            )}
        </div>
    );
};

const JourneyScreen = () => {
    const [activeTab, setActiveTab] = useState<Tab>("journal");

    return (
        <ScreenContainer>
            {/* Tab bar */}
            <div className="flex rounded-xl p-1 mb-4 gap-2.5 bg-amber-100 dark:bg-gray-800">
                {TABS.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeTab === id
                                ? "bg-amber-800 text-white-800 shadow-sm dark:bg-gray-700 dark:text-amber-300"
                                : "bg-amber-100 text-amber-600 hover:text-amber-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            {activeTab === "journal" && (
                <>
                    <XPDisplay />
                    <DateComplete />
                    <CompletedChallenges />
                </>
            )}

            {activeTab === "badges" && <AchievementsGrid />}

            {activeTab === "insights" && <InsightsTab />}
        </ScreenContainer>
    );
};

export default JourneyScreen;
