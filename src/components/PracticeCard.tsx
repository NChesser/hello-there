import { CheckCircle } from "lucide-react";
import { useRef } from "react";
import type { Practice } from "../types/types";
import { useTheme } from "../context/ThemeContext";

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
    const { isDark } = useTheme();
    const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const didHoldRef = useRef(false);
    const color = isCompleted
        ? "text-green-600"
        : isDark
          ? "text-amber-400"
          : "text-amber-600";
    const bgColor = isCompleted
        ? isDark
            ? "bg-green-900/20 border-green-700"
            : "bg-green-50 border-green-200"
        : isDark
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-amber-200";
    const completionButtonClass = isCompleted
        ? isDark
            ? "bg-green-900/30 text-green-400 cursor-not-allowed"
            : "bg-green-100 text-green-700 cursor-not-allowed"
        : "bg-amber-500 hover:bg-amber-600 text-amber-50";

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
            <div className="flex flex-col items-center justify-center text-center gap-2 flex-1">
                <Icon size={24} className={color} aria-hidden="true" />
                <h3 className={`font-semibold text-xs ${color} line-clamp-2`}>
                    {practice.title}
                </h3>
            </div>
        </div>
    );
};

export default PracticeCard;
