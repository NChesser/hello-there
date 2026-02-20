import { CheckCircle } from "lucide-react";
import type { Practice } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface PracticeCardProps {
    practice: Practice;
    isCompleted: boolean;
    onComplete: () => void;
    onClick: () => void;
}

const PracticeCard = ({ practice, isCompleted, onComplete, onClick }: PracticeCardProps) => {
    const { isDark } = useTheme();
    const color = isCompleted
        ? "text-green-600"
        : isDark ? "text-amber-400" : "text-amber-600";
    const bgColor = isCompleted
        ? isDark ? "bg-green-900/20 border-green-700" : "bg-green-50 border-green-200"
        : isDark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200";

    const Icon = practice.icon;

    return (
        <div
            onClick={onClick}
            className={`aspect-square rounded-lg border-2 ${bgColor} transition-all hover:shadow-md cursor-pointer p-3 active:scale-[0.98] flex flex-col justify-between`}
            role="button"
            aria-label={`${practice.title} - ${isCompleted ? 'completed' : 'not completed'}`}
        >
            <div className="flex flex-col items-center justify-center text-center gap-2 flex-1">
                <Icon size={24} className={color} aria-hidden="true" />
                <h3 className={`font-semibold text-xs ${color} line-clamp-2`}>
                    {practice.title}
                </h3>
            </div>

            <div className="flex items-center justify-end">
                <CheckCircle
                    size={18}
                    className={`${color} ${isCompleted ? "fill-current" : ""} transition-transform active:scale-125`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onComplete();
                    }}
                    role="button"
                    aria-label={`Mark ${practice.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
                />
            </div>
        </div>
    );
};

export default PracticeCard;
