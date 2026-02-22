// Types
import type { Challenge } from '../types/types';

// ── Micro-Social ─────────────────────────────────────────────
// Quick, low-barrier interactions that build the habit of engaging.

const MICRO_SOCIAL: Challenge[] = [
  {
    id: 'greet-1',
    title: 'Morning Greeting',
    description: 'Say "good morning" or nod to someone you pass today',
    exampleScript: [
      '"Morning" with a small smile',
      'Nod and say "good morning"',
      'Wave and say "morning"',
    ],
    remember: 'You don\'t need to stop walking — a brief moment is enough.',
    discomfortRating: 1,
    category: 'micro-social',
    xpReward: 50,
  },
  {
    id: 'thanks-1',
    title: 'Thank Someone by Name',
    description: 'Thank a cashier, barista, or service worker — use their name if you can see it',
    exampleScript: ['"Thanks so much, [name]!"', '"I appreciate it!"'],
    discomfortRating: 1,
    category: 'micro-social',
    xpReward: 50,
  },
  {
    id: 'compliment-1',
    title: 'Give a Specific Compliment',
    description: 'Compliment something specific about someone — their shirt, bag, work, etc.',
    exampleScript: ['"I really like your bag!"', '"That\'s a great shirt!"', '"Nice choice of colour!"'],
    discomfortRating: 2,
    category: 'micro-social',
    xpReward: 75,
  },
  {
    id: 'smalltalk-1',
    title: 'Start Small Talk',
    description: 'Initiate brief small talk with someone in line or in a waiting area',
    exampleScript: ['"Have you been here before?"', '"Busy day, huh?"'],
    discomfortRating: 3,
    category: 'micro-social',
    xpReward: 100,
  },
  {
    id: 'hold-eye-contact-1',
    title: 'Hold Eye Contact',
    description: 'Maintain comfortable eye contact for 2-3 seconds while greeting someone',
    remember: 'Soft eyes, not a stare — glance at the bridge of their nose if it helps.',
    discomfortRating: 2,
    category: 'micro-social',
    xpReward: 75,
  },
  {
    id: 'wave-neighbor-1',
    title: 'Acknowledge a Neighbour',
    description: 'Wave, nod, or say hi to a neighbour you usually walk past in silence',
    exampleScript: ['"Hey! How\'s it going?"', 'A smile and a wave'],
    discomfortRating: 1,
    category: 'micro-social',
    xpReward: 50,
  },
];

// ── Interaction ──────────────────────────────────────────────
// Two-way exchanges that require a bit more back-and-forth.

const INTERACTION: Challenge[] = [
  {
    id: 'question-1',
    title: 'Ask a Small Question',
    description: 'Ask a stranger a simple question like the time, directions, or a recommendation',
    exampleScript: [
      '"Excuse me, do you know what time it is?"',
      '"Which way is [place]?"',
      '"Do you know a good coffee spot around here?"',
    ],
    discomfortRating: 2,
    category: 'interaction',
    xpReward: 75,
  },
  {
    id: 'help-1',
    title: 'Offer Help',
    description: 'Offer to help someone with something small — holding a door, picking something up',
    exampleScript: ['"Let me get that for you."', '"Need a hand?"'],
    discomfortRating: 2,
    category: 'interaction',
    xpReward: 75,
  },
  {
    id: 'joke-1',
    title: 'Make a Light Comment',
    description: 'Make a light, friendly observation to someone nearby',
    exampleScript: ['"Wow, it\'s busy today!"', '"Beautiful day, isn\'t it?"', '"Lines are wild today!"'],
    discomfortRating: 3,
    category: 'interaction',
    xpReward: 100,
  },
  {
    id: 'introduce-1',
    title: 'Introduce Yourself',
    description: 'Introduce yourself to someone new in a low-pressure setting',
    exampleScript: ['"Hi, I\'m [name]. Nice to meet you."', '"Hey, I don\'t think we\'ve met — I\'m [name]."'],
    discomfortRating: 3,
    category: 'interaction',
    xpReward: 100,
  },
  {
    id: 'invite-1',
    title: 'Invite Someone',
    description: 'Invite a coworker or acquaintance to coffee, lunch, or a casual activity',
    exampleScript: ['"Would you like to grab coffee after work?"', '"Want to join me for lunch on Friday?"'],
    discomfortRating: 4,
    category: 'interaction',
    xpReward: 175,
  },
  {
    id: 'join-conversation-1',
    title: 'Join an Existing Conversation',
    description: 'Approach a group already chatting and add yourself naturally',
    exampleScript: ['"Oh, are you talking about [topic]? I love that."', '"Mind if I join you?"'],
    remember: 'Wait for a natural pause, then add a comment that shows you\'ve been listening.',
    discomfortRating: 4,
    category: 'interaction',
    xpReward: 150,
  },
  {
    id: 'ask-recommendation-1',
    title: 'Ask for a Recommendation',
    description: 'Ask someone what they\'d recommend — a place to eat, something to watch, a book to read',
    exampleScript: ['"Know any good places to eat around here?"', '"Read anything good lately?"'],
    discomfortRating: 2,
    category: 'interaction',
    xpReward: 75,
  },
];

// ── Vulnerability ────────────────────────────────────────────
// Sharing something real about yourself — thoughts, feelings, preferences.

const VULNERABILITY: Challenge[] = [
  {
    id: 'share-1',
    title: 'Share Something Small',
    description: 'Tell someone about something you enjoyed recently — a show, meal, song, etc.',
    exampleScript: [
      '"I watched this really good show last night called..."',
      '"I had an amazing meal at [place] recently"',
    ],
    discomfortRating: 2,
    category: 'vulnerability',
    xpReward: 75,
  },
  {
    id: 'apology-1',
    title: 'Offer a Genuine Apology',
    description: 'Apologize sincerely for a small mistake or misunderstanding',
    exampleScript: ['"I\'m sorry about that — I didn\'t mean to interrupt."', '"Sorry, I messed that up. I\'ll fix it."'],
    remember: 'A short, genuine apology lands better than a long, over-explained one.',
    discomfortRating: 3,
    category: 'vulnerability',
    xpReward: 125,
  },
  {
    id: 'share-opinion-1',
    title: 'Share Your Opinion',
    description: 'Express a mild opinion in a group conversation — a taste, preference, or idea',
    exampleScript: ['"I actually liked the ending — it felt realistic."', '"I prefer the blue one because..."'],
    discomfortRating: 4,
    category: 'vulnerability',
    xpReward: 150,
  },
  {
    id: 'admit-dont-know-1',
    title: 'Admit You Don\'t Know',
    description: 'Say "I don\'t know" or "I\'m not sure" instead of pretending',
    exampleScript: ['"Honestly, I\'m not sure — what do you think?"', '"I don\'t know much about that. Tell me more?"'],
    remember: 'Admitting you don\'t know often makes people respect you more, not less.',
    discomfortRating: 3,
    category: 'vulnerability',
    xpReward: 100,
  },
  {
    id: 'share-struggle-1',
    title: 'Share a Small Struggle',
    description: 'Mention something you found tough recently — nothing heavy, just honest',
    exampleScript: ['"This week has been a lot, honestly."', '"I\'ve been finding it hard to focus lately."'],
    remember: 'Vulnerability builds trust. You don\'t have to share everything — just one honest sentence.',
    discomfortRating: 4,
    category: 'vulnerability',
    xpReward: 150,
  },
];

// ── Rejection Practice ───────────────────────────────────────
// Deliberately practising hearing "no" so it loses its sting.

const REJECTION: Challenge[] = [
  {
    id: 'ask-discount-1',
    title: 'Ask for a Discount',
    description: 'Ask a shop or cafe if they have any discounts, deals, or student offers',
    exampleScript: ['"Do you have any offers on today?"', '"Is there a student discount?"'],
    remember: 'The goal isn\'t the discount — it\'s proving that a "no" is completely fine.',
    discomfortRating: 3,
    category: 'rejection',
    xpReward: 125,
  },
  {
    id: 'request-unusual-1',
    title: 'Make an Unusual Request',
    description: 'Ask for something slightly unusual — a different table, extra napkins, a taste of something',
    exampleScript: ['"Could we sit at that table instead?"', '"Could I try a sample of that flavour?"'],
    discomfortRating: 3,
    category: 'rejection',
    xpReward: 125,
  },
  {
    id: 'ask-stranger-photo-1',
    title: 'Ask a Stranger for a Photo',
    description: 'Ask someone if they\'d take a quick photo of you in a nice spot',
    exampleScript: ['"Excuse me, would you mind taking a quick photo of me?"'],
    remember: 'Most people are happy to help — and even if they can\'t, it\'s no big deal.',
    discomfortRating: 3,
    category: 'rejection',
    xpReward: 100,
  },
  {
    id: 'suggest-plan-change-1',
    title: 'Suggest a Plan Change',
    description: 'When plans are being made, suggest a different option and see what happens',
    exampleScript: ['"What if we tried [place] instead?"', '"How about we do [activity] this time?"'],
    discomfortRating: 3,
    category: 'rejection',
    xpReward: 125,
  },
];

// ── Exposure ─────────────────────────────────────────────────
// Putting yourself in social situations that feel uncomfortable but are safe.

const EXPOSURE: Challenge[] = [
  {
    id: 'phonecall-1',
    title: 'Make a Short Phone Call',
    description: 'Call a friend, service, or business for a simple purpose — book, ask, or confirm',
    exampleScript: [
      '"Hi, this is [name]. I\'m calling to confirm my appointment on [date]."',
      '"Hi, could I ask a quick question about [topic]?"',
    ],
    discomfortRating: 4,
    category: 'exposure',
    xpReward: 150,
  },
  {
    id: 'present-1',
    title: 'Speak Up in a Meeting',
    description: 'Contribute one thought, question, or observation in a meeting or class',
    exampleScript: ['"I have a quick question about that point."', '"I think we could also consider..."'],
    discomfortRating: 5,
    category: 'exposure',
    xpReward: 200,
  },
  {
    id: 'eat-alone-public-1',
    title: 'Eat Alone in Public',
    description: 'Sit down and eat a meal or have coffee alone at a cafe or restaurant',
    remember: 'Nobody is watching as closely as you think. Bring a book if it helps at first.',
    discomfortRating: 3,
    category: 'exposure',
    xpReward: 100,
  },
  {
    id: 'attend-event-solo-1',
    title: 'Attend an Event Solo',
    description: 'Go to a meetup, class, gig, or community event by yourself',
    remember: 'Showing up is the hard part. Once you\'re there, you only need to stay as long as you want.',
    discomfortRating: 5,
    category: 'exposure',
    xpReward: 200,
  },
  {
    id: 'return-item-1',
    title: 'Return or Exchange Something',
    description: 'Bring something back to a shop and ask for a return or exchange',
    exampleScript: ['"Hi, I\'d like to return this. I have the receipt."', '"Could I exchange this for a different size?"'],
    discomfortRating: 3,
    category: 'exposure',
    xpReward: 125,
  },
];

// ── Assertiveness ────────────────────────────────────────────
// Standing up for yourself politely and clearly.

const ASSERTIVENESS: Challenge[] = [
  {
    id: 'ask-favor-1',
    title: 'Ask for a Small Favour',
    description: 'Ask a colleague or acquaintance for a minor favour or help',
    exampleScript: ['"Could you cover for me for an hour?"', '"Would you mind watching my bag for a sec?"'],
    discomfortRating: 4,
    category: 'assertiveness',
    xpReward: 150,
  },
  {
    id: 'say-no-politely-1',
    title: 'Say No Politely',
    description: 'Decline an invitation or request without over-explaining',
    exampleScript: ['"Thanks, but I can\'t make it this time."', '"I appreciate it, but I\'ll pass."'],
    remember: '"No" is a complete sentence. You can be kind without giving a reason.',
    discomfortRating: 4,
    category: 'assertiveness',
    xpReward: 150,
  },
  {
    id: 'send-food-back-1',
    title: 'Send Something Back',
    description: 'Politely let staff know if your order is wrong and ask for it to be fixed',
    exampleScript: ['"Sorry, I think this isn\'t what I ordered — could I swap it?"', '"This is cold, could I get a fresh one?"'],
    remember: 'You\'re not being rude — you\'re practising a normal, reasonable interaction.',
    discomfortRating: 4,
    category: 'assertiveness',
    xpReward: 150,
  },
  {
    id: 'set-boundary-1',
    title: 'Set a Small Boundary',
    description: 'Let someone know a preference or limit — where to sit, when to leave, what you need',
    exampleScript: ['"I\'d prefer to sit over here, if that\'s okay."', '"I need to head out by 9, just so you know."'],
    discomfortRating: 4,
    category: 'assertiveness',
    xpReward: 150,
  },
];

// ── Wellbeing ────────────────────────────────────────────────
// Self-care actions that support social confidence indirectly.

const WELLBEING: Challenge[] = [
  {
    id: 'journal-feeling-1',
    title: 'Journal One Social Feeling',
    description: 'Write 2-3 sentences about how a social moment made you feel today',
    remember: 'There\'s no wrong answer. Just noticing the feeling is the practice.',
    discomfortRating: 1,
    category: 'wellbeing',
    xpReward: 50,
  },
  {
    id: 'celebrate-win-1',
    title: 'Name a Social Win',
    description: 'Think of one social thing you did today — however small — and give yourself credit',
    remember: 'Saying hi counts. Making eye contact counts. Showing up counts.',
    discomfortRating: 1,
    category: 'wellbeing',
    xpReward: 50,
  },
  {
    id: 'social-rest-1',
    title: 'Take a Social Rest',
    description: 'After a draining interaction, take 10 minutes alone to recharge — no guilt',
    remember: 'Resting isn\'t avoiding. It\'s maintaining your energy so you can keep going.',
    discomfortRating: 1,
    category: 'wellbeing',
    xpReward: 50,
  },
];

// ── Growth ───────────────────────────────────────────────────
// Longer-arc challenges that push your comfort zone meaningfully.

const GROWTH: Challenge[] = [
  {
    id: 'learn-name-1',
    title: 'Learn and Use a Name',
    description: 'Ask someone\'s name, remember it, and use it once in conversation',
    exampleScript: ['"I\'m sorry, what was your name again?"', '"Nice to meet you, [name]!"'],
    remember: 'Using someone\'s name makes them feel seen — and helps you remember.',
    discomfortRating: 3,
    category: 'growth',
    xpReward: 100,
  },
  {
    id: 'follow-up-convo-1',
    title: 'Follow Up on a Past Chat',
    description: 'Reference something from a previous conversation to show you remembered',
    exampleScript: ['"Hey, how did that thing you mentioned go?"', '"Did you end up trying that restaurant?"'],
    discomfortRating: 3,
    category: 'growth',
    xpReward: 125,
  },
  {
    id: 'ask-deeper-1',
    title: 'Ask a Deeper Question',
    description: 'Move past small talk with one thoughtful question',
    exampleScript: ['"What got you into that?"', '"What\'s been the best part of your week?"'],
    discomfortRating: 4,
    category: 'growth',
    xpReward: 150,
  },
  {
    id: 'initiate-plan-1',
    title: 'Initiate a Plan',
    description: 'Be the one to suggest a time and place — don\'t wait for someone else to organise',
    exampleScript: ['"Want to grab lunch on Thursday at [place]?"', '"How about we meet at the park on Saturday?"'],
    remember: 'Taking the initiative shows you care. Most people are glad someone else planned.',
    discomfortRating: 4,
    category: 'growth',
    xpReward: 150,
  },
];

// ── Export all challenges ────────────────────────────────────

export const CHALLENGES: Challenge[] = [
  ...MICRO_SOCIAL,
  ...INTERACTION,
  ...VULNERABILITY,
  ...REJECTION,
  ...EXPOSURE,
  ...ASSERTIVENESS,
  ...WELLBEING,
  ...GROWTH,
];
