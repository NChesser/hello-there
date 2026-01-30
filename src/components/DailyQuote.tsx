import { DAILY_QUOTES } from '../data/quotes';

// Daily Quote Component
const DailyQuote = () => {
    // Select a random quote
    const randomIndex = Math.floor(Math.random() * DAILY_QUOTES.length);
    const dailyQuote = DAILY_QUOTES[randomIndex];

    {/* Koala Message */ }
    return (
        < div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-100" >
            <div className="flex gap-4">
                <div className="text-4xl">🐨</div>
                <div className="flex-1">
                    <p className="text-amber-900 leading-relaxed">
                        {dailyQuote}
                    </p>
                </div>
            </div>
        </div >
    );
};

export default DailyQuote;