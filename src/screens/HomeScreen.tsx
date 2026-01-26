import React from 'react';

// Components
import DailyQuote from '../components/DailyQuote';

// Icons
import ChallengeCard from '../components/ChallengeCard';


const MainScreen = ({ todayChallenge }) => {



    return (
        <div className="p-6 pb-24">
            <div className="space-y-6">
                <DailyQuote />

                {/* Today's Quest Card */}
                {todayChallenge && (
                    <ChallengeCard challenge={todayChallenge} />
                )}
            </div>
        </div>
    );
}

export default MainScreen;