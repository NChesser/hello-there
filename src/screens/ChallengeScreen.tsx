// Store
import { useScreenStore } from "../store/store";
import { useTheme } from "../context/ThemeContext";

// Components
import ScreenContainer from "../components/ScreenContainer";

// Icons
import { Heart, MessageCircle, Sparkles } from "lucide-react";

// Helpers
import { capitalizeFirstLetter } from "../utils/helpers";

const ChallengeScreen = ({ todayChallenge }: { todayChallenge: any }) => {
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );
    const { isDark } = useTheme();

    return (
        <ScreenContainer>
            <div className="space-y-5">
                {/* Category + difficulty tag line */}
                <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                        {capitalizeFirstLetter(todayChallenge.category?.replace("-", " ") ?? "General")}
                    </span>
                    <div className="flex items-center gap-1" aria-label={`Difficulty ${todayChallenge.discomfortRating} out of 5`}>
                        {[...Array(5)].map((_, i) => (
                            <Heart
                                key={i}
                                size={14}
                                className={
                                    i < todayChallenge.discomfortRating
                                        ? "fill-orange-400 text-orange-400"
                                        : isDark ? "text-gray-600" : "text-amber-200"
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* Title + description */}
                <div>
                    <h2 className={`text-2xl font-bold tracking-tight mb-2 ${isDark ? 'text-gray-100' : 'text-amber-900'}`}>
                        {todayChallenge.title}
                    </h2>
                    <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-amber-700'}`}>
                        {todayChallenge.description}
                    </p>
                </div>

                {/* Example scripts */}
                {todayChallenge.exampleScript && (
                    <div className={`rounded-xl p-4 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-amber-50/70 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-2.5">
                            <MessageCircle size={14} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                            <p className={`text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
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
                                <p key={i} className={`text-sm italic ${isDark ? 'text-gray-300' : 'text-amber-700'}`}>
                                    "{ex.replace(/^[""]|[""]$/g, "")}"
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Encouragement */}
                <div className={`rounded-xl p-4 border ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                        💙{" "}
                        {todayChallenge?.remember
                            ? todayChallenge.remember
                            : `You can stop anytime. Showing up is what matters.`}
                    </p>
                </div>

                {/* Action area */}
                <div className="pt-1 space-y-3">
                    <button
                        onClick={() => setSelectedScreen("reflect")}
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                        aria-label="Mark challenge as completed"
                    >
                        <Sparkles size={18} />
                        I Did It!
                    </button>

                    {/* XP reward hint */}
                    <p className={`text-center text-xs ${isDark ? 'text-gray-500' : 'text-amber-400'}`}>
                        +{todayChallenge.xpReward ?? 0} XP on completion
                    </p>
                </div>
            </div>
        </ScreenContainer>
    );
};

export default ChallengeScreen;
