import { useScreenStore } from "../store/store";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
    title?: string;
}

// Screens accessible from the bottom nav — these are "top-level" and don't need a back button
const MAIN_SCREENS = ["home", "practice", "people", "progress", "settings"];

const Header = ({ title }: HeaderProps) => {
    const { isDark } = useTheme();
    const selectedScreen = useScreenStore((s) => s.selectedScreen);
    const previousScreen = useScreenStore((s) => s.previouslySelectedScreen);
    const setSelectedScreen = useScreenStore((s) => s.setSelectedScreen);

    const showBack = !MAIN_SCREENS.includes(selectedScreen);

    const handleBack = () => {
        // Go to the previous screen, or fall back to home
        const target =
            previousScreen && previousScreen !== selectedScreen
                ? previousScreen
                : "home";
        setSelectedScreen(target);
    };

    return (
        <div
            className={`p-4 rounded-t-3xl shadow-sm transition-colors duration-300 ${
                isDark
                    ? "bg-gradient-to-r from-gray-800 to-gray-700"
                    : "bg-gradient-to-r from-orange-200 to-amber-200"
            }`}
        >
            <div className="flex items-center justify-between px-4">
                {showBack ? (
                    <ArrowLeft
                        onClick={handleBack}
                        size={20}
                        className={`hover:cursor-pointer ${isDark ? "text-amber-400" : "text-amber-600"}`}
                    />
                ) : (
                    <div className="w-8 h-8" />
                )}
                <h3
                    className={`text-xl font-semibold ${isDark ? "text-gray-100" : "text-amber-900"}`}
                >
                    {formatScreenTitle(title || "Home")}
                </h3>
                <div className="w-8 h-8" />
            </div>
        </div>
    );
};

export default Header;

/** Turns a screen key like "practice-detail-morning" into a readable title */
const formatScreenTitle = (screen: string) => {
    // Strip prefixes for sub-screens
    if (screen.startsWith("practice-detail-")) return "Practice Details";
    if (screen === "practice-overview") return "Practice Overview";
    if (screen === "reflect") return "Reflect";
    if (screen === "challenge") return "Challenge";

    // Default: capitalise first letter
    return screen.charAt(0).toUpperCase() + screen.slice(1);
};
