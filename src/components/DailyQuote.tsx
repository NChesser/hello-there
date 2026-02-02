import { DAILY_QUOTES } from "../data/quotes";

// Daily Quote Component
const DailyQuote = () => {
    // Select a random quote
    const randomIndex = Math.floor(Math.random() * DAILY_QUOTES.length);
    const dailyQuote = DAILY_QUOTES[randomIndex];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-100">
            <div className="flex gap-4 items-center">
                <span className="text-4xl">🐨</span>
                <p className="flex-1 text-amber-900 leading-relaxed mb-0">
                    {dailyQuote}
                </p>
            </div>
        </div>
    );
};

export default DailyQuote;
