import { ArrowLeft, CheckCircle, Info } from "lucide-react";
import ScreenContainer from "../components/ScreenContainer";
import type { Habit } from "../types/types";

interface HabitDetailScreenProps {
    habit: Habit;
    isCompleted: boolean;
    onComplete: () => void;
    onBack: () => void;
}

const HabitDetailScreen = ({
    habit,
    isCompleted,
    onComplete,
    onBack,
}: HabitDetailScreenProps) => {
    console.log("🚀 ~ HabitDetailScreen ~ onComplete:", onComplete)
    const color = isCompleted ? "text-green-600" : "text-amber-600";
    const bgColor = isCompleted
        ? "bg-green-50 border-green-200"
        : "bg-white border-amber-200";

    return (
        <ScreenContainer>
            {/* Header with Back Button */}
            <div className="mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-4 transition-all"
                >
                    <ArrowLeft size={20} />
                    Back to Habits
                </button>
            </div>

            {/* Habit Card */}
            <div className={`rounded-lg border-2 ${bgColor} p-6 mb-6`}>
                <div className="flex items-center gap-4 mb-2">
                    <span className="text-xl">{habit.icon}</span>
                    <h2 className={`text-xl font-semibold ${color}`}>{habit.title}</h2>
                </div>
                <div className="border border-amber-100 mb-4" />
                <div className="mb-4 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Info size={16} className="text-amber-600" />
                        <h3 className="font-semibold text-sm text-amber-800">
                            Why this matters:
                        </h3>
                    </div>
                    <p className="text-gray-700 ml-6">{habit.description}</p>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Category:{" "}
                        <span className="font-medium capitalize">
                            {habit.category}
                        </span>
                    </p>
                </div>

                {/* Completion Button */}
                <button
                    onClick={onComplete}
                    disabled={isCompleted}
                    className={`flex items-center justify-center gap-2 w-full p-4 rounded-lg transition-all ${
                        isCompleted
                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                            : "bg-amber-500 hover:bg-amber-600 text-amber-50"
                    }`}
                >
                    <CheckCircle
                        size={20}
                        className={isCompleted ? "fill-current" : ""}
                    />
                    <p className="font-medium text-sm">
                        {isCompleted
                            ? "Completed Today!"
                            : "Mark as Complete"}
                    </p>
                </button>
            </div>
        </ScreenContainer>
    );
};

export default HabitDetailScreen;
