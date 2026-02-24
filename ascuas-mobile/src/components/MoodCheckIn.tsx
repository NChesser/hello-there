import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Mood } from '../types/types';
import { Colors, Radius, Spacing } from '../theme/colors';

const MOODS: { mood: Mood; emoji: string; label: string }[] = [
  { mood: 'overwhelmed', emoji: '\u{1F630}', label: 'Overwhelmed' },
  { mood: 'nervous', emoji: '\u{1F61F}', label: 'Nervous' },
  { mood: 'okay', emoji: '\u{1F60A}', label: 'Okay' },
  { mood: 'good', emoji: '\u{1F604}', label: 'Good' },
  { mood: 'brave', emoji: '\u{1F981}', label: 'Brave' },
];

interface MoodCheckInProps {
  selectedMood: Mood | null;
  onMoodSelected: (mood: Mood) => void;
}

const MoodCheckIn: React.FC<MoodCheckInProps> = ({
  selectedMood,
  onMoodSelected,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <View style={styles.row}>
        {MOODS.map(({ mood, emoji, label }) => {
          const isSelected = selectedMood === mood;
          return (
            <TouchableOpacity
              key={mood}
              onPress={() => onMoodSelected(mood)}
              style={[styles.moodBtn, isSelected && styles.moodBtnSelected]}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{emoji}</Text>
              <Text
                style={[
                  styles.label,
                  isSelected && styles.labelSelected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.amber200,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.amber800,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodBtn: {
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
  },
  moodBtnSelected: {
    borderColor: Colors.amber400,
    backgroundColor: Colors.amber50,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    color: Colors.gray500,
  },
  labelSelected: {
    color: Colors.amber700,
    fontWeight: '600',
  },
});

export default MoodCheckIn;
