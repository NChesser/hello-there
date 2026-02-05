import React, { useState, useEffect } from "react";

// Store
import { useSelectedScreen, useSetSelectedScreen, useTodayChallenge, useUserProgress, useSetUserProgressStore, useTodayChallengeStore } from "./store/store";

// Types
import type { Challenge } from "./types/types";

// Data Imports
import { CHALLENGES } from "./data/challenges";

// Screens
import HomeScreen from "./screens/HomeScreen";
import HabitsScreen from "./screens/HabitsScreen";
import HabitDetailScreen from "./screens/HabitDetailScreen";
import PeopleScreen from "./screens/PeopleScreen";
import SettingsScreen from "./screens/SettingsScreen";
import JourneyScreen from "./screens/JourneyScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import ReflectScreen from "./screens/ReflectScreen";
import HabitOverviewScreen from "./components/HabitOverview";

// Components
import Header from "./components/Header";
import BottomNav from "./components/BottomNavigation";
import { HABITS } from "./data/habits";

const CozychallengeApp = () => {
    // Global screen store Navication state
    const selectedScreen = useSelectedScreen();
    const setSelectedScreen = useSetSelectedScreen();
	const todayChallenge = useTodayChallenge();

    // User Progress Store
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();

	// Local State
    const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Only generate a new challenge if one doesn't exist
		if (!todayChallenge && CHALLENGES.length > 0) {
			const randomIndex = Math.floor(Math.random() * CHALLENGES.length);
			const challengeStore = useTodayChallengeStore.getState();
			challengeStore.setTodayChallenge(CHALLENGES[randomIndex]);
		}
		
		// Simulate loading delay
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, []);


    if (isLoading) {
        return (
            <div className="w-200 h-screen bg-amber-50 flex items-center justify-center">
                <div className="text-amber-800">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-3/4 max-h-3/4 bg-gradient-to-b from-amber-50 to-orange-50 font-sans flex items-center justify-center rounded-3xl">
            {/* Mobile container */}
            <div className="fixed top-0 left-0 right-0 max-w-md mx-auto max-w-md w-full bg-amber-50 shadow-xl mt-20">
                {/* Header */}
                <Header title={selectedScreen} />

                {/* Main Content */}
                <div>
                    {selectedScreen === "home" && (
                        <>
                            <HomeScreen todayChallenge={todayChallenge} />
                        </>
                    )}

                    {selectedScreen === "challenge" && todayChallenge && (
                        <ChallengeScreen todayChallenge={todayChallenge} />
                    )}

                    {selectedScreen === "reflect" && (
                        <ReflectScreen todayChallenge={todayChallenge} />
                    )}
                </div>

                {selectedScreen === "settings" && <SettingsScreen />}

                {selectedScreen === "habits" && <HabitsScreen />}

                {selectedScreen === "people" && <PeopleScreen />}

                {selectedScreen === "progress" && <JourneyScreen />}

				{selectedScreen === "habit-overview" && <HabitOverviewScreen habit={HABITS[0]} habitLogs={[]} />}

                {/* Habit Detail Screens */}
                {selectedScreen.startsWith("habit-detail-") && (() => {
                    const habitId = selectedScreen.replace("habit-detail-", "");
                    const habit = HABITS.find(h => h.id === habitId);
                    if (habit) {
                        const completedHabits = userProgress.completedHabits || [];
                        return (
                            <HabitDetailScreen
                                habit={habit}
                                isCompleted={completedHabits.includes(habitId)}
                                onComplete={() => {
                                    if (!completedHabits.includes(habitId)) {
                                        // Update the user progress store with the new completed habit
                                        setUserProgress({
                                            completedHabits: [...completedHabits, habitId]
                                        });
                                    }
                                }}
                                onBack={() => setSelectedScreen("habits")}
                            />
                        );
                    }
                    return null;
                })()}

                {/* Bottom Nav */}
                <BottomNav />
            </div>
        </div>
    );
};

export default CozychallengeApp;
