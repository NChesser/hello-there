// Types
import type { Challenge } from '../types/types';

// Challenge Database (Tier 1 - Gentle)
export const CHALLENGES: Challenge[] = [
  {
    id: 'greet-1',
    title: 'Morning Greeting',
    description: 'Say "good morning" or nod to someone you pass today',
    exampleScript: [
      '"Morning" with a small smile',
      'Nod and say "good morning"',
      'Wave and say "morning"'
    ],
    discomfortRating: 1,
    category: 'micro-social',
    xpReward: 50
  },
  {
    id: 'thanks-1',
    title: 'Thank Someone',
    description: 'Thank a cashier, barista, or service worker by name if you can see it',
    exampleScript: ['"Thanks so much!"', '"Thank you, [name]"', '"Appreciate it!"'],
    discomfortRating: 1,
    category: 'micro-social',
    xpReward: 50
  },
  {
    id: 'question-1',
    title: 'Ask a Small Question',
    description: 'Ask a stranger a simple question like the time or directions',
    exampleScript: [
      '"Excuse me, do you know what time it is?"',
      '"Which way is [place]?"',
      '"Could you tell me how to get to [place]?"'
    ],
    discomfortRating: 2,
    category: 'interaction',
    xpReward: 75
  },
  {
    id: 'compliment-1',
    title: 'Give a Compliment',
    description: 'Compliment something specific about someone (their shirt, bag, etc)',
    exampleScript: ['"I really like your bag!"', '"That’s a great shirt!"'],
    discomfortRating: 2,
    category: 'micro-social',
    xpReward: 75
  },
  {
    id: 'share-1',
    title: 'Share Something Small',
    description: 'Tell someone about something you enjoyed recently (a show, meal, etc)',
    exampleScript: [
      '"I watched this really good show last night called..."',
      '"I had an amazing meal at [place] recently"'
    ],
    discomfortRating: 2,
    category: 'vulnerability',
    xpReward: 75
  },
  {
    id: 'help-1',
    title: 'Offer Help',
    description: 'Offer to help someone with something small (holding a door, carrying something)',
    discomfortRating: 2,
    category: 'interaction',
    xpReward: 75
  },
  {
    id: 'joke-1',
    title: 'Make a Light Comment',
    description: 'Make a light, friendly observation or comment to someone nearby',
    exampleScript: ['"Wow, it\'s busy today!"', '"Beautiful day, isn\'t it?"', '"Lines are wild today!"'],
    discomfortRating: 3,
    category: 'interaction',
    xpReward: 100
  },

  // Additional Challenges
  {
    id: 'introduce-1',
    title: 'Introduce Yourself',
    description: 'Introduce yourself to someone new in a low-pressure setting',
    exampleScript: ['"Hi, I\'m [name]. Nice to meet you."', '"Hey, I don\'t think we\'ve met — I\'m [name]."'],
    discomfortRating: 3,
    category: 'interaction',
    xpReward: 100
  },
  {
    id: 'smalltalk-1',
    title: 'Start Small Talk',
    description: 'Initiate brief small talk with someone in line or waiting area',
    exampleScript: ['"Have you been here before?"', '"What did you think of that event?"'],
    discomfortRating: 3,
    category: 'micro-social',
    xpReward: 100
  },
  {
    id: 'phonecall-1',
    title: 'Make a Short Phone Call',
    description: 'Call a friend, service, or business for a simple purpose (book, ask, confirm)',
    exampleScript: [
      '"Hi, this is [name]. I\'m calling to confirm my appointment on [date]."',
      '"Hi, could I ask a quick question about [topic]?"'
    ],
    discomfortRating: 4,
    category: 'exposure',
    xpReward: 150
  },
  {
    id: 'ask-favor-1',
    title: 'Ask for a Small Favor',
    description: 'Ask a colleague or acquaintance for a minor favor or help',
    exampleScript: ['"Could you cover my shift for an hour?"', '"Would you mind watching my bag for a sec?"'],
    discomfortRating: 4,
    category: 'assertiveness',
    xpReward: 150
  },
  {
    id: 'apology-1',
    title: 'Offer a Genuine Apology',
    description: 'Apologize sincerely for a small mistake or misunderstanding',
    exampleScript: ['"I\'m sorry about that — I didn\'t mean to interrupt."', '"Sorry, I messed that up. I\'ll fix it."'],
    discomfortRating: 3,
    category: 'vulnerability',
    xpReward: 125
  },
  {
    id: 'share-opinion-1',
    title: 'Share Your Opinion',
    description: 'Express a mild opinion in a group conversation (taste, preference, idea)',
    exampleScript: ['"I actually liked the ending — it felt realistic."', '"I prefer the blue one because..."'],
    discomfortRating: 4,
    category: 'vulnerability',
    xpReward: 150
  },
  {
    id: 'invite-1',
    title: 'Invite Someone',
    description: 'Invite a coworker or acquaintance to coffee or a casual activity',
    exampleScript: ['"Would you like to grab coffee after work?"', '"Want to join me for lunch on Friday?"'],
    discomfortRating: 4,
    category: 'interaction',
    xpReward: 175
  },
  {
    id: 'present-1',
    title: 'Speak Up Briefly',
    description: 'Contribute one thought or question in a meeting or class',
    exampleScript: ['"I have a quick question about that point."', '"I think we could also consider..."'],
    discomfortRating: 5,
    category: 'exposure',
    xpReward: 200
  }
];