import { useCallback, useEffect, useState } from "react";
import { ACHIEVEMENTS } from "../data/achievements";
import { onAchievementUnlocked } from "../store/store";

const AchievementToast = () => {
    const [queue, setQueue] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        onAchievementUnlocked((ids) => {
            setQueue((prev) => [...prev, ...ids]);
        });
    }, []);

    // Show the next achievement in queue using a callback triggered by queue changes
    const showNext = useCallback(() => {
        if (queue.length === 0 || visible) return;
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            // After fade-out, remove from queue
            setTimeout(() => setQueue((prev) => prev.slice(1)), 300);
        }, 3000);
        return timer;
    }, [queue.length, visible]);

    // Trigger via setTimeout to avoid synchronous setState in effect
    useEffect(() => {
        const id = setTimeout(() => {
            showNext();
        }, 0);
        return () => clearTimeout(id);
    }, [showNext]);

    if (queue.length === 0) return null;

    const achievement = ACHIEVEMENTS.find((a) => a.id === queue[0]);
    if (!achievement) return null;

    return (
        <div
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
            <div
                className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg border-2 bg-white border-amber-300 dark:bg-gray-800 dark:border-amber-600"
            >
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                    <p
                        className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400"
                    >
                        Achievement Unlocked!
                    </p>
                    <p
                        className="text-sm font-bold text-gray-900 dark:text-gray-100"
                    >
                        {achievement.title}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AchievementToast;
