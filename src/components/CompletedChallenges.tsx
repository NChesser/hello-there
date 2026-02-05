import { useUserProgress } from "../store/store";
import { CHALLENGES } from "../data/challenges";

const CompletedChallenges = () => {
    const userProgress = useUserProgress();
    console.log("🚀 ~ CompletedChallenges ~ userProgress:", userProgress);

    // Get completed challenge logs (most recent first)
    const completedLogs = (userProgress.logs || [])
        .filter(log => log.completed)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div>
            {/* List of completed challenges would go here */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 mt-4 h-70 overflow-y-auto">
                <h3 className="text-sm font-medium text-amber-800 mb-2">
                    Completed Challenges
                </h3>
                <div className="border border-amber-100 mb-4" />
                <div className="space-y-2">
                    {completedLogs.length === 0 ? (
                        <p className="text-sm text-amber-600 text-center py-4">
                            No completed challenges yet. Start your journey!
                        </p>
                    ) : (
                        completedLogs.map((log, index) => {
                            const challenge = CHALLENGES.find(c => c.id === log.challengeId);
                            const challengeTitle = challenge?.title || `Challenge ${log.challengeId}`;
                            const date = new Date(log.date).toLocaleDateString();
                            
                            return (
                                <div
                                    key={`${log.challengeId}-${log.date}-${index}`}
                                    className="flex flex-col gap-1 p-3 bg-amber-50 rounded-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600 text-lg">✓</span>
                                            <span className="text-sm font-medium text-amber-900">
                                                {challengeTitle}
                                            </span>
                                        </div>
                                        <span className="text-xs text-amber-600">
                                            +{log.xpEarned} XP
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6 text-xs text-amber-700">
                                        <span>{date}</span>
                                        {log.note && (
                                            <span className="italic">• {log.note.substring(0, 40)}{log.note.length > 40 ? '...' : ''}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompletedChallenges;
