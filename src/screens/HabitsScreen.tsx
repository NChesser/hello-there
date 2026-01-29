import React, { useState } from "react";

// Sample Habits Data
import { HABITS } from "../data/habits";

// Components
import ScreenContainer from "../components/ScreenContainer";

// Icons
import { CheckCircle, PlusCircle } from "lucide-react";

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
        <div className="p-3 rounded-lg border-2 border-amber-200 bg-white hover:border-amber-400 transition-all">
            <div className="flex items-start gap-3 justify-between">
                <div>
                    <h3 className="font-semibold text-amber-900">
                        {habit.title}
                    </h3>
                    {/* <p className="text-sm font-semibold text-amber-600">0/1</p> */}
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
                <div className="mt-1 mr-3">
                    <CheckCircle size={20} />
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

            <div className="flex flex-col items-right mt-6">
                {/* <p className="text-sm text-amber-700 mt-4">
                    Habits completed today: {getTodayHabitCount()}
                </p> */}

                <PlusCircle size={40} className="float-right text-amber-600" />


                {/* <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const title = (form.elements.namedItem("title") as HTMLInputElement)
                            .value.trim();
                        const description = (
                            form.elements.namedItem("description") as HTMLInputElement
                        ).value.trim();
                        if (!title) return;
                        const newHabit = {
                            id: Date.now().toString(),
                            title,
                            description,
                        } as any;
                        (HABITS as any).push(newHabit);
                        // force re-render by updating existing state
                        setCompletedHabits((prev) => [...prev]);
                        form.reset();
                    }}
                    className="mt-4 p-4 rounded bg-amber-50 border border-amber-100"
                >
                    <h4 className="font-semibold text-amber-900 mb-2">Add new habit</h4>
                    <div className="flex gap-2">
                        <input
                            name="title"
                            placeholder="Habit title"
                            className="flex-1 p-2 rounded border border-amber-200"
                        />
                        <input
                            name="description"
                            placeholder="Description (optional)"
                            className="flex-1 p-2 rounded border border-amber-200"
                        />
                        <button
                            type="submit"
                            className="px-3 py-2 bg-amber-600 text-white rounded"
                        >
                            Add
                        </button>
                    </div>
                </form> */}
            </div>
        </ScreenContainer>
    );
};

export default HabitsScreen;
