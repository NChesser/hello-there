import React, { useState } from 'react';

// Sample Habits Data
import { HABITS } from '../data/habits';

const HabitsScreen = () => {
    const [completedHabits, setCompletedHabits] = useState<string[]>([]);

    const habits = HABITS;

    const toggleHabit = (habitId: string) => {
        setCompletedHabits(prev =>
            prev.includes(habitId)
                ? prev.filter(id => id !== habitId)
                : [...prev, habitId]
        );
    };

    return (
        <div className="w-full p-6 pb-24">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-amber-900">Your Habits</h1>
                    <p className="text-amber-700">Click on a habit to mark it as completed for today!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {habits.map(habit => (
                        <button
                            key={habit.id}
                            onClick={() => toggleHabit(habit.id)}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                                completedHabits.includes(habit.id)
                                    ? 'border-amber-600 bg-amber-50'
                                    : 'border-amber-200 bg-white hover:border-amber-400'
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-6 h-6 rounded border-2 mt-1 flex items-center justify-center flex-shrink-0 ${
                                    completedHabits.includes(habit.id)
                                        ? 'bg-amber-600 border-amber-600'
                                        : 'border-amber-300'
                                }`}>
                                    {completedHabits.includes(habit.id) && (
                                        <span className="text-white text-sm">✓</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-amber-900">{habit.title}</h3>
                                    <p className="text-sm text-amber-700">{habit.description}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HabitsScreen;