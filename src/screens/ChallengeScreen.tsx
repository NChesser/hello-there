// Store
import { useScreenStore, useUserProgressStore } from "../store/store";

// Components
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";

// Icons
import { HandHeart, Heart, MessageCircle, Sparkles } from "lucide-react";

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


    return (
        <ScreenContainer>
            <div className="space-y-3">
                {/* Category + difficulty tag line */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                            {capitalizeFirstLetter(
                                todayChallenge.category?.replace("-", " ") ??
                                    "General",
                            )}
                        </span>
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
                        <h2 className="text-2xl font-bold tracking-tight mb-2 text-amber-900 dark:text-gray-100">
                            {todayChallenge.title}
                        </h2>
                        <div className="border mb-4 border-amber-100 dark:border-gray-600" />

                        <p className="leading-relaxed text-amber-700 dark:text-gray-300">
                            {todayChallenge.description}
                        </p>
                    </div>

                    {/* Example scripts */}
                    {todayChallenge.exampleScript && (
                        <div className="rounded-xl p-4 border bg-amber-50/70 border-amber-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2.5">
                                <MessageCircle
                                    size={14}
                                    className="text-amber-600 dark:text-amber-400"
                                />
                                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                                    You could say
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                {(Array.isArray(todayChallenge.exampleScript)
                                    ? todayChallenge.exampleScript
                                    : todayChallenge.exampleScript
                                          .split(/\r?\n|\|/)
                                          .map((s: string) => s.trim())
                                          .filter(Boolean)
                                ).map((ex: string, i: number) => (
                                    <p
                                        key={i}
                                        className="text-sm italic text-amber-700 dark:text-gray-300"
                                    >
                                        "{ex.replace(/^[""]|[""]$/g, "")}"
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Encouragement */}
                    <div className="rounded-xl p-4 border bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                        <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-300">
                            <Heart size={14} className="inline text-blue-400 fill-blue-400 mr-1" />{" "}
                            {todayChallenge?.remember
                                ? todayChallenge.remember
                                : `Remember you can stop anytime. Showing up is what matters.`}
                        </p>
                    </div>

                    {/* Action area */}
                    <div className="pt-1 space-y-3">
                        <Button
                            onClick={() => setSelectedScreen("reflect")}
                            variant="success"
                            size="lg"
                            aria-label="Mark challenge as completed"
                        >
                            <Sparkles size={18} />I Did It!
                        </Button>

                        {/* XP reward hint */}
                        <div className="text-center space-y-0.5">
                            <p className="text-xs text-amber-400 dark:text-gray-500">
                                +{todayChallenge.xpReward ?? 0} XP on completion
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    );
};

export default ChallengeScreen;
