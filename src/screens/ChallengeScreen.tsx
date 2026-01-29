// Store
import { useScreenStore } from "../store/store";

// Components
import ScreenContainer from "../components/ScreenContainer";

const ChallengeScreen = ({ todayChallenge }: { todayChallenge: any }) => {
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );

    const handleAttempt = (status: "complete") => {
        setSelectedScreen("reflect");
    };

    return (
        <ScreenContainer>
            <button
                onClick={() => setSelectedScreen("home")}
                className="text-amber-600 text-sm hover:text-amber-700"
            >
                ← Back
            </button>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-100">
                <h2 className="text-xl font-semibold text-amber-900 mb-4">
                    {todayChallenge.title}
                </h2>

                <p className="text-amber-700 mb-6 leading-relaxed">
                    {todayChallenge.description}
                </p>

                {todayChallenge.exampleScript && (
                    <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
                        <p className="text-xs text-amber-600 mb-2 font-medium">
                            You could say:
                        </p>
                        <p className="text-sm text-amber-700 italic">
                            "{todayChallenge.exampleScript}"
                        </p>
                    </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                    <p className="text-sm text-blue-800">
                        💙 Remember: You can stop anytime. Showing up is what
                        matters.
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={() => handleAttempt("complete")}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-white py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
                >
                    I Did It! 🎉
                </button>

                <button
                    onClick={() => setSelectedScreen("home")}
                    className="w-full text-amber-600 py-2 text-sm hover:text-amber-700"
                >
                    Not ready yet
                </button>
            </div>
        </ScreenContainer>
    );
};

export default ChallengeScreen;
