import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

type Mood = 'overwhelmed' | 'nervous' | 'okay' | 'good' | 'brave';

interface MoodCheckInProps {
    onMoodSelected: (mood: Mood) => void;
    selectedMood: Mood | null;
}

const MOODS: { value: Mood; emoji: string; label: string }[] = [
    { value: 'overwhelmed', emoji: '😰', label: 'Overwhelmed' },
    { value: 'nervous', emoji: '😟', label: 'Nervous' },
    { value: 'okay', emoji: '😊', label: 'Okay' },
    { value: 'good', emoji: '😄', label: 'Good' },
    { value: 'brave', emoji: '💪', label: 'Brave' },
];

const MOOD_MESSAGES: Record<Mood, string> = {
    overwhelmed: "That's okay. Take a deep breath. You don't have to do anything today. 💙",
    nervous: "A little nervousness is normal. Today's challenge is small and safe.",
    okay: "Great! You're in a good place. Ready to try something?",
    good: "Wonderful! Let's channel that energy into something positive.",
    brave: "Amazing! You're ready for anything. Let's go! 🔥",
};

const MoodCheckIn = ({ onMoodSelected, selectedMood }: MoodCheckInProps) => {
    const { isDark } = useTheme();

    return (
        <div className={`rounded-2xl p-5 shadow-sm border-2 ${
            isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-amber-100'
        }`}>
            <p className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-amber-800'}`}>
                How are you feeling right now?
            </p>
            
            <div className="flex justify-between gap-1">
                {MOODS.map(({ value, emoji, label }) => (
                    <button
                        key={value}
                        onClick={() => onMoodSelected(value)}
                        className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all ${
                            selectedMood === value
                                ? isDark
                                    ? 'bg-amber-500/20 ring-2 ring-amber-500 scale-110'
                                    : 'bg-amber-50 ring-2 ring-amber-400 scale-110'
                                : isDark 
                                    ? 'hover:bg-gray-700' 
                                    : 'hover:bg-amber-50'
                        }`}
                        aria-label={`Feeling ${label}`}
                    >
                        <span className="text-xl">{emoji}</span>
                        <span className={`text-xs ${
                            selectedMood === value
                                ? isDark ? 'text-amber-400 font-medium' : 'text-amber-700 font-medium'
                                : isDark ? 'text-gray-400' : 'text-amber-600'
                        }`}>
                            {label}
                        </span>
                    </button>
                ))}
            </div>
            
            {selectedMood && (
                <div className={`mt-3 rounded-lg p-3 ${
                    selectedMood === 'overwhelmed'
                        ? isDark ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-200'
                        : isDark ? 'bg-gray-700 border border-gray-600' : 'bg-amber-50 border border-amber-200'
                }`}>
                    <p className={`text-xs ${
                        selectedMood === 'overwhelmed'
                            ? isDark ? 'text-blue-300' : 'text-blue-800'
                            : isDark ? 'text-gray-300' : 'text-amber-700'
                    }`}>
                        {MOOD_MESSAGES[selectedMood]}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MoodCheckIn;
export type { Mood };
