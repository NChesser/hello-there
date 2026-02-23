import { useScreenStore } from "../store/store";
import { ArrowLeft } from "lucide-react";
import Typography from "./Typography";

interface HeaderProps {
    title?: string;
}

// Screens accessible from the bottom nav — these are "top-level" and don't need a back button
const MAIN_SCREENS = ["home", "practice", "people", "progress", "settings"];

const Header = ({ title }: HeaderProps) => {
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
            className="p-4 rounded-t-3xl shadow-sm transition-colors duration-300 bg-gradient-to-r from-orange-200 to-amber-200 dark:from-gray-800 dark:to-gray-700"
        >
            <div className="flex items-center justify-between px-4">
                {showBack ? (
                    <ArrowLeft
                        onClick={handleBack}
                        size={20}
                        className="hover:cursor-pointer text-amber-600 dark:text-amber-400"
                    />
                ) : (
                    <div className="w-8 h-8" />
                )}
                <Typography as="h3" variant="headline">
                    {formatScreenTitle(title || "Home")}
                </Typography>
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
    if (screen === "settings-challenges") return "Manage Challenges";
    if (screen === "settings-categories") return "Category Preferences";
    if (screen === "settings-practices") return "Manage Practices";
    if (screen === "settings-custom") return "Create Challenge";
    if (screen === "settings-about") return "About";

    // Default: capitalise first letter
    return screen.charAt(0).toUpperCase() + screen.slice(1);
};
