import React from 'react';

// Types
import type { CompletedChallenge } from '../types/types';
import { useTheme } from '../context/ThemeContext';


const CompletedChallengeCard = ({ challenge }: { challenge: CompletedChallenge }) => {
    const { isDark } = useTheme();

    return (
        <div className={`border rounded-lg p-4 mb-4 ${
            isDark ? 'border-gray-700 bg-gray-800' : 'border-amber-200 bg-amber-50'
        }`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>{challenge.title}</h3>
            <p className={`text-sm mb-2 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>{challenge.description}</p>
            <div className={`text-sm ${isDark ? 'text-amber-500' : 'text-amber-600'}`}>Completed on: {new Date(challenge.completedAt).toLocaleDateString()}</div>
        </div>
    );
};

export default CompletedChallengeCard;