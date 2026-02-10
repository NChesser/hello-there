// Components
import { X } from "lucide-react";
import CompletedChallenges from "../components/CompletedChallenges";
import DateComplete from "../components/DateComplete";
import ScreenContainer from "../components/ScreenContainer";
import XPDisplay from "../components/XPDisplay";
import { useTheme } from "../context/ThemeContext";

export const ProgressSummaryCard = ({
    userProgress,
}: {
    userProgress: any;
}) => {
    const { isDark } = useTheme();

    return (
        <div className={`rounded-2xl p-4 shadow-sm border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'
        }`}>
            <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                Your Journey
            </h3>
            <div className={`border mb-4 ${isDark ? 'border-gray-700' : 'border-amber-100'}`} />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                        Level {userProgress.level}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                        {userProgress.totalXp} XP
                    </div>
                </div>
                <div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                        {userProgress.completedChallenges.length}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                        Challenges Completed
                    </div>
                </div>
                <div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                        {userProgress.logs.length}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                        Completed Habits
                    </div>
                </div>
                <div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                        {userProgress.peopleMet || 0}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>People Met</div>
                </div>
            </div>
        </div>
    );
};

const JourneyScreen = () => {

    return (
        <ScreenContainer>
            <XPDisplay />

            {/* Day Chart */}
            <DateComplete />

            {/* Progress Summary
            <ProgressSummaryCard userProgress={userProgress} /> */}

            {/* Completed Challenges */}
            <CompletedChallenges />
        </ScreenContainer>
    );
};

export default JourneyScreen;
