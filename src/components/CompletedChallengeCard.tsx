import React from "react";

// Types
import type { CompletedChallenge } from "../types/types";
import Typography from "./Typography";

const CompletedChallengeCard = ({ challenge }: { challenge: CompletedChallenge }) => {
    return (
        <div className="border rounded-lg p-4 mb-4 border-amber-200 bg-amber-50 dark:border-gray-700 dark:bg-gray-800">
            <Typography as="h3" variant="subtitle" tone="primary-soft" className="mb-2">
                {challenge.title}
            </Typography>
            <Typography variant="body-sm" tone="accent" className="mb-2">
                {challenge.description}
            </Typography>
            <Typography variant="body-sm" tone="accent-soft">
                Completed on: {new Date(challenge.completedAt).toLocaleDateString()}
            </Typography>
        </div>
    );
};

export default CompletedChallengeCard;