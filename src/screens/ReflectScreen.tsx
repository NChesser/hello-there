import { useState } from "react";

// Store
import { useScreenStore, useUserProgress, useSetUserProgressStore } from "../store/store";

// Types
import type { CompletionLog } from "../types/types";

// Components
import ScreenContainer from "../components/ScreenContainer";
import Confetti from "../components/Confetti";
import { useTheme } from "../context/ThemeContext";

const ReflectScreen = ({ todayChallenge }: { todayChallenge: any }) => {
    // Theme
    const { isDark } = useTheme();

    // Store
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();

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

        console.warn("🚀 ~ handleReflect ~ todayChallenge:", todayChallenge);

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

        // Update user progress with the new log and XP
        const newTotalXp = userProgress.totalXp + xpEarned;
        const newLevel = Math.floor(newTotalXp / 100) + 1; // Simple leveling: 100 XP per level
        
        setUserProgress({
            totalXp: newTotalXp,
            level: newLevel,
            logs: [...userProgress.logs, log],
            completedChallenges: [...userProgress.completedChallenges, todayChallenge.id],
        });

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
                <div className={`rounded-2xl p-6 shadow-sm border-2 ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'
                }`}>
                    <div className="flex gap-4 mb-6">
                        <div className="text-4xl">🐨</div>
                        <div className="flex-1">
                            <p className={`leading-relaxed ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                                That was brave! How did it feel?
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                                Before you tried (1 = calm, 5 = very nervous)
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setBeforeFeling(val)}
                                        className={`flex-1 py-3 rounded-lg border-2 transition-all active:scale-95 ${
                                            beforeFeeling === val
                                                ? isDark
                                                    ? 'border-amber-500 bg-amber-900/40 text-amber-200 font-medium'
                                                    : 'border-amber-400 bg-amber-50 text-amber-900 font-medium'
                                                : isDark
                                                    ? 'border-gray-600 text-gray-400 hover:border-gray-500'
                                                    : 'border-amber-200 text-amber-600 hover:border-amber-300'
                                        }`}
                                        aria-label={`Before feeling ${val}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                                After (1 = calm, 5 = very nervous)
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setAfterFeeling(val)}
                                        className={`flex-1 py-3 rounded-lg border-2 transition-all active:scale-95 ${
                                            afterFeeling === val
                                                ? isDark
                                                    ? 'border-amber-500 bg-amber-900/40 text-amber-200 font-medium'
                                                    : 'border-amber-400 bg-amber-50 text-amber-900 font-medium'
                                                : isDark
                                                    ? 'border-gray-600 text-gray-400 hover:border-gray-500'
                                                    : 'border-amber-200 text-amber-600 hover:border-amber-300'
                                        }`}
                                        aria-label={`After feeling ${val}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                                Any thoughts? (optional)
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="How it went, what you noticed, how you feel..."
                                className={`w-full p-3 border-2 rounded-lg focus:outline-none resize-none ${
                                    isDark
                                        ? 'border-gray-600 focus:border-amber-500 bg-gray-700 text-gray-200 placeholder-gray-500'
                                        : 'border-amber-200 focus:border-amber-400 bg-white text-amber-900'
                                }`}
                                rows={4}
                            />
                            {note.length > 0 && (
                                <p className={`text-xs mt-1 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
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
                            <div className={`rounded-xl p-4 border-2 animate-pulse ${
                                isDark 
                                    ? 'bg-green-900/30 border-green-700' 
                                    : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                            }`}>
                                <p className={`text-center font-semibold ${isDark ? 'text-green-300' : 'text-green-800'}`}>
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
