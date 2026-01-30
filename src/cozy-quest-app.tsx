import { useState, useEffect } from "react";

// Store
import {
    useSelectedScreen,
    useSetSelectedScreen,
    useUserProgress,
} from "./store/store";

// Types
import type {
    Challenge
} from "./types/types";

// Data Imports
import { CHALLENGES } from "./data/challenges";

// Screens
import HomeScreen from "./screens/HomeScreen";
import HabitsScreen from "./screens/HabitsScreen";
import PeopleScreen from "./screens/PeopleScreen";
import SettingsScreen from "./screens/SettingsScreen";
import JourneyScreen from "./screens/JourneyScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import ReflectScreen from "./screens/ReflectScreen";

// Components
import Header from "./components/Header";
import BottomNav from "./components/BottomNavigation";

const CozychallengeApp = () => {
    // Global screen store Navication state
    const selectedScreen = useSelectedScreen();
    const setSelectedScreen = useSetSelectedScreen();

    // User Progress Store
    const userProgress = useUserProgress();

	// Local State
    const [todayChallenge, setTodayChallenge] = useState<Challenge | null>(null,);
    const [isLoading, setIsLoading] = useState(true);


    const generateTodayChallenge = () => {
        // Simple selection: pick a random challenge
        const randomChallenge =
            CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
        setTodayChallenge(randomChallenge);

        const today = new Date().toDateString();
        // window.storage.set("today-challenge", JSON.stringify(randomChallenge));
        // window.storage.set("today-date", today);
    };

	useEffect(() => {
		// Simulate loading delay
		setTimeout(() => {
			generateTodayChallenge();
			setIsLoading(false);
		}, 1000);
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

                {/* Bottom Nav */}
                <BottomNav />
            </div>
        </div>
    );
};

export default CozychallengeApp;
