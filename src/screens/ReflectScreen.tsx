import { useState } from "react";

// Store
import { useScreenStore, useUserStore } from "../store/store";

// Types
import type { CompletionLog } from "../types/types";

// Components
import ScreenContainer from "../components/ScreenContainer";

const ReflectScreen = ({ todayChallenge }: { todayChallenge: any }) => {
    // Store
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );
    const logChallengeCompletion = useUserStore((state) => state.logChallengeCompletion);

    // Local state
    const [beforeFeeling, setBeforeFeling] = useState<number>(3);
    const [afterFeeling, setAfterFeeling] = useState<number>(3);
    const [note, setNote] = useState<string>("");
    const [attemptType, setAttemptType] = useState<
        "complete" | "attempted" | null
    >(null);

    // Functions
    const handleReflect = async () => {
        if (!todayChallenge || !attemptType) {
            setSelectedScreen("home");
            return;
        }

        const xpMultiplier = attemptType === "complete" ? 1 : 0.5;
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
            completed: attemptType === "complete",
            attempted: true,
            xpEarned,
        };

        await logChallengeCompletion(log);

        // Reset for next time
        setNote("");
        setBeforeFeling(3);
        setAfterFeeling(3);
        setAttemptType(null);

        setSelectedScreen("home");
    };

    return (
        <ScreenContainer>
            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-100">
                    <div className="flex gap-4 mb-6">
                        <div className="text-4xl">🐨</div>
                        <div className="flex-1">
                            <p className="text-amber-900 leading-relaxed">
                                {attemptType === "complete"
                                    ? "That was brave! How did it feel?"
                                    : "Stopping is still information. You showed up. How did it feel?"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-amber-800 mb-3">
                                Before you tried (1 = calm, 5 = very nervous)
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setBeforeFeling(val)}
                                        className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                                            beforeFeeling === val
                                                ? "border-amber-400 bg-amber-50 text-amber-900 font-medium"
                                                : "border-amber-200 text-amber-600 hover:border-amber-300"
                                        }`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-800 mb-3">
                                After (1 = calm, 5 = very nervous)
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setAfterFeeling(val)}
                                        className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                                            afterFeeling === val
                                                ? "border-amber-400 bg-amber-50 text-amber-900 font-medium"
                                                : "border-amber-200 text-amber-600 hover:border-amber-300"
                                        }`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-800 mb-2">
                                Any thoughts? (optional)
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="How it went, what you noticed, how you feel..."
                                className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none resize-none bg-white text-amber-900"
                                rows={4}
                            />
                            {note.length > 0 && (
                                <p className="text-xs text-amber-600 mt-1">
                                    +25 XP bonus for reflecting
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleReflect}
                            className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
                        >
                            Save & Continue
                        </button>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    );
};

export default ReflectScreen;
