import React from "react";
import ScreenContainer from "./ScreenContainer";
import { CheckCircle } from "lucide-react";
import type { Practice, PracticeLog } from "../types/types";

interface PracticeOverviewProps {
    practice: Practice;
    practiceLogs: PracticeLog[];
}

const PracticeOverview: React.FC<PracticeOverviewProps> = ({ practice, practiceLogs }) => {
    return (
        <ScreenContainer>
            <h2 className="text-2xl font-bold mb-2 text-center text-amber-700 dark:text-amber-300">
                {practice.title}
            </h2>
            <p className="text-md mb-4 text-amber-900 dark:text-amber-200">{practice.description}</p>
            <div className="mb-6">
                <span className="font-semibold text-amber-700 dark:text-amber-300">
                    Completions:
                </span>
                <div className="mt-2 flex flex-col gap-2">
                    {practiceLogs.length === 0 && (
                        <span className="text-amber-400 dark:text-amber-500">
                            No completions yet.
                        </span>
                    )}
                    {practiceLogs.map((log) => (
                        <div
                            key={log.date}
                            className="flex items-center gap-2 rounded px-3 py-2 border bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        >
                            <CheckCircle className="text-green-600" size={18} />
                            <span className="text-green-900 dark:text-green-300">
                                {new Date(log.date).toLocaleDateString()}
                            </span>
                            {log.note && (
                                <span className="ml-2 text-xs italic text-amber-700 dark:text-amber-400">
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
