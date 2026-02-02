// Type
import type { Habit } from '../types/types';

// Supportive Habits
export const HABITS: Habit[] = [
  {
    id: 'eye-contact',
    title: 'Made Eye Contact',
    description: 'Made eye contact with someone, even briefly',
    icon: '👁️',
    category: 'social'
  },
  {
    id: 'conversation',
    title: 'Had a Conversation',
    description: 'Talked with someone beyond just "hi"',
    icon: '💬',
    category: 'social'
  },
  {
    id: 'left-house',
    title: 'Left the House',
    description: 'Went outside, even just for a walk',
    icon: '🚶',
    category: 'wellbeing'
  },
  {
    id: 'smiled',
    title: 'Smiled at Someone',
    description: 'Gave someone a smile',
    icon: '😊',
    category: 'social'
  },
  {
    id: 'self-care',
    title: 'Self-Care Moment',
    description: 'Did something kind for yourself',
    icon: '🌸',
    category: 'wellbeing'
  },
  {
    id: 'reached-out',
    title: 'Reached Out',
    description: 'Messaged or called someone',
    icon: '📱',
    category: 'social'
  },
  {
    id: 'tried-new',
    title: 'Tried Something New',
    description: 'Did something outside your usual routine',
    icon: '✨',
    category: 'growth'
  },
  {
    id: 'positive-self-talk',
    title: 'Kind to Myself',
    description: 'Practiced positive self-talk',
    icon: '💙',
    category: 'wellbeing'
  }
];

export const HABIT_EXAMPLES: Record<string, string[]> = {
  "eye-contact": [
    "Smile and hold eye contact for 1–2 seconds when saying hello",
    "Make eye contact with the cashier while paying",
    "Look at a colleague for a moment when they speak to you"
  ],
  "conversation": [
    "Ask an open-ended question like 'How was your weekend?'",
    "Share one small thing about your day and ask about theirs",
    "Bring up a shared interest to extend a short exchange"
  ],
  "left-house": [
    "Take a 10–15 minute walk around the block",
    "Go to a nearby park or café for fresh air",
    "Run a quick errand (post office, grocery drop-off)"
  ],
  "smiled": [
    "Give a genuine smile to the barista or cashier",
    "Smile at a neighbor when passing them",
    "Smile at yourself in the mirror for 10 seconds"
  ],
  "self-care": [
    "Take a relaxing shower or a short bath",
    "Read for 15 minutes or listen to calming music",
    "Do a 5–10 minute stretch or breathing exercise"
  ],
  "reached-out": [
    "Send a short message checking in on a friend",
    "Call a family member for 5 minutes to say hi",
    "Reply to someone’s story or post to start a conversation"
  ],
  "tried-new": [
    "Order a cuisine you’ve never tried before",
    "Take a different route to work or walk a new trail",
    "Try a short online tutorial or a new hobby for 20 minutes"
  ],
  "positive-self-talk": [
    "List three things you did well today",
    "Tell yourself one kind sentence: 'I’m doing my best'",
    "Replace 'I failed' with 'I learned something today'"
  ]
};