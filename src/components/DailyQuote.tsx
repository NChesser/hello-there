import { DAILY_QUOTES } from "../data/quotes";
import { useTheme } from "../context/ThemeContext";

// Daily Quote Component
const DailyQuote = () => {
    const { isDark } = useTheme();
    // Select a quote based on the day so it doesn't change on re-render
    const dayIndex = new Date().getDate() % DAILY_QUOTES.length;
    const dailyQuote = DAILY_QUOTES[dayIndex];

    return (
        <div className={`rounded-2xl p-6 shadow-sm border-2 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'
        }`}>
            <div className="flex gap-4 items-center">
                <span className="text-4xl">🐨</span>
                <p className={`flex-1 leading-relaxed mb-0 ${isDark ? 'text-gray-200' : 'text-amber-900'}`}>
                    {dailyQuote}
                </p>
            </div>
        </div>
    );
};

export default DailyQuote;
