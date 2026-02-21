// Store
import { useScreenStore } from "../store/store";

// Icons from lucide-react
import { Sparkles, Flower2, Book, Users, Settings } from "lucide-react";

const BottomNav = () => {
    const selectedScreen = useScreenStore((state) => {
        return state.selectedScreen;
    });
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );

    const navItems = [
        { id: 'home', label: 'Home', icon: Sparkles },
        { id: 'practice', label: 'Practice', icon: Flower2 },
        { id: 'people', label: 'People', icon: Users },
        { id: 'progress', label: 'Journey', icon: Book },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="space-x-3 max-w-md mx-auto border-4 rounded-3xl shadow-lg transition-colors duration-300 bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-around p-4">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setSelectedScreen(id)}
                        className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                            selectedScreen === id
                                ? 'text-amber-600 bg-amber-50 scale-105 dark:text-amber-400 dark:bg-amber-400/10'
                                : 'text-amber-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-gray-300'
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
