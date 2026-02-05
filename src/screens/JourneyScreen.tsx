// Components
import CompletedChallenges from "../components/CompletedChallenges";
import DateComplete from "../components/DateComplete";
import ScreenContainer from "../components/ScreenContainer";

export const ProgressSummaryCard = ({
    userProgress,
}: {
    userProgress: any;
}) => {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100">
            <h3 className="text-sm font-medium text-amber-800 mb-2">
                Your Journey
            </h3>
            <div className="border border-amber-100 mb-4" />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="text-2xl font-bold text-amber-900">
                        Level {userProgress.level}
                    </div>
                    <div className="text-xs text-amber-600">{userProgress.totalXp} XP</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-amber-900">
                        {userProgress.completedChallenges.length}
                    </div>
                    <div className="text-xs text-amber-600">
                        Challenges Completed
                    </div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-amber-900">
                        {userProgress.logs.length}
                    </div>
                    <div className="text-xs text-amber-600">
                        Completed Habits
                    </div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-amber-900">
                        {userProgress.peopleMet || 0}
                    </div>
                    <div className="text-xs text-amber-600">People Met</div>
                </div>
            </div>
        </div>
    );
};

const JourneyScreen = () => {
    const userProgress = {
        level: 5,
        totalXp: 1200,
        completedChallenges: Array(34).fill(null),
        logs: Array(50).fill(null),
    };

    return (
        <ScreenContainer>
            {/* Day Chart */}
            <DateComplete />

            {/* Progress Summary */}
            <ProgressSummaryCard userProgress={userProgress} />

            {/* Completed Challenges */}
            <CompletedChallenges />

        </ScreenContainer>
    );
};

export default JourneyScreen;
