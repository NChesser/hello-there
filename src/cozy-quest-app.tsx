import React, { useState, useEffect, useCallback } from "react";

// Store
import { useScreenStore, useUserStore, useUserLoading } from "./store/store";

// Types
import type { Challenge } from "./types/types";

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
	// Global screen store Navigation state
	const selectedScreen = useScreenStore((state) => state.selectedScreen);

	// User store
	const isLoadingUser = useUserLoading();
	const initializeUser = useUserStore((state) => { return state.initializeUser; });
	console.log("🚀 ~ CozychallengeApp ~ initializeUser:", initializeUser)
	const user = useUserStore((state) => state.user);
	console.log("🚀 ~ CozychallengeApp ~ user:", user)

	// Local UI state
	const [todayChallenge, setTodayChallenge] = useState < Challenge | null > (null);

	const generateTodayChallenge = () => {
		// Simple selection: pick a random challenge
		const randomChallenge =
			CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
		setTodayChallenge(randomChallenge);

		const today = new Date().toDateString();
		window.storage.set("today-challenge", JSON.stringify(randomChallenge));
		window.storage.set("today-date", today);
	};

	const loadTodayChallenge = useCallback(async () => {
		try {
			const todayResult = await window.storage.get("today-challenge");
			const todayDateResult = await window.storage.get("today-date");

			const today = new Date().toDateString();

			// Check if we need a new challenge for today
			if (
				todayDateResult &&
				todayDateResult.value === today &&
				todayResult
			) {
				setTodayChallenge(JSON.parse(todayResult.value));
			} else {
				// Generate new challenge for today
				generateTodayChallenge();
			}
		} catch (error) {
			console.error("Error loading today's challenge:", error);
			generateTodayChallenge();
		}
	}, []);

	// Initialize user on mount
	useEffect(() => {
		initializeUser();
	}, [initializeUser]);

	// Load today's challenge
	useEffect(() => {
		void loadTodayChallenge();
	}, [loadTodayChallenge]);

	if (isLoadingUser) {
		return (
			<div className="w-200 h-screen bg-amber-50 flex items-center justify-center">
				<div className="text-amber-800">Loading...</div>
			</div>
		);
	}

	return (

			<div className="w-full min-h-3/4 max-h-3/4 bg-gradient-to-b from-amber-50 to-orange-50 font-sans flex items-center justify-center rounded-3xl">
				{/* Mobile container */}
				<div className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full bg-amber-50 shadow-xl mt-20">
					{/* Header */}
					<Header title={selectedScreen} />

					{/* Main Content */}
					<main>
						{(() => {
							switch (selectedScreen) {
								case "home":
									return <HomeScreen todayChallenge={todayChallenge} />;
								case "challenge":
									return todayChallenge ? <ChallengeScreen todayChallenge={todayChallenge} /> : null;
								case "reflect":
									return <ReflectScreen todayChallenge={todayChallenge} />;
								case "settings":
									return <SettingsScreen />;
								case "habits":
									return <HabitsScreen />;
								case "people":
									return <PeopleScreen />;
								case "progress":
									return <JourneyScreen />;
								default:
									return null;
							}
						})()}
					</main>

					{/* Bottom Nav */}
					<BottomNav />
				</div>
			</div>
	);
};

export default CozychallengeApp;
