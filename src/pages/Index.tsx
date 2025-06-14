
import { useState } from "react";
import { MessageSidebar } from "@/components/MessageSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <MessageSidebar 
          selectedChannel={selectedChannel}
          selectedUser={selectedUser}
          onChannelSelect={setSelectedChannel}
          onUserSelect={setSelectedUser}
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
