import { HABITS } from "../data/habits";
import { useScreenStore, useUserProgress, useSetUserProgressStore } from "../store/store";
import ScreenContainer from "../components/ScreenContainer";
import HabitCard from "../components/HabitCard";
import { PlusCircle, ArrowLeft, Sparkles } from "lucide-react";
import type { HabitLog } from "../types/types";
import { useTheme } from "../context/ThemeContext";

const HabitsScreen = () => {
    const { isDark } = useTheme();
    const setScreen = useScreenStore((state) => state.setSelectedScreen);
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    
    const habits = HABITS;

    // Get today's date string for comparison
    const today = new Date().toDateString();

    // Check if a habit was completed today
    const isHabitCompletedToday = (habitId: string): boolean => {
        return userProgress.habitLogs.some(log => {
            const logDate = new Date(log.date).toDateString();
            return log.habitId === habitId && logDate === today;
        });
    };

    // Get count of habits completed today
    const completedTodayCount = habits.filter(habit => 
        isHabitCompletedToday(habit.id)
    ).length;

    // Get days where at least one habit was completed
    const getDaysWithCompletedHabits = () => {
        const uniqueDays = new Set<string>();
        userProgress.habitLogs.forEach(log => {
            const date = new Date(log.date).toDateString();
            uniqueDays.add(date);
        });
        return uniqueDays.size;
    };

    const handleHabitComplete = (habitId: string) => {
        const isCompleted = isHabitCompletedToday(habitId);
        
        if (!isCompleted) {
            // Add a new habit log for today
            const newLog: HabitLog = {
                habitId,
                date: new Date().toISOString(),
                note: "",
            };
            
            setUserProgress({
                habitLogs: [...userProgress.habitLogs, newLog],
            });
        } else {
            // Remove today's log for this habit (allow un-completing)
            setUserProgress({
                habitLogs: userProgress.habitLogs.filter(log => {
                    const logDate = new Date(log.date).toDateString();
                    return !(log.habitId === habitId && logDate === today);
                }),
            });
        }
    };

    const handleHabitClick = (habitId: string) => {
        // Navigate to the habit detail screen
        setScreen(`habit-detail-${habitId}`);
    };

    const daysTracked = getDaysWithCompletedHabits();

    return (
        <ScreenContainer>
            <div className="mb-6">
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Track your progress • {completedTodayCount}/{habits.length} completed today
                </p>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {daysTracked} days with habits completed
                </p>
            </div>

            {/* Empty state for no habits tracked yet */}
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
                        Start building your daily habits!
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-amber-700'}`}>
                        Tap the checkmark on any habit below to track it for today. Small steps lead to big changes. 💛
                    </p>
                </div>
            )}

            {/* Habits List */}
            <div className="grid grid-cols-1 gap-4">
                {habits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        isCompleted={isHabitCompletedToday(habit.id)}
                        onComplete={() => handleHabitComplete(habit.id)}
                        onClick={() => handleHabitClick(habit.id)}
                    />
                ))}
            </div>

            {/* Add New Habit */}
            <div className="mt-6">
                <button className={`flex items-center justify-center gap-2 w-full p-4 rounded-lg border-2 border-dashed transition-all ${
                    isDark 
                        ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-800' 
                        : 'border-amber-300 hover:border-amber-400 hover:bg-amber-50'
                }`}>
                    <PlusCircle size={20} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                    <p className={`text-sm ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                        Add New Habit
                    </p>
                </button>
            </div>
        </ScreenContainer>
    );
};

export default HabitsScreen;
