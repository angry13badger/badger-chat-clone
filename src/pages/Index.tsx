import { useState } from "react";
import { MessageSidebar } from "@/components/MessageSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Message } from "@/components/MessageList";

const initialChannels = [
  { id: "general", name: "general", unread: 3 },
  { id: "random", name: "random", unread: 0 },
  { id: "development", name: "development", unread: 7 },
  { id: "design", name: "design", unread: 1 },
  { id: "marketing", name: "marketing", unread: 0 },
];

const initialDirectMessages = [
  { id: "sarah-johnson", name: "Sarah Johnson", status: "online", unread: 2 },
  { id: "john-smith", name: "John Smith", status: "away", unread: 0 },
  { id: "emma-wilson", name: "Emma Wilson", status: "online", unread: 1 },
  { id: "alex-brown", name: "Alex Brown", status: "offline", unread: 0 },
];

const initialGeneralMessages: Message[] = [
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
];

const allChats = [...initialChannels, ...initialDirectMessages];
const initialMessages: Record<string, Message[]> = Object.fromEntries(
  allChats.map((chat) => [chat.id, []])
);
initialMessages.general = initialGeneralMessages;

const possibleResponses = [
  "That's a great point!",
  "I agree completely.",
  "Interesting perspective. I'll have to think about that.",
  "Could you elaborate on that?",
  "Thanks for sharing!",
  "Got it, thanks!",
  "Let's discuss this further in the meeting.",
  "I'll look into it and get back to you.",
  "Sounds good to me.",
  "Perfect!",
];

const Index = () => {
  const [channels, setChannels] = useState(initialChannels);
  const [directMessages, setDirectMessages] = useState(initialDirectMessages);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [shuffledResponses, setShuffledResponses] = useState(() =>
    [...possibleResponses].sort(() => 0.5 - Math.random())
  );

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    setSelectedUser(null);
    setChannels(prevChannels =>
      prevChannels.map(channel =>
        channel.id === channelId ? { ...channel, unread: 0 } : channel
      )
    );
  };

  const handleUserSelect = (userId: string | null) => {
    setSelectedUser(userId);
    if (userId) {
      setSelectedChannel("");
      setDirectMessages(prevDMs =>
        prevDMs.map(dm =>
          dm.id === userId ? { ...dm, unread: 0 } : dm
        )
      );
    }
  };

  const handleSendMessage = (content: string) => {
    const activeChatId = selectedUser || selectedChannel;
    if (!activeChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: "Mike Badger",
      avatar: "MB",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));

    setTimeout(() => {
      let respondingUser: { id: string; name: string };

      if (selectedUser) {
        const dmUser = directMessages.find(dm => dm.id === selectedUser);
        if (!dmUser) return; // Should not happen
        respondingUser = dmUser;
      } else {
        // If it's a channel, a random user from DMs responds.
        respondingUser = directMessages[Math.floor(Math.random() * directMessages.length)];
      }

      let currentShuffled = [...shuffledResponses];
      if (currentShuffled.length === 0) {
        currentShuffled = [...possibleResponses].sort(() => 0.5 - Math.random());
      }
      const responseContent = currentShuffled.pop()!;
      setShuffledResponses(currentShuffled);

      const responseMessage: Message = {
        id: Date.now().toString(),
        user: respondingUser.name,
        avatar: respondingUser.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: false,
      };

      setMessages((prev) => ({
        ...prev,
        [activeChatId]: [
          ...(prev[activeChatId] || []),
          responseMessage,
        ],
      }));
    }, 2000);
  };

  const activeChatId = selectedUser || selectedChannel;
  const chatMessages = messages[activeChatId] || [];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MessageSidebar
          selectedChannel={selectedChannel}
          selectedUser={selectedUser}
          onChannelSelect={handleChannelSelect}
          onUserSelect={handleUserSelect}
          channels={channels}
          directMessages={directMessages}
        />
        <ChatArea
          selectedChannel={selectedChannel}
          selectedUser={selectedUser}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
