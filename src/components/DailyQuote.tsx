import { DAILY_QUOTES } from "../data/quotes";
import Typography from "./Typography";

// Daily Quote Component
const DailyQuote = () => {
    // Select a quote based on the day so it doesn't change on re-render
    const dayIndex = new Date().getDate() % DAILY_QUOTES.length;
    const dailyQuote = DAILY_QUOTES[dayIndex];

    return (
        <div className="rounded-2xl p-6 shadow-sm border-2 bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex gap-4 items-center">
                <div className="w-10 h-10 flex items-center justify-center text-4xl">
                    🐨
                </div>
                <Typography
                    className="flex-1 italic mb-0 text-amber-900 dark:text-gray-200"
                >
                    {dailyQuote}
                </Typography>
            </div>
        </div>
    );
};

export default DailyQuote;
