// Types
import {
  Brain,
  Calendar,
  Eye,
  HandHeart,
  Handshake,
  Heart,
  Leaf,
  Lightbulb,
  MessageCircle,
  MessageSquare,
  Mic,
  Phone,
  Send,
  Shield,
  Smile,
  Sparkles,
  SunMedium,
  ThumbsUp,
  Users,
} from 'lucide-react';
import type { Practice } from '../types/types';

// ── Social ───────────────────────────────────────────────────
// Everyday interactions that build your social muscle.

const SOCIAL: Practice[] = [
  {
    id: 'brief-eye-contact',
    title: 'Brief Eye Contact',
    description: 'Hold eye contact for a second to signal friendliness',
    icon: Eye,
    category: 'social',
    hint: 'Catch their eye as you walk past — a quick glance and a micro-smile is all it takes. Look at the bridge of their nose if direct eye contact feels too intense.',
  },
  {
    id: 'warm-greeting',
    title: 'Warm Greeting',
    description: 'Say hello with a relaxed smile to one person',
    icon: Smile,
    category: 'social',
    hint: 'Pick someone who looks approachable — someone waiting, walking slowly, or already glancing your way. A simple "hey" with a nod works perfectly.',
  },
  {
    id: 'start-small-chat',
    title: 'Start a Small Chat',
    description: 'Open a short conversation with one simple question',
    icon: MessageCircle,
    category: 'social',
    hint: 'Use your surroundings as a starter — comment on the weather, the queue, or something nearby. People are more receptive when they are idle (waiting, sitting alone).',
  },
  {
    id: 'add-comment',
    title: 'Add One Comment',
    description: 'Contribute one sentence in a group setting',
    icon: MessageSquare,
    category: 'social',
    hint: 'You don\'t need something brilliant — agreeing, asking a short question, or reacting ("That\'s cool!") all count. Aim for the next natural pause.',
  },
  {
    id: 'follow-up',
    title: 'Follow Up',
    description: 'Send a simple follow-up to deepen a connection',
    icon: Send,
    category: 'social',
    hint: 'A quick message the same day or next morning keeps momentum. Reference something specific from the chat so they know you were listening.',
  },
  {
    id: 'speak-up-in-group',
    title: 'Speak Up in a Group',
    description: 'Share your opinion or an idea in a group of three or more',
    icon: Mic,
    category: 'social',
    hint: 'Start with agreement ("Yeah, I think so too") then add one extra thought. Speaking early is easier than waiting — the longer you wait, the harder it feels.',
  },
];

// ── Connection ───────────────────────────────────────────────
// Deeper relationship-building actions.

const CONNECTION: Practice[] = [
  {
    id: 'give-compliment',
    title: 'Give a Genuine Compliment',
    description: 'Notice something positive and say it out loud',
    icon: ThumbsUp,
    category: 'connection',
    hint: 'Be specific — "Great shirt" lands better than "You look nice." Deliver it casually and move on; lingering makes it awkward for both of you.',
  },
  {
    id: 'active-listening',
    title: 'Practice Active Listening',
    description: 'Focus fully on what someone is saying without planning your reply',
    icon: HandHeart,
    category: 'connection',
    hint: 'Put your phone away, face them, and nod. When they finish, reflect back what you heard ("So you\'re saying...") before adding your own thought.',
  },
  {
    id: 'reconnect-old-friend',
    title: 'Reconnect with Someone',
    description: 'Reach out to someone you haven\'t spoken to in a while',
    icon: Phone,
    category: 'connection',
    hint: 'Don\'t overthink the opening — "Hey! Been thinking of you, how have you been?" is enough. Sharing a memory or a relevant link makes it feel natural.',
  },
];

// ── Growth ───────────────────────────────────────────────────
// Stretching your comfort zone with bigger social steps.

const GROWTH: Practice[] = [
  {
    id: 'approach-interest',
    title: 'Approach Someone You Like',
    description: 'Say a friendly hello to someone you are interested in',
    icon: Heart,
    category: 'growth',
    hint: 'Approach when they\'re not rushed or buried in their phone. Open with something situational ("Is this seat taken?" / "Have you tried the...?") rather than a rehearsed line. Keep it light — the goal is just to say hi, not to impress.',
  },
  {
    id: 'share-small-detail',
    title: 'Share a Small Detail',
    description: 'Offer one personal detail to build connection',
    icon: Sparkles,
    category: 'growth',
    hint: 'Match the depth of what they\'ve shared. If they mention their weekend, share something about yours. One genuine detail beats three surface-level facts.',
  },
  {
    id: 'handle-no',
    title: 'Handle a No Gracefully',
    description: 'Practice a calm response to a no or maybe',
    icon: Shield,
    category: 'growth',
    hint: 'Prepare a go-to response before you need it — "No worries at all!" said with a smile. A graceful exit makes you more approachable next time.',
  },
  {
    id: 'low-key-invite',
    title: 'Low-Key Invite',
    description: 'Invite someone to a simple, low-pressure hangout',
    icon: Calendar,
    category: 'growth',
    hint: 'Suggest something specific with an easy out — "I\'m grabbing coffee at 3, want to come?" feels lighter than "We should hang out sometime." A time and place removes ambiguity.',
  },
  {
    id: 'ask-deeper-question',
    title: 'Ask a Deeper Question',
    description: 'Go beyond small talk with one thoughtful question',
    icon: Lightbulb,
    category: 'growth',
    hint: 'Follow up on something they already mentioned — "What got you into that?" or "What\'s been the best part?" People love talking about their passions.',
  },
  {
    id: 'join-group-activity',
    title: 'Join a Group Activity',
    description: 'Show up to a club, class, or event with other people',
    icon: Users,
    category: 'growth',
    hint: 'Arrive a few minutes early — it\'s easier to chat before things start. You only need to stay as long as you want. Just showing up is a win.',
  },
];

// ── Mindset ──────────────────────────────────────────────────
// Internal shifts that make social moments easier.

const MINDSET: Practice[] = [
  {
    id: 'reframe-thought',
    title: 'Reframe a Negative Thought',
    description: 'Catch one anxious thought and rephrase it more kindly',
    icon: Brain,
    category: 'mindset',
    hint: 'Write the anxious thought down, then ask "Would I say this to a friend?" Rewrite it as if you were encouraging someone you care about.',
  },
  {
    id: 'morning-intention',
    title: 'Set a Morning Intention',
    description: 'Choose one small social goal before your day begins',
    icon: SunMedium,
    category: 'mindset',
    hint: 'Keep it tiny and specific — "I\'ll smile at one person on my walk" beats "I\'ll be more social today." Write it on a sticky note or set a phone reminder.',
  },
];

// ── Wellbeing ────────────────────────────────────────────────
// Self-care that supports your social confidence.

const WELLBEING: Practice[] = [
  {
    id: 'reset-before-social',
    title: 'Reset Before Social',
    description: 'Take a 2-minute reset to feel grounded',
    icon: Leaf,
    category: 'wellbeing',
    hint: 'Step outside, take five slow breaths, and relax your shoulders. Arriving calm makes everything easier.',
  },
  {
    id: 'celebrate-small-win',
    title: 'Celebrate a Small Win',
    description: 'Acknowledge one thing you did well socially today',
    icon: Handshake,
    category: 'wellbeing',
    hint: 'Saying hi counts. Making eye contact counts. Showing up counts. Name it out loud or write it down — your brain learns from what you notice.',
  },
];

// ── Export ────────────────────────────────────────────────────

export const PRACTICES: Practice[] = [
  ...SOCIAL,
  ...CONNECTION,
  ...GROWTH,
  ...MINDSET,
  ...WELLBEING,
];

// ── Examples ─────────────────────────────────────────────────
// Concrete phrases and actions shown on the practice detail screen.

export const PRACTICE_EXAMPLES: Record<string, string[]> = {
  // Social
  'brief-eye-contact': [
    'Look up and hold eye contact for 1-2 seconds when greeting',
    'Make eye contact with the cashier while paying',
    'Glance at a colleague when they speak and nod once',
  ],
  'warm-greeting': [
    'Say hello to a neighbour or coworker as you pass',
    'Greet the barista with a smile and a thank you',
    'Wave and say hi to someone in your building',
  ],
  'start-small-chat': [
    'Ask one open-ended question and listen for the answer',
    'Share one small thing about your day and ask about theirs',
    'Comment on something nearby: "Busy today, huh?"',
  ],
  'add-comment': [
    'Add one sentence like "That makes sense" or "Same here"',
    'Answer a direct question with one extra detail',
    'Offer a simple observation about the topic',
  ],
  'follow-up': [
    'Send a quick "Nice chatting today" text',
    'Share a link or idea related to your conversation',
    'Check in with a short "How did it go?"',
  ],
  'speak-up-in-group': [
    'Share a quick opinion: "I think..." or "In my experience..."',
    'Agree with someone and add a detail',
    'Ask the group a question to steer the topic',
  ],

  // Connection
  'give-compliment': [
    'Tell someone you like their outfit or style',
    'Thank someone for something specific they did',
    'Say "I really appreciate how you..." to a friend',
  ],
  'active-listening': [
    'Nod and maintain eye contact while they speak',
    'Repeat back what they said: "So you\'re saying..."',
    'Ask a follow-up about something they mentioned',
  ],
  'reconnect-old-friend': [
    'Send a text: "Hey! Been thinking about you. How are things?"',
    'Share a memory: "Remember when we...?"',
    'Forward something relevant: "Saw this and thought of you"',
  ],

  // Growth
  'approach-interest': [
    'Say hi and introduce yourself with your name',
    'Give a simple compliment and move on if needed',
    'Ask a light question like "How is your day going?"',
  ],
  'share-small-detail': [
    'Share one small preference (music, food, hobby)',
    'Mention a recent win or fun moment from your week',
    'Say one thing you are looking forward to',
  ],
  'handle-no': [
    'Respond with "All good, thanks anyway"',
    'Practice a calm "No worries, maybe next time"',
    'Say "Thanks for letting me know" and move on',
  ],
  'low-key-invite': [
    'Ask someone to grab coffee or a short walk',
    'Invite a friend to join a casual event',
    'Suggest a simple hangout with a clear time',
  ],
  'ask-deeper-question': [
    'Ask "What\'s been the highlight of your week?"',
    'Try "What got you interested in that?"',
    'Say "What do you enjoy most about it?"',
  ],
  'join-group-activity': [
    'Attend a free community event or meetup',
    'Show up to a gym class or hobby group',
    'Join an online community call or game night',
  ],

  // Mindset
  'reframe-thought': [
    'Replace "They\'ll think I\'m weird" with "Most people don\'t judge as harshly as I think"',
    'Change "I always mess up" to "I\'m learning and getting better"',
    'Turn "I can\'t do this" into "I can try one small part"',
  ],
  'morning-intention': [
    'Say "Today I\'ll smile at one stranger"',
    'Write down "I\'ll ask one question in conversation"',
    'Set the goal "I\'ll stay present during one interaction"',
  ],

  // Wellbeing
  'reset-before-social': [
    'Take 5 slow breaths and relax your shoulders',
    'Do a 2-minute walk to settle your nerves',
    'Repeat a calm phrase like "I can do one small step"',
  ],
  'celebrate-small-win': [
    'Write down one social moment you\'re proud of today',
    'Tell a friend about something brave you did',
    'Give yourself credit: "I showed up and that counts"',
  ],
};
