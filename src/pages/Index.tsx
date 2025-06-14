
import { useState } from "react";
import { MessageSidebar } from "@/components/MessageSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SidebarProvider } from "@/components/ui/sidebar";

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

const Index = () => {
  const [channels, setChannels] = useState(initialChannels);
  const [directMessages, setDirectMessages] = useState(initialDirectMessages);
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

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
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
