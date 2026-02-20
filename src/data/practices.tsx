// Type
import {
    Calendar,
    Eye,
    Heart,
    Leaf,
    MessageCircle,
    MessageSquare,
    Send,
    Shield,
    Smile,
    Sparkles,
} from "lucide-react";
import type { Practice } from "../types/types";

// Supportive Practices
export const PRACTICES: Practice[] = [
    {
        id: "brief-eye-contact",
        title: "Brief Eye Contact",
        description: "Hold eye contact for a second to signal friendliness",
        icon: Eye,
        category: "social",
    },
    {
        id: "warm-greeting",
        title: "Warm Greeting",
        description: "Say hello with a relaxed smile to one person",
        icon: Smile,
        category: "social",
    },
      {
        id: "start-small-chat",
        title: "Start a Small Chat",
        description: "Open a short conversation with one simple question",
        icon: MessageCircle,
        category: "social",
    },
    {
        id: "add-comment",
        title: "Add One Comment",
        description: "Contribute one sentence in a group setting",
        icon: MessageSquare,
        category: "social",
    },
    {
        id: "approach-interest",
        title: "Approach Someone You Like",
        description: "Say a friendly hello to someone you are interested in",
        icon: Heart,
        category: "growth",
    },
    {
        id: "share-small-detail",
        title: "Share a Small Detail",
        description: "Offer one personal detail to build connection",
        icon: Sparkles,
        category: "growth",
    },
    {
        id: "handle-no",
        title: "Handle a No Gracefully",
        description: "Practice a calm response to a no or maybe",
        icon: Shield,
        category: "growth",
    },
    {
        id: "follow-up",
        title: "Follow Up",
        description: "Send a simple follow-up to deepen a connection",
        icon: Send,
        category: "social",
    },
    {
        id: "low-key-invite",
        title: "Low-Key Invite",
        description: "Invite someone to a simple, low-pressure hangout",
        icon: Calendar,
        category: "growth",
    },
    {
        id: "reset-before-social",
        title: "Reset Before Social",
        description: "Take a 2-minute reset to feel grounded",
        icon: Leaf,
        category: "wellbeing",
    },
];

export const PRACTICE_EXAMPLES: Record<string, string[]> = {
    "warm-greeting": [
        "Say hello to a neighbor or coworker as you pass",
        "Greet the barista with a smile and a thank you",
        "Wave and say hi to someone in your building",
    ],
    "brief-eye-contact": [
        "Look up and hold eye contact for 1-2 seconds when greeting",
        "Make eye contact with the cashier while paying",
        "Glance at a colleague when they speak and nod once",
    ],
    "start-small-chat": [
        "Ask one open-ended question and listen for the answer",
        "Share one small thing about your day and ask about theirs",
        "Use a follow-up like 'How did that go?'",
    ],
    "join-group": [
        "Stand with a group for 60 seconds and listen",
        "Join a circle and make one small nod or smile",
        "Take a seat at a table where people are talking",
    ],
    "add-comment": [
        "Add one sentence like 'That makes sense' or 'Same here'",
        "Answer a direct question with one extra detail",
        "Offer a simple observation about the topic",
    ],
    "approach-interest": [
        "Say hi and introduce yourself with your name",
        "Give a simple compliment and move on if needed",
        "Ask a light question like 'How is your day going?'",
    ],
    "share-small-detail": [
        "Share one small preference (music, food, hobby)",
        "Mention a recent win or fun moment from your week",
        "Say one thing you are looking forward to",
    ],
    "handle-no": [
        "Respond with 'All good, thanks anyway'",
        "Practice a calm 'No worries, maybe next time'",
        "Say 'Thanks for letting me know' and move on",
    ],
    "follow-up": [
        "Send a quick 'Nice chatting today' text",
        "Share a link or idea related to your conversation",
        "Check in with a short 'How did it go?'",
    ],
    "low-key-invite": [
        "Ask someone to grab coffee or a short walk",
        "Invite a friend to join a casual event",
        "Suggest a simple hangout with a clear time",
    ],
    "reset-before-social": [
        "Take 5 slow breaths and relax your shoulders",
        "Do a 2-minute walk to settle your nerves",
        "Repeat a calm phrase like 'I can do one small step'",
    ],
};
