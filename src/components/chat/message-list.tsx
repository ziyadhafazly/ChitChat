"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageListProps {
  messages: Message[];
  avatar: string;
}

export default function MessageList({ messages, avatar }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1" ref={scrollAreaRef} viewportRef={viewportRef}>
      <div className="p-4 md:p-6 space-y-6">
        {messages.map((message, index) => {
          const isMe = message.sender === "me";
          const showAvatar =
            !isMe &&
            (index === 0 || messages[index - 1].sender !== message.sender);

          return (
            <div
              key={message.id}
              className={cn(
                "flex items-end gap-3",
                isMe ? "justify-end" : "justify-start"
              )}
            >
              {!isMe && (
                <div className="w-10">
                  {showAvatar && (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://placehold.co/40x40.png?text=${avatar}`} alt={avatar} />
                      <AvatarFallback>{avatar}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )}
              <div
                className={cn(
                  "max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl rounded-2xl p-3 px-4 shadow-sm transition-all duration-300",
                  isMe
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                )}
              >
                <p className="text-sm">{message.text}</p>
                <p className={cn("text-xs mt-1", isMe ? "text-primary-foreground/70" : "text-muted-foreground")}>{message.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
