"use client";

import type { Contact, Conversation, Message } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import { Logo } from "@/components/icons";

interface ChatAreaProps {
  contact: Contact | null;
  conversation: Conversation | null;
  onSendMessage: (contactId: string, text: string) => void;
}

export default function ChatArea({
  contact,
  conversation,
  onSendMessage,
}: ChatAreaProps) {
  if (!contact || !conversation) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center bg-muted/40">
        <Logo className="w-20 h-20 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold text-foreground">Welcome to Chit Chat</h2>
        <p className="text-muted-foreground mt-2">
          Select a conversation to start messaging.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-4 border-b border-border flex items-center gap-4">
        <Avatar className="h-10 w-10">
           <AvatarImage src={`https://placehold.co/40x40.png?text=${contact.avatar}`} alt={contact.name} />
           <AvatarFallback>{contact.avatar}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{contact.name}</h2>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
      </header>
      <MessageList messages={conversation.messages} avatar={contact.avatar} />
      <MessageInput
        conversation={conversation}
        onSendMessage={(text) => onSendMessage(contact.id, text)}
      />
    </div>
  );
}
