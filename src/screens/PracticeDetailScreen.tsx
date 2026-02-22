import {
    BarChart3,
    CheckCircle,
    Lightbulb,
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
                        <Icon size={20} className={color} aria-hidden="true" />
                        <span
                            className="font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400"
                        >
                            {practice.category}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setIsStatsOpen(true)}
                                className="rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors border-amber-200 bg-white text-amber-700 hover:bg-amber-50 dark:border-gray-700 dark:bg-gray-800 dark:text-amber-200 dark:hover:bg-gray-700"
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
                    className={`space-y-5 rounded-2xl p-6 shadow-md border-2 bg-gradient-to-br ${
                        isCompleted
                            ? 'from-green-50 to-emerald-50 border-green-300 dark:from-green-900/20 dark:to-emerald-900/15 dark:border-green-700'
                            : 'from-white to-amber-50 border-amber-200 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600'
                    }`}
                >
                    <div>
                        {isCompleted && (
                            <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                <CheckCircle size={16} className="text-green-600 dark:text-green-400 fill-current flex-shrink-0" />
                                <span className="text-sm font-medium text-green-700 dark:text-green-300">Done for today — nice work!</span>
                            </div>
                        )}
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

                    {practice.hint && (
                        <div className="flex gap-3 rounded-xl p-4 border bg-sky-50/70 border-sky-200 dark:bg-sky-950/20 dark:border-sky-800">
                            <Lightbulb
                                size={16}
                                className="mt-0.5 flex-shrink-0 text-sky-600 dark:text-sky-400"
                            />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400 mb-1">
                                    How to approach it
                                </p>
                                <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
                                    {practice.hint}
                                </p>
                            </div>
                        </div>
                    )}

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
                        className={`mt-5 flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
                            isCompleted
                                ? 'bg-green-100 text-green-700 border-2 border-green-300 cursor-not-allowed dark:bg-green-900/30 dark:text-green-400 dark:border-green-700'
                                : 'bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-sm hover:shadow-md'
                        }`}
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
                                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-all active:scale-[0.98] text-xs px-3 py-1.5 border border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-gray-600 dark:text-amber-400 dark:hover:bg-gray-700"
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
                                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-all active:scale-[0.98] text-xs px-3 py-1.5 bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-sm hover:shadow-md"
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
                            className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-all active:scale-[0.98] text-sm px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
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
