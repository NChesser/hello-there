import React from 'react';

// Components
import DailyQuote from '../components/DailyQuote';

// Icons
import ChallengeCard from '../components/ChallengeCard';
import { XPDisplay } from '../components/Header';


const MainScreen = ({ todayChallenge }) => {



    return (
        <div className="p-6 pb-24 h-full overflow-y-auto space-y-6">
            <div className="space-y-6">
                <DailyQuote />

                {/* Today's Quest Card */}
                {todayChallenge && (
                    <ChallengeCard challenge={todayChallenge} />
                )}

                {/* XP Display */}
                <XPDisplay />
            </div>
        </div>
    );
}

export default MainScreen;