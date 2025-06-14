
import { useState } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { MessageList } from "@/components/MessageList";
import { MessageInput } from "@/components/MessageInput";

interface ChatAreaProps {
  selectedChannel: string;
  selectedUser: string | null;
}

export function ChatArea({ selectedChannel, selectedUser }: ChatAreaProps) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      user: "Sarah Johnson",
      avatar: "SJ",
      content: "Hey team! Just finished the new designs for the landing page. What do you think?",
      timestamp: "2:34 PM",
      isOwn: false,
    },
    {
      id: "2",
      user: "Mike Badger",
      avatar: "MB",
      content: "Looks great! I especially love the color scheme. Can we schedule a review meeting?",
      timestamp: "2:36 PM",
      isOwn: true,
    },
    {
      id: "3",
      user: "John Smith",
      avatar: "JS",
      content: "I'm available tomorrow afternoon if that works for everyone. The animations look smooth too! 🎉",
      timestamp: "2:38 PM",
      isOwn: false,
    },
    {
      id: "4",
      user: "Emma Wilson",
      avatar: "EW",
      content: "Perfect timing! I just finished the responsive breakpoints. Should we also discuss the mobile navigation?",
      timestamp: "2:40 PM",
      isOwn: false,
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      user: "Mike Badger",
      avatar: "MB",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader selectedChannel={selectedChannel} selectedUser={selectedUser} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
