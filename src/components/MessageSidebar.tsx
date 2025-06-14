import { Hash, User, ListTodo } from "lucide-react";
import { useState } from "react";
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
import { Sheet, SheetContent, SheetTrigger as SheetPrimitiveTrigger } from "@/components/ui/sheet";
import { TodoList, type Task } from "./TodoList";

interface Channel {
  id: string;
  name: string;
  unread: number;
}

interface DirectMessage {
  id: string;
  name: string;
  status: string;
  unread: number;
}

interface MessageSidebarProps {
  selectedChannel: string;
  selectedUser: string | null;
  onChannelSelect: (channel: string) => void;
  onUserSelect: (user: string | null) => void;
  channels: Channel[];
  directMessages: DirectMessage[];
}

const initialTasks: Task[] = [
  { id: '1', name: 'Review design mockups for the new landing page', author: 'Alice', completed: false },
  { id: '2', name: 'Implement sidebar functionality with animations', author: 'Bob', completed: true },
];

export function MessageSidebar({ selectedChannel, selectedUser, onChannelSelect, onUserSelect, channels, directMessages }: MessageSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-sidebar-border bg-sidebar text-sidebar-foreground`}>
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="font-bold text-xl">Team Workspace</h1>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Mike Badger
              </div>
            </div>
          )}
          <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent" />
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-semibold px-4 py-2">
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
                        ? "bg-primary text-primary-foreground" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <button 
                      onClick={() => onChannelSelect(channel.id)}
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
          <SidebarGroupLabel className="text-muted-foreground font-semibold px-4 py-2">
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
                        ? "bg-primary text-primary-foreground" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <button 
                      onClick={() => onUserSelect(user.id)}
                      className="w-full flex items-center justify-between p-2"
                    >
                      <div className="flex items-center">
                        <div className="relative mr-2">
                          <User className="w-4 h-4" />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-sidebar ${getStatusColor(user.status)}`}></div>
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

        <Sheet>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SheetPrimitiveTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    className="mx-2 rounded border border-sidebar-border dark:border-white text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <button
                      className="w-full flex items-center p-2"
                    >
                      <ListTodo className="w-4 h-4 mr-2" />
                      {!collapsed && <span>Todo List</span>}
                    </button>
                  </SidebarMenuButton>
                </SheetPrimitiveTrigger>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SheetContent className="w-[400px] sm:w-[540px] p-0">
            <TodoList tasks={tasks} setTasks={setTasks} />
          </SheetContent>
        </Sheet>
      </SidebarContent>
    </Sidebar>
  );
}
