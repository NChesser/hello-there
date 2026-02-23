import React from "react";
import ScreenContainer from "./ScreenContainer";
import { CheckCircle } from "lucide-react";
import type { Practice, PracticeLog } from "../types/types";
import Typography from "./Typography";

interface PracticeOverviewProps {
    practice: Practice;
    practiceLogs: PracticeLog[];
}

const PracticeOverview: React.FC<PracticeOverviewProps> = ({ practice, practiceLogs }) => {
    return (
        <ScreenContainer>
            <Typography
                as="h2"
                variant="title"
                className="mb-2 text-center text-amber-700 dark:text-amber-300"
            >
                {practice.title}
            </Typography>
            <Typography className="mb-4 text-amber-900 dark:text-amber-200">
                {practice.description}
            </Typography>
            <div className="mb-6">
                <Typography as="span" variant="label" className="text-amber-700 dark:text-amber-300">
                    Completions:
                </Typography>
                <div className="mt-2 flex flex-col gap-2">
                    {practiceLogs.length === 0 && (
                        <Typography as="span" variant="body-sm" className="text-amber-400 dark:text-amber-500">
                            No completions yet.
                        </Typography>
                    )}
                    {practiceLogs.map((log) => (
                        <div
                            key={log.date}
                            className="flex items-center gap-2 rounded px-3 py-2 border bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        >
                            <CheckCircle className="text-green-600" size={18} />
                            <Typography as="span" variant="body-sm" className="text-green-900 dark:text-green-300">
                                {new Date(log.date).toLocaleDateString()}
                            </Typography>
                            {log.note && (
                                <Typography as="span" variant="caption" tone="warm" className="ml-2 italic">
                                    {log.note}
                                </Typography>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </ScreenContainer>
    );
};

export default PracticeOverview;
