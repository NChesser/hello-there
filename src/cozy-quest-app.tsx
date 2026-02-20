import React, { useState, useEffect } from "react";

// Store
import { useSelectedScreen, useSetSelectedScreen, useTodayChallenge, useUserProgress, useSetUserProgressStore, useTodayChallengeStore } from "./store/store";

// Types
import type { Challenge } from "./types/types";

// Data Imports
import { CHALLENGES } from "./data/challenges";

// Screens
import HomeScreen from "./screens/HomeScreen";
import PracticesScreen from "./screens/PracticesScreen";
import PracticeDetailScreen from "./screens/PracticeDetailScreen";
import PeopleScreen from "./screens/PeopleScreen";
import SettingsScreen from "./screens/SettingsScreen";
import JourneyScreen from "./screens/JourneyScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import ReflectScreen from "./screens/ReflectScreen";
import PracticeOverviewScreen from "./components/PracticeOverview";
import OnboardingScreen from "./screens/OnboardingScreen";

// Components
import Header from "./components/Header";
import BottomNav from "./components/BottomNavigation";
import ScreenTransition from "./components/ScreenTransition";
import { PRACTICES } from "./data/practices";

// Theme & Hooks
import { useTheme } from "./context/ThemeContext";
import { useOnboarding } from "./hooks/useFirstTime";

// Loading skeleton shimmer
const LoadingSkeleton = () => {
    const { isDark } = useTheme();
    return (
        <div className={`w-full h-screen flex flex-col items-center justify-center gap-4 ${isDark ? 'bg-gray-900' : 'bg-amber-50'}`}>
            <div className="relative w-16 h-16">
                <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-gray-700' : 'bg-amber-200'} animate-ping opacity-40`} />
                <div className={`relative w-16 h-16 rounded-full ${isDark ? 'bg-gray-700' : 'bg-amber-100'} flex items-center justify-center text-3xl`}>
                    🐨
                </div>
            </div>
            <div className="space-y-3 w-48">
                <div className={`h-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-amber-200'} animate-pulse`} />
                <div className={`h-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-amber-200'} animate-pulse w-3/4 mx-auto`} />
            </div>
        </div>
    );
};

const CozychallengeApp = () => {
    // Theme
    const { isDark } = useTheme();

    // Onboarding
    const { hasSeenOnboarding, completeOnboarding } = useOnboarding();

    // Global screen store Navigation state
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

    // Show onboarding for first-time users
    if (!hasSeenOnboarding) {
        return <OnboardingScreen onComplete={completeOnboarding} />;
    }

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    // Render the active screen content
    const renderScreen = () => {
        if (selectedScreen === "home") {
            return <HomeScreen todayChallenge={todayChallenge} />;
        }
        if (selectedScreen === "challenge" && todayChallenge) {
            return <ChallengeScreen todayChallenge={todayChallenge} />;
        }
        if (selectedScreen === "reflect") {
            return <ReflectScreen todayChallenge={todayChallenge} />;
        }
        if (selectedScreen === "settings") {
            return <SettingsScreen />;
        }
        if (selectedScreen === "practice") {
            return <PracticesScreen />;
        }
        if (selectedScreen === "people") {
            return <PeopleScreen />;
        }
        if (selectedScreen === "progress") {
            return <JourneyScreen />;
        }
        if (selectedScreen === "practice-overview") {
            return <PracticeOverviewScreen practice={PRACTICES[0]} practiceLogs={[]} />;
        }
        if (selectedScreen.startsWith("practice-detail-")) {
            const practiceId = selectedScreen.replace("practice-detail-", "");
            const practice = PRACTICES.find(p => p.id === practiceId);
            if (practice) {
                const completedPractices = userProgress.completedPractices || [];
                return (
                    <PracticeDetailScreen
                        practice={practice}
                        isCompleted={completedPractices.includes(practiceId)}
                        onComplete={() => {
                            if (!completedPractices.includes(practiceId)) {
                                setUserProgress({
                                    completedPractices: [...completedPractices, practiceId]
                                });
                            }
                        }}
                        onBack={() => setSelectedScreen("practices")}
                    />
                );
            }
        }
        return null;
    };

    return (
        <div className={`w-full min-h-3/4 max-h-3/4 font-sans flex items-center justify-center rounded-3xl ${
            isDark 
                ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
                : 'bg-gradient-to-b from-amber-50 to-orange-50'
        }`}>
            {/* Mobile container */}
            <div className={`fixed top-0 left-0 right-0 max-w-md mx-auto w-full shadow-xl mt-20 ${
                isDark ? 'bg-gray-900' : 'bg-amber-50'
            }`}>
                {/* Header */}
                <Header title={selectedScreen} />

                {/* Main Content with Screen Transitions */}
                <ScreenTransition screenKey={selectedScreen}>
                    {renderScreen()}
                </ScreenTransition>

                {/* Bottom Nav */}
                <BottomNav />
            </div>
        </div>
    );
};

export default CozychallengeApp;
