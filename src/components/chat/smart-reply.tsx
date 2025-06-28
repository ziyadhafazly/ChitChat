"use client";

import { useEffect, useState, useTransition } from "react";
import { getSmartReplies } from "@/app/actions";
import { Button } from "@/components/ui/button";
import type { Conversation } from "@/lib/data";
import { Sparkles } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface SmartReplyProps {
  conversation: Conversation;
  onSuggestionClick: (suggestion: string) => void;
}

export default function SmartReply({
  conversation,
  onSuggestionClick,
}: SmartReplyProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (
      conversation.messages.length > 0 &&
      conversation.messages[conversation.messages.length - 1].sender === "them"
    ) {
      startTransition(async () => {
        const conversationHistory = conversation.messages
          .slice(-5) // Use last 5 messages for context
          .map((m) => `${m.sender === "me" ? "You" : "Them"}: ${m.text}`)
          .join("\n");
        const currentMessage =
          conversation.messages[conversation.messages.length - 1].text;
        const result = await getSmartReplies({
          conversationHistory,
          currentMessage,
        });
        setSuggestions(result);
      });
    } else {
      setSuggestions([]);
    }
  }, [conversation]);
  
  const showSuggestions = suggestions.length > 0 || isPending;
  if (!showSuggestions) return null;


  return (
    <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">Smart Replies</h3>
        </div>
      <div className="flex flex-wrap gap-2">
        {isPending ? (
          <>
            <Skeleton className="h-9 w-32 rounded-full" />
            <Skeleton className="h-9 w-40 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </>
        ) : (
          suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </Button>
          ))
        )}
      </div>
    </div>
  );
}
