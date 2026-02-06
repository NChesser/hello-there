// Screens
import ScreenContainer from "../components/ScreenContainer";

// Components
import DailyQuote from "../components/DailyQuote";
// import XPDisplay from "../components/XPDisplay";
import ChallengeCard from "../components/ChallengeCard";



const HomeScreen = () => {
    return (
        <ScreenContainer>
            <div className="space-y-6">
                {/* Daily Quote */}
                <DailyQuote />

                {/* Today's Quest Card */}
                <ChallengeCard />

                {/* Completed Challenges */}
                <div className="text-center text-sm mt-8 text-amber-500">
                    {(() => {
                        const key = "completedChallengesToday";
                        const count = parseInt(localStorage.getItem(key) || "0", 10) || 0;
                        return (
                            <div className="flex items-center justify-center space-x-4">
                                <div>
                                    <p className="text-sm text-amber-500">Completed Today</p>
                                    <p className="text-2xl font-bold text-amber-500">{count}</p>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </ScreenContainer>
    );
};

export default HomeScreen;
