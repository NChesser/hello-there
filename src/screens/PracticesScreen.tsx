import { PRACTICES } from "../data/practices";
import { useScreenStore, useUserProgress, useSetUserProgressStore } from "../store/store";
import ScreenContainer from "../components/ScreenContainer";
import PracticeCard from "../components/PracticeCard";
import { PlusCircle, ArrowLeft, Sparkles } from "lucide-react";
import type { PracticeLog } from "../types/types";
import { useTheme } from "../context/ThemeContext";

const PracticesScreen = () => {
    const { isDark } = useTheme();
    const setScreen = useScreenStore((state) => state.setSelectedScreen);
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    
    const practices = PRACTICES;

    // Get today's date string for comparison
    const today = new Date().toDateString();

    // Check if a practice was completed today
    const isPracticeCompletedToday = (practiceId: string): boolean => {
        return userProgress.practiceLogs.some(log => {
            const logDate = new Date(log.date).toDateString();
            return log.practiceId === practiceId && logDate === today;
        });
    };

    // Get count of practices completed today
    const completedTodayCount = practices.filter(practice => 
        isPracticeCompletedToday(practice.id)
    ).length;

    // Get days where at least one practice was completed
    const getDaysWithCompletedPractices = () => {
        const uniqueDays = new Set<string>();
        userProgress.practiceLogs.forEach(log => {
            const date = new Date(log.date).toDateString();
            uniqueDays.add(date);
        });
        return uniqueDays.size;
    };

    const handlePracticeComplete = (practiceId: string) => {
        const isCompleted = isPracticeCompletedToday(practiceId);
        
        if (!isCompleted) {
            // Add a new practice log for today
            const newLog: PracticeLog = {
                practiceId,
                date: new Date().toISOString(),
                note: "",
            };
            
            setUserProgress({
                practiceLogs: [...userProgress.practiceLogs, newLog],
            });
        } else {
            // Remove today's log for this practice (allow un-completing)
            setUserProgress({
                practiceLogs: userProgress.practiceLogs.filter(log => {
                    const logDate = new Date(log.date).toDateString();
                    return !(log.practiceId === practiceId && logDate === today);
                }),
            });
        }
    };

    const handlePracticeClick = (practiceId: string) => {
        // Navigate to the practice detail screen
        setScreen(`practice-detail-${practiceId}`);
    };

    const daysTracked = getDaysWithCompletedPractices();

    return (
        <ScreenContainer>
            <div className="mb-6">
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Track your progress • {completedTodayCount}/{practices.length} completed today
                </p>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {daysTracked} days with practices completed
                </p>
            </div>

            {/* Empty state for no practices tracked yet */}
            {daysTracked === 0 && completedTodayCount === 0 && (
                <div className={`rounded-2xl p-6 mb-6 text-center border-2 border-dashed ${
                    isDark ? 'border-gray-600 bg-gray-800/50' : 'border-amber-200 bg-amber-50/50'
                }`}>
                    <div className="flex justify-center mb-3">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            isDark ? 'bg-gray-700' : 'bg-amber-100'
                        }`}>
                            <Sparkles size={28} className={isDark ? 'text-amber-400' : 'text-amber-500'} />
                        </div>
                    </div>
                    <h3 className={`font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-amber-900'}`}>
                        Start building your daily practices!
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-amber-700'}`}>
                        Tap the checkmark on any practice below to track it for today. Small steps lead to big changes. 💛
                    </p>
                </div>
            )}

            {/* Practices List */}
            <div className="grid grid-cols-3 gap-4">
                {practices.map((practice) => (
                    <PracticeCard
                        key={practice.id}
                        practice={practice}
                        isCompleted={isPracticeCompletedToday(practice.id)}
                        onComplete={() => handlePracticeComplete(practice.id)}
                        onClick={() => handlePracticeClick(practice.id)}
                    />
                ))}
            </div>

            {/* Add New Practice */}
            <div className="mt-6">
                <button className={`flex items-center justify-center gap-2 w-full p-4 rounded-lg border-2 border-dashed transition-all ${
                    isDark 
                        ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-800' 
                        : 'border-amber-300 hover:border-amber-400 hover:bg-amber-50'
                }`}>
                    <PlusCircle size={20} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                    <p className={`text-sm ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                        Add New Practice
                    </p>
                </button>
            </div>
        </ScreenContainer>
    );
};

export default PracticesScreen;
