import { ArrowLeft, CheckCircle, Info } from "lucide-react";
import ScreenContainer from "../components/ScreenContainer";
import type { Practice } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface PracticeDetailScreenProps {
    practice: Practice;
    isCompleted: boolean;
    onComplete: () => void;
    onBack: () => void;
}

const PracticeDetailScreen = ({
    practice,
    isCompleted,
    onComplete,
    onBack,
}: PracticeDetailScreenProps) => {
    const { isDark } = useTheme();
    const color = isCompleted
        ? "text-green-600"
        : isDark ? "text-amber-400" : "text-amber-600";
    const bgColor = isCompleted
        ? isDark ? "bg-green-900/20 border-green-700" : "bg-green-50 border-green-200"
        : isDark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200";

    const Icon = practice.icon;

    return (
        <ScreenContainer>
            {/* Practice Card */}
            <div className={`rounded-lg border-2 ${bgColor} p-6 mb-6`}>
                <div className="flex items-center gap-4 mb-2">
                    <Icon size={20} className={color} aria-hidden="true" />
                    <h2 className={`text-xl font-semibold ${color}`}>{practice.title}</h2>
                </div>
                <div className={`border mb-4 ${isDark ? 'border-gray-600' : 'border-amber-100'}`} />
                <div className="mb-4 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Info size={16} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                        <h3 className={`font-semibold text-sm ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                            Helpful Information:
                        </h3>
                    </div>
                    <p className={`ml-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{practice.description}</p>
                </div>

                <div className="mb-4">
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Category:{" "}
                        <span className="font-medium capitalize">
                            {practice.category}
                        </span>
                    </p>
                </div>

                {/* Completion Button */}
                <button
                    onClick={onComplete}
                    disabled={isCompleted}
                    className={`flex items-center justify-center gap-2 w-full p-4 rounded-lg transition-all active:scale-[0.98] ${
                        isCompleted
                            ? isDark
                                ? "bg-green-900/30 text-green-400 cursor-not-allowed"
                                : "bg-green-100 text-green-700 cursor-not-allowed"
                            : "bg-amber-500 hover:bg-amber-600 text-amber-50"
                    }`}
                    aria-label={isCompleted ? "Already completed today" : "Mark practice as complete"}
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

export default PracticeDetailScreen;
