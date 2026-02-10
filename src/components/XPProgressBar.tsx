import { TrendingUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface XPProgressBarProps {
    currentXP: number;
    level: number;
}

const XPProgressBar = ({ currentXP, level }: XPProgressBarProps) => {
    const { isDark } = useTheme();
    const xpPerLevel = 200;
    const xpNeeded = xpPerLevel * level;
    const progress = (currentXP / xpNeeded) * 100;

    return (
        <div className={`rounded-2xl p-6 shadow-sm border-2 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'
        }`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <TrendingUp size={20} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                    <h3 className={`font-semibold ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>Level {level}</h3>
                </div>
                <div className={`text-sm ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    <span className="font-medium">{currentXP}</span>
                    <span className={isDark ? 'text-amber-500' : 'text-amber-500'}> / {xpNeeded} XP</span>
                </div>
            </div>
            
            <div className={`relative w-full h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-amber-100'}`}>
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
            </div>
            
            {progress >= 80 && (
                <p className={`text-xs mt-2 text-center font-medium ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    Almost there! 🎯
                </p>
            )}
        </div>
    );
};

export default XPProgressBar;
