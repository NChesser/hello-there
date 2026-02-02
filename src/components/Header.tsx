import { useUserProgress } from "../store/store";

interface HeaderProps {
    title?: string;
}

const Header = ({ title }: HeaderProps) => {
    const userProgress = useUserProgress();

    function calculateXpForLevel(level: number): number {
        return level * 1000; // Example: each level requires 1000 more XP
    }

    return (
        <div className="bg-gradient-to-r from-orange-200 to-amber-200 p-4 rounded-t-3xl shadow-sm">
            <div className="flex items-center justify-between px-4">
                <div className="w-6 h-6" /> {/* Placeholder for alignment */}
                <h3 className="text-xl font-semibold text-amber-900">
                    {capitalizeFirstLetter(title || "Home")}
                </h3>
                <div className="w-6 h-6" /> {/* Placeholder for alignment */}
                {/* <div className="flex items-center justify-between">
                    <div className="ml-2 mr-2">
                        <div className="text-sm text-amber-900 opacity-75">
                            Level {userProgress.level}
                        </div>
                        <div className="text-xs text-amber-800 opacity-60">
                            {userProgress.totalXp} /{" "}
                            {calculateXpForLevel(userProgress.level)} XP
                        </div>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
                        🐨
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Header;

const capitalizeFirstLetter = (text: string) => {
    if (text.length === 0) return text;

    return text.charAt(0).toUpperCase() + text.slice(1);
};
