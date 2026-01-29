import React, { useState, useEffect } from "react";

// Store
import { useScreenStore } from "./store/store";

// Types
import type {
    Challenge,
    CompletionLog,
    UserProgress,
    Habit,
    HabitLog,
} from "./types/types";

// Data Imports
import { DAILY_QUOTES } from "./data/quotes";
import { CHALLENGES } from "./data/challenges";
import { HABITS } from "./data/habits";

// Screens
import HomeScreen from "./screens/HomeScreen";
import HabitsScreen from "./screens/HabitsScreen";
import PeopleScreen from "./screens/PeopleScreen";
import SettingsScreen from "./screens/SettingsScreen";
import JourneyScreen from "./screens/JourneyScreen";
import ChallengeScreen from "./screens/ChallengeScreen";

// Components
import Header from "./components/Header";
import BottomNav from "./components/BottomNavigation";

// Icons
import { Heart, Settings, Book, Sparkles, Flower2, Users } from "lucide-react";
import ReflectScreen from "./screens/ReflectScreen";

const CozychallengeApp = () => {
    // Global screen store Navication state
    const selectedScreen = useScreenStore((state) => {
        return state.selectedScreen;
    });
    const setSelectedScreen = useScreenStore(
        (state) => state.setSelectedScreen,
    );

    // Navigation state
    const [userProgress, setUserProgress] = useState<UserProgress>({
        level: 1,
        xp: 0,
        totalXp: 0,
        completedChallenges: [],
        logs: [],
        habitLogs: [],
    });
    const [todayChallenge, setTodayChallenge] = useState<Challenge | null>(
        null,
    );
    const [beforeFeeling, setBeforeFeling] = useState<number>(3);
    const [afterFeeling, setAfterFeeling] = useState<number>(3);
    const [note, setNote] = useState<string>("");
    const [attemptType, setAttemptType] = useState<
        "complete" | "attempted" | null
    >(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dailyQuote, setDailyQuote] = useState<string>("");
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
    const [habitNote, setHabitNote] = useState<string>("");

    // Load progress from storage
    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const progressResult = await window.storage.get("user-progress");
            const todayResult = await window.storage.get("today-challenge");
            const todayDateResult = await window.storage.get("today-date");

            if (progressResult) {
                setUserProgress(JSON.parse(progressResult.value));
            }

            const today = new Date().toDateString();

            // Get daily quote based on today's date
            const dayOfYear = Math.floor(
                (new Date().getTime() -
                    new Date(new Date().getFullYear(), 0, 0).getTime()) /
                    86400000,
            );
            setDailyQuote(DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length]);

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
            // First time user - generate challenge
            const dayOfYear = Math.floor(
                (new Date().getTime() -
                    new Date(new Date().getFullYear(), 0, 0).getTime()) /
                    86400000,
            );
            setDailyQuote(DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length]);
            generateTodayChallenge();
        } finally {
            setIsLoading(false);
        }
    };

    const generateTodayChallenge = () => {
        // Simple selection: pick a random challenge
        const randomChallenge =
            CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
        setTodayChallenge(randomChallenge);

        const today = new Date().toDateString();
        window.storage.set("today-challenge", JSON.stringify(randomChallenge));
        window.storage.set("today-date", today);
    };

    const saveProgress = async (progress: UserProgress) => {
        await window.storage.set("user-progress", JSON.stringify(progress));
        setUserProgress(progress);
    };

    const calculateXpForLevel = (level: number) => {
        return level * 200; // Simple: level 1 = 200xp, level 2 = 400xp, etc
    };

    const handleStartchallenge = () => {
        setSelectedScreen("challenge");
    };

    const handleAttempt = (type: "complete" | "attempted") => {
        setAttemptType(type);
        setSelectedScreen("reflect");
    };

    const handleReflect = async () => {
        if (!todayChallenge || !attemptType) return;

        const xpMultiplier = attemptType === "complete" ? 1 : 0.5;
        const reflectionBonus = note.length > 0 ? 25 : 0;
        const xpEarned =
            Math.floor(todayChallenge.xpReward * xpMultiplier) +
            reflectionBonus;

        const log: CompletionLog = {
            challengeId: todayChallenge.id,
            date: new Date().toISOString(),
            beforeFeeling,
            afterFeeling,
            note,
            completed: attemptType === "complete",
            attempted: true,
            xpEarned,
        };

        const newTotalXp = userProgress.totalXp + xpEarned;
        let newLevel = userProgress.level;
        let newXp = userProgress.xp + xpEarned;

        // Check for level up
        while (newXp >= calculateXpForLevel(newLevel)) {
            newXp -= calculateXpForLevel(newLevel);
            newLevel++;
        }

        const newProgress: UserProgress = {
            level: newLevel,
            xp: newXp,
            totalXp: newTotalXp,
            completedChallenges:
                attemptType === "complete"
                    ? [...userProgress.completedChallenges, todayChallenge.id]
                    : userProgress.completedChallenges,
            logs: [...userProgress.logs, log],
        };

        await saveProgress(newProgress);

        // Reset for next time
        setNote("");
        setBeforeFeling(3);
        setAfterFeeling(3);
        setAttemptType(null);

        setSelectedScreen("home");
    };

    const handleSkip = async () => {
        // Generate new challenge for tomorrow
        generateTodayChallenge();
        setSelectedScreen("home");
    };

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
