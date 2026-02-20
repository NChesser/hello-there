import React from "react";
import ScreenContainer from "./ScreenContainer";
import { CheckCircle } from "lucide-react";
import type { Practice, PracticeLog } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface PracticeOverviewProps {
    practice: Practice;
    practiceLogs: PracticeLog[];
}

const PracticeOverview: React.FC<PracticeOverviewProps> = ({ practice, practiceLogs }) => {
    const { isDark } = useTheme();

    return (
        <ScreenContainer>
            <h2 className={`text-2xl font-bold mb-2 text-center ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                {practice.title}
            </h2>
            <p className={`text-md mb-4 ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>{practice.description}</p>
            <div className="mb-6">
                <span className={`font-semibold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                    Completions:
                </span>
                <div className="mt-2 flex flex-col gap-2">
                    {practiceLogs.length === 0 && (
                        <span className={isDark ? 'text-amber-500' : 'text-amber-400'}>
                            No completions yet.
                        </span>
                    )}
                    {practiceLogs.map((log) => (
                        <div
                            key={log.date}
                            className={`flex items-center gap-2 rounded px-3 py-2 border ${
                                isDark ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'
                            }`}
                        >
                            <CheckCircle className="text-green-600" size={18} />
                            <span className={isDark ? 'text-green-300' : 'text-green-900'}>
                                {new Date(log.date).toLocaleDateString()}
                            </span>
                            {log.note && (
                                <span className={`ml-2 text-xs italic ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
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

export default PracticeOverview;
