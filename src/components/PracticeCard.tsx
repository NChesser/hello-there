import { Flame } from "lucide-react";
import { useMemo, useRef } from "react";
import type { Practice } from "../types/types";
import { useUserPracticeLogs } from "../store/store";
import Typography from "./Typography";

interface PracticeCardProps {
    practice: Practice;
    isCompleted: boolean;
    onComplete: () => void;
    onClick: () => void;
}

const PracticeCard = ({
    practice,
    isCompleted,
    onComplete,
    onClick,
}: PracticeCardProps) => {
    const holdTimerRef = useRef < ReturnType < typeof setTimeout > | null > (null);
    const didHoldRef = useRef(false);
    const practiceLogs = useUserPracticeLogs();

    const streak = useMemo(() => {
        const dates = practiceLogs
            .filter((log) => log.practiceId === practice.id)
            .map((log) => log.date);

        const dateSet = new Set(dates);
        if (dateSet.size === 0) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split("T")[0];

        const checkDate = new Date(today);

        // If today isn't logged yet, start from yesterday
        if (!dateSet.has(todayStr)) {
            checkDate.setDate(checkDate.getDate() - 1);
            const yesterdayStr = checkDate.toISOString().split("T")[0];
            if (!dateSet.has(yesterdayStr)) return 0;
        }

        let count = 0;
        while (true) {
            const dateStr = checkDate.toISOString().split("T")[0];
            if (dateSet.has(dateStr)) {
                count++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }

        return count;
    }, [practiceLogs, practice.id]);


    console.log("🚀 ~ PracticeCard ~ streak:", streak)
    const color = isCompleted
        ? "text-green-600"
        : "text-amber-600 dark:text-amber-400";
    const bgColor = isCompleted
        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700"
        : "bg-white border-amber-200 dark:bg-gray-800 dark:border-gray-700";
    const Icon = practice.icon;
    const holdDurationMs = 250;

    const clearHoldTimer = () => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
    };

    const handlePointerDown = () => {
        didHoldRef.current = false;
        clearHoldTimer();
        holdTimerRef.current = setTimeout(() => {
            didHoldRef.current = true;
            onComplete();
        }, holdDurationMs);
    };

    const handlePointerUp = () => {
        clearHoldTimer();
    };

    const handleClick = () => {
        if (didHoldRef.current) {
            didHoldRef.current = false;
            return;
        }
        onClick();
    };

    return (
        <div
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`aspect-square rounded-lg border-2 ${bgColor} transition-all hover:shadow-md cursor-pointer p-3 active:scale-[0.98] flex flex-col justify-between`}
            role="button"
            aria-label={`${practice.title} - ${isCompleted ? "completed" : "not completed"}`}
        >
            {streak >= 0 && (
                <div className="flex items-center justify-end gap-0.5 text-orange-500 dark:text-orange-400">
                    <Flame size={12} />
                    <Typography as="span" variant="micro" className="font-bold">
                        {streak}
                    </Typography>
                </div>
            )}
            <div className="flex flex-col items-center justify-center text-center gap-2 flex-1">
                <Icon size={24} className={color} aria-hidden="true" />
                <Typography
                    as="h3"
                    variant="caption"
                    className={`font-semibold ${color} line-clamp-2`}
                >
                    {practice.title}
                </Typography>
            </div>

        </div>
    );
};

export default PracticeCard;
