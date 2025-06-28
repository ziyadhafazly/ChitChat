"use client";

import { useState, useEffect } from "react";
import {
  contacts as initialContacts,
  conversations as initialConversations,
  type Contact,
  type Conversation,
  type Message,
} from "@/lib/data";
import ContactList from "@/components/chat/contact-list";
import ChatArea from "@/components/chat/chat-area";
import { cn } from "@/lib/utils";

export default function Home() {
  const [contacts, setContacts] = useState(initialContacts);
  const [conversations, setConversations] =
    useState<Record<string, Conversation>>(initialConversations);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Select the first contact by default on desktop
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768 && !selectedContact) {
      setSelectedContact(initialContacts[0] || null);
    }
  }, [selectedContact]);

  const handleSendMessage = (contactId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) => {
      const newConversations = { ...prev };
      if (!newConversations[contactId]) {
        newConversations[contactId] = { messages: [] };
      }
      const conversation = newConversations[contactId];
      conversation.messages.push(newMessage);
      return newConversations;
    });

    setContacts((prev) =>
      prev.map((c) =>
        c.id === contactId
          ? { ...c, lastMessage: text, lastMessageTime: "Just now" }
          : c
      )
    );
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleBackToContacts = () => {
    setSelectedContact(null);
  };

  const selectedConversation = selectedContact
    ? conversations[selectedContact.id]
    : null;

  return (
    <main className="h-dvh w-screen flex antialiased text-foreground overflow-hidden">
      <div
        className={cn(
          "flex-col border-r border-border md:w-full md:max-w-xs md:flex xl:max-w-sm",
          selectedContact ? "hidden md:flex" : "flex w-full"
        )}
      >
        <ContactList
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
        />
      </div>
      <div
        className={cn(
          "flex-1 flex-col",
          selectedContact ? "flex" : "hidden md:flex"
        )}
      >
        <ChatArea
          key={selectedContact?.id}
          contact={selectedContact}
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
          onBack={handleBackToContacts}
        />
      </div>
    </main>
  );
}
