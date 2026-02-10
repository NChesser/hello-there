import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'cozy-quest-onboarding-seen';
const TOOLTIPS_KEY = 'cozy-quest-tooltips-dismissed';

export const useOnboarding = () => {
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
        try {
            return localStorage.getItem(ONBOARDING_KEY) === 'true';
        } catch {
            return false;
        }
    });

    const completeOnboarding = () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
        setHasSeenOnboarding(true);
    };

    return { hasSeenOnboarding, completeOnboarding };
};

export const useTooltips = () => {
    const [dismissed, setDismissed] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem(TOOLTIPS_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const dismissTooltip = (id: string) => {
        const updated = [...dismissed, id];
        setDismissed(updated);
        localStorage.setItem(TOOLTIPS_KEY, JSON.stringify(updated));
    };

    const isTooltipDismissed = (id: string) => dismissed.includes(id);

    return { dismissTooltip, isTooltipDismissed };
};
