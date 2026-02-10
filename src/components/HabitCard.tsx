import { CheckCircle } from "lucide-react";
import type { Habit } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface HabitCardProps {
    habit: Habit;
    isCompleted: boolean;
    onComplete: () => void;
    onClick: () => void;
}

const HabitCard = ({ habit, isCompleted, onComplete, onClick }: HabitCardProps) => {
    const { isDark } = useTheme();
    const color = isCompleted
        ? "text-green-600"
        : isDark ? "text-amber-400" : "text-amber-600";
    const bgColor = isCompleted
        ? isDark ? "bg-green-900/20 border-green-700" : "bg-green-50 border-green-200"
        : isDark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200";

    return (
        <div
            onClick={onClick}
            className={`rounded-lg border-2 ${bgColor} transition-all hover:shadow-md cursor-pointer p-4 active:scale-[0.98]`}
            role="button"
            aria-label={`${habit.title} - ${isCompleted ? 'completed' : 'not completed'}`}
        >
            <div className="flex items-center justify-between gap-3">
                {/* Habit Info */}
                <div className="flex items-center gap-3">
                    <span className="text-md">{habit.icon}</span>
                    <h3 className={`font-semibold text-sm ${color}`}>
                        {habit.title}
                    </h3>
                </div>

                {/* Completion Icon */}
                <CheckCircle
                    size={20}
                    className={`${color} ${isCompleted ? "fill-current" : ""} transition-transform active:scale-125`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onComplete();
                    }}
                    role="button"
                    aria-label={`Mark ${habit.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
                />
            </div>
        </div>
    );
};

export default HabitCard;
