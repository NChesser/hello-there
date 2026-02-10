import { useState } from 'react';

// Components
import ScreenContainer from "../components/ScreenContainer";

// Store
import { useUserProgress, useSetUserProgressStore } from "../store/store";

// Data
import { CHALLENGES } from "../data/challenges";

// Icons
import { ChevronRight, Info, ListChecks, Tag, Plus, Check, X, Moon, Sun } from "lucide-react";

// Types
import type { Challenge } from "../types/types";

// Theme
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

type ExpandedSection = 'challenges' | 'categories' | 'custom' | null;

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

    const createCustomChallenge = () => {
        if (!newChallenge.title.trim()) return;

        // Create a unique ID
        const customId = `custom-${Date.now()}`;
        
        // For now, we'll just show a message since we need to add custom challenges to the store
        alert('Custom challenge creation will be implemented with the createdChallenges field in the store!');
        
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
                <div className={`rounded-2xl p-5 shadow-sm border ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isDark ? 'bg-indigo-900/50' : 'bg-indigo-100'
                            }`}>
                                {isDark ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-indigo-600" />}
                            </div>
                            <div>
                                <h2 className={`text-base font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {isDark ? 'Dark Mode' : 'Light Mode'}
                                </h2>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`relative w-12 h-7 rounded-full transition-colors ${
                                isDark ? 'bg-indigo-500' : 'bg-gray-300'
                            }`}
                            aria-label="Toggle dark mode"
                        >
                            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                                isDark ? 'translate-x-5' : 'translate-x-0.5'
                            }`} />
                        </button>
                    </div>
                </div>

                {/* About Section - Always Visible */}
                <div className={`rounded-2xl p-5 shadow-sm border ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isDark ? 'bg-blue-900/50' : 'bg-blue-100'
                        }`}>
                            <Info size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                        </div>
                        <div className="flex-1">
                            <h2 className={`text-base font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>About</h2>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>App information</p>
                        </div>
                    </div>
                    <div className="pl-13 space-y-3">
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            This app helps build social confidence gently, one tiny step at a time. 
                            There are no streaks, no failures, just small moments of bravery.
                        </p>
                        <div className={`rounded-lg p-3 border ${
                            isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
                        }`}>
                            <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                                💙 Remember: Progress isn't linear. Rest is part of the journey.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Settings List - Mobile App Style */}
                <div className={`rounded-2xl shadow-sm border overflow-hidden ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    {/* Manage Challenges */}
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'challenges' ? null : 'challenges')}
                        className={`w-full px-5 py-4 flex items-center gap-3 transition-colors border-b ${
                            isDark 
                                ? 'hover:bg-gray-700 border-gray-700' 
                                : 'hover:bg-gray-50 border-gray-100'
                        }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isDark ? 'bg-amber-900/50' : 'bg-amber-100'
                        }`}>
                            <ListChecks size={20} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Manage Challenges</p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {excludedChallenges.length > 0 
                                    ? `${excludedChallenges.length} excluded` 
                                    : 'All challenges active'}
                            </p>
                        </div>
                        <ChevronRight 
                            size={20} 
                            className={`transition-transform ${isDark ? 'text-gray-500' : 'text-gray-400'} ${expandedSection === 'challenges' ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {/* Challenges Expanded Content */}
                    {expandedSection === 'challenges' && (
                        <div className={`px-5 py-4 border-b ${
                            isDark ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-100'
                        }`}>
                            <p className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
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
                                                    ? isDark
                                                        ? 'border-gray-600 bg-gray-700/50 opacity-60'
                                                        : 'border-gray-300 bg-white/50 opacity-60'
                                                    : isDark
                                                        ? 'border-gray-600 bg-gray-700'
                                                        : 'border-amber-200 bg-white'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`font-medium text-xs ${
                                                        isExcluded 
                                                            ? isDark ? 'text-gray-500 line-through' : 'text-gray-500 line-through'
                                                            : isDark ? 'text-gray-200' : 'text-gray-900'
                                                    }`}>
                                                        {challenge.title}
                                                    </h3>
                                                    <p className={`text-xs mt-0.5 line-clamp-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {challenge.description}
                                                    </p>
                                                    <div className="flex gap-1.5 mt-1.5">
                                                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                                                            isDark ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                            {challenge.category}
                                                        </span>
                                                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                                                            isDark ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700'
                                                        }`}>
                                                            {challenge.xpReward} XP
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => toggleChallengeExclusion(challenge.id)}
                                                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex-shrink-0 ${
                                                        isExcluded
                                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                                            : isDark
                                                                ? 'bg-red-900/50 text-red-400 hover:bg-red-900/70'
                                                                : 'bg-red-100 text-red-700 hover:bg-red-200'
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
                        className={`w-full px-5 py-4 flex items-center gap-3 transition-colors border-b ${
                            isDark 
                                ? 'hover:bg-gray-700 border-gray-700' 
                                : 'hover:bg-gray-50 border-gray-100'
                        }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isDark ? 'bg-purple-900/50' : 'bg-purple-100'
                        }`}>
                            <Tag size={20} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Category Preferences</p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {preferredCategories.length > 0 
                                    ? `${preferredCategories.length} selected` 
                                    : 'All categories'}
                            </p>
                        </div>
                        <ChevronRight 
                            size={20} 
                            className={`transition-transform ${isDark ? 'text-gray-500' : 'text-gray-400'} ${expandedSection === 'categories' ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {/* Categories Expanded Content */}
                    {expandedSection === 'categories' && (
                        <div className={`px-5 py-4 border-b ${
                            isDark ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-100'
                        }`}>
                            <p className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
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
                                                    ? isDark
                                                        ? 'border-amber-500 bg-amber-900/30'
                                                        : 'border-amber-400 bg-amber-50'
                                                    : isDark
                                                        ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                                            {category.name}
                                                        </p>
                                                        {isExplicitlySelected && (
                                                            <Check size={14} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                                                        )}
                                                    </div>
                                                    <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
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
                                    className={`w-full mt-3 px-3 py-2 border rounded-lg text-xs font-medium transition-colors ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Reset to All Categories
                                </button>
                            )}
                        </div>
                    )}

                    {/* Create Custom Challenge */}
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'custom' ? null : 'custom')}
                        className={`w-full px-5 py-4 flex items-center gap-3 transition-colors ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isDark ? 'bg-green-900/50' : 'bg-green-100'
                        }`}>
                            <Plus size={20} className={isDark ? 'text-green-400' : 'text-green-600'} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Create Custom Challenge</p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Design your own challenge</p>
                        </div>
                        <ChevronRight 
                            size={20} 
                            className={`transition-transform ${isDark ? 'text-gray-500' : 'text-gray-400'} ${expandedSection === 'custom' ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {/* Custom Challenge Expanded Content */}
                    {expandedSection === 'custom' && (
                        <div className={`px-5 py-4 ${isDark ? 'bg-gray-750' : 'bg-gray-50'}`}>
                            <div className="space-y-3">
                                <div>
                                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Challenge Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={newChallenge.title}
                                        onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                                        placeholder="e.g., Say hello to a neighbor"
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${
                                            isDark 
                                                ? 'border-gray-600 bg-gray-700 text-gray-200 focus:border-amber-500 focus:ring-amber-500 placeholder-gray-500' 
                                                : 'border-gray-300 bg-white focus:border-amber-400 focus:ring-amber-400'
                                        }`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Description *
                                    </label>
                                    <textarea
                                        value={newChallenge.description}
                                        onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                                        placeholder="Describe what this challenge involves..."
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 resize-none ${
                                            isDark 
                                                ? 'border-gray-600 bg-gray-700 text-gray-200 focus:border-amber-500 focus:ring-amber-500 placeholder-gray-500' 
                                                : 'border-gray-300 bg-white focus:border-amber-400 focus:ring-amber-400'
                                        }`}
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Category
                                    </label>
                                    <select
                                        value={newChallenge.category}
                                        onChange={(e) => setNewChallenge({ ...newChallenge, category: e.target.value as Challenge['category'] })}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${
                                            isDark 
                                                ? 'border-gray-600 bg-gray-700 text-gray-200 focus:border-amber-500 focus:ring-amber-500' 
                                                : 'border-gray-300 bg-white focus:border-amber-400 focus:ring-amber-400'
                                        }`}
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Discomfort Level: {newChallenge.discomfortRating}/5
                                    </label>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <button
                                                key={val}
                                                onClick={() => setNewChallenge({ ...newChallenge, discomfortRating: val as 1 | 2 | 3 | 4 | 5 })}
                                                className={`flex-1 py-1.5 rounded-lg border text-sm transition-all ${
                                                    newChallenge.discomfortRating === val
                                                        ? isDark
                                                            ? 'border-amber-500 bg-amber-900/40 text-amber-200 font-medium'
                                                            : 'border-amber-400 bg-amber-50 text-amber-900 font-medium'
                                                        : isDark
                                                            ? 'border-gray-600 text-gray-400 hover:border-gray-500 bg-gray-700'
                                                            : 'border-gray-300 text-gray-600 hover:border-gray-400 bg-white'
                                                }`}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
                                    <div className={`flex justify-between text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
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
            </div>
        </ScreenContainer>
    );
};

export default SettingsScreen;
