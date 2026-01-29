import React from "react";

export const XPDisplay = () => {
    return (
        <div className="bg-gradient-to-r from-orange-200 to-amber-200 p-4 rounded-3xl shadow-sm">
            <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
                        🐨
                    </div>
                    <div>
                        <div className="text-sm text-amber-900 opacity-75">
                            Level {userProgress.level}
                        </div>
                        <div className="text-xs text-amber-800 opacity-60">
                            {userProgress.xp} /{" "}
                            {calculateXpForLevel(userProgress.level)} XP
                        </div>
                    </div>
                </div>
            </div>

            {/* XP Bar */}
            <div className="mt-3 bg-amber-100 rounded-full h-2 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-orange-400 to-amber-400 h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${(userProgress.xp / calculateXpForLevel(userProgress.level)) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
};

interface HeaderProps {
    title?: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <div className="bg-gradient-to-r from-orange-200 to-amber-200 p-4 rounded-t-3xl shadow-sm">
            <div className="flex items-center justify-between px-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
                    🐨
                </div>
                <h3 className="text-xl font-semibold text-amber-900 -ml-6">
                    {capitalizeFirstLetter(title || "Home")}
                </h3>
                <div className="w-6 h-6" /> {/* Placeholder for alignment */}
            </div>
        </div>
    );
};

export default Header;

const capitalizeFirstLetter = (text: string) => {
    if (text.length === 0) return text;

    return text.charAt(0).toUpperCase() + text.slice(1);
};

// Helper function to calculate XP needed for next level
const calculateXpForLevel = (level: number) => {
    return level * 300; // Example: each level requires 300 more XP
};
// Mock user progress data
const userProgress = {
    level: 5,
    xp: 1200,
};
// Mock function to set current view (to be replaced with actual navigation logic)
const setCurrentView = (view: string) => {
    console.log(`Navigating to ${view} view`);
};
