import { useState } from 'react';
import { Sparkles, Heart, Shield } from 'lucide-react';

interface OnboardingScreenProps {
    onComplete: () => void;
}

const STEPS = [
    {
        icon: <Sparkles size={48} className="text-amber-500" />,
        title: "Welcome to Cozy Quest 🐨",
        description: "A gentle app to help you build social confidence, one tiny step at a time.",
        detail: "No pressure. No judgement. Just small moments of bravery.",
    },
    {
        icon: <Heart size={48} className="text-rose-400" />,
        title: "Daily Challenges",
        description: "Each day you'll get a small social challenge tailored to your comfort level.",
        detail: "Not feeling it? Skip it — no streaks to lose, no penalties. Try another one instead!",
    },
    {
        icon: <Shield size={48} className="text-blue-400" />,
        title: "Your Pace, Your Journey",
        description: "Track practices, log people you meet, and reflect on how you feel.",
        detail: "Every step counts, even the small ones. You're already brave for being here. 💛",
    },
];

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
    const [step, setStep] = useState(0);
    const current = STEPS[step];

    const handleNext = () => {
        if (step < STEPS.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-orange-50 dark:bg-gray-900 dark:from-gray-900 dark:to-gray-900">
            <div className="max-w-sm w-full rounded-3xl p-8 shadow-xl bg-white dark:bg-gray-800">
                {/* Step indicator */}
                <div className="flex justify-center gap-2 mb-8">
                    {STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === step ? 'w-8 bg-amber-400' : 'w-2 bg-amber-200 dark:bg-gray-600'
                            }`}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-amber-50 dark:bg-gray-700">
                            {current.icon}
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-amber-900 dark:text-white">
                        {current.title}
                    </h2>
                    
                    <p className="text-sm leading-relaxed text-amber-700 dark:text-gray-300">
                        {current.description}
                    </p>
                    
                    <div className="rounded-xl p-4 bg-blue-50 border border-blue-200 dark:bg-gray-700 dark:border-transparent">
                        <p className="text-xs text-blue-800 dark:text-blue-300">
                            {current.detail}
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 space-y-3">
                    <button
                        onClick={handleNext}
                        className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
                    >
                        {step < STEPS.length - 1 ? 'Next' : "Let's Go! 🎉"}
                    </button>
                    
                    {step < STEPS.length - 1 && (
                        <button
                            onClick={onComplete}
                            className="w-full py-2 text-sm transition-colors text-amber-600 hover:text-amber-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            Skip intro
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnboardingScreen;
