import { useUserProgress } from "../store/store";
import { CHALLENGES } from "../data/challenges";

const CompletedChallenges = () => {
    const userProgress = useUserProgress();
    console.log("🚀 ~ CompletedChallenges ~ userProgress:", userProgress);

    // Get completed challenge logs (most recent first)
    const completedLogs = (userProgress.logs || [])
        .filter((log) => log.completed)
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

    const dates = [
        ...new Set(
            completedLogs.map((log) => new Date(log.date).toLocaleDateString()),
        ),
    ];

    return (
        <div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 mt-4 h-70 overflow-y-auto">
                <h3 className="text-sm font-medium text-amber-800 mb-2">
                    Completed Challenges
                </h3>
                <div className="border border-amber-100 mb-4" />
                <div>
                    {completedLogs.length === 0 ? (
                        <p className="text-sm text-amber-600 text-center py-4">
                            No completed challenges yet. Start your journey!
                        </p>
                    ) : (
                        dates.map((date) => (
                            <div key={date} className="mb-6">
                                <div className="text-xs text-amber-500 mt-2 mb-2">
                                    Completed on {date}
                                </div>
                                <>
                                    {completedLogs
                                        .filter(
                                            (log) =>
                                                new Date(
                                                    log.date,
                                                ).toLocaleDateString() === date,
                                        )
                                        .map((log, index) => {
                                            const challenge = CHALLENGES.find(
                                                (c) => c.id === log.challengeId,
                                            );
                                            const challengeTitle =
                                                challenge?.title ||
                                                `Challenge ${log.challengeId}`;
                                            const date = new Date(
                                                log.date,
                                            ).toLocaleDateString();

                                            return (
                                                <div
                                                    key={`${log.challengeId}-${log.date}-${index}`}
                                                    className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200"
                                                >
                                                    <div className="flex items-center justify-between ">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-green-600 text-lg">
                                                                ✓
                                                            </span>
                                                            <span className="text-sm font-medium text-amber-900">
                                                                {challengeTitle}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-amber-600">
                                                            +{log.xpEarned} XP
                                                        </span>
                                                    </div>
                                                    {/* Optional note below the date */}
                                                    {log.note && (
                                                        <div className="text-xs text-amber-700 mt-1 italic">
                                                            •{" "}
                                                            {log.note.substring(
                                                                0,
                                                                80,
                                                            )}
                                                            {log.note.length >
                                                            80
                                                                ? "..."
                                                                : ""}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                </>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompletedChallenges;
