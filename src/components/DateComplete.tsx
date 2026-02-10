import { useUserProgress } from "../store/store";
import { useTheme } from "../context/ThemeContext";

const DateComplete = () => {
    const { isDark } = useTheme();
    const userProgress = useUserProgress();
    const last7Days = getLast7Days(userProgress.logs);

    return (
        <div className={`rounded-2xl p-4 shadow-sm border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'
        }`}>
            <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                Completion Streak
            </h3>
            <div className={`border mb-4 ${isDark ? 'border-gray-700' : 'border-amber-100'}`} />
            <div className="flex gap-2 justify-between">
                {last7Days.map((day, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-2"
                    >
                        <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors ${
                                day.completed
                                    ? "bg-amber-400 text-amber-900 shadow-sm"
                                    : isDark
                                        ? "bg-gray-700 text-gray-500"
                                        : "bg-gray-100 text-gray-400"
                            }`}
                        >
                            {day.completed ? "✓" : "○"}
                        </div>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {day.dayName}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DateComplete;

const getLast7Days = (logs: any[]) => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toDateString();
        
        // Check if there's a completed challenge on this date
        const completed = logs.some(log => {
            const logDate = new Date(log.date).toDateString();
            return logDate === dateString && log.completed;
        });
        
        days.push({
            date,
            dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
            completed,
        });
    }
    return days;
};
