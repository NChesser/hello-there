import { useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import { CATEGORIES } from "../data/categories";
import { useSetUserProgressStore, useUserProgress } from "../store/store";
import type { Challenge } from "../types/types";

const SettingsCustomChallengeScreen = () => {
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    const [newChallenge, setNewChallenge] = useState({
        title: "",
        description: "",
        discomfortRating: 3 as 1 | 2 | 3 | 4 | 5,
        category: "micro-social" as Challenge["category"],
        xpReward: 100,
    });

    const createCustomChallenge = () => {
        if (!newChallenge.title.trim() || !newChallenge.description.trim()) return;

        const customId = `custom-${Date.now()}`;
        const existingCustom = userProgress.createdChallenges || [];

        setUserProgress({
            createdChallenges: [
                ...existingCustom,
                {
                    id: customId,
                    title: newChallenge.title.trim(),
                    description: newChallenge.description.trim(),
                    discomfortRating: newChallenge.discomfortRating,
                    category: newChallenge.category,
                    xpReward: newChallenge.xpReward,
                    createdAt: new Date().toISOString(),
                },
            ],
        });

        setNewChallenge({
            title: "",
            description: "",
            discomfortRating: 3,
            category: "micro-social",
            xpReward: 100,
        });
    };

    return (
        <ScreenContainer>
            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                        Challenge Title *
                    </label>
                    <input
                        type="text"
                        value={newChallenge.title}
                        onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                        placeholder="e.g., Say hello to a neighbor"
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 border-gray-300 bg-white focus:border-amber-400 focus:ring-amber-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-amber-500 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                        Description *
                    </label>
                    <textarea
                        value={newChallenge.description}
                        onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                        placeholder="Describe what this challenge involves..."
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 resize-none border-gray-300 bg-white focus:border-amber-400 focus:ring-amber-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-amber-500 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                        Category
                    </label>
                    <select
                        value={newChallenge.category}
                        onChange={(e) => setNewChallenge({ ...newChallenge, category: e.target.value as Challenge["category"] })}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 border-gray-300 bg-white focus:border-amber-400 focus:ring-amber-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                        Discomfort Level: {newChallenge.discomfortRating}/5
                    </label>
                    <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((val) => (
                            <button
                                key={val}
                                onClick={() => setNewChallenge({ ...newChallenge, discomfortRating: val as 1 | 2 | 3 | 4 | 5 })}
                                className={`flex-1 py-1.5 rounded-lg border text-sm transition-all ${
                                    newChallenge.discomfortRating === val
                                        ? "border-amber-400 bg-amber-50 text-amber-900 font-medium dark:border-amber-500 dark:bg-amber-900/40 dark:text-amber-200"
                                        : "border-gray-300 text-gray-600 hover:border-gray-400 bg-white dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:bg-gray-700"
                                }`}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                        XP Reward: {newChallenge.xpReward}
                    </label>
                    <input
                        type="range"
                        min="25"
                        max="250"
                        step="25"
                        value={newChallenge.xpReward}
                        onChange={(e) => setNewChallenge({ ...newChallenge, xpReward: parseInt(e.target.value) })}
                        className="w-full accent-amber-500"
                    />
                    <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
                        <span>25</span>
                        <span>250</span>
                    </div>
                </div>

                <Button
                    onClick={createCustomChallenge}
                    disabled={!newChallenge.title.trim() || !newChallenge.description.trim()}
                    size="lg"
                >
                    Create Challenge
                </Button>
            </div>
        </ScreenContainer>
    );
};

export default SettingsCustomChallengeScreen;