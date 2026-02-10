import { useState } from "react";

// Screens
import ScreenContainer from "../components/ScreenContainer";

// Components
import DailyQuote from "../components/DailyQuote";
import XPProgressBar from "../components/XPProgressBar";
import WeeklyInsights from "../components/WeeklyInsights";
import ChallengeCard from "../components/ChallengeCard";
import MoodCheckIn from "../components/MoodCheckIn";
import Tooltip from "../components/Tooltip";
import type { Mood } from "../components/MoodCheckIn";

// Store
import { useUserProgress } from "../store/store";

const HomeScreen = () => {
    const userProgress = useUserProgress();
    const [mood, setMood] = useState<Mood | null>(null);

    return (
        <ScreenContainer>
            <div className="space-y-6">
                {/* Mood Check-in */}
                {/* <MoodCheckIn onMoodSelected={setMood} selectedMood={mood} /> */}

                {/* Daily Quote */}
                <DailyQuote />

                {/* Today's Quest Card */}
                {mood !== 'overwhelmed' ? (
                    <Tooltip id="challenge-card" text="This is your daily challenge! Skip it anytime or tap to start.">
                        <ChallengeCard />
                    </Tooltip>
                ) : (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800 text-center">
                        <p className="text-4xl mb-3">🫂</p>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            Take it easy today. Your challenge will be here when you're ready.
                        </p>
                    </div>
                )}

                {/* XP Progress Bar */}
                <Tooltip id="xp-bar" text="This shows your progress to the next level. Complete challenges to earn XP!">
                    <XPProgressBar currentXP={userProgress.xp} level={userProgress.level} />
                </Tooltip>
                
                {/* Weekly Insights */}
                <WeeklyInsights userProgress={userProgress} />
            </div>
        </ScreenContainer>
    );
};

export default HomeScreen;
