// Various helper functions used across the app

// Capitalizes the first letter of a string
export const capitalizeFirstLetter = (text: string): string => {
    if (text.length === 0) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
};

