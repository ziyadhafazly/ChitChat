"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SmartReply from "./smart-reply";
import { type Conversation } from "@/lib/data";

interface MessageInputProps {
  conversation: Conversation | null;
  onSendMessage: (text: string) => void;
}

export default function MessageInput({
  conversation,
  onSendMessage,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
    setMessage("");
  }

  return (
    <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm">
      <SmartReply conversation={conversation} onSuggestionClick={handleSuggestionClick} />
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="pr-14 min-h-[52px] resize-none"
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <SendHorizonal className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}
