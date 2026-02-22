import { useMemo, useState } from "react";

// Components
import CompletedChallenges from "../components/CompletedChallenges";
import DateComplete from "../components/DateComplete";
import ScreenContainer from "../components/ScreenContainer";
import XPDisplay from "../components/XPDisplay";
import AchievementsGrid from "../components/AchievementsGrid";
import TabBar from "../components/TabBar";
import type { Tab } from "../components/TabBar";

// Store
import { useUserProgress } from "../store/store";

// Icons
import { BookOpen, Flame, Trophy, TrendingUp } from "lucide-react";

type JourneyTab = "journal" | "badges" | "insights";

const TABS: Tab<JourneyTab>[] = [
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "insights", label: "Insights", icon: TrendingUp },
    { id: "badges", label: "Badges", icon: Trophy },
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

    const data = useMemo(() => {
        const days: { label: string; challenges: number; practices: number; peopleMet: number }[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const ds = d.toDateString();
            const isoDate = d.toISOString().split("T")[0];

            const challenges = userProgress.logs.filter(
                (l) => l.completed && new Date(l.date).toDateString() === ds,
            ).length;

            const practices = userProgress.practiceLogs.filter(
                (l) => l.date === isoDate || new Date(l.date).toDateString() === ds,
            ).length;

            const peopleMet = (userProgress.peopleMet ?? []).filter(
                (p) => {
                    try {
                        return new Date(p.meetDate).toDateString() === ds;
                    } catch {
                        return false;
                    }
                },
            ).length;

            days.push({
                label: d.toLocaleDateString(undefined, { weekday: "short" }),
                challenges,
                practices,
                peopleMet,
            });
        }
        return days;
    }, [userProgress.logs, userProgress.practiceLogs, userProgress.peopleMet]);

    const max = Math.max(1, ...data.map((d) => d.challenges + d.practices + d.peopleMet));

    // Build scale ticks (0 to max, aiming for ~3-5 ticks)
    const step = max <= 4 ? 1 : Math.ceil(max / 4);
    const ticks: number[] = [];
    for (let t = max; t >= 0; t -= step) {
        ticks.push(t);
    }
    if (ticks[ticks.length - 1] !== 0) ticks.push(0);

    const categories = [
        { key: "challenges" as const, label: "Challenges", color: "bg-amber-400", darkColor: "dark:bg-amber-500" },
        { key: "practices" as const, label: "Practices", color: "bg-blue-400", darkColor: "dark:bg-blue-500" },
        { key: "peopleMet" as const, label: "People Met", color: "bg-green-400", darkColor: "dark:bg-green-500" },
    ];

    return (
        <div className="rounded-xl p-4 border bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-3 text-amber-800 dark:text-amber-300">
                This Week
            </h4>
            <div className="flex gap-1">
                {/* Y-axis scale */}
                <div className="flex flex-col justify-between h-28 pr-1 pb-5">
                    {ticks.map((tick) => (
                        <span key={tick} className="text-[10px] leading-none text-gray-400 dark:text-gray-500 text-right min-w-[14px]">
                            {tick}
                        </span>
                    ))}
                </div>
                {/* Bars */}
                <div className="flex-1 flex items-end gap-2 h-28">
                    {data.map((day, i) => {
                        const total = day.challenges + day.practices + day.peopleMet;
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                    className="w-full flex flex-col-reverse rounded-t-md overflow-hidden"
                                    style={{ height: `${(total / max) * 100}%`, minHeight: 4 }}
                                >
                                    {total > 0 ? (
                                        categories.map(({ key, color, darkColor }) =>
                                            day[key] > 0 ? (
                                                <div
                                                    key={key}
                                                    className={`w-full ${color} ${darkColor}`}
                                                    style={{ flex: day[key] }}
                                                />
                                            ) : null,
                                        )
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 dark:bg-gray-700" />
                                    )}
                                </div>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                    {day.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Legend */}
            <div className="flex items-center justify-center gap-3 mt-3">
                {categories.map(({ key, label, color }) => (
                    <div key={key} className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${color}`} />
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">{label}</span>
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
                            <Flame size={22} className="inline text-orange-500" /> {userProgress.currentStreak ?? 0} days
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
    const [activeTab, setActiveTab] = useState<JourneyTab>("journal");

    return (
        <ScreenContainer>
            {/* Tab bar */}
            <TabBar
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                className="mb-4"
            />

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
