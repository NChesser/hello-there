import { HABITS } from "../data/habits";
import { useScreenStore, useUserProgress } from "../store/store";
import ScreenContainer from "../components/ScreenContainer";
import HabitCard from "../components/HabitCard";
import { PlusCircle, ArrowLeft } from "lucide-react";

const HabitsScreen = () => {
    const setScreen = useScreenStore((state) => state.setSelectedScreen);
    const userProgress = useUserProgress();
    
    const completedHabits = userProgress.completedHabits || [];

    const habits = HABITS;

    const handleHabitComplete = (habitId: string) => {
        if (!completedHabits.includes(habitId)) {
            // Update the user progress store with the new completed habit
            userProgress.setUserProgress({
                completedHabits: [...completedHabits, habitId]
            });
        }
        else {
            // If already completed, we could optionally allow un-completing it
            userProgress.setUserProgress({
                completedHabits: completedHabits.filter(id => id !== habitId)
            });
        }
    };

    const handleHabitClick = (habitId: string) => {
        // Navigate to the habit detail screen
        setScreen(`habit-detail-${habitId}`);
    };

    return (
        <ScreenContainer>
            <div className="mb-6">
                <p className="text-sm text-gray-600 mt-1">
                    Track your progress • {completedHabits.length}/
                    {habits.length} completed today
                </p>
            </div>

            {/* Habits List */}
            <div className="grid grid-cols-1 gap-4">
                {habits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        isCompleted={completedHabits.includes(habit.id)}
                        onComplete={() => handleHabitComplete(habit.id)}
                        onClick={() => handleHabitClick(habit.id)}
                    />
                ))}
            </div>

            {/* Add New Habit */}
            <div className="mt-6">
                <button className="flex items-center justify-center gap-2 w-full p-4 rounded-lg border-2 border-dashed border-amber-300 hover:border-amber-400 hover:bg-amber-50 transition-all">
                    <PlusCircle size={20} className="text-amber-600" />
                    <p className="text-amber-600 text-sm">
                        Add New Habit
                    </p>
                </button>
            </div>
        </ScreenContainer>
    );
};

export default HabitsScreen;
