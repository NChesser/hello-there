// Screens
import ScreenContainer from "../components/ScreenContainer";

// Components
import DailyQuote from "../components/DailyQuote";
import XPDisplay from "../components/XPDisplay";
import ChallengeCard from "../components/ChallengeCard";
import { ProgressSummaryCard } from "./JourneyScreen";


// Icons
import { CircleQuestionMark } from "lucide-react";



const HomeScreen = () => {
    const userProgress = {
        level: 5,
        totalXp: 1200,
        completedChallenges: Array(34).fill(null),
        logs: Array(50).fill(null),
    };

    return (
        <ScreenContainer>
            <div className="space-y-6">
                {/* Daily Quote */}
                <DailyQuote />

                {/* Today's Quest Card */}
                <ChallengeCard />

                {/* <XPDisplay /> */}
                {/* XP Display

                <ProgressSummaryCard userProgress={userProgress} /> */}
{/* 
                <footer className="mt-8 pt-4">
                    <details className="group">
                        <summary className="cursor-pointer text-sm font-medium text-amber-600 hover:underline"><span className="inline-flex items-center"><CircleQuestionMark size={30} className="mr-1" /> Help</span></summary>
                        <div className="mt-2 text-sm text-gray-600">
                            <p>
                                This page displays your daily quote, today's quest card, and (optionally) your XP and progress summary.
                                Use the challenge card to view or start the day's challenge. XP shows your current level and experience,
                                while the progress summary lists completed challenges and recent activity.
                            </p>
                        </div>
                    </details>
                </footer> */}
            </div>
        </ScreenContainer>
    );
};

export default HomeScreen;
