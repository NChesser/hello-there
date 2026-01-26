import React, { useState, useEffect } from 'react';
import { Heart, Settings, Book, Sparkles, Flower2 } from 'lucide-react';

// Types
import type { Challenge, CompletionLog, UserProgress, Habit, HabitLog } from './types/types';

// Data Imports
import { DAILY_QUOTES } from './data/quotes';
import { CHALLENGES } from './data/challenges';
import { HABITS } from './data/habits';

// Screens
import MainScreen from './screens/HomeScreen';
import HabitsScreen from './screens/HabitsScreen';
import SettingsScreen from './screens/SettingsScreen';
import JourneyScreen from './screens/JourneyScreen';



const CozyQuestApp = () => {
	const [currentView, setCurrentView] = useState < 'home' | 'quest' | 'reflect' | 'settings' | 'progress' | 'habits' > ('home');
	const [userProgress, setUserProgress] = useState < UserProgress > ({
		level: 1,
		xp: 0,
		totalXp: 0,
		completedChallenges: [],
		logs: [],
		habitLogs: []
	});
	const [todayChallenge, setTodayChallenge] = useState < Challenge | null > (null);
	const [beforeFeeling, setBeforeFeling] = useState < number > (3);
	const [afterFeeling, setAfterFeeling] = useState < number > (3);
	const [note, setNote] = useState < string > ('');
	const [attemptType, setAttemptType] = useState < 'complete' | 'attempted' | null > (null);
	const [isLoading, setIsLoading] = useState(true);
	const [dailyQuote, setDailyQuote] = useState < string > ('');
	const [selectedHabit, setSelectedHabit] = useState < Habit | null > (null);
	const [habitNote, setHabitNote] = useState < string > ('');

	// Load progress from storage
	useEffect(() => {
		loadProgress();
	}, []);

	const loadProgress = async () => {
		try {
			const progressResult = await window.storage.get('user-progress');
			const todayResult = await window.storage.get('today-challenge');
			const todayDateResult = await window.storage.get('today-date');

			if (progressResult) {
				setUserProgress(JSON.parse(progressResult.value));
			}

			const today = new Date().toDateString();

			// Get daily quote based on today's date
			const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
			setDailyQuote(DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length]);

			// Check if we need a new challenge for today
			if (todayDateResult && todayDateResult.value === today && todayResult) {
				setTodayChallenge(JSON.parse(todayResult.value));
			} else {
				// Generate new challenge for today
				generateTodayChallenge();
			}
		} catch (error) {
			// First time user - generate challenge
			const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
			setDailyQuote(DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length]);
			generateTodayChallenge();
		} finally {
			setIsLoading(false);
		}
	};

	const generateTodayChallenge = () => {
		// Simple selection: pick a random challenge
		const randomChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
		setTodayChallenge(randomChallenge);

		const today = new Date().toDateString();
		window.storage.set('today-challenge', JSON.stringify(randomChallenge));
		window.storage.set('today-date', today);
	};

	const saveProgress = async (progress: UserProgress) => {
		await window.storage.set('user-progress', JSON.stringify(progress));
		setUserProgress(progress);
	};

	const calculateXpForLevel = (level: number) => {
		return level * 200; // Simple: level 1 = 200xp, level 2 = 400xp, etc
	};

	const handleStartQuest = () => {
		setCurrentView('quest');
	};

	const handleAttempt = (type: 'complete' | 'attempted') => {
		setAttemptType(type);
		setCurrentView('reflect');
	};

	const handleReflect = async () => {
		if (!todayChallenge || !attemptType) return;

		const xpMultiplier = attemptType === 'complete' ? 1 : 0.5;
		const reflectionBonus = note.length > 0 ? 25 : 0;
		const xpEarned = Math.floor(todayChallenge.xpReward * xpMultiplier) + reflectionBonus;

		const log: CompletionLog = {
			challengeId: todayChallenge.id,
			date: new Date().toISOString(),
			beforeFeeling,
			afterFeeling,
			note,
			completed: attemptType === 'complete',
			attempted: true,
			xpEarned
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
			completedChallenges: attemptType === 'complete'
				? [...userProgress.completedChallenges, todayChallenge.id]
				: userProgress.completedChallenges,
			logs: [...userProgress.logs, log]
		};

		await saveProgress(newProgress);

		// Reset for next time
		setNote('');
		setBeforeFeling(3);
		setAfterFeeling(3);
		setAttemptType(null);

		setCurrentView('home');
	};

	const handleSkip = async () => {
		// Generate new challenge for tomorrow
		generateTodayChallenge();
		setCurrentView('home');
	};

	const handleLogHabit = async (habit: Habit) => {
		setSelectedHabit(habit);
	};

	const handleSaveHabit = async () => {
		if (!selectedHabit) return;

		const habitLog: HabitLog = {
			habitId: selectedHabit.id,
			date: new Date().toISOString(),
			note: habitNote
		};

		const newProgress: UserProgress = {
			...userProgress,
			habitLogs: [...userProgress.habitLogs, habitLog]
		};

		await saveProgress(newProgress);
		setSelectedHabit(null);
		setHabitNote('');
	};

	const getTodayHabitCount = () => {
		const today = new Date().toDateString();
		return userProgress.habitLogs.filter(log =>
			new Date(log.date).toDateString() === today
		).length;
	};

	const getHabitCountForToday = (habitId: string) => {
		const today = new Date().toDateString();
		return userProgress.habitLogs.filter(log =>
			log.habitId === habitId && new Date(log.date).toDateString() === today
		).length;
	};

	if (isLoading) {
		return (
			<div className="w-200 h-screen bg-amber-50 flex items-center justify-center">
				<div className="text-amber-800">Loading...</div>
			</div>
		);
	}

	return (
		<div className="w-full max-h-3/4 bg-gradient-to-b from-amber-50 to-orange-50 font-sans flex items-center justify-center">
			{/* Mobile container */}
			<div className="fixed top-0 left-0 right-0 max-w-md mx-auto max-w-md w-full bg-amber-50 shadow-xl mt-20">

				{/* Header */}
				<div className="bg-gradient-to-r from-orange-200 to-amber-200 p-4 rounded-b-3xl shadow-sm">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
								🐨
							</div>
							<div>
								<div className="text-sm text-amber-900 opacity-75">Level {userProgress.level}</div>
								<div className="text-xs text-amber-800 opacity-60">
									{userProgress.xp} / {calculateXpForLevel(userProgress.level)} XP
								</div>
							</div>
						</div>
						<button
							onClick={() => setCurrentView('settings')}
							className="p-2 hover:bg-amber-100 rounded-full transition-colors"
						>
							<Settings size={20} className="text-amber-900" />
						</button>
					</div>

					{/* XP Bar */}
					<div className="mt-3 bg-amber-100 rounded-full h-2 overflow-hidden">
						<div
							className="bg-gradient-to-r from-orange-400 to-amber-400 h-full rounded-full transition-all duration-500"
							style={{ width: `${(userProgress.xp / calculateXpForLevel(userProgress.level)) * 100}%` }}
						/>
					</div>
				</div>

				{/* Main Content */}

				<div className="p-4 pb-24">
					{currentView === 'home' && (
						<>
							<MainScreen todayChallenge={todayChallenge} />
						</>
					)}

					{currentView === 'quest' && todayChallenge && (
						<div className="space-y-6">
							<button
								onClick={() => setCurrentView('home')}
								className="text-amber-600 text-sm hover:text-amber-700"
							>
								← Back
							</button>

							<div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-100">
								<h2 className="text-xl font-semibold text-amber-900 mb-4">
									{todayChallenge.title}
								</h2>

								<p className="text-amber-700 mb-6 leading-relaxed">
									{todayChallenge.description}
								</p>

								{todayChallenge.exampleScript && (
									<div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
										<p className="text-xs text-amber-600 mb-2 font-medium">You could say:</p>
										<p className="text-sm text-amber-700 italic">"{todayChallenge.exampleScript}"</p>
									</div>
								)}

								<div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
									<p className="text-sm text-blue-800">
										💙 Remember: You can stop anytime. Showing up is what matters.
									</p>
								</div>
							</div>

							<div className="space-y-3">
								<button
									onClick={() => handleAttempt('complete')}
									className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-white py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
								>
									I Did It! 🎉
								</button>

								<button
									onClick={() => handleAttempt('attempted')}
									className="w-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
								>
									I Tried But Backed Out
								</button>

								<button
									onClick={() => setCurrentView('home')}
									className="w-full text-amber-600 py-2 text-sm hover:text-amber-700"
								>
									Not ready yet
								</button>
							</div>
						</div>
					)}

					{currentView === 'reflect' && (
						<div className="space-y-6">
							<div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-100">
								<div className="flex gap-4 mb-6">
									<div className="text-4xl">🐨</div>
									<div className="flex-1">
										<p className="text-amber-900 leading-relaxed">
											{attemptType === 'complete'
												? "That was brave! How did it feel?"
												: "Stopping is still information. You showed up. How did it feel?"}
										</p>
									</div>
								</div>

								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-amber-800 mb-3">
											Before you tried (1 = calm, 5 = very nervous)
										</label>
										<div className="flex gap-2">
											{[1, 2, 3, 4, 5].map((val) => (
												<button
													key={val}
													onClick={() => setBeforeFeling(val)}
													className={`flex-1 py-3 rounded-lg border-2 transition-all ${beforeFeeling === val
														? 'border-amber-400 bg-amber-50 text-amber-900 font-medium'
														: 'border-amber-200 text-amber-600 hover:border-amber-300'
														}`}
												>
													{val}
												</button>
											))}
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-amber-800 mb-3">
											After (1 = calm, 5 = very nervous)
										</label>
										<div className="flex gap-2">
											{[1, 2, 3, 4, 5].map((val) => (
												<button
													key={val}
													onClick={() => setAfterFeeling(val)}
													className={`flex-1 py-3 rounded-lg border-2 transition-all ${afterFeeling === val
														? 'border-amber-400 bg-amber-50 text-amber-900 font-medium'
														: 'border-amber-200 text-amber-600 hover:border-amber-300'
														}`}
												>
													{val}
												</button>
											))}
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-amber-800 mb-2">
											Any thoughts? (optional)
										</label>
										<textarea
											value={note}
											onChange={(e) => setNote(e.target.value)}
											placeholder="How it went, what you noticed, how you feel..."
											className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none resize-none bg-white text-amber-900"
											rows={4}
										/>
										{note.length > 0 && (
											<p className="text-xs text-amber-600 mt-1">+25 XP bonus for reflecting</p>
										)}
									</div>
								</div>
							</div>

							<button
								onClick={handleReflect}
								className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
							>
								Save & Continue
							</button>
						</div>
					)}

					{currentView === 'settings' && (
						<SettingsScreen />
					)}
				</div>

				{currentView === 'habits' && (
					<HabitsScreen />
				)}

				{currentView === 'progress' && (
					<JourneyScreen />
				)}

				{/* Bottom Nav */}
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
			</div>
		</div>
	);
};

export default CozyQuestApp;