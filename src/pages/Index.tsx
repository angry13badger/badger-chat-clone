
import { useState } from "react";
import { MessageSidebar } from "@/components/MessageSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleChannelSelect = (channel: string) => {
    setSelectedChannel(channel);
    setSelectedUser(null);
  };

  const handleUserSelect = (user: string | null) => {
    setSelectedUser(user);
    if (user) {
      setSelectedChannel("");
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
