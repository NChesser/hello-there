// Components
import DailyQuote from "../components/DailyQuote";

// Icons
import ChallengeCard from "../components/ChallengeCard";
import { XPDisplay } from "../components/Header";
import { ProgressSummaryCard } from "./JourneyScreen";
import ScreenContainer from "../components/ScreenContainer";

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
                <DailyQuote />

                {/* Today's Quest Card */}
                {todayChallenge && <ChallengeCard challenge={todayChallenge} />}

                {/* XP Display */}
                <XPDisplay />

                <ProgressSummaryCard userProgress={userProgress} />
            </div>
        </ScreenContainer>
    );
};

export default HomeScreen;
