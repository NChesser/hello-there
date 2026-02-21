import type { PracticeLog } from '../types/types';
import { useUserProgress, useSetUserProgressStore } from '../store/store';

/**
 * Handles practice-detail completion logic:
 * - Checks if a practice is completed today
 * - Provides an `onComplete` callback to log or update the practice
 */
export const usePracticeCompletion = (practiceId: string) => {
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();

    const today = new Date().toDateString();
    const practiceLogs = userProgress.practiceLogs || [];

    const todaysLogIndex = practiceLogs.findIndex((log) => {
        const logDate = new Date(log.date).toDateString();
        return log.practiceId === practiceId && logDate === today;
    });

    const isCompletedToday = todaysLogIndex !== -1;

    const onComplete = (note?: string) => {
        if (isCompletedToday) {
            // Update existing log's note
            const updatedLogs = practiceLogs.map((log, index) =>
                index === todaysLogIndex ? { ...log, note } : log
            );
            setUserProgress({ practiceLogs: updatedLogs });
            return;
        }

        // Create new log entry
        const newLog: PracticeLog = {
            practiceId,
            date: new Date().toISOString(),
            note,
        };
        setUserProgress({
            practiceLogs: [...practiceLogs, newLog],
        });
    };

    return { isCompletedToday, onComplete };
};
