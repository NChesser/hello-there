// React
import { useState } from "react";

// Store
import { useScreenStore, useUserProgressStore } from "../store/store";

// Components
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import Typography from "../components/Typography";

// Icons
import { Heart, Lightbulb, Sparkles, MessageCircle } from "lucide-react";

// Types
import type { Challenge } from "../types/types";

// Helpers
import { capitalizeFirstLetter } from "../utils/helpers";

// Data
import { getUserTier } from "../data/tiers";

const ChallengeScreen = ({ todayChallenge }: { todayChallenge: Challenge }) => {
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );

    const level = useUserProgressStore((state) => state.level);
    const tier = getUserTier(level);

    // State for "How to approach it" expandable section
    const [showRemember, setShowRemember] = useState(false);

    return (
        <ScreenContainer>
            <div className="space-y-3">
                {/* Category + difficulty tag line */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Typography as="span" variant="overline">
                            {capitalizeFirstLetter(
                                todayChallenge.category?.replace("-", " ") ??
                                    "General",
                            )}
                        </Typography>
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${tier.bgColor} dark:${tier.darkBgColor} ${tier.color}`}
                        >
                            {tier.emoji} {tier.name}
                        </span>
                    </div>
                    <div
                        className="flex items-center gap-1"
                        aria-label={`Difficulty ${todayChallenge.discomfortRating} out of 5`}
                    >
                        {[...Array(5)].map((_, i) => (
                            <Heart
                                key={i}
                                size={14}
                                className={
                                    i < todayChallenge.discomfortRating
                                        ? "fill-orange-400 text-orange-400"
                                        : "text-amber-200 dark:text-gray-600"
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-5 rounded-2xl p-6 shadow-md border-2 bg-gradient-to-br from-white to-amber-50 border-amber-200 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600">
                    {/* Title + description */}
                    <div>
                        <Typography as="h2" variant="title" className="mb-2">
                            {todayChallenge.title}
                        </Typography>
                        <div className="border mb-4 border-amber-100 dark:border-gray-600" />

                        <Typography>{todayChallenge.description}</Typography>
                    </div>

                    {/* "How to approach it" expandable section */}
                    <div
                        className="rounded-xl p-4 border bg-sky-50/70 border-sky-200 dark:bg-sky-950/20 dark:border-sky-800 cursor-pointer transition-all"
                        tabIndex={0}
                        role="button"
                        aria-expanded={showRemember}
                        onClick={() => setShowRemember((prev) => !prev)}
                    >
                        <div className="flex items-center gap-2 mb-2.5">
                            <Lightbulb
                                size={16}
                                className="flex-shrink-0 text-sky-600 dark:text-sky-400"
                            />
                            <Typography as="p" variant="overline" tone="info">
                                How to approach it
                            </Typography>
                        </div>
                        {todayChallenge.remember && (
                            <Typography variant="body-sm" tone="info-strong">
                                {todayChallenge.remember}
                            </Typography>
                        )}
                        {showRemember && (
                            <>
                                {todayChallenge.exampleScript &&
                                    todayChallenge.exampleScript.length > 0 && (
                                        <div className="mt-4 border-t pt-4 border-sky-200 dark:border-sky-800">
                                            <div className="flex items-center gap-2 mb-2.5">
                                                <MessageCircle
                                                    size={16}
                                                    className="flex-shrink-0 text-sky-600 dark:text-sky-400"
                                                />
                                                <Typography
                                                    as="p"
                                                    variant="overline"
                                                    tone="info"
                                                >
                                                    You Could Say
                                                </Typography>
                                            </div>
                                            <ul className="space-y-2">
                                                {todayChallenge.exampleScript.map(
                                                    (
                                                        script: string,
                                                        idx: number,
                                                    ) => (
                                                        <li key={idx}>
                                                            <Typography
                                                                variant="body-sm"
                                                                tone="info-strong"
                                                            >
                                                                {script}
                                                            </Typography>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    )}
                            </>
                        )}
                    </div>

                    {/* Action area */}
                    <div className="pt-1 space-y-3">
                        <Button
                            onClick={() => setSelectedScreen("reflect")}
                            variant="success"
                            size="lg"
                            aria-label="Mark challenge as completed"
                        >
                            <Sparkles size={16} />I Did It!
                        </Button>

                        {/* XP reward hint */}
                        <div className="text-center space-y-0.5">
                            <Typography
                                variant="caption"
                                className="text-amber-400 dark:text-gray-500"
                            >
                                +{todayChallenge.xpReward ?? 0} XP on completion
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    );
};

export default ChallengeScreen;
