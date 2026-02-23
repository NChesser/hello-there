import ScreenContainer from "../components/ScreenContainer";
import { CHALLENGES } from "../data/challenges";
import { useSetUserProgressStore, useUserProgress } from "../store/store";

const SettingsChallengesScreen = () => {
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    const excludedChallenges = userProgress.excludedChallenges || [];

    const toggleChallengeExclusion = (challengeId: string) => {
        const isExcluded = excludedChallenges.includes(challengeId);
        setUserProgress({
            excludedChallenges: isExcluded
                ? excludedChallenges.filter((id) => id !== challengeId)
                : [...excludedChallenges, challengeId],
        });
    };

    return (
        <ScreenContainer>
            <div className="space-y-4">
                <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        Tap to exclude challenges you do not want to see in your daily rotation.
                    </p>
                </div>
                <div className="space-y-2 overflow-y-auto">
                    {CHALLENGES.map((challenge) => {
                        const isExcluded = excludedChallenges.includes(challenge.id);
                        return (
                            <div
                                key={challenge.id}
                                className={`p-3 rounded-lg border transition-all ${
                                    isExcluded
                                        ? "border-gray-300 bg-white/50 opacity-60 dark:border-gray-600 dark:bg-gray-700/50"
                                        : "border-amber-200 bg-white dark:border-gray-600 dark:bg-gray-700"
                                }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-medium text-xs ${
                                            isExcluded
                                                ? "text-gray-500 line-through"
                                                : "text-gray-900 dark:text-gray-200"
                                        }`}>
                                            {challenge.title}
                                        </h3>
                                        <p className="text-xs mt-0.5 line-clamp-1 text-gray-500 dark:text-gray-400">
                                            {challenge.description}
                                        </p>
                                        <div className="flex gap-1.5 mt-1.5">
                                            <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                                                {challenge.category}
                                            </span>
                                            <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
                                                {challenge.xpReward} XP
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleChallengeExclusion(challenge.id)}
                                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex-shrink-0 ${
                                            isExcluded
                                                ? "bg-green-500 text-white hover:bg-green-600"
                                                : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/70"
                                        }`}
                                    >
                                        {isExcluded ? "Include" : "Hide"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </ScreenContainer>
    );
};

export default SettingsChallengesScreen;