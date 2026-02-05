import { useUserProgress } from "../store/store";



const CompletedChallenges = () => {

    const userProgress = useUserProgress();
    console.log("🚀 ~ CompletedChallenges ~ userProgress:", userProgress)

    return (
        <div>
            {/* List of completed challenges would go here */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 mt-4 h-70 overflow-y-auto">
                <h3 className="text-sm font-medium text-amber-800 mb-2">
                    Completed Challenges
                </h3>
                <div className="border border-amber-100 mb-4" />
                <div className="space-y-2">
                    {userProgress.habitLogs.map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg"
                        >
                            <span className="text-amber-600">✓</span>
                            <span className="text-sm text-amber-900">
                                Challenge {index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompletedChallenges;
