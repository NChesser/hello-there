// Storage utility functions for managing user progress

const USER_PROGRESS_KEY = 'cozy-quest-user-progress';
const TODAY_CHALLENGE_KEY = 'cozy-quest-today-challenge';
const LAST_CHALLENGE_DATE_KEY = 'cozy-quest-last-challenge-date';

/**
 * Clear all saved progress (useful for testing or reset functionality)
 */
export const clearAllProgress = () => {
    try {
        localStorage.removeItem(USER_PROGRESS_KEY);
        localStorage.removeItem(TODAY_CHALLENGE_KEY);
        localStorage.removeItem(LAST_CHALLENGE_DATE_KEY);
        console.log('All progress cleared successfully');
        return true;
    } catch (error) {
        console.error('Failed to clear progress:', error);
        return false;
    }
};

/**
 * Export user progress as JSON (for backup)
 */
export const exportProgress = () => {
    try {
        const progress = localStorage.getItem(USER_PROGRESS_KEY);
        if (progress) {
            return JSON.parse(progress);
        }
        return null;
    } catch (error) {
        console.error('Failed to export progress:', error);
        return null;
    }
};

/**
 * Import user progress from JSON (for restore)
 */
export const importProgress = (progressData: string) => {
    try {
        // Validate JSON
        JSON.parse(progressData);
        localStorage.setItem(USER_PROGRESS_KEY, progressData);
        console.log('Progress imported successfully');
        return true;
    } catch (error) {
        console.error('Failed to import progress:', error);
        return false;
    }
};
