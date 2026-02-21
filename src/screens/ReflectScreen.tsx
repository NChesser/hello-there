import { useState } from "react";

// Store
import { useScreenStore, useUserProgressStore } from "../store/store";

// Types
import type { Challenge, CompletionLog } from "../types/types";

// Components
import ScreenContainer from "../components/ScreenContainer";
import Confetti from "../components/Confetti";

// Data
import { CHALLENGES } from "../data/challenges";

const ReflectScreen = ({ todayChallenge }: { todayChallenge: Challenge }) => {
    // Store
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );
    const completeChallenge = useUserProgressStore(
        (state) => state.completeChallenge,
    );

    // Local state
    const [beforeFeeling, setBeforeFeling] = useState<number>(3);
    const [afterFeeling, setAfterFeeling] = useState<number>(3);
    const [note, setNote] = useState<string>("");
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    // Functions
    const handleReflect = async () => {
        if (!todayChallenge) {
            setSelectedScreen("home");
            return;
        }



        const xpMultiplier = 1;
        const reflectionBonus = note.length > 0 ? 25 : 0;
        const xpEarned =
            Math.floor(todayChallenge.xpReward * xpMultiplier) +
            reflectionBonus;

        const log: CompletionLog = {
            challengeId: todayChallenge.id,
            date: new Date().toISOString(),
            beforeFeeling,
            afterFeeling,
            note,
            completed: true,
            attempted: true,
            xpEarned,
        };

        // Show celebration
        setShowConfetti(true);
        setShowSuccess(true);

        // Look up discomfort rating for achievement checking
        const challenge = CHALLENGES.find((c) => c.id === todayChallenge.id);
        const discomfortRating = challenge?.discomfortRating ?? todayChallenge.discomfortRating;

        // Use the store action which handles XP, level, streak, and achievements
        completeChallenge(log, discomfortRating);

        // Reset for next time
        setNote("");
        setBeforeFeling(3);
        setAfterFeeling(3);

        // Navigate to home after celebration
        setTimeout(() => {
            setSelectedScreen("home");
        }, 2000);
    };

    return (
        <ScreenContainer>
            <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
            <div className="space-y-6">
                <div className="rounded-2xl p-6 shadow-sm border-2 bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex gap-4 mb-6">
                        <div className="text-4xl">🐨</div>
                        <div className="flex-1">
                            <p className="leading-relaxed text-amber-900 dark:text-amber-200">
                                That was brave! How did it feel?
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-3 text-amber-800 dark:text-amber-300">
                                Before you tried (1 = calm, 5 = very nervous)
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setBeforeFeling(val)}
                                        className={`flex-1 py-3 rounded-lg border-2 transition-all active:scale-95 ${
                                            beforeFeeling === val
                                                ? 'border-amber-400 bg-amber-50 text-amber-900 font-medium dark:border-amber-500 dark:bg-amber-900/40 dark:text-amber-200'
                                                : 'border-amber-200 text-amber-600 hover:border-amber-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500'
                                        }`}
                                        aria-label={`Before feeling ${val}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-3 text-amber-800 dark:text-amber-300">
                                After (1 = calm, 5 = very nervous)
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setAfterFeeling(val)}
                                        className={`flex-1 py-3 rounded-lg border-2 transition-all active:scale-95 ${
                                            afterFeeling === val
                                                ? 'border-amber-400 bg-amber-50 text-amber-900 font-medium dark:border-amber-500 dark:bg-amber-900/40 dark:text-amber-200'
                                                : 'border-amber-200 text-amber-600 hover:border-amber-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500'
                                        }`}
                                        aria-label={`After feeling ${val}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-amber-800 dark:text-amber-300">
                                Any thoughts? (optional)
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="How it went, what you noticed, how you feel..."
                                className="w-full p-3 border-2 rounded-lg focus:outline-none resize-none border-amber-200 focus:border-amber-400 bg-white text-amber-900 dark:border-gray-600 dark:focus:border-amber-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
                                rows={4}
                            />
                            {note.length > 0 && (
                                <p className="text-xs mt-1 text-amber-600 dark:text-amber-400">
                                    +25 XP bonus for reflecting
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleReflect}
                            disabled={showSuccess}
                            className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all disabled:opacity-75 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                            {showSuccess ? "🎉 Amazing Work!" : "Save & Continue"}
                        </button>
                        {showSuccess && (
                            <div className="rounded-xl p-4 border-2 animate-pulse bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:bg-none dark:bg-green-900/30 dark:border-green-700">
                                <p className="text-center font-semibold text-green-800 dark:text-green-300">
                                    +{Math.floor(todayChallenge.xpReward) + (note.length > 0 ? 25 : 0)} XP earned! 🌟
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ScreenContainer>
    );
};

export default ReflectScreen;
