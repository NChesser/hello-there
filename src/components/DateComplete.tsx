import { useUserProgress } from "../store/store";

const DateComplete = () => {
    const userProgress = useUserProgress();
    const last7Days = getLast7Days(userProgress.logs);

    return (
        <div className="rounded-2xl p-4 shadow-sm border bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-sm font-medium mb-2 text-amber-800 dark:text-amber-300">
                Completion Streak
            </h3>
            <div className="border mb-4 border-amber-100 dark:border-gray-700" />
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
                                    : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                            }`}
                        >
                            {day.completed ? "✓" : "○"}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
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
