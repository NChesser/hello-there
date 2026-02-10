import { useUserProgress } from "../store/store";
import { CHALLENGES } from "../data/challenges";
import { useTheme } from "../context/ThemeContext";

const CompletedChallenges = () => {
    const { isDark } = useTheme();
    const userProgress = useUserProgress();

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
            <div className={`rounded-2xl p-4 shadow-sm border mt-4 h-70 overflow-y-auto ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'
            }`}>
                <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                    Completed Challenges
                </h3>
                <div className={`border mb-4 ${isDark ? 'border-gray-700' : 'border-amber-100'}`} />
                <div>
                    {completedLogs.length === 0 ? (
                        <p className={`text-sm text-center py-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                            No completed challenges yet. Start your journey!
                        </p>
                    ) : (
                        dates.map((date) => (
                            <div key={date} className="mb-6">
                                <div className={`text-xs mt-2 mb-2 ${isDark ? 'text-amber-500' : 'text-amber-500'}`}>
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

                                            return (
                                                <div
                                                    key={`${log.challengeId}-${log.date}-${index}`}
                                                    className={`mb-4 p-3 rounded-lg border ${
                                                        isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-amber-50 border-amber-200'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between ">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-green-600 text-lg">
                                                                ✓
                                                            </span>
                                                            <span className={`text-sm font-medium ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                                                                {challengeTitle}
                                                            </span>
                                                        </div>
                                                        <span className={`text-xs ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                                                            +{log.xpEarned} XP
                                                        </span>
                                                    </div>
                                                    {/* Optional note below the date */}
                                                    {log.note && (
                                                        <div className={`text-xs mt-1 italic ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
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
