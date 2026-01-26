// Types
import type { Challenge } from '../types/types';

// Challenge Database (Tier 1 - Gentle)
export const CHALLENGES: Challenge[] = [
  {
    id: 'greet-1',
    title: 'Morning Greeting',
    description: 'Say "good morning" or nod to someone you pass today',
    exampleScript: 'A simple "morning" with a small smile is enough',
    discomfortRating: 1,
    category: 'micro-social',
    xpReward: 50
  },
  {
    id: 'thanks-1',
    title: 'Thank Someone',
    description: 'Thank a cashier, barista, or service worker by name if you can see it',
    exampleScript: '"Thanks so much!" or "Thank you, [name]"',
    discomfortRating: 1,
    category: 'micro-social',
    xpReward: 50
  },
  {
    id: 'question-1',
    title: 'Ask a Small Question',
    description: 'Ask a stranger a simple question like the time or directions',
    exampleScript: '"Excuse me, do you know what time it is?" or "Which way is [place]?"',
    discomfortRating: 2,
    category: 'interaction',
    xpReward: 75
  },
  {
    id: 'compliment-1',
    title: 'Give a Compliment',
    description: 'Compliment something specific about someone (their shirt, bag, etc)',
    exampleScript: '"I really like your bag!" then you can walk away - no need to continue',
    discomfortRating: 2,
    category: 'micro-social',
    xpReward: 75
  },
  {
    id: 'share-1',
    title: 'Share Something Small',
    description: 'Tell someone about something you enjoyed recently (a show, meal, etc)',
    exampleScript: '"I watched this really good show last night called..."',
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
    exampleScript: 'In a line: "Wow, it\'s busy today!" Weather: "Beautiful day, isn\'t it?"',
    discomfortRating: 3,
    category: 'interaction',
    xpReward: 100
  }
];