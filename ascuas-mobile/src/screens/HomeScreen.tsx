import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Heart } from 'lucide-react-native';

import type { RootStackParamList } from '../navigation/types';
import type { Mood } from '../types/types';
import { Colors, Spacing, Radius } from '../theme/colors';
import {
    useUserProgress,
    useUserProgressStore,
    useTodayChallengeStore,
    useTodayChallenge,
} from '../store/store';
import { CHALLENGES } from '../data/challenges';
import { getUserTier } from '../data/tiers';
import { getXpProgress, getXpForLevel } from '../utils/helpers';

import DailyQuote from '../components/DailyQuote';
import MoodCheckIn from '../components/MoodCheckIn';
import Card from '../components/Card';
import Button from '../components/Button';
import Typography from '../components/Typography';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation < Nav > ();
    const userProgress = useUserProgress();
    const logMood = useUserProgressStore((s) => s.logMood);
    const todayChallenge = useTodayChallenge();

    // Generate a challenge if there isn't one
    useEffect(() => {
        const store = useTodayChallengeStore.getState();
        const isNewDay = store.lastChallengeDate !== new Date().toDateString();
        if ((!todayChallenge || isNewDay) && CHALLENGES.length > 0) {
            const idx = Math.floor(Math.random() * CHALLENGES.length);
            store.setTodayChallenge(CHALLENGES[idx]);
        }
    }, [todayChallenge]);

    // Mood
    const todaysMood = useMemo(() => {
        const today = new Date().toDateString();
        const todayLog = (userProgress.moodLogs ?? [])
            .slice()
            .reverse()
            .find((entry) => new Date(entry.date).toDateString() === today);
        return todayLog?.mood ?? null;
    }, [userProgress.moodLogs]);

    const [selectedMood, setSelectedMood] = useState < Mood | null > (todaysMood);

    const handleMoodSelected = (mood: Mood) => {
        setSelectedMood(mood);
        logMood(mood);
    };

    // XP / tier
    const tier = getUserTier(userProgress.level);
    const xpProgress = getXpProgress(userProgress.totalXp);
    const xpNeeded = getXpForLevel(userProgress.level);
    const progressPercent = (xpProgress / xpNeeded) * 100;


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <DailyQuote />

            {/* Tier + XP */}
            <Card variant="soft">
                <View style={styles.tierRow}>
                    <Text style={styles.tierEmoji}>{tier.emoji}</Text>
                    <View style={{ flex: 1 }}>
                        <View style={styles.tierLabelRow}>
                            <Typography variant="label">{tier.name}</Typography>
                            <Typography variant="caption">
                                Lv {userProgress.level}
                            </Typography>
                        </View>
                        <View style={styles.xpBarBg}>
                            <View
                                style={[
                                    styles.xpBarFill,
                                    { width: `${progressPercent}%` as unknown as number },
                                ]}
                            />
                        </View>
                        <Typography variant="micro" style={{ marginTop: 2 }}>
                            {xpProgress} / {xpNeeded} XP
                        </Typography>
                    </View>
                </View>
            </Card>

            {/* Today's Challenge */}
            {todayChallenge && (
                <Card variant="elevated">
                    <View style={styles.challengeHeader}>
                        <Typography variant="overline">
                            Today's Challenge
                        </Typography>
                        <View style={styles.heartsRow}>
                            {[...Array(5)].map((_, i) => (
                                <Heart
                                    key={i}
                                    size={14}
                                    color={
                                        i < todayChallenge.discomfortRating
                                            ? Colors.amber400
                                            : Colors.amber200
                                    }
                                    fill={
                                        i < todayChallenge.discomfortRating
                                            ? Colors.amber400
                                            : 'transparent'
                                    }
                                />
                            ))}
                        </View>
                    </View>
                    <Typography variant="title" style={{ marginTop: 8 }}>
                        {todayChallenge.title}
                    </Typography>
                    <Typography variant="body" style={{ marginTop: 4 }}>
                        {todayChallenge.description}
                    </Typography>
                    
                    <View style={{ marginTop: 16 }}>
                        <Button
                            variant="primary"
                            size="lg"
                            onPress={() =>
                                navigation.navigate('Challenge', {
                                    challenge: todayChallenge,
                                })
                            }
                        >
                            <Text style={styles.btnText}>View Challenge</Text>
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            onPress={() =>
                                navigation.navigate('Challenge', {
                                    challenge: todayChallenge,
                                })
                            }
                            style={{ marginTop: 12 }}
                        >
                            <Text style={styles.secondaryBtnText}>Try Another</Text>
                        </Button>
                    </View>
                </Card>
            )}

            {/* Mood */}
            <MoodCheckIn
                selectedMood={selectedMood}
                onMoodSelected={handleMoodSelected}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.amber50,
    },
    content: {
        padding: Spacing.lg,
        paddingBottom: 100,
        gap: Spacing.lg,
    },
    tierRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    tierEmoji: {
        fontSize: 32,
    },
    tierLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    xpBarBg: {
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.amber200,
        marginTop: 6,
        overflow: 'hidden',
    },
    xpBarFill: {
        height: '100%',
        borderRadius: 3,
        backgroundColor: Colors.amber500,
    },
    challengeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heartsRow: {
        flexDirection: 'row',
        gap: 2,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statPill: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.amber200,
    },
    btnText: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: 15,
    },
    secondaryBtnText: {
        color: Colors.amber700,
        fontWeight: '600',
        fontSize: 15
    },
});

export default HomeScreen;
