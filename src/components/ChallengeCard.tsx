import React, { useState, useCallback } from "react";

// Store
import {
    useScreenStore,
    useSetTodayChallenge,
    useTodayChallenge,
} from "../store/store";

// Icons
import { Heart } from "lucide-react";

// Utils
import { capitalizeFirstLetter } from "../utils/helpers";

// Components
import Button from "./Button";
import Typography from "./Typography";
import Card from "./Card";

// Animation phases: idle → exiting (fade/slide out) → entering (fade/slide in) → idle
type AnimPhase = "idle" | "exiting" | "entering";

// Component
const ChallengeCard = () => {
    // Store
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );

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
        <div className="overflow-hidden space-y-3">
            <Card
                variant="elevated"
                style={{
                    transition:
                        "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                    willChange: "transform, opacity",
                    ...getAnimStyle(),
                }}
            >
                <div>
                    <Typography as="h2" variant="title" className="mb-2">
                        {challenge.title}
                    </Typography>
                    <div className="border mb-4 border-amber-100 dark:border-gray-600" />

                    <Typography className="mb-4">
                        {challenge.description}
                    </Typography>
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
                        variant="icon"
                        size="lg"
                        className="mt-3"
                        aria-label="Skip this challenge and get another one"
                    >
                        Try Another
                    </Button>

                    <div className="border mt-6 mb-4 border-amber-100 dark:border-gray-600" />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Typography as="span" variant="overline">
                                {capitalizeFirstLetter(
                                    challenge.category,
                                ).replace("social", "Social")} {" "}
                            </Typography>
                        </div>
                        <div
                            className="flex items-center gap-1"
                            aria-label={`Difficulty ${challenge.discomfortRating} out of 5`}
                        >
                            {[...Array(5)].map((_, i) => (
                                <Heart
                                    key={i}
                                    size={14}
                                    className={
                                        i < challenge.discomfortRating
                                            ? "fill-orange-400 text-orange-400"
                                            : "text-amber-200 dark:text-gray-600"
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ChallengeCard;
