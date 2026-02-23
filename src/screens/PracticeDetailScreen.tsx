// @ts-nocheck
import { useEffect, useState } from "react";

// Icons
import {
    BarChart3,
    CheckCircle,
    Lightbulb,
    NotebookIcon,
} from "lucide-react";

// Screens
import ScreenContainer from "../components/ScreenContainer";

// Store
import { useUserPracticeLogs } from "../store/store";
import type { Practice } from "../types/types";

// Components
import Button from "../components/Button";
import Typography from "../components/Typography";

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
                        <Typography as="span" variant="overline">
                            {practice.category}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                onClick={() => setIsStatsOpen(true)}
                                aria-label="Open practice stats"
                            >
                                <BarChart3 size={14} aria-hidden="true" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                onClick={() => setIsNoteOpen(true)}
                                aria-label="Open daily note"
                            >
                                <NotebookIcon size={14} aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    className={`space-y-5 rounded-2xl p-6 shadow-md border-2 bg-gradient-to-br ${
                        isCompleted
                            ? "from-green-50 to-emerald-50 border-green-300 dark:from-green-900/20 dark:to-emerald-900/15 dark:border-green-700"
                            : "from-white to-amber-50 border-amber-200 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600"
                    }`}
                >
                    <div>
                        <Typography as="h2" variant="title" className="mb-2">
                            {practice.title}
                        </Typography>

                        <div className="border mb-4 border-amber-100 dark:border-gray-600" />
                        <Typography>{practice.description}</Typography>
                    </div>

                    {practice.hint && (
                        <div className="rounded-xl p-4 border bg-sky-50/70 border-sky-200 dark:bg-sky-950/20 dark:border-sky-800">
                            <div className="flex items-center gap-2 mb-2.5">
                                <Lightbulb
                                    size={16}
                                    className="flex-shrink-0 text-sky-600 dark:text-sky-400"
                                />
                                <div>
                                    <Typography as="p" variant="overline" tone="info">
                                        How to approach it
                                    </Typography>
                                </div>
                            </div>
                            <Typography variant="body-sm" tone="info-strong">
                                {practice.hint}
                            </Typography>
                        </div>
                    )}

                    <Button
                        onClick={() => onComplete(note.trim())}
                        disabled={isCompleted}
                        variant={isCompleted ? "success" : "primary"}
                        size="lg"
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
                    </Button>
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
                    <div className="relative w-full max-w-sm rounded-2xl border p-5 shadow-xl border-amber-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Typography as="h3" variant="label">
                            Daily Note
                        </Typography>
                        <Typography variant="caption" className="mt-1">
                            Capture how it went today.
                        </Typography>
                        <textarea
                            rows={4}
                            value={noteDraft}
                            onChange={(event) =>
                                setNoteDraft(event.target.value)
                            }
                            placeholder="How did it go today?"
                            className="mt-3 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 border-amber-200 bg-white text-gray-800 focus:border-amber-400 focus:ring-amber-400 placeholder-amber-500/70 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-amber-500 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                        />
                        <div className="mt-3 flex gap-2">
                            <Button
                                onClick={() => {
                                    setNoteDraft(note);
                                    setIsNoteOpen(false);
                                }}
                                variant="cancel"
                                size="sm"
                                className="w-1/2"
                                aria-label="Cancel editing note"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="save"
                                size="sm"
                                className="w-1/2"
                                onClick={() => {
                                    const trimmed = noteDraft.trim();
                                    setNote(trimmed);
                                    onComplete(trimmed);
                                    setIsNoteOpen(false);
                                }}
                                aria-label="Save daily note"
                            >
                                Save Note
                            </Button>
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
                    <div className="relative w-full max-w-sm rounded-2xl border p-5 shadow-xl border-amber-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Typography as="h2" variant="subtitle">
                            Practice Stats
                        </Typography>
                        <Typography variant="caption" className="mt-1">
                            Your completion history for this practice.
                        </Typography>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <Typography as="span" variant="caption">
                                    Total completions
                                </Typography>
                                <Typography as="span" variant="label">
                                    {totalCompletions}
                                </Typography>
                            </div>
                            <div className="flex items-center justify-between">
                                <Typography as="span" variant="caption">
                                    Days completed
                                </Typography>
                                <Typography as="span" variant="label">
                                    {uniqueDays.size}
                                </Typography>
                            </div>
                            <div className="flex items-center justify-between">
                                <Typography as="span" variant="caption">
                                    Last completed
                                </Typography>
                                <Typography as="span" variant="label">
                                    {lastCompleted
                                        ? lastCompleted.toLocaleDateString(
                                              "en-US",
                                              {
                                                  month: "short",
                                                  day: "numeric",
                                              },
                                          )
                                        : "Not yet"}
                                </Typography>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="mt-4 w-full"
                            aria-label="Close practice stats"
                            onClick={() => setIsStatsOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </ScreenContainer>
    );
};

export default PracticeDetailScreen;
