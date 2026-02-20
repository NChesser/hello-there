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
import { useTheme } from "../context/ThemeContext";
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
    const { isDark } = useTheme();
    const practiceLogs = useUserPracticeLogs();
    const color = isCompleted
        ? "text-green-600"
        : isDark
          ? "text-amber-400"
          : "text-amber-600";
    const bgColor = isCompleted
        ? isDark
            ? "bg-green-900/20 border-green-700"
            : "bg-green-50 border-green-200"
        : isDark
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-amber-200";
    const completionButtonClass = isCompleted
        ? isDark
            ? "bg-green-900/30 text-green-400 cursor-not-allowed"
            : "bg-green-100 text-green-700 cursor-not-allowed"
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
                            className={`text-[11px] font-semibold uppercase tracking-wide ${isDark ? "text-amber-400" : "text-amber-600"}`}
                        >
                            {practice.category}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setIsStatsOpen(true)}
                                className={`flex items-center justify-center rounded-full border p-1.5 transition-colors ${
                                    isDark
                                        ? "border-gray-700 bg-gray-800 text-amber-200 hover:bg-gray-700"
                                        : "border-amber-200 bg-white text-amber-700 hover:bg-amber-50"
                                }`}
                                aria-label="Open practice stats"
                            >
                                <BarChart3 size={14} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsNoteOpen(true)}
                                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                                    isDark
                                        ? "border-gray-700 bg-gray-800 text-amber-200 hover:bg-gray-700"
                                        : "border-amber-200 bg-white text-amber-700 hover:bg-amber-50"
                                }`}
                                ria-label="Open daily note"
                            >
                                <NotebookIcon size={14} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`space-y-5 rounded-2xl p-6 shadow-md border-2 ${
                        isDark
                            ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
                            : "bg-gradient-to-br from-white to-amber-50 border-amber-200"
                    }`}
                >
                    <div>
                        <h2
                            className={`text-2xl font-bold tracking-tight mb-2 ${isDark ? "text-gray-100" : "text-amber-900"}`}
                        >
                            {practice.title}
                        </h2>

                        <div
                            className={`border mb-4 ${isDark ? "border-gray-600" : "border-amber-100"}`}
                        />
                        <p
                            className={`leading-relaxed ${isDark ? "text-gray-300" : "text-amber-700"}`}
                        >
                            {practice.description}
                        </p>
                    </div>

                    {examples.length > 0 && (
                        <div
                            className={`rounded-xl p-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-amber-50/70 border-amber-200"}`}
                        >
                            <div className="flex items-center gap-2 mb-2.5">
                                <MessageCircle
                                    size={14}
                                    className={
                                        isDark
                                            ? "text-amber-400"
                                            : "text-amber-600"
                                    }
                                />
                                <p
                                    className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-amber-400" : "text-amber-600"}`}
                                >
                                    You could say
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                {examples.map((ex: string, i: number) => (
                                    <p
                                        key={i}
                                        className={`text-sm italic ${isDark ? "text-gray-300" : "text-amber-700"}`}
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
                        className={`relative w-full max-w-sm rounded-2xl border p-5 shadow-xl ${
                            isDark
                                ? "border-gray-700 bg-gray-800"
                                : "border-amber-200 bg-white"
                        }`}
                    >
                        <h3
                            className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-amber-900"}`}
                        >
                            Daily note
                        </h3>
                        <p
                            className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
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
                            className={`mt-3 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                                isDark
                                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-amber-500 focus:ring-amber-500 placeholder-gray-500"
                                    : "border-amber-200 bg-white text-gray-800 focus:border-amber-400 focus:ring-amber-400 placeholder-amber-500/70"
                            }`}
                        />
                        <div className="mt-4 flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setNoteDraft(note);
                                    setIsNoteOpen(false);
                                }}
                                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold ${
                                    isDark
                                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                                        : "border-amber-200 text-amber-700 hover:bg-amber-50"
                                }`}
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
                                className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold ${
                                    isDark
                                        ? "bg-amber-500 text-amber-50 hover:bg-amber-400"
                                        : "bg-amber-500 text-amber-50 hover:bg-amber-600"
                                }`}
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
                        className={`relative w-full max-w-sm rounded-2xl border p-5 shadow-xl ${
                            isDark
                                ? "border-gray-700 bg-gray-800"
                                : "border-amber-200 bg-white"
                        }`}
                    >
                        <h3
                            className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-amber-900"}`}
                        >
                            Practice stats
                        </h3>
                        <p
                            className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                            Your completion history for this practice.
                        </p>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span
                                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                                >
                                    Total completions
                                </span>
                                <span
                                    className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-amber-900"}`}
                                >
                                    {totalCompletions}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span
                                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                                >
                                    Days completed
                                </span>
                                <span
                                    className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-amber-900"}`}
                                >
                                    {uniqueDays.size}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span
                                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                                >
                                    Last completed
                                </span>
                                <span
                                    className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-amber-900"}`}
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
                            className={`mt-4 w-full rounded-lg px-3 py-2 text-xs font-semibold ${
                                isDark
                                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                                    : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            }`}
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
