import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import { PRACTICES } from "../data/practices";
import { useSetUserProgressStore, useUserProgress } from "../store/store";

const SettingsPracticesScreen = () => {
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    const excludedPractices = userProgress.excludedPractices || [];

    const togglePracticeExclusion = (practiceId: string) => {
        const isExcluded = excludedPractices.includes(practiceId);
        setUserProgress({
            excludedPractices: isExcluded
                ? excludedPractices.filter((id) => id !== practiceId)
                : [...excludedPractices, practiceId],
        });
    };

    return (
        <ScreenContainer>
            <div className="space-y-4">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Hide practices you do not want to see on your daily list.
                </p>
                <div className="space-y-2">
                    {PRACTICES.map((practice) => {
                        const isExcluded = excludedPractices.includes(practice.id);
                        return (
                            <div
                                key={practice.id}
                                className={`p-3 rounded-lg border transition-all ${
                                    isExcluded
                                        ? "border-gray-300 bg-white/60 opacity-70 dark:border-gray-600 dark:bg-gray-700/50"
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
                                            {practice.title}
                                        </h3>
                                        <p className="text-xs mt-0.5 line-clamp-1 text-gray-500 dark:text-gray-400">
                                            {practice.description}
                                        </p>
                                        <span className="mt-1 inline-block text-[11px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                                            {practice.category}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => togglePracticeExclusion(practice.id)}
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
                {excludedPractices.length > 0 && (
                    <Button
                        onClick={() => setUserProgress({ excludedPractices: [] })}
                        variant="cancel"
                        size="sm"
                        className="w-full"
                    >
                        Reset to All Practices
                    </Button>
                )}
            </div>
        </ScreenContainer>
    );
};

export default SettingsPracticesScreen;