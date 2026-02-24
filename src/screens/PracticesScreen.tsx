import { PRACTICES } from "../data/practices";
import { useScreenStore, useUserProgress, useSetUserProgressStore } from "../store/store";
import ScreenContainer from "../components/ScreenContainer";
import PracticeCard from "../components/PracticeCard";
import { Sparkles } from "lucide-react";
import type { PracticeLog } from "../types/types";
import Typography from "../components/Typography";

const PracticesScreen = () => {
    const setScreen = useScreenStore((state) => state.setSelectedScreen);
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    const excludedPractices = userProgress.excludedPractices || [];
    const practices = PRACTICES.filter((practice) => !excludedPractices.includes(practice.id));

    const CATEGORY_ORDER = [
        "social",
        "connection",
        "growth",
        "mindset",
        "wellbeing",
        "avoidance",
    ] as const;

    const CATEGORY_LABELS: Record<(typeof CATEGORY_ORDER)[number], string> = {
        social: "Social",
        connection: "Connection",
        growth: "Growth",
        mindset: "Mindset",
        wellbeing: "Wellbeing",
        avoidance: "Avoidance",
    };

    const practicesByCategory = CATEGORY_ORDER.map((category) => ({
        category,
        label: CATEGORY_LABELS[category],
        items: practices.filter((practice) => practice.category === category),
    })).filter((group) => group.items.length > 0);

    // Get today's date string for comparison
    const today = new Date().toDateString();

    // Check if a practice was completed today
    const isPracticeCompletedToday = (practiceId: string): boolean => {
        return userProgress.practiceLogs.some(log => {
            const logDate = new Date(log.date).toDateString();
            return log.practiceId === practiceId && logDate === today;
        });
    };

    // Get count of practices completed today
    const completedTodayCount = practices.filter(practice => 
        isPracticeCompletedToday(practice.id)
    ).length;

    // Get days where at least one practice was completed
    const getDaysWithCompletedPractices = () => {
        const uniqueDays = new Set<string>();
        userProgress.practiceLogs.forEach(log => {
            const date = new Date(log.date).toDateString();
            uniqueDays.add(date);
        });
        return uniqueDays.size;
    };

    const handlePracticeComplete = (practiceId: string) => {
        const isCompleted = isPracticeCompletedToday(practiceId);
        
        if (!isCompleted) {
            // Add a new practice log for today
            const newLog: PracticeLog = {
                practiceId,
                date: new Date().toISOString(),
                note: "",
            };
            
            setUserProgress({
                practiceLogs: [...userProgress.practiceLogs, newLog],
            });
        } else {
            // Remove today's log for this practice (allow un-completing)
            setUserProgress({
                practiceLogs: userProgress.practiceLogs.filter(log => {
                    const logDate = new Date(log.date).toDateString();
                    return !(log.practiceId === practiceId && logDate === today);
                }),
            });
        }
    };

    const handlePracticeClick = (practiceId: string) => {
        // Navigate to the practice detail screen
        setScreen(`practice-detail-${practiceId}`);
    };

    const daysTracked = getDaysWithCompletedPractices();

    return (
        <ScreenContainer>
            <div className="mb-5 text-xs font-medium text-gray-600 dark:text-gray-400">
                Daily tracker • {completedTodayCount}/{practices.length} today • {daysTracked} days tracked
            </div>

            {/* Empty state for no practices tracked yet */}
            {daysTracked === 0 && completedTodayCount === 0 && (
                <div className="rounded-2xl p-6 mb-6 text-center border-2 border-dashed border-amber-200 bg-amber-50/50 dark:border-gray-600 dark:bg-gray-800/50">
                    <div className="flex justify-center mb-3">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-amber-100 dark:bg-gray-700">
                            <Sparkles size={28} className="text-amber-500 dark:text-amber-400" />
                        </div>
                    </div>
                    <h3 className="font-semibold mb-2 text-amber-900 dark:text-gray-200">
                        Start building your daily practices!
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-gray-400">
                        Tap the checkmark on any practice below to track it for today. Small steps lead to big changes. 💛
                    </p>
                </div>
            )}

            {/* Practices List */}
            <div className="space-y-6">
                {practicesByCategory.map((group) => (
                    <div key={group.category} className="space-y-3">
                        <Typography as="h3" variant="label">
                            {group.label}
                        </Typography>
                        <div className="grid grid-cols-3 gap-4">
                            {group.items.map((practice) => (
                                <PracticeCard
                                    key={practice.id}
                                    practice={practice}
                                    isCompleted={isPracticeCompletedToday(practice.id)}
                                    onComplete={() =>
                                        handlePracticeComplete(practice.id)
                                    }
                                    onClick={() =>
                                        handlePracticeClick(practice.id)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ScreenContainer>
    );
};

export default PracticesScreen;
