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
            {/* <button
                onClick={() => setSelectedScreen("home")}
                className="text-amber-600 text-sm hover:text-amber-700"
            >
                ← Back
            </button> */}

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-100">
                <h2 className="text-xl font-semibold text-amber-900 mb-2">
                    {todayChallenge.title}
                </h2>
                <div className="border border-amber-100 mb-4" />

                <p className="text-amber-700 mb-6 leading-relaxed">
                    {todayChallenge.description}
                </p>

                {todayChallenge.exampleScript && (
                    <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
                        <div>
                            <p className="text-xs text-amber-600 mb-2 font-medium">
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
                                              className="text-sm text-amber-700 italic mb-1"
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
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-white py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
                    >
                        I Did It!
                    </button>

                    <button
                        onClick={() => setSelectedScreen("home")}
                        className="w-full text-amber-600 py-2 text-sm hover:text-amber-700"
                    >
                        Not ready yet
                    </button>
                </div>
            </div>
            <div className="rounded-lg p-3 mt-4 border-2 border-amber-100">
                <div className="flex flex-col space-y-1">
                    <div>
                        <span className="font-medium text-amber-800">
                            Category:
                        </span>{" "}
                        <span className="text-amber-600">
                            {todayChallenge.category ?? "General"}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-amber-800">
                            Discomfort Level:
                        </span>{" "}
                        <span className="text-amber-600">
                            {todayChallenge.discomfort ?? "Unknown"}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-amber-800">
                            XP Reward:
                        </span>{" "}
                        <span className="text-emerald-500 font-semibold">
                            {todayChallenge.xp ?? 0} XP
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border-2 border-blue-200">
                <p className="text-sm text-blue-800">
                    {todayChallenge?.remember
                        ? `💙 ${todayChallenge.remember}`
                        : `💙 Remember: You can stop anytime while working on ${todayChallenge?.title ?? "this challenge"}. Showing up is what matters.`}
                </p>
            </div>
        </ScreenContainer>
    );
};

export default ChallengeScreen;
