import type {
    User,
    CompletionLog,
    PracticeLog,
    CreatedChallenge,
    CreatedPractice,
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
        completedPractices: [],
        createdPractices: [],
        chosenPractices: [],
        peopleMet: [],
        logs: [],
        practiceLogs: [],
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

        const data = stored.data as User & {
            completedHabits?: string[];
            createdHabits?: CreatedPractice[];
            chosenHabits?: string[];
            habitLogs?: { habitId: string; date: string; note?: string }[];
        };

        return {
            ...data,
            completedPractices: data.completedPractices || data.completedHabits || [],
            createdPractices: data.createdPractices || data.createdHabits || [],
            chosenPractices: data.chosenPractices || data.chosenHabits || [],
            practiceLogs: data.practiceLogs || (data.habitLogs || []).map((log) => ({
                practiceId: log.habitId,
                date: log.date,
                note: log.note,
            })),
        };
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
 * Log a completed practice
 */
export async function logPracticeCompletion(
    user: User,
    practiceLog: PracticeLog
): Promise<User> {
    const updatedUser: User = {
        ...user,
        practiceLogs: [...user.practiceLogs, practiceLog],
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Add a practice to user's chosen practices
 */
export async function choosePractice(user: User, practiceId: string): Promise<User> {
    if (user.chosenPractices.includes(practiceId)) {
        return user; // Already chosen
    }

    const updatedUser: User = {
        ...user,
        chosenPractices: [...user.chosenPractices, practiceId],
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Remove a practice from user's chosen practices
 */
export async function unchoosePractice(
    user: User,
    practiceId: string
): Promise<User> {
    const updatedUser: User = {
        ...user,
        chosenPractices: user.chosenPractices.filter((id) => id !== practiceId),
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
 * Create a new practice by user
 */
export async function createPractice(
    user: User,
    practice: Omit<CreatedPractice, "id" | "createdAt">
): Promise<User> {
    const newPractice: CreatedPractice = {
        ...practice,
        id: `custom-practice-${Date.now()}`,
        createdAt: new Date().toISOString(),
    };

    const updatedUser: User = {
        ...user,
        createdPractices: [...user.createdPractices, newPractice],
    };

    await saveUser(updatedUser);
    return updatedUser;
}

/**
 * Delete a practice created by user
 */
export async function deleteCreatedPractice(
    user: User,
    practiceId: string
): Promise<User> {
    const updatedUser: User = {
        ...user,
        createdPractices: user.createdPractices.filter((p) => p.id !== practiceId),
        chosenPractices: user.chosenPractices.filter((id) => id !== practiceId),
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
        completedPracticeCount: user.completedPractices.length,
        chosenPracticeCount: user.chosenPractices.length,
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
 * Get practice logs for a specific date
 */
export function getPracticeLogsForDate(user: User, date: Date): PracticeLog[] {
    const dateString = date.toISOString().split("T")[0];
    return user.practiceLogs.filter((log) => log.date.startsWith(dateString));
}
