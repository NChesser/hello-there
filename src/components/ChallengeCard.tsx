import React, { useState } from "react";

// Store
import { useScreenStore, useSetTodayChallenge, useTodayChallenge } from "../store/store";

// Icons
import { Heart, RefreshCw } from "lucide-react";

// Utils
import { capitalizeFirstLetter } from "../utils/helpers";

// Component
const ChallengeCard = () => {
    // Store
    const setSelectedScreen = useScreenStore((state) => state.setSelectedScreen);

    // Challenge Store
    const challenge = useTodayChallenge();
    const setTodayChallenge = useSetTodayChallenge();

    // Local state for skip animation
    const [isSkipping, setIsSkipping] = useState(false);

    // Functions
    const handleStartQuest = () => {
        setSelectedScreen("challenge");
    };

    const handleSkip = () => {
        setIsSkipping(true);
        setTimeout(() => {
            setTodayChallenge();
            setIsSkipping(false);
        }, 300);
    };

    if (!challenge) {
        return null;
    }

    return (
        <div style={{ perspective: "1500px" }}>
            <div
                className="rounded-2xl p-6 shadow-md border-2 bg-gradient-to-br from-white to-amber-50 border-amber-200 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600"
                style={{
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    transform: isSkipping ? "rotateY(-180deg) scale(0.97)" : "rotateY(0deg) scale(1)",
                    opacity: isSkipping ? 0 : 1,
                    willChange: "transform, opacity",
                }}
            >
                <div style={{ backfaceVisibility: "hidden" }}>
                    <div className="flex items-start justify-between pb-2">
                        <h2 className="text-xl font-semibold text-amber-900 dark:text-gray-100">
                            {capitalizeFirstLetter(challenge.category)} Challenge
                        </h2>
                        <div className="flex gap-2 mt-2 mb-2" role="group" aria-label="Discomfort rating - tap to filter by difficulty">
                            {[...Array(5)].map((_, i) => (

                                <Heart
                                    key={i}

                                    size={16}
                                    className={
                                        i < challenge.discomfortRating
                                            ? "fill-orange-300 text-orange-300"
                                            : "text-amber-200 dark:text-gray-600"
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className="border mb-4 border-amber-100 dark:border-gray-600" />

                    <h3 className="text-lg font-medium mb-2 text-amber-800 dark:text-gray-200">
                        {challenge.title}
                    </h3>
                    <p className="mb-4 leading-relaxed text-amber-700 dark:text-gray-300">
                        {challenge.description}
                    </p>
                    <button
                        onClick={handleStartQuest}
                        className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                        aria-label="Start this challenge"
                    >
                        I'll Try This
                    </button>

                    <button
                        onClick={handleSkip}
                        disabled={isSkipping}
                        className="w-full mt-2 py-2 text-sm transition-all flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50"
                        aria-label="Skip this challenge and get another one"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSkipping ? 'animate-spin' : ''}`} />
                        Not feeling this one? Try another
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChallengeCard;
