import React from "react";
import ScreenContainer from "./ScreenContainer";
import { CheckCircle } from "lucide-react";
import type { Habit, HabitLog } from "../types/types";

interface HabitOverviewProps {
    habit: Habit;
    habitLogs: HabitLog[];
}

const HabitOverview: React.FC<HabitOverviewProps> = ({ habit, habitLogs }) => {
    return (
        <ScreenContainer>
            <h2 className="text-2xl font-bold text-amber-700 mb-2 text-center">
                {habit.title}
            </h2>
            <p className="text-md text-amber-900 mb-4">{habit.description}</p>
            <div className="mb-6">
                <span className="font-semibold text-amber-700">
                    Completions:
                </span>
                <div className="mt-2 flex flex-col gap-2">
                    {habitLogs.length === 0 && (
                        <span className="text-amber-400">
                            No completions yet.
                        </span>
                    )}
                    {habitLogs.map((log) => (
                        <div
                            key={log.date}
                            className="flex items-center gap-2 bg-green-50 border border-green-200 rounded px-3 py-2"
                        >
                            <CheckCircle className="text-green-600" size={18} />
                            <span className="text-green-900">
                                {new Date(log.date).toLocaleDateString()}
                            </span>
                            {log.note && (
                                <span className="ml-2 text-xs text-amber-700 italic">
                                    {log.note}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </ScreenContainer>
    );
};

export default HabitOverview;
