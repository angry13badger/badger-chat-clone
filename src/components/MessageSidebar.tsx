
import { Hash, MessageCircle, Users, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface MessageSidebarProps {
  selectedChannel: string;
  selectedUser: string | null;
  onChannelSelect: (channel: string) => void;
  onUserSelect: (user: string) => void;
}

const channels = [
  { id: "general", name: "general", unread: 3 },
  { id: "random", name: "random", unread: 0 },
  { id: "development", name: "development", unread: 7 },
  { id: "design", name: "design", unread: 1 },
  { id: "marketing", name: "marketing", unread: 0 },
];

const directMessages = [
  { id: "sarah-johnson", name: "Sarah Johnson", status: "online", unread: 2 },
  { id: "john-smith", name: "John Smith", status: "away", unread: 0 },
  { id: "emma-wilson", name: "Emma Wilson", status: "online", unread: 1 },
  { id: "alex-brown", name: "Alex Brown", status: "offline", unread: 0 },
];

export function MessageSidebar({ selectedChannel, selectedUser, onChannelSelect, onUserSelect }: MessageSidebarProps) {
  const { collapsed } = useSidebar();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-gray-200 bg-slate-800 text-white`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="font-bold text-xl text-white">Team Workspace</h1>
              <p className="text-sm text-gray-300 flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Mike Badger
              </p>
            </div>
          )}
          <SidebarTrigger className="text-white hover:bg-gray-700" />
        </div>
      </div>

      <SidebarContent className="bg-slate-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 font-semibold px-4 py-2">
            {!collapsed && "Channels"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {channels.map((channel) => (
                <SidebarMenuItem key={channel.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`mx-2 rounded ${
                      selectedChannel === channel.id && !selectedUser
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <button 
                      onClick={() => {
                        onChannelSelect(channel.id);
                        onUserSelect("");
                      }}
                      className="w-full flex items-center justify-between p-2"
                    >
                      <div className="flex items-center">
                        <Hash className="w-4 h-4 mr-2" />
                        {!collapsed && <span>{channel.name}</span>}
                      </div>
                      {!collapsed && channel.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {channel.unread}
                        </span>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 font-semibold px-4 py-2">
            {!collapsed && "Direct Messages"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {directMessages.map((user) => (
                <SidebarMenuItem key={user.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`mx-2 rounded ${
                      selectedUser === user.id
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <button 
                      onClick={() => {
                        onUserSelect(user.id);
                        onChannelSelect("");
                      }}
                      className="w-full flex items-center justify-between p-2"
                    >
                      <div className="flex items-center">
                        <div className="relative mr-2">
                          <User className="w-4 h-4" />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${getStatusColor(user.status)}`}></div>
                        </div>
                        {!collapsed && <span>{user.name}</span>}
                      </div>
                      {!collapsed && user.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {user.unread}
                        </span>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
