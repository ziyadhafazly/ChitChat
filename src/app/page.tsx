"use client";

import { useState } from "react";
import {
  contacts as initialContacts,
  conversations as initialConversations,
  type Contact,
  type Conversation,
  type Message,
} from "@/lib/data";
import ContactList from "@/components/chat/contact-list";
import ChatArea from "@/components/chat/chat-area";

export default function Home() {
  const [contacts, setContacts] = useState(initialContacts);
  const [conversations, setConversations] =
    useState<Record<string, Conversation>>(initialConversations);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    contacts[0] || null
  );

  const handleSendMessage = (contactId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) => {
      const newConversations = { ...prev };
      const conversation = newConversations[contactId] || { messages: [] };
      conversation.messages.push(newMessage);
      newConversations[contactId] = conversation;
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

  const selectedConversation = selectedContact
    ? conversations[selectedContact.id]
    : null;

  return (
    <main className="h-screen w-screen flex antialiased text-foreground overflow-hidden">
      <div className="w-full max-w-xs xl:max-w-sm border-r border-border flex flex-col">
        <ContactList
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <ChatArea
          key={selectedContact?.id}
          contact={selectedContact}
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
        />
      </div>
    </main>
  );
}
