const DateComplete = () => {

    const last7Days = getLast7Days();

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 mb-4 ">
            <h3 className="text-sm font-medium text-amber-800 mb-2">
                Completion Streak
            </h3>
            <div className="border border-amber-100 mb-4" />
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
                                    : "bg-gray-100 text-gray-400"
                            }`}
                        >
                            {day.completed ? "✓" : "○"}
                        </div>
                        <span className="text-xs text-gray-600">
                            {day.dayName}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DateComplete;

const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push({
            date,
            dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
            completed: Math.random() > 0.3, // 70% completion rate
        });
    }
    return days;
};
