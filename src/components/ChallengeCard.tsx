import React, { useState, useCallback } from "react";

// Store
import { useScreenStore, useSetTodayChallenge, useTodayChallenge } from "../store/store";

// Icons
import { Heart } from "lucide-react";

// Utils
import { capitalizeFirstLetter } from "../utils/helpers";

// Components
import Button from "./Button";

// Animation phases: idle → exiting (fade/slide out) → entering (fade/slide in) → idle
type AnimPhase = "idle" | "exiting" | "entering";

// Component
const ChallengeCard = () => {
    // Store
    const setSelectedScreen = useScreenStore((state) => state.setSelectedScreen);

    // Challenge Store
    const challenge = useTodayChallenge();
    const setTodayChallenge = useSetTodayChallenge();

    // Animation state
    const [animPhase, setAnimPhase] = useState<AnimPhase>("idle");

    // Functions
    const handleStartQuest = () => {
        setSelectedScreen("challenge");
    };

    const handleSkip = useCallback(() => {
        if (animPhase !== "idle") return;

        // Phase 1: exit animation
        setAnimPhase("exiting");

        setTimeout(() => {
            // Swap the challenge while invisible
            setTodayChallenge();

            // Phase 2: enter animation (start offscreen, animate in)
            setAnimPhase("entering");

            // Small delay to let the browser paint the "entering" start position
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimPhase("idle");
                });
            });
        }, 350);
    }, [animPhase, setTodayChallenge]);

    if (!challenge) {
        return null;
    }

    // Compute transform + opacity for each phase
    const getAnimStyle = (): React.CSSProperties => {
        switch (animPhase) {
            case "exiting":
                return {
                    transform: "translateY(-24px) scale(0.96)",
                    opacity: 0,
                };
            case "entering":
                return {
                    transform: "translateY(24px) scale(0.96)",
                    opacity: 0,
                    transition: "none", // jump to start position instantly
                };
            default: // idle
                return {
                    transform: "translateY(0) scale(1)",
                    opacity: 1,
                };
        }
    };

    return (
        <div className="overflow-hidden">
            <div
                className="rounded-2xl p-6 shadow-md border-2 bg-gradient-to-br from-white to-amber-50 border-amber-200 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600"
                style={{
                    transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                    willChange: "transform, opacity",
                    ...getAnimStyle(),
                }}
            >
                <div>
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
                    <Button
                        onClick={handleStartQuest}
                        size="lg"
                        aria-label="Start this challenge"
                    >
                        I'll Try This
                    </Button>

                    <Button
                        onClick={handleSkip}
                        disabled={animPhase !== "idle"}
                        variant="text"
                        size="lg"
                        className="mt-2"
                        aria-label="Skip this challenge and get another one"
                    >
                        Try another
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChallengeCard;
