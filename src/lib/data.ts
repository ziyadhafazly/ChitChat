export type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
};

export type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: string;
};

export type Conversation = {
  messages: Message[];
};

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Alex Sterling",
    avatar: "AS",
    lastMessage: "Sounds good, I'll review the new designs.",
    lastMessageTime: "10:42 AM",
  },
  {
    id: "2",
    name: "Mia Chandler",
    avatar: "MC",
    lastMessage: "Can you send over the project brief?",
    lastMessageTime: "9:15 AM",
  },
  {
    id: "3",
    name: "Project Team",
    avatar: "PT",
    lastMessage: "Let's sync up about the Q3 roadmap.",
    lastMessageTime: "Yesterday",
  },
  {
    id: "4",
    name: "Jordan Lee",
    avatar: "JL",
    lastMessage: "Approved. Great work on this!",
    lastMessageTime: "Yesterday",
  },
  {
    id: "5",
    name: "Casey Diaz",
    avatar: "CD",
    lastMessage: "I've pushed the latest updates to the staging server.",
    lastMessageTime: "2 days ago",
  },
  {
    id: "6",
    name: "Taylor Brooks",
    avatar: "TB",
    lastMessage: "What are your thoughts on the new feature?",
    lastMessageTime: "3 days ago",
  },
];

export const conversations: Record<string, Conversation> = {
  "1": {
    messages: [
      {
        id: "m1-1",
        text: "Hey Alex, I've finished the initial mockups for the new landing page. Let me know what you think.",
        sender: "me",
        timestamp: "10:30 AM",
      },
      {
        id: "m1-2",
        text: "Awesome, sending them over now.",
        sender: "them",
        timestamp: "10:31 AM",
      },
      {
        id: "m1-3",
        text: "These look great! I have a few minor feedback points, mostly around the CTA placement.",
        sender: "me",
        timestamp: "10:40 AM",
      },
      {
        id: "m1-4",
        text: "Sounds good, I'll review the new designs.",
        sender: "them",
        timestamp: "10:42 AM",
      },
    ],
  },
  "2": {
    messages: [
      {
        id: "m2-1",
        text: "Hi Mia, I'm starting on the new project and need the brief.",
        sender: "me",
        timestamp: "9:14 AM",
      },
      {
        id: "m2-2",
        text: "Can you send over the project brief?",
        sender: "them",
        timestamp: "9:15 AM",
      },
    ],
  },
  "3": {
    messages: [
      {
        id: "m3-1",
        text: "Let's sync up about the Q3 roadmap.",
        sender: "them",
        timestamp: "Yesterday",
      },
    ],
  },
  "4": {
    messages: [
       {
        id: "m4-1",
        text: "Approved. Great work on this!",
        sender: "them",
        timestamp: "Yesterday",
      },
    ]
  },
  "5": {
    messages: [
      {
        id: "m5-1",
        text: "I've pushed the latest updates to the staging server.",
        sender: "them",
        timestamp: "2 days ago",
      }
    ]
  },
  "6": {
    messages: [
       {
        id: "m6-1",
        text: "What are your thoughts on the new feature?",
        sender: "them",
        timestamp: "3 days ago",
      }
    ]
  }
};
