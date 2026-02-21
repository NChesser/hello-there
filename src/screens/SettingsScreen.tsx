import { useState } from 'react';

// Components
import ScreenContainer from "../components/ScreenContainer";

// Store
import { useUserProgress, useSetUserProgressStore } from "../store/store";

// Data
import { CHALLENGES } from "../data/challenges";
import { PRACTICES } from "../data/practices";

// Icons
import { ChevronRight, Info, ListChecks, Tag, Plus, Check, Moon, Sun, Sparkles } from "lucide-react";

// Types
import type { Challenge } from "../types/types";

// Theme (toggleTheme only — styling uses Tailwind dark: variant)
import { useTheme } from "../context/ThemeContext";

const CATEGORIES = [
    { id: 'micro-social', name: 'Micro-Social', description: 'Small everyday interactions' },
    { id: 'interaction', name: 'Interaction', description: 'Active conversations and engagement' },
    { id: 'vulnerability', name: 'Vulnerability', description: 'Sharing and expressing yourself' },
    { id: 'rejection', name: 'Rejection', description: 'Handling rejection and "no"' },
    { id: 'exposure', name: 'Exposure', description: 'Public speaking and visibility' },
    { id: 'wellbeing', name: 'Wellbeing', description: 'Self-care and mental health' },
    { id: 'growth', name: 'Growth', description: 'Personal development' },
    { id: 'assertiveness', name: 'Assertiveness', description: 'Setting boundaries and speaking up' },
] as const;

type ExpandedSection = 'challenges' | 'practices' | 'categories' | 'custom' | 'about' | null;

const SettingsScreen = () => {
    const { isDark, toggleTheme } = useTheme();
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    
    const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
    const [newChallenge, setNewChallenge] = useState({
        title: '',
        description: '',
        discomfortRating: 3 as 1 | 2 | 3 | 4 | 5,
        category: 'micro-social' as Challenge['category'],
        xpReward: 100,
    });

    const excludedChallenges = userProgress.excludedChallenges || [];
    const excludedPractices = userProgress.excludedPractices || [];
    const preferredCategories = userProgress.preferredCategories || [];

    const toggleChallengeExclusion = (challengeId: string) => {
        const isExcluded = excludedChallenges.includes(challengeId);
        setUserProgress({
            excludedChallenges: isExcluded
                ? excludedChallenges.filter(id => id !== challengeId)
                : [...excludedChallenges, challengeId],
        });
    };

    const toggleCategory = (categoryId: Challenge['category']) => {
        const isSelected = preferredCategories.includes(categoryId);
        setUserProgress({
            preferredCategories: isSelected
                ? preferredCategories.filter(c => c !== categoryId)
                : [...preferredCategories, categoryId],
        });
    };

    const togglePracticeExclusion = (practiceId: string) => {
        const isExcluded = excludedPractices.includes(practiceId);
        setUserProgress({
            excludedPractices: isExcluded
                ? excludedPractices.filter((id) => id !== practiceId)
                : [...excludedPractices, practiceId],
        });
    };

    const createCustomChallenge = () => {
        if (!newChallenge.title.trim()) return;

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
        
        // Reset form
        setNewChallenge({
            title: '',
            description: '',
            discomfortRating: 3,
            category: 'micro-social',
            xpReward: 100,
        });
    };

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
                        onClick={() => setExpandedSection(expandedSection === 'challenges' ? null : 'challenges')}
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
                            className={`transition-transform text-gray-400 dark:text-gray-500 ${expandedSection === 'challenges' ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {/* Challenges Expanded Content */}
                    {expandedSection === 'challenges' && (
                        <div className="px-5 py-4 border-b bg-gray-50 border-gray-100 dark:bg-gray-800/60 dark:border-gray-700">
                            <p className="text-xs mb-3 text-gray-600 dark:text-gray-400">
                                Tap to exclude challenges you don't want to see in your daily rotation.
                            </p>
                            <div className="space-y-2 max-h-80 overflow-y-auto">
                                {CHALLENGES.map((challenge) => {
                                    const isExcluded = excludedChallenges.includes(challenge.id);
                                    return (
                                        <div
                                            key={challenge.id}
                                            className={`p-3 rounded-lg border transition-all ${
                                                isExcluded
                                                    ? 'border-gray-300 bg-white/50 opacity-60 dark:border-gray-600 dark:bg-gray-700/50'
                                                    : 'border-amber-200 bg-white dark:border-gray-600 dark:bg-gray-700'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`font-medium text-xs ${
                                                        isExcluded 
                                                            ? 'text-gray-500 line-through'
                                                            : 'text-gray-900 dark:text-gray-200'
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
                                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                                            : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/70'
                                                    }`}
                                                >
                                                    {isExcluded ? 'Include' : 'Hide'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Category Preferences */}
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'categories' ? null : 'categories')}
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
                            className={`transition-transform text-gray-400 dark:text-gray-500 ${expandedSection === 'categories' ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {/* Categories Expanded Content */}
                    {expandedSection === 'categories' && (
                        <div className="px-5 py-4 border-b bg-gray-50 border-gray-100 dark:bg-gray-800/60 dark:border-gray-700">
                            <p className="text-xs mb-3 text-gray-600 dark:text-gray-400">
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
                                                    ? 'border-amber-400 bg-amber-50 dark:border-amber-500 dark:bg-amber-900/30'
                                                    : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                                            {category.name}
                                                        </p>
                                                        {isExplicitlySelected && (
                                                            <Check size={14} className="text-amber-600 dark:text-amber-400" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                                                        {category.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            {preferredCategories.length > 0 && (
                                <button
                                    onClick={() => setUserProgress({ preferredCategories: [] })}
                                    className="w-full mt-3 px-3 py-2 border rounded-lg text-xs font-medium transition-colors bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Reset to All Categories
                                </button>
                            )}
                        </div>
                    )}

                    {/* Manage Practices */}
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'practices' ? null : 'practices')}
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
                            className={`transition-transform text-gray-400 dark:text-gray-500 ${expandedSection === 'practices' ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {/* Practices Expanded Content */}
                    {expandedSection === 'practices' && (
                        <div className="px-5 py-4 border-b bg-gray-50 border-gray-100 dark:bg-gray-800/60 dark:border-gray-700">
                            <p className="text-xs mb-3 text-gray-600 dark:text-gray-400">
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
                                                    ? 'border-gray-300 bg-white/60 opacity-70 dark:border-gray-600 dark:bg-gray-700/50'
                                                    : 'border-amber-200 bg-white dark:border-gray-600 dark:bg-gray-700'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`font-medium text-xs ${
                                                        isExcluded
                                                            ? 'text-gray-500 line-through'
                                                            : 'text-gray-900 dark:text-gray-200'
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
                                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                                            : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/70'
                                                    }`}
                                                >
                                                    {isExcluded ? 'Include' : 'Hide'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {excludedPractices.length > 0 && (
                                <button
                                    onClick={() => setUserProgress({ excludedPractices: [] })}
                                    className="w-full mt-3 px-3 py-2 border rounded-lg text-xs font-medium transition-colors bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Reset to All Practices
                                </button>
                            )}
                        </div>
                    )}

                    {/* Create Custom Challenge */}
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'custom' ? null : 'custom')}
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
                            className={`transition-transform text-gray-400 dark:text-gray-500 ${expandedSection === 'custom' ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {/* Custom Challenge Expanded Content */}
                    {expandedSection === 'custom' && (
                        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/60">
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
                                        onChange={(e) => setNewChallenge({ ...newChallenge, category: e.target.value as Challenge['category'] })}
                                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 border-gray-300 bg-white focus:border-amber-400 focus:ring-amber-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                                    >
                                        {CATEGORIES.map(cat => (
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
                                                        ? 'border-amber-400 bg-amber-50 text-amber-900 font-medium dark:border-amber-500 dark:bg-amber-900/40 dark:text-amber-200'
                                                        : 'border-gray-300 text-gray-600 hover:border-gray-400 bg-white dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:bg-gray-700'
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

                                <button
                                    onClick={createCustomChallenge}
                                    disabled={!newChallenge.title.trim() || !newChallenge.description.trim()}
                                    className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Create Challenge
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* About Section */}
                <div className="rounded-2xl shadow-sm border overflow-hidden bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'about' ? null : 'about')}
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
                            className={`transition-transform text-gray-400 dark:text-gray-500 ${expandedSection === 'about' ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {expandedSection === 'about' && (
                        <div className="px-5 pb-5 bg-gray-50 dark:bg-gray-800/60">
                            <div className="pl-12 space-y-3">
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                    This app helps build social confidence gently, one tiny step at a time. 
                                    There are no streaks, no failures, just small moments of bravery.
                                </p>
                                <div className="rounded-lg p-3 border bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/60">
                                    <p className="text-xs text-amber-800 dark:text-amber-200">
                                        💙 Remember: Progress isn't linear. Rest is part of the journey.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ScreenContainer>
    );
};

export default SettingsScreen;
