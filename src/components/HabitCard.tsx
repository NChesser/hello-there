import { CheckCircle } from "lucide-react";
import type { Habit } from "../types/types";

interface HabitCardProps {
    habit: Habit;
    isCompleted: boolean;
    onComplete: () => void;
    onClick: () => void;
}

const HabitCard = ({ habit, isCompleted, onComplete, onClick }: HabitCardProps) => {
    const color = isCompleted ? "text-green-600" : "text-amber-600";
    const bgColor = isCompleted
        ? "bg-green-50 border-green-200"
        : "bg-white border-amber-200";

    return (
        <div
            onClick={onClick}
            className={`rounded-lg border-2 ${bgColor} transition-all hover:shadow-md cursor-pointer p-4`}
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
                    className={`${color} ${isCompleted ? "fill-current" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onComplete();
                    }}
                />
            </div>
        </div>
    );
};

export default HabitCard;
