import {
    BarChart3,
    CheckCircle,
    MessageCircle,
    NotebookIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import { PRACTICE_EXAMPLES } from "../data/practices";
import type { Practice } from "../types/types";
import { useUserPracticeLogs } from "../store/store";

interface PracticeDetailScreenProps {
    practice: Practice;
    isCompleted: boolean;
    onComplete: (note: string) => void;
    onBack: () => void;
}

const PracticeDetailScreen = ({
    practice,
    isCompleted,
    onComplete,
}: PracticeDetailScreenProps) => {
    const practiceLogs = useUserPracticeLogs();
    const color = isCompleted
        ? "text-green-600"
        : "text-amber-600 dark:text-amber-400";
    const bgColor = isCompleted
        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700"
        : "bg-white border-amber-200 dark:bg-gray-800 dark:border-gray-700";
    const completionButtonClass = isCompleted
        ? "bg-green-100 text-green-700 cursor-not-allowed dark:bg-green-900/30 dark:text-green-400"
        : "bg-amber-500 hover:bg-amber-600 text-amber-50";

    const Icon = practice.icon;
    const examples = PRACTICE_EXAMPLES[practice.id] ?? [];
    const today = new Date().toDateString();
    const todaysLog = practiceLogs.find((log) => {
        const logDate = new Date(log.date).toDateString();
        return log.practiceId === practice.id && logDate === today;
    });
    const [note, setNote] = useState(todaysLog?.note ?? "");
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [noteDraft, setNoteDraft] = useState(note);
    const [isStatsOpen, setIsStatsOpen] = useState(false);

    useEffect(() => {
        const nextNote = todaysLog?.note ?? "";
        setNote(nextNote);
        setNoteDraft(nextNote);
    }, [todaysLog?.note, practice.id]);

    const practiceEntries = practiceLogs.filter(
        (log) => log.practiceId === practice.id,
    );
    const totalCompletions = practiceEntries.length;
    const lastCompleted =
        practiceEntries.length > 0
            ? new Date(practiceEntries[practiceEntries.length - 1].date)
            : null;
    const uniqueDays = new Set(
        practiceEntries.map((log) => new Date(log.date).toDateString()),
    );

    return (
        <ScreenContainer>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Icon size={14} className={color} aria-hidden="true" />
                        <span
                            className="text-[11px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400"
                        >
                            {practice.category}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setIsStatsOpen(true)}
                                className="flex items-center justify-center rounded-full border p-1.5 transition-colors border-amber-200 bg-white text-amber-700 hover:bg-amber-50 dark:border-gray-700 dark:bg-gray-800 dark:text-amber-200 dark:hover:bg-gray-700"
                                aria-label="Open practice stats"
                            >
                                <BarChart3 size={14} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsNoteOpen(true)}
                                className="rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors border-amber-200 bg-white text-amber-700 hover:bg-amber-50 dark:border-gray-700 dark:bg-gray-800 dark:text-amber-200 dark:hover:bg-gray-700"
                                ria-label="Open daily note"
                            >
                                <NotebookIcon size={14} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className="space-y-5 rounded-2xl p-6 shadow-md border-2 bg-gradient-to-br from-white to-amber-50 border-amber-200 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600"
                >
                    <div>
                        <h2
                            className="text-2xl font-bold tracking-tight mb-2 text-amber-900 dark:text-gray-100"
                        >
                            {practice.title}
                        </h2>

                        <div
                            className="border mb-4 border-amber-100 dark:border-gray-600"
                        />
                        <p
                            className="leading-relaxed text-amber-700 dark:text-gray-300"
                        >
                            {practice.description}
                        </p>
                    </div>

                    {examples.length > 0 && (
                        <div
                            className="rounded-xl p-4 border bg-amber-50/70 border-amber-200 dark:bg-gray-800 dark:border-gray-700"
                        >
                            <div className="flex items-center gap-2 mb-2.5">
                                <MessageCircle
                                    size={14}
                                    className="text-amber-600 dark:text-amber-400"
                                />
                                <p
                                    className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400"
                                >
                                    You could say
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                {examples.map((ex: string, i: number) => (
                                    <p
                                        key={i}
                                        className="text-sm italic text-amber-700 dark:text-gray-300"
                                    >
                                        "{ex}"
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => onComplete(note.trim())}
                        disabled={isCompleted}
                        className={`mt-5 flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all active:scale-[0.98] ${completionButtonClass}`}
                        aria-label={
                            isCompleted
                                ? "Already completed today"
                                : "Mark practice as complete"
                        }
                    >
                        <CheckCircle
                            size={20}
                            className={isCompleted ? "fill-current" : ""}
                        />
                        {isCompleted ? "Completed Today" : "Mark as Complete"}
                    </button>
                </div>
            </div>

            {isNoteOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/50"
                        aria-label="Close daily note"
                        onClick={() => {
                            setNoteDraft(note);
                            setIsNoteOpen(false);
                        }}
                    />
                    <div
                        className="relative w-full max-w-sm rounded-2xl border p-5 shadow-xl border-amber-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <h3
                            className="text-sm font-semibold text-amber-900 dark:text-gray-100"
                        >
                            Daily note
                        </h3>
                        <p
                            className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                        >
                            Capture how it went today.
                        </p>
                        <textarea
                            rows={4}
                            value={noteDraft}
                            onChange={(event) =>
                                setNoteDraft(event.target.value)
                            }
                            placeholder="How did it go today?"
                            className="mt-3 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 border-amber-200 bg-white text-gray-800 focus:border-amber-400 focus:ring-amber-400 placeholder-amber-500/70 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-amber-500 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                        />
                        <div className="mt-4 flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setNoteDraft(note);
                                    setIsNoteOpen(false);
                                }}
                                className="flex-1 rounded-lg border px-3 py-2 text-xs font-semibold border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const trimmed = noteDraft.trim();
                                    setNote(trimmed);
                                    onComplete(trimmed);
                                    setIsNoteOpen(false);
                                }}
                                className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold bg-amber-500 text-amber-50 hover:bg-amber-600 dark:hover:bg-amber-400"
                            >
                                Save note
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isStatsOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/50"
                        aria-label="Close practice stats"
                        onClick={() => setIsStatsOpen(false)}
                    />
                    <div
                        className="relative w-full max-w-sm rounded-2xl border p-5 shadow-xl border-amber-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <h3
                            className="text-sm font-semibold text-amber-900 dark:text-gray-100"
                        >
                            Practice stats
                        </h3>
                        <p
                            className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                        >
                            Your completion history for this practice.
                        </p>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    Total completions
                                </span>
                                <span
                                    className="text-sm font-semibold text-amber-900 dark:text-gray-100"
                                >
                                    {totalCompletions}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    Days completed
                                </span>
                                <span
                                    className="text-sm font-semibold text-amber-900 dark:text-gray-100"
                                >
                                    {uniqueDays.size}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    Last completed
                                </span>
                                <span
                                    className="text-sm font-semibold text-amber-900 dark:text-gray-100"
                                >
                                    {lastCompleted
                                        ? lastCompleted.toLocaleDateString(
                                              "en-US",
                                              {
                                                  month: "short",
                                                  day: "numeric",
                                              },
                                          )
                                        : "Not yet"}
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsStatsOpen(false)}
                            className="mt-4 w-full rounded-lg px-3 py-2 text-xs font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </ScreenContainer>
    );
};

export default PracticeDetailScreen;
