import React, { useState } from 'react';




const JourneyScreen = () => {
    const userProgress = {
        level: 5,
        totalXp: 1200,
        completedChallenges: Array(34).fill(null),
        logs: Array(50).fill(null),
    };

    // Generate last 7 days of completion data
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push({
                date,
                dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                completed: Math.random() > 0.3, // 70% completion rate
            });
        }
        return days;
    };

    const last7Days = getLast7Days();

    return (
        <div className="p-6 pb-24 h-3/4 overflow-y-auto bg-amber-50 space-y-6">
            

            {/* Day Chart */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 mb-4 ">
                <h3 className="text-sm font-medium text-amber-800 mb-4">Completion Streak</h3>
                <div className="flex gap-2 justify-between">
                    {last7Days.map((day, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors ${
                                    day.completed
                                        ? 'bg-amber-400 text-amber-900 shadow-sm'
                                        : 'bg-gray-100 text-gray-400'
                                }`}
                            >
                                {day.completed ? '✓' : '○'}
                            </div>
                            <span className="text-xs text-gray-600">{day.dayName}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100">
                <h3 className="text-sm font-medium text-amber-800 mb-3">Your Journey</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-2xl font-bold text-amber-900">{userProgress.completedChallenges.length}</div>
                        <div className="text-xs text-amber-600">Challenges Completed</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-amber-900">{userProgress.logs.length}</div>
                        <div className="text-xs text-amber-600">Completed Habits</div>
                    </div>
                </div>
            </div>

            {/* Completed Challenges */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 mt-4 h-70 overflow-y-auto">
                <h3 className="text-sm font-medium text-amber-800 mb-4">Completed Challenges</h3>
                <div className="space-y-2">
                    {userProgress.completedChallenges.map((_, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                            <span className="text-amber-600">✓</span>
                            <span className="text-sm text-amber-900">Challenge {index + 1}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
};

export default JourneyScreen;