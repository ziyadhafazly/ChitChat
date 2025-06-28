"use client";

import type { Contact } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons";

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

export default function ContactList({
  contacts,
  selectedContact,
  onSelectContact,
}: ContactListProps) {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Logo className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Chit Chat</h1>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                selectedContact?.id === contact.id
                  ? "bg-primary/20 text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Avatar className="h-10 w-10 border border-primary/20">
                <AvatarImage src={`https://placehold.co/40x40.png?text=${contact.avatar}`} alt={contact.name} />
                <AvatarFallback>{contact.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-foreground truncate">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {contact.lastMessageTime}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
