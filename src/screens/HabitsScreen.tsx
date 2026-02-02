import React, { useState } from "react";

// Sample Habits Data
import { HABITS } from "../data/habits";

// Store
import { useSetSelectedScreen } from "../store/store";

// Components
import ScreenContainer from "../components/ScreenContainer";
import DateComplete from "../components/DateComplete";

// Icons
import { CheckCircle, PercentCircle, PlusCircle } from "lucide-react";

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
    // 
    // Determine if habit is completed
    const isCompleted = completionCount > 0;
    const color = isCompleted ? "text-green-600" : "text-amber-600";

    // 
    const setScreen = useSetSelectedScreen();

    // Function to display habit overview
    const displayHabitOverview = () => {
        // Logic to display habit overview can be added here
        setScreen("habit-overview");
    };

    // Render
    return (
        <div
            className={`p-3 rounded-lg border-2 border-amber-200 bg-white ${isCompleted ? "border-green-200 bg-green-50 hover:border-green-400 transition-all" : "hover:border-amber-400 transition-all"}`}
        >
            <div className="cursor-pointer flex items-start gap-3 justify-between">
                <div className="flex" onClick={() => displayHabitOverview()}>
                    <div>
                        {/* {habit.icon} */}
                        <h3 className={`font-semibold ${color}`}>
                            {habit.title}
                        </h3>
                    </div>
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

                {/* <button onClick={() => onAddCompletion(habit.id)} className="rounded-full shadow-md hover:shadow-lg transition-all elevation-none p-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white">
                </button> */}
                <div
                    className="mt-1 mr-3 flex items-center justify-center gap-2"
                    onClick={() => onAddCompletion(habit.id)}
                >
                    <div className="flex items-center gap-2">
                        <p className={`text-sm ${color}`}>
                            {completionCount}/1
                        </p>
                        <CheckCircle
                            size={20}
                            className={`cursor-pointer ${color} hover:text-${color.replace("text-", "text-")}-600`}
                        />
                    </div>
                </div>
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
        return;

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
        return 5;
    };

    return (
        <ScreenContainer>
            {/* <DateComplete /> */}
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

            <div className="flex flex-col items-right">
                <div className="mt-2 flex items-center justify-end gap-2 cursor-pointer">
                    <span className="text-amber-600 font-medium">
                        Add New Habit
                    </span>
                    <PlusCircle
                        size={30}
                        className="float-right text-amber-600"
                    />
                </div>
            </div>
        </ScreenContainer>
    );
};

export default HabitsScreen;
