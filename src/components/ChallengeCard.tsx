import React from "react";

// Store
import { useScreenStore, useSetTodayChallenge, useTodayChallenge } from "../store/store";

// Types
import type { Challenge } from "../types/types";

// Icons
import { Heart } from "lucide-react";

// Component
const ChallengeCard = () => {
    // Store
    const selectedScreen = useScreenStore((state) => state.selectedScreen);
    const setSelectedScreen = useScreenStore((state) => state.setSelectedScreen);

    // Challenge Store
    const challenge = useTodayChallenge();
    const setTodayChallenge = useSetTodayChallenge();

    // Functions
    const handleStartQuest = () => {
        setSelectedScreen("challenge");
    };

    const handleSkip = () => {
        setSelectedScreen("home");
        setTodayChallenge();
    };

    if (!challenge) {
        return null;
    }

    return (
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-md border-2 border-amber-200">
            <div className="flex items-start justify-between pb-2">
                <h2 className="text-xl font-semibold text-amber-900">
                    Today's Challenge
                </h2>
                <div className="flex gap-2 mt-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Heart
                            key={i}
                            size={16}
                            className={
                                i < challenge.discomfortRating
                                    ? "fill-orange-300 text-orange-300"
                                    : "text-amber-200"
                            }
                        />
                    ))}
                </div>
            </div>


            <div className="border border-amber-100 mb-4" />

            <h3 className="text-lg font-medium text-amber-800 mb-2">
                {challenge.title}
            </h3>

            <p className="text-amber-700 mb-4 leading-relaxed">
                {challenge.description}
            </p>

            <button
                onClick={handleStartQuest}
                className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
            >
                I'll Try This
            </button>

            <button
                onClick={handleSkip}
                className="w-full mt-2 text-amber-600 py-2 text-sm hover:text-amber-700 transition-colors"
            >
                Maybe later
            </button>
        </div>
    );
};

export default ChallengeCard;
