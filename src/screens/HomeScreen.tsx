// Components
import ScreenContainer from "../components/ScreenContainer";
import ChallengeCard from "../components/ChallengeCard";
import DailyQuote from "../components/DailyQuote";

// Store
import { useUserProgress } from "../store/store";

// Context
import { useTheme } from "../context/ThemeContext";



const HomeScreen = () => {
    const userProgress = useUserProgress();
    const { isDark } = useTheme();

    const completedToday = userProgress.logs.filter(
        (l) => l.completed && new Date(l.date).toDateString() === new Date().toDateString()
    ).length;


    return (
        <ScreenContainer>
            <div className="space-y-5">
                <DailyQuote />

                {/* The hero — today's challenge */}
                <ChallengeCard />

                {/* Compact stat pills */}
                <div className="flex gap-2">
                    <div className={`flex-1 rounded-xl px-4 py-3 text-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-amber-100 shadow-sm'}`}>
                        <p className={`text-lg font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                            {userProgress.level}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-amber-600'}`}>Level</p>
                    </div>
                    <div className={`flex-1 rounded-xl px-4 py-3 text-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-amber-100 shadow-sm'}`}>
                        <p className={`text-lg font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                            {userProgress.completedChallenges.length}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-amber-600'}`}>Completed</p>
                    </div>
                    <div className={`flex-1 rounded-xl px-4 py-3 text-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-amber-100 shadow-sm'}`}>
                        <p className={`text-lg font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                            {completedToday}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-amber-600'}`}>Today</p>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    );
};

export default HomeScreen;
