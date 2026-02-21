import React, { useState, useEffect } from "react";

// Store
import { useSelectedScreen, useSetSelectedScreen, useTodayChallenge, useTodayChallengeStore } from "./store/store";

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
import AchievementToast from "./components/AchievementToast";
import { PRACTICES } from "./data/practices";

// Hooks
import { useOnboarding } from "./hooks/useFirstTime";
import { usePracticeCompletion } from "./hooks/usePracticeCompletion";

/** Thin wrapper that wires the usePracticeCompletion hook into PracticeDetailScreen */
const PracticeDetailRoute = ({ practiceId }: { practiceId: string }) => {
    const setSelectedScreen = useSetSelectedScreen();
    const practice = PRACTICES.find(p => p.id === practiceId);
    const { isCompletedToday, onComplete } = usePracticeCompletion(practiceId);

    if (!practice) return null;

    return (
        <PracticeDetailScreen
            practice={practice}
            isCompleted={isCompletedToday}
            onComplete={onComplete}
            onBack={() => setSelectedScreen("practice")}
        />
    );
};

// Loading skeleton shimmer
const LoadingSkeleton = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-amber-50 dark:bg-gray-900">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full bg-amber-200 dark:bg-gray-700 animate-ping opacity-40" />
                <div className="relative w-16 h-16 rounded-full bg-amber-100 dark:bg-gray-700 flex items-center justify-center text-3xl">
                    🐨
                </div>
            </div>
            <div className="space-y-3 w-48">
                <div className="h-3 rounded-full bg-amber-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-3 rounded-full bg-amber-200 dark:bg-gray-700 animate-pulse w-3/4 mx-auto" />
            </div>
        </div>
    );
};

const CozychallengeApp = () => {

    // Onboarding
    const { hasSeenOnboarding, completeOnboarding } = useOnboarding();

    // Global screen store Navigation state
    const selectedScreen = useSelectedScreen();
	const todayChallenge = useTodayChallenge();

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
            return <PracticeDetailRoute practiceId={practiceId} />;
        }
        return null;
    };

    return (
        <div className="w-full min-h-3/4 max-h-3/4 font-sans flex items-center justify-center rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
            {/* Mobile container */}
            <div className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full shadow-xl mt-20 bg-amber-50 dark:bg-gray-900">
                {/* Achievement notifications */}
                <AchievementToast />

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
