import React from 'react';

// Types
import { Challenge } from '../types';


const CompletedChallengeCard = ({ challenge }: { challenge: Challenge }) => {
    return (
        <div className="border border-amber-200 rounded-lg p-4 mb-4 bg-amber-50">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">{challenge.title}</h3>
            <p className="text-sm text-amber-700 mb-2">{challenge.description}</p>
            <div className="text-sm text-amber-600">Completed on: {new Date(challenge.completedAt).toLocaleDateString()}</div>
        </div>
    );
};

export default CompletedChallengeCard;