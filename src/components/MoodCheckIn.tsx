import {
    AlertTriangle,
    Frown,
    Shield,
    Smile,
    SmilePlus,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

type Mood = 'overwhelmed' | 'nervous' | 'okay' | 'good' | 'brave';

interface MoodCheckInProps {
    onMoodSelected: (mood: Mood) => void;
    selectedMood: Mood | null;
}

const MOODS: { value: Mood; icon: typeof AlertTriangle; label: string }[] = [
    { value: "overwhelmed", icon: AlertTriangle, label: "Overwhelmed" },
    { value: "nervous", icon: Frown, label: "Nervous" },
    { value: "okay", icon: Smile, label: "Okay" },
    { value: "good", icon: SmilePlus, label: "Good" },
    { value: "brave", icon: Shield, label: "Brave" },
];

const MOOD_MESSAGES: Record<Mood, string> = {
    overwhelmed: "That's okay. Take a deep breath. You don't have to do anything today.",
    nervous: "A little nervousness is normal. Today's challenge is small and safe.",
    okay: "Great! You're in a good place. Ready to try something?",
    good: "Wonderful! Let's channel that energy into something positive.",
    brave: "Amazing! You're ready for anything. Let's go!",
};

const MoodCheckIn = ({ onMoodSelected, selectedMood }: MoodCheckInProps) => {
    const { isDark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = MOODS.find((m) => m.value === selectedMood) || null;
    const SelectedIcon = selectedOption?.icon ?? Smile;

    return (
        <div className={`rounded-2xl p-4 shadow-sm border-2 ${
            isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-amber-100'
        }`}>
            <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-amber-800'}`}>
                    Mood check-in
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-amber-600'}`}>
                    {selectedMood ? `Feeling: ${MOODS.find((m) => m.value === selectedMood)?.label}` : 'Pick one'}
                </p>
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => setIsOpen((open) => !open)}
                    className={`flex items-center justify-center h-10 w-10 rounded-xl transition-all ${
                        isOpen
                            ? isDark
                                ? 'bg-amber-500/20 ring-2 ring-amber-500'
                                : 'bg-amber-50 ring-2 ring-amber-400'
                            : isDark
                                ? 'bg-gray-700 hover:bg-gray-600'
                                : 'bg-amber-50 hover:bg-amber-100'
                    }`}
                    aria-expanded={isOpen}
                    aria-controls="mood-options"
                    aria-label="Open mood options"
                >
                    <SelectedIcon
                        size={20}
                        className={isDark ? "text-gray-100" : "text-amber-700"}
                        aria-hidden="true"
                    />
                </button>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-amber-600'}`}>
                    {isOpen ? 'Choose your mood' : 'Tap to choose'}
                </span>
            </div>

            {isOpen && (
                <div id="mood-options" className="grid grid-cols-5 gap-2 mt-3">
                    {MOODS.map(({ value, icon: Icon, label }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => {
                                onMoodSelected(value);
                                setIsOpen(false);
                            }}
                            className={`flex items-center justify-center h-10 rounded-xl transition-all ${
                                selectedMood === value
                                    ? isDark
                                        ? 'bg-amber-500/20 ring-2 ring-amber-500'
                                        : 'bg-amber-50 ring-2 ring-amber-400'
                                    : isDark
                                        ? 'hover:bg-gray-700'
                                        : 'hover:bg-amber-50'
                            }`}
                            aria-label={`Feeling ${label}`}
                        >
                            <Icon
                                size={20}
                                className={isDark ? "text-gray-100" : "text-amber-700"}
                                aria-hidden="true"
                            />
                        </button>
                    ))}
                </div>
            )}

            {selectedMood && (
                <div className={`mt-2 rounded-lg px-3 py-2 ${
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
