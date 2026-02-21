import React from 'react';

// Types
import type { CompletedChallenge } from '../types/types';


const CompletedChallengeCard = ({ challenge }: { challenge: CompletedChallenge }) => {
    return (
        <div className="border rounded-lg p-4 mb-4 border-amber-200 bg-amber-50 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-amber-800 dark:text-amber-200">{challenge.title}</h3>
            <p className="text-sm mb-2 text-amber-700 dark:text-amber-400">{challenge.description}</p>
            <div className="text-sm text-amber-600 dark:text-amber-500">Completed on: {new Date(challenge.completedAt).toLocaleDateString()}</div>
        </div>
    );
};

export default CompletedChallengeCard;