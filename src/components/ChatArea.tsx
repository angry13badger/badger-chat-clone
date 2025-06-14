
import { useEffect, useRef } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { MessageList, Message } from "@/components/MessageList";
import { MessageInput } from "@/components/MessageInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatAreaProps {
  selectedChannel: string;
  selectedUser: string | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatArea({ selectedChannel, selectedUser, messages, onSendMessage }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader selectedChannel={selectedChannel} selectedUser={selectedUser} />
      <ScrollArea className="flex-1">
        <div className="p-4">
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}
