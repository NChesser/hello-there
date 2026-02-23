import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import { CATEGORIES } from "../data/categories";
import { useSetUserProgressStore, useUserProgress } from "../store/store";

const SettingsCategoriesScreen = () => {
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    const preferredCategories = userProgress.preferredCategories || [];

    const toggleCategory = (categoryId: (typeof CATEGORIES)[number]["id"]) => {
        const isSelected = preferredCategories.includes(categoryId);
        setUserProgress({
            preferredCategories: isSelected
                ? preferredCategories.filter((c) => c !== categoryId)
                : [...preferredCategories, categoryId],
        });
    };

    return (
        <ScreenContainer>
            <div className="space-y-4">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Select categories you want to focus on. Leave empty for all.
                </p>
                <div className="space-y-2">
                    {CATEGORIES.map((category) => {
                        const isExplicitlySelected = preferredCategories.includes(category.id);
                        return (
                            <button
                                key={category.id}
                                onClick={() => toggleCategory(category.id)}
                                className={`w-full p-3 rounded-lg border text-left transition-all ${
                                    isExplicitlySelected
                                        ? "border-amber-400 bg-amber-50 dark:border-amber-500 dark:bg-amber-900/30"
                                        : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                        {category.name}
                                    </p>
                                    {isExplicitlySelected && (
                                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                                            Selected
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                                    {category.description}
                                </p>
                            </button>
                        );
                    })}
                </div>
                {preferredCategories.length > 0 && (
                    <Button
                        onClick={() => setUserProgress({ preferredCategories: [] })}
                        variant="cancel"
                        size="sm"
                        className="w-full"
                    >
                        Reset to All Categories
                    </Button>
                )}
            </div>
        </ScreenContainer>
    );
};

export default SettingsCategoriesScreen;