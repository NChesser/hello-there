// Components
import { useMemo, useState } from "react";

// Store
import { useUserProgress, useUserProgressStore } from "../store/store";

// Data
import { getUserTier, getNextTier } from "../data/tiers";

// Helpers
import { getXpProgress, getXpForLevel } from "../utils/helpers";

// Types
import type { Mood } from "../types/types";

// Screens
import ScreenContainer from "../components/ScreenContainer";

// COmponents
import ChallengeCard from "../components/ChallengeCard";
import DailyQuote from "../components/DailyQuote";
import MoodCheckIn from "../components/MoodCheckIn";
import IntentionPrompt from "../components/IntentionPrompt";

const HomeScreen = () => {
    const userProgress = useUserProgress();
    const logMood = useUserProgressStore((state) => state.logMood);

    // Load today's mood from persisted logs (if any)
    const todaysMood = useMemo(() => {
        const today = new Date().toDateString();
        const todayLog = (userProgress.moodLogs ?? [])
            .slice()
            .reverse()
            .find((entry) => new Date(entry.date).toDateString() === today);
        return todayLog?.mood ?? null;
    }, [userProgress.moodLogs]);

    const [selectedMood, setSelectedMood] = useState<Mood | null>(todaysMood);

    const handleMoodSelected = (mood: Mood) => {
        setSelectedMood(mood);
        logMood(mood);
    };

    return (
        <ScreenContainer>
            <div className="space-y-5 pb-24">
                <DailyQuote />

                {/* Tier + XP progress bar */}
                {/* ... (unchanged code) */}

                <ChallengeCard />

                {/* Compact stat pills */}
                {/* ... (unchanged code) */}
            </div>
            {/* Fixed bottom buttons */}
            <div className="fixed bottom-0 left-0 w-full flex justify-between px-6 py-4">
                <MoodCheckIn
                    selectedMood={selectedMood}
                    onMoodSelected={handleMoodSelected}
                />
                <IntentionPrompt />
            </div>
        </ScreenContainer>
    );
};

export default HomeScreen;
