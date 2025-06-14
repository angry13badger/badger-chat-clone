
import { useState, useEffect } from "react";
import { MessageSidebar } from "@/components/MessageSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";

const Index = () => {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

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
