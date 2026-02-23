import { useState } from 'react';

// Components
import ScreenContainer from "../components/ScreenContainer";

// Store
import { useSetSelectedScreen, useUserProgress } from "../store/store";

// Data
import { CATEGORIES } from "../data/categories";

// Icons
import { ChevronRight, Info, ListChecks, Tag, Plus, Moon, Sun, Sparkles } from "lucide-react";

// Theme (toggleTheme only — styling uses Tailwind dark: variant)
import { useTheme } from "../context/ThemeContext";

const SettingsScreen = () => {
    const { isDark, toggleTheme } = useTheme();
    const setSelectedScreen = useSetSelectedScreen();
    const userProgress = useUserProgress();
    const excludedChallenges = userProgress.excludedChallenges || [];
    const excludedPractices = userProgress.excludedPractices || [];
    const preferredCategories = userProgress.preferredCategories || [];

    return (
        <ScreenContainer>
            <div className="space-y-3">
                {/* Dark Mode Toggle */}
                <div className="rounded-2xl shadow-sm border overflow-hidden bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-full px-5 py-4 flex items-center gap-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                            <Sun size={20} className="text-amber-600 block dark:hidden" />
                            <Moon size={20} className="text-amber-300 hidden dark:block" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                <span className="dark:hidden">Light Mode</span>
                                <span className="hidden dark:inline">Dark Mode</span>
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                <span className="dark:hidden">Switch to dark theme</span>
                                <span className="hidden dark:inline">Switch to light theme</span>
                            </p>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`relative flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                                isDark ? 'bg-amber-500' : 'bg-gray-300'
                            }`}
                            aria-label="Toggle dark mode"
                        >
                            <span className="sr-only">Toggle dark mode</span>
                            <div className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                                isDark ? 'translate-x-5' : 'translate-x-0.5'
                            }`} />
                        </button>
                    </div>
                </div>

                {/* Settings List - Mobile App Style */}
                <div className="rounded-2xl shadow-sm border overflow-hidden bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    {/* Manage Challenges */}
                    <button
                        onClick={() => setSelectedScreen("settings-challenges")}
                        className="w-full px-5 py-4 flex items-center gap-3 transition-colors border-b hover:bg-gray-50 border-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
                    >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/40">
                            <ListChecks size={20} className="text-amber-600 dark:text-amber-300" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Manage Challenges</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {excludedChallenges.length > 0 
                                    ? `${excludedChallenges.length} excluded` 
                                    : 'All challenges active'}
                            </p>
                        </div>
                        <ChevronRight 
                            size={20} 
                            className="text-gray-400 dark:text-gray-500"
                        />
                    </button>

                    {/* Category Preferences */}
                    <button
                        onClick={() => setSelectedScreen("settings-categories")}
                        className="w-full px-5 py-4 flex items-center gap-3 transition-colors border-b hover:bg-gray-50 border-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
                    >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/30">
                            <Tag size={20} className="text-amber-600 dark:text-amber-300" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Category Preferences</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {preferredCategories.length > 0 
                                    ? `${preferredCategories.length} selected` 
                                    : 'All categories'}
                            </p>
                        </div>
                        <ChevronRight 
                            size={20} 
                            className="text-gray-400 dark:text-gray-500"
                        />
                    </button>

                    {/* Manage Practices */}
                    <button
                        onClick={() => setSelectedScreen("settings-practices")}
                        className="w-full px-5 py-4 flex items-center gap-3 transition-colors border-b hover:bg-gray-50 border-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
                    >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/30">
                            <Sparkles size={20} className="text-amber-600 dark:text-amber-300" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Manage Practices</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {excludedPractices.length > 0 
                                    ? `${excludedPractices.length} hidden` 
                                    : 'All practices visible'}
                            </p>
                        </div>
                        <ChevronRight 
                            size={20} 
                            className="text-gray-400 dark:text-gray-500"
                        />
                    </button>

                    {/* Create Custom Challenge */}
                    <button
                        onClick={() => setSelectedScreen("settings-custom")}
                        className="w-full px-5 py-4 flex items-center gap-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/30">
                            <Plus size={20} className="text-amber-600 dark:text-amber-300" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Create Custom Challenge</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Design your own challenge</p>
                        </div>
                        <ChevronRight 
                            size={20} 
                            className="text-gray-400 dark:text-gray-500"
                        />
                    </button>
                </div>

                {/* About Section */}
                <div className="rounded-2xl shadow-sm border overflow-hidden bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <button
                        onClick={() => setSelectedScreen("settings-about")}
                        className="w-full px-5 py-4 flex items-center gap-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-900/30">
                            <Info size={20} className="text-amber-600 dark:text-amber-300" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">About</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">App information</p>
                        </div>
                        <ChevronRight
                            size={20}
                            className="text-gray-400 dark:text-gray-500"
                        />
                    </button>
                </div>
            </div>
        </ScreenContainer>
    );
};

export default SettingsScreen;
