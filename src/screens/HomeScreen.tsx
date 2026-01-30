// Screens
import ScreenContainer from "../components/ScreenContainer";

// Components
import DailyQuote from "../components/DailyQuote";
import XPDisplay from "../components/XPDisplay";
import ChallengeCard from "../components/ChallengeCard";
import { ProgressSummaryCard } from "./JourneyScreen";


const HomeScreen = ({ todayChallenge }: { todayChallenge: any }) => {
    const userProgress = {
        level: 5,
        totalXp: 1200,
        completedChallenges: Array(34).fill(null),
        logs: Array(50).fill(null),
    };

    return (
        <ScreenContainer>
            <div className="space-y-6">

                {/* Today's Quest Card */}
                {todayChallenge && <ChallengeCard challenge={todayChallenge} />}

                <DailyQuote />

                {/* XP Display */}
                <XPDisplay />

                <ProgressSummaryCard userProgress={userProgress} />
            </div>
        </ScreenContainer>
    );
};

export default HomeScreen;
