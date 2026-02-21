import { useState } from "react";
import type { Mood } from "../types/types";

interface MoodCheckInProps {
    onMoodSelected: (mood: Mood) => void;
    selectedMood: Mood | null;
}

const MOODS: { value: Mood; emoji: string; label: string; color: string }[] = [
    { value: "overwhelmed", emoji: "😰", label: "Overwhelmed", color: "text-red-600 dark:text-red-400" },
    { value: "nervous",     emoji: "😟", label: "Nervous",     color: "text-orange-600 dark:text-orange-400" },
    { value: "okay",        emoji: "😊", label: "Okay",        color: "text-yellow-600 dark:text-yellow-400" },
    { value: "good",        emoji: "😄", label: "Good",        color: "text-green-600 dark:text-green-400" },
    { value: "brave",       emoji: "🦁", label: "Brave!",      color: "text-purple-600 dark:text-purple-400" },
];

const MOOD_MESSAGES: Record<Mood, string[]> = {
    overwhelmed: [
        "That's okay. Take a deep breath. You don't have to do anything today.",
        "It's brave just to check in. Rest if you need to. 💙",
        "Even on tough days, you showed up. That matters.",
    ],
    nervous: [
        "A little nervousness is normal. Today's challenge is small and safe.",
        "Butterflies mean you're about to do something brave. 🦋",
        "Nervous is just excitement in disguise. You've got this.",
    ],
    okay: [
        "Great! You're in a good place. Ready to try something?",
        "Steady and grounded — a great place to grow from. 🌿",
        "Okay is more than enough. Let's see what today brings.",
    ],
    good: [
        "Wonderful! Let's channel that energy into something positive.",
        "Feeling good is your superpower today. Use it! ✨",
        "Good vibes — the perfect fuel for a small adventure.",
    ],
    brave: [
        "Amazing! You're ready for anything. Let's go! 🔥",
        "Brave mode activated! Today's challenge doesn't stand a chance.",
        "Look at you, feeling fearless. Time to make it count! 💪",
    ],
};

/** Pick a consistent message for today (doesn't change on re-render). */
const getTodayMessage = (mood: Mood): string => {
    const msgs = MOOD_MESSAGES[mood];
    const dayIndex = new Date().getDate() % msgs.length;
    return msgs[dayIndex];
};

const MoodCheckIn = ({ onMoodSelected, selectedMood }: MoodCheckInProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [justSelected, setJustSelected] = useState(false);
    const selectedOption = MOODS.find((m) => m.value === selectedMood) ?? null;

    const handleSelect = (mood: Mood) => {
        onMoodSelected(mood);
        setJustSelected(true);
        // Auto-close after a brief moment so user sees the message
        setTimeout(() => {
            setIsOpen(false);
            setJustSelected(false);
        }, 1800);
    };

    // --- Trigger button ---
    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`w-full rounded-2xl border-2 px-4 py-3 transition-all active:scale-[0.98] ${
                    selectedMood
                        ? "border-amber-200 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:shadow-none"
                        : "border-dashed border-amber-300 bg-amber-50/50 hover:bg-white dark:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800"
                }`}
            >
                {selectedMood && selectedOption ? (
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{selectedOption.emoji}</span>
                        <div className="text-left flex-1">
                            <p className={`text-sm font-semibold ${selectedOption.color}`}>
                                Feeling {selectedOption.label.toLowerCase()}
                            </p>
                            <p className="text-xs text-amber-400 dark:text-gray-500">
                                Tap to update
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="text-xl opacity-60">🐨</span>
                        <div className="text-left">
                            <p className="text-sm font-medium text-amber-700 dark:text-gray-300">
                                How are you feeling?
                            </p>
                            <p className="text-xs text-amber-400 dark:text-gray-500">
                                Quick mood check-in
                            </p>
                        </div>
                    </div>
                )}
            </button>

            {/* --- Modal --- */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mood check-in"
                >
                    {/* Backdrop */}
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        aria-label="Close mood check-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <div
                        className="relative w-full max-w-sm rounded-2xl border-2 p-5 shadow-2xl animate-in border-amber-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                        style={{ animation: "slideUp 0.25s ease-out" }}
                    >
                        {/* Header */}
                        <div className="text-center mb-4">
                            <p className="text-base font-bold text-amber-900 dark:text-gray-100">
                                How are you feeling right now?
                            </p>
                            <p className="text-xs mt-0.5 text-amber-500 dark:text-gray-400">
                                No wrong answers — just check in with yourself
                            </p>
                        </div>

                        {/* Mood options — emoji + label */}
                        <div className="grid grid-cols-5 gap-1.5">
                            {MOODS.map(({ value, emoji, label, color }) => {
                                const isActive = selectedMood === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => handleSelect(value)}
                                        className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all active:scale-95 ${
                                            isActive
                                                ? "bg-amber-50 ring-2 ring-amber-400 scale-105 dark:bg-amber-500/15 dark:ring-amber-500"
                                                : "hover:bg-amber-50 dark:hover:bg-gray-700"
                                        }`}
                                        aria-label={`Feeling ${label}`}
                                        aria-pressed={isActive}
                                    >
                                        <span className={`text-2xl transition-transform ${isActive ? "scale-110" : ""}`}>
                                            {emoji}
                                        </span>
                                        <span className={`text-[10px] font-medium leading-tight ${
                                            isActive
                                                ? color
                                                : "text-gray-500 dark:text-gray-400"
                                        }`}>
                                            {label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Encouragement message */}
                        {selectedMood && (
                            <div className={`mt-4 rounded-xl px-4 py-3 border transition-all ${
                                selectedMood === "overwhelmed"
                                    ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                                    : "bg-amber-50 border-amber-200 dark:bg-gray-700/50 dark:border-gray-600"
                            }`}>
                                <p className={`text-sm leading-relaxed text-center ${
                                    selectedMood === "overwhelmed"
                                        ? "text-blue-700 dark:text-blue-300"
                                        : "text-amber-700 dark:text-gray-300"
                                }`}>
                                    {getTodayMessage(selectedMood)}
                                </p>
                            </div>
                        )}

                        {/* Close / Done */}
                        {!justSelected && (
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 w-full rounded-xl py-2.5 text-sm font-semibold transition-all active:scale-[0.98] bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                                {selectedMood ? "Done" : "Skip for now"}
                            </button>
                        )}

                        {justSelected && (
                            <p className="mt-3 text-center text-xs text-amber-400 dark:text-gray-500">
                                ✓ Mood logged
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Slide-up animation */}
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

export default MoodCheckIn;
export type { Mood };
