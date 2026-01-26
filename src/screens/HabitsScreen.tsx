import React, { useState } from 'react';

// Sample Habits Data
import { HABITS } from '../data/habits';

interface HabitCompletion {
    habitId: string;
    count: number;
}

const HabitTrackingCard = ({ habit, completionCount, onAddCompletion, onRemoveCompletion }: {
    habit: typeof HABITS[0];
    completionCount: number;
    onAddCompletion: (habitId: string) => void;
    onRemoveCompletion: (habitId: string) => void;
}) => {
    return (
        <div className="p-4 rounded-lg border-2 border-amber-200 bg-white hover:border-amber-400 transition-all">
            <div className="flex items-start gap-3 justify-between">
                <div>
                    <h3 className="font-semibold text-amber-900">{habit.title}</h3>
                    <p className="text-sm text-amber-700">{habit.description}</p>
                </div>
                <div className="flex items-center gap-2">
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
                </div>
            </div>
        </div>
    );
};


const HabitsScreen = () => {
    const [completedHabits, setCompletedHabits] = useState < string[] > ([]);

    const habits = HABITS;

    const toggleHabit = (habitId: string) => {
        setCompletedHabits(prev =>
            prev.includes(habitId)
                ? prev.filter(id => id !== habitId)
                : [...prev, habitId]
        );
    };

    return (
        <div className="w-full p-6 pb-24 -bg-amber-50 -mt-25 h-3/4 overflow-y-auto">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-amber-900">Your Habits</h1>
                    <p className="text-amber-700">Click on a habit to mark it as completed for today!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {habits.map(habit => (
                        <HabitTrackingCard
                            key={habit.id}
                            habit={habit}
                            completionCount={completedHabits.filter(id => id === habit.id).length}
                            onAddCompletion={toggleHabit}
                            onRemoveCompletion={toggleHabit}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HabitsScreen;