import React, { useState } from "react";

// Sample Habits Data
import { HABITS } from "../data/habits";

// Components
import ScreenContainer from "../components/ScreenContainer";

// Icons
import { ClipboardCheck } from "lucide-react";

// Types
import type { Habit, HabitLog, UserProgress } from "../types/types";


interface HabitCompletion {
    habitId: string;
    count: number;
}

const HabitTrackingCard = ({
    habit,
    completionCount,
    onAddCompletion,
    onRemoveCompletion,
}: {
    habit: (typeof HABITS)[0];
    completionCount: number;
    onAddCompletion: (habitId: string) => void;
    onRemoveCompletion: (habitId: string) => void;
}) => {
    return (
        <div className="p-4 rounded-lg border-2 border-amber-200 bg-white hover:border-amber-400 transition-all">
            <div className="flex items-start gap-3 justify-between">
                <div>
                    <h3 className="font-semibold text-amber-900">
                        {habit.title}
                    </h3>
                    <p className="font-semibold text-amber-600">0/1</p>
                    {/* <p className="text-sm text-amber-700">{habit.description}</p> */}
                </div>
                {/* <div className="flex items-center gap-2">
                    <button
                        onClick={() => onRemoveCompletion(habit.id)}
                        disabled={completionCount === 0}
                        className="px-2 py-1 rounded bg-amber-200 text-amber-900 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        −
                    </button>
                    <span className="text-lg font-semibold text-amber-900 w-8 text-center">{completionCount}</span>
                    <button
                        onClick={() => onAddCompletion(habit.id)}
                        className="px-2 py-1 rounded bg-amber-600 text-white hover:bg-amber-700 transition-all"
                    >
                        +
                    </button>
                </div> */}

                <button>
                    <ClipboardCheck size={10} />
                </button>
            </div>
        </div>
    );
};

const HabitsScreen = () => {
    const [completedHabits, setCompletedHabits] = useState<string[]>([]);

    const habits = HABITS;

    // Functions
    const toggleHabit = (habitId: string) => {
        setCompletedHabits((prev) =>
            prev.includes(habitId)
                ? prev.filter((id) => id !== habitId)
                : [...prev, habitId],
        );
    };

    const handleLogHabit = async (habit: Habit) => {
        setSelectedHabit(habit);
    };

    const handleSaveHabit = async () => {
        if (!selectedHabit) return;

        const habitLog: HabitLog = {
            habitId: selectedHabit.id,
            date: new Date().toISOString(),
            note: habitNote,
        };

        const newProgress: UserProgress = {
            ...userProgress,
            habitLogs: [...userProgress.habitLogs, habitLog],
        };

        await saveProgress(newProgress);
        setSelectedHabit(null);
        setHabitNote("");
    };

    const getTodayHabitCount = () => {
        const today = new Date().toDateString();
        return userProgress.habitLogs.filter(
            (log) => new Date(log.date).toDateString() === today,
        ).length;
    };

    const getHabitCountForToday = (habitId: string) => {
        const today = new Date().toDateString();
        return userProgress.habitLogs.filter(
            (log) =>
                log.habitId === habitId &&
                new Date(log.date).toDateString() === today,
        ).length;
    };

    return (
        <ScreenContainer>
            <div>
                <h3 className="text-lg font-semibold text-amber-900">
                    Your Habits
                </h3>
                <p className="text-amber-700">
                    Click on a habit to mark it as completed for today!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {habits.map((habit) => (
                    <HabitTrackingCard
                        key={habit.id}
                        habit={habit}
                        completionCount={
                            completedHabits.filter((id) => id === habit.id)
                                .length
                        }
                        onAddCompletion={toggleHabit}
                        onRemoveCompletion={toggleHabit}
                    />
                ))}
            </div>
        </ScreenContainer>
    );
};

export default HabitsScreen;
