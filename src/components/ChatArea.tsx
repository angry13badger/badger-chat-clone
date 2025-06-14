
import { ChatHeader } from "@/components/ChatHeader";
import { MessageList, Message } from "@/components/MessageList";
import { MessageInput } from "@/components/MessageInput";

interface ChatAreaProps {
  selectedChannel: string;
  selectedUser: string | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatArea({ selectedChannel, selectedUser, messages, onSendMessage }: ChatAreaProps) {
  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader selectedChannel={selectedChannel} selectedUser={selectedUser} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}
