import type {
    User,
    CompletionLog,
    HabitLog,
    CreatedChallenge,
    CreatedHabit,
    PersonMet,
} from "../types/types";

// Augment Window interface for custom storage API
declare global {
    interface Window {
        storage: {
            get: (key: string) => Promise<{ value: string } | null>;
            set: (key: string, value: string) => Promise<void>;
        };
    }
}

const STORAGE_KEY = "user-data";
const SCHEMA_VERSION = 1;

interface StoredUser {
    version: number;
    data: User;
}

/**
 * Initialize a new user with default values
 */
function createNewUser(): User {
    return {
        level: 1,
        xp: 0,
        totalXp: 0,
        completedChallenges: [],
        createdChallenges: [],
        completedHabits: [],
        createdHabits: [],
        chosenHabits: [],
        peopleMet: [],
        logs: [],
        habitLogs: [],
    };
}

/**
 * Load user data from persistent storage
 */
export async function loadUser(): Promise<User> {
    try {
        const result = await window.storage.get(STORAGE_KEY);

        if (!result) {
            const newUser = createNewUser();
            await saveUser(newUser);
            return newUser;
        }

        const stored: StoredUser = JSON.parse(result.value);

        // Handle schema migrations here if needed in the future
        if (stored.version !== SCHEMA_VERSION) {
            console.warn(
                `User data schema version ${stored.version} differs from current ${SCHEMA_VERSION}`
            );
        }

        return stored.data;
    } catch (error) {
        console.error("Error loading user data:", error);
        const newUser = createNewUser();
        await saveUser(newUser);
        return newUser;
    }
}

/**
 * Save user data to persistent storage
 */
export async function saveUser(user: User): Promise<void> {
    try {
        const stored: StoredUser = {
            version: SCHEMA_VERSION,
            data: user,
        };
        await window.storage.set(STORAGE_KEY, JSON.stringify(stored));
    } catch (error) {
        console.error("Error saving user data:", error);
        throw error;
    }
}

/**
 * Add a challenge completion log and update user stats
 */
export async function logChallengeCompletion(
    user: User,
    log: CompletionLog
): Promise<User> {
    const newTotalXp = user.totalXp + log.xpEarned;
    let newLevel = user.level;
    let newXp = user.xp + log.xpEarned;

    // Check for level up
    const xpPerLevel = 200;
    while (newXp >= xpPerLevel * newLevel) {
        newXp -= xpPerLevel * newLevel;
        newLevel++;
    }

    const updatedUser: User = {
        ...user,
        level: newLevel,
        xp: newXp,
        totalXp: newTotalXp,
        completedChallenges:
            log.completed && !user.completedChallenges.includes(log.challengeId)
                ? [...user.completedChallenges, log.challengeId]
                : user.completedChallenges,
        logs: [...user.logs, log],
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Log a completed habit
 */
export async function logHabitCompletion(
    user: User,
    habitLog: HabitLog
): Promise<User> {
    const updatedUser: User = {
        ...user,
        habitLogs: [...user.habitLogs, habitLog],
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Add a habit to user's chosen habits
 */
export async function chooseHabit(user: User, habitId: string): Promise<User> {
    if (user.chosenHabits.includes(habitId)) {
        return user; // Already chosen
    }

    const updatedUser: User = {
        ...user,
        chosenHabits: [...user.chosenHabits, habitId],
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Remove a habit from user's chosen habits
 */
export async function unchooseHabit(
    user: User,
    habitId: string
): Promise<User> {
    const updatedUser: User = {
        ...user,
        chosenHabits: user.chosenHabits.filter((id) => id !== habitId),
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Create a new challenge by user
 */
export async function createChallenge(
    user: User,
    challenge: Omit<CreatedChallenge, "id" | "createdAt">
): Promise<User> {
    const newChallenge: CreatedChallenge = {
        ...challenge,
        id: `custom-${Date.now()}`,
        createdAt: new Date().toISOString(),
    };

    const updatedUser: User = {
        ...user,
        createdChallenges: [...user.createdChallenges, newChallenge],
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Delete a challenge created by user
 */
export async function deleteCreatedChallenge(
    user: User,
    challengeId: string
): Promise<User> {
    const updatedUser: User = {
        ...user,
        createdChallenges: user.createdChallenges.filter(
            (c) => c.id !== challengeId
        ),
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Create a new habit by user
 */
export async function createHabit(
    user: User,
    habit: Omit<CreatedHabit, "id" | "createdAt">
): Promise<User> {
    const newHabit: CreatedHabit = {
        ...habit,
        id: `custom-habit-${Date.now()}`,
        createdAt: new Date().toISOString(),
    };

    const updatedUser: User = {
        ...user,
        createdHabits: [...user.createdHabits, newHabit],
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Delete a habit created by user
 */
export async function deleteCreatedHabit(
    user: User,
    habitId: string
): Promise<User> {
    const updatedUser: User = {
        ...user,
        createdHabits: user.createdHabits.filter((h) => h.id !== habitId),
        chosenHabits: user.chosenHabits.filter((id) => id !== habitId),
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Add a person met
 */
export async function addPersonMet(
    user: User,
    person: Omit<PersonMet, "id">
): Promise<User> {
    const newPerson: PersonMet = {
        ...person,
        id: `person-${Date.now()}`,
    };

    const updatedUser: User = {
        ...user,
        peopleMet: [...user.peopleMet, newPerson],
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Remove a person met
 */
export async function removePersonMet(
    user: User,
    personId: string
): Promise<User> {
    const updatedUser: User = {
        ...user,
        peopleMet: user.peopleMet.filter((p) => p.id !== personId),
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Get user statistics
 */
export function getUserStats(user: User) {
    return {
        level: user.level,
        currentXp: user.xp,
        totalXp: user.totalXp,
        completedChallengeCount: user.completedChallenges.length,
        createdChallengeCount: user.createdChallenges.length,
        completedHabitCount: user.completedHabits.length,
        chosenHabitCount: user.chosenHabits.length,
        peopleMet: user.peopleMet.length,
        totalCompletionLogs: user.logs.length,
    };
}

/**
 * Calculate XP needed for next level
 */
export function getXpForNextLevel(currentLevel: number): number {
    return currentLevel * 200;
}

/**
 * Get completion logs for a specific date range
 */
export function getLogsInDateRange(
    user: User,
    startDate: Date,
    endDate: Date
): CompletionLog[] {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    return user.logs.filter((log) => {
        const logTime = new Date(log.date).getTime();
        return logTime >= startTime && logTime <= endTime;
    });
}

/**
 * Get habit logs for a specific date
 */
export function getHabitLogsForDate(user: User, date: Date): HabitLog[] {
    const dateString = date.toISOString().split("T")[0];
    return user.habitLogs.filter((log) => log.date.startsWith(dateString));
}
