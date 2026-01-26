
import React from 'react';

// Custom hook to manage navigation state
import useNavigationContext from './useNavigationContext';

// Icons from lucide-react
import { Sparkles, Flower2, Book } from 'lucide-react';



const BottomNav = () => {
    const { currentView, setCurrentView } = useNavigationContext();

    return (
        <div className="fixed left-0 right-0 max-w-md mx-auto bg-white border-t-2 border-amber-100 rounded-t-3xl shadow-lg -mt-10">
            <div className="flex justify-around p-4">
                <button
                    onClick={() => setCurrentView('home')}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${currentView === 'home' ? 'text-amber-600 bg-amber-50' : 'text-amber-400'
                        }`}
                >
                    <Sparkles size={20} />
                    <span className="text-xs">Home</span>
                </button>
                <button
                    onClick={() => setCurrentView('habits')}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${currentView === 'habits' ? 'text-red-600 bg-amber-50' : 'text-amber-400'
                        }`}
                >
                    <Flower2 size={20} />
                    <span className="text-xs">Habits</span>
                </button>
                <button
                    onClick={() => setCurrentView('progress')}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${currentView === 'progress' ? 'text-amber-600 bg-amber-50' : 'text-amber-400'
                        }`}
                >
                    <Book size={20} />
                    <span className="text-xs">Journey</span>
                </button>
            </div>
        </div>
    );
};

export default BottomNav;