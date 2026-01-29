import React from "react";

// Store
import { useScreenStore } from "../store/store";

// Types
import type { Challenge } from "../types/types";

// Icons
import { Heart, Sparkles } from "lucide-react";

// Component
const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
    const selectedScreen = useScreenStore((state) => {
        return state.selectedScreen;
    });
    console.log("🚀 ~ CozychallengeApp ~ selectedScreen:", selectedScreen);
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );

    const handleStartQuest = () => {
        setSelectedScreen("challenge");
    };

    const handleSkip = () => {
        setSelectedScreen("home");
    };

    return (
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-md border-2 border-amber-200">
            <div className="flex items-start justify-between pb-3">
                <h2 className="text-xl font-semibold text-amber-900">
                    Today's Challenge
                </h2>
                {/* <Sparkles size={20} className="text-amber-500" /> */}
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

            <div className="border border-amber-200 mb-4" />

            <h3 className="text-lg font-medium text-amber-800 mb-2">
                {challenge.title}
            </h3>

            <p className="text-amber-700 mb-4 leading-relaxed">
                {challenge.description}
            </p>

            {/* {challenge.exampleScript && (
                <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                    <p className="text-xs text-amber-600 mb-1 font-medium">
                        Example:
                    </p>
                    <p className="text-sm text-amber-700 italic">
                        "{challenge.exampleScript}"
                    </p>
                </div>
            )}

            <div className="flex gap-2 mb-4">
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
                <span className="text-xs text-amber-600 ml-1">
                    gentle stretch
                </span>
            </div> */}

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
