// Store
import { useScreenStore } from "../store/store";
import { useTheme } from "../context/ThemeContext";

// Components
import ScreenContainer from "../components/ScreenContainer";

const ChallengeScreen = ({ todayChallenge }: { todayChallenge: any }) => {
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );
    const { isDark } = useTheme();

    const handleAttempt = (status: "complete") => {
        setSelectedScreen("reflect");
    };

    return (
        <ScreenContainer>
            <div className={`rounded-2xl p-6 shadow-sm border-2 ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'
            }`}>
                <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-amber-900'}`}>
                    {todayChallenge.title}
                </h2>
                <div className={`border mb-4 ${isDark ? 'border-gray-700' : 'border-amber-100'}`} />

                <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-amber-700'}`}>
                    {todayChallenge.description}
                </p>

                {todayChallenge.exampleScript && (
                    <div className={`rounded-lg p-4 mb-6 border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-amber-50 border-amber-200'}`}>
                        <div>
                            <p className={`text-xs mb-2 font-medium ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                                You could say:
                            </p>
                            {Array.isArray(todayChallenge.exampleScript)
                                ? todayChallenge.exampleScript.map(
                                      (ex: string, i: number) => (
                                          <p
                                              key={i}
                                              className="text-sm text-amber-700 italic mb-1"
                                          >
                                              {ex}
                                          </p>
                                      ),
                                  )
                                : todayChallenge.exampleScript
                                      .split(/\r?\n|\|/)
                                      .map((ex: string) => ex.trim())
                                      .filter(Boolean)
                                      .map((ex: string, i: number) => (
                                          <p
                                              key={i}
                                              className={`text-sm italic mb-1 ${isDark ? 'text-gray-300' : 'text-amber-700'}`}
                                          >
                                              "{ex}"
                                          </p>
                                      ))}
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => handleAttempt("complete")}
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-white py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all active:scale-95"
                        aria-label="Mark challenge as completed"
                    >
                        I Did It!
                    </button>

                    <button
                        onClick={() => setSelectedScreen("home")}
                        className={`w-full py-2 text-sm ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-amber-600 hover:text-amber-700'}`}
                    >
                        Not ready yet
                    </button>
                </div>
            </div>
            <div className={`rounded-lg p-3 mt-4 border-2 ${isDark ? 'border-gray-700' : 'border-amber-100'}`}>
                <div className="flex flex-col space-y-1">
                    <div>
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-amber-800'}`}>
                            Category:
                        </span>{" "}
                        <span className={isDark ? 'text-gray-400' : 'text-amber-600'}>
                            {todayChallenge.category ?? "General"}
                        </span>
                    </div>
                    <div>
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-amber-800'}`}>
                            Discomfort Level:
                        </span>{" "}
                        <span className={isDark ? 'text-gray-400' : 'text-amber-600'}>
                            {todayChallenge.discomfortRating ?? "Unknown"}/5
                        </span>
                    </div>
                    <div>
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-amber-800'}`}>
                            XP Reward:
                        </span>{" "}
                        <span className="text-emerald-500 font-semibold">
                            {todayChallenge.xpReward ?? 0} XP
                        </span>
                    </div>
                </div>
            </div>
            <div className={`rounded-lg p-4 mb-6 border-2 ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
                <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                    {todayChallenge?.remember
                        ? `💙 ${todayChallenge.remember}`
                        : `💙 Remember: You can stop anytime while working on ${todayChallenge?.title ?? "this challenge"}. Showing up is what matters.`}
                </p>
            </div>
        </ScreenContainer>
    );
};

export default ChallengeScreen;
