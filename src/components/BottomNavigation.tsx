// Store
import { useScreenStore } from "../store/store";
import { useTheme } from "../context/ThemeContext";

// Icons from lucide-react
import { Sparkles, Flower2, Book, Users, Settings } from "lucide-react";

const BottomNav = () => {
    const selectedScreen = useScreenStore((state) => {
        return state.selectedScreen;
    });
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );
    const { isDark } = useTheme();

    const navItems = [
        { id: 'home', label: 'Home', icon: Sparkles },
        { id: 'practice', label: 'Practice', icon: Flower2 },
        { id: 'people', label: 'People', icon: Users },
        { id: 'progress', label: 'Journey', icon: Book },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className={`space-x-3 max-w-md mx-auto border-4 rounded-3xl shadow-lg transition-colors duration-300 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'
        }`}>
            <div className="flex justify-around p-4">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setSelectedScreen(id)}
                        className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                            selectedScreen === id
                                ? isDark
                                    ? 'text-amber-400 bg-amber-400/10 scale-105'
                                    : 'text-amber-600 bg-amber-50 scale-105'
                                : isDark
                                    ? 'text-gray-500 hover:text-gray-300'
                                    : 'text-amber-400 hover:text-amber-500'
                        }`}
                        aria-label={`Navigate to ${label}`}
                        aria-current={selectedScreen === id ? 'page' : undefined}
                    >
                        <Icon size={20} />
                        <span className="text-xs">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
