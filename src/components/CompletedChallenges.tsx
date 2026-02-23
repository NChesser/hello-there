import { useMemo, useState } from "react";
import { useUserProgress } from "../store/store";
import { CHALLENGES } from "../data/challenges";
import Typography from "./Typography";

const CompletedChallenges = () => {
    const userProgress = useUserProgress();
    const [searchTerm, setSearchTerm] = useState("");

    // Get completed challenge logs (most recent first)
    const completedLogs = useMemo(() => {
        return (userProgress.logs || [])
            .filter((log) => log.completed)
            .sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            );
    }, [userProgress.logs]);

    const filteredLogs = useMemo(() => {
        const normalizedTerm = searchTerm.trim().toLowerCase();
        if (!normalizedTerm) {
            return completedLogs;
        }

        return completedLogs.filter((log) => {
            const challenge = CHALLENGES.find((c) => c.id === log.challengeId);
            const challengeTitle = challenge?.title || `Challenge ${log.challengeId}`;
            const noteText = log.note || "";
            const haystack = `${challengeTitle} ${noteText}`.toLowerCase();
            return haystack.includes(normalizedTerm);
        });
    }, [completedLogs, searchTerm]);

    const dates = [
        ...new Set(
            filteredLogs.map((log) => new Date(log.date).toLocaleDateString()),
        ),
    ];

    return (
        <div>
            <div className="rounded-2xl p-4 shadow-sm border mt-4 h-70 overflow-y-auto bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
                <Typography as="h3" variant="label" tone="primary-soft" className="mb-2">
                    Completed Challenges
                </Typography>
                <div className="border mb-4 border-amber-100 dark:border-gray-700" />
                <div className="mb-3">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search completed challenges"
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300/60 bg-white border-amber-200 text-amber-900 placeholder:text-amber-500 dark:bg-gray-900 dark:border-gray-700 dark:text-amber-100 dark:placeholder:text-amber-500/70"
                        aria-label="Search completed challenges"
                    />
                </div>
                <div>
                    {completedLogs.length === 0 ? (
                        <Typography
                            variant="body-sm"
                            tone="accent"
                            className="text-center py-4"
                        >
                            No completed challenges yet. Start your journey!
                        </Typography>
                    ) : filteredLogs.length === 0 ? (
                        <Typography
                            variant="body-sm"
                            tone="accent"
                            className="text-center py-4"
                        >
                            No matches. Try a different search.
                        </Typography>
                    ) : (
                        dates.map((date) => (
                            <div key={date} className="mb-6">
                                <Typography
                                    variant="caption"
                                    tone="accent-soft"
                                    className="mt-2 mb-2"
                                >
                                    Completed on {date}
                                </Typography>
                                <>
                                    {filteredLogs
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
                                                    className="mb-4 p-3 rounded-lg border bg-amber-50 border-amber-200 dark:bg-gray-700/50 dark:border-gray-600"
                                                >
                                                    <div className="flex items-center justify-between ">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-green-600 text-lg">
                                                                ✓
                                                            </span>
                                                            <Typography
                                                                as="span"
                                                                variant="label"
                                                                tone="primary-soft"
                                                            >
                                                                {challengeTitle}
                                                            </Typography>
                                                        </div>
                                                        <Typography
                                                            as="span"
                                                            variant="caption"
                                                            tone="accent"
                                                        >
                                                            +{log.xpEarned} XP
                                                        </Typography>
                                                    </div>
                                                    {/* Optional note below the date */}
                                                    {log.note && (
                                                        <Typography
                                                            variant="caption"
                                                            tone="warm"
                                                            className="mt-1 italic"
                                                        >
                                                            •{" "}
                                                            {log.note.substring(
                                                                0,
                                                                80,
                                                            )}
                                                            {log.note.length >
                                                            80
                                                                ? "..."
                                                                : ""}
                                                        </Typography>
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
