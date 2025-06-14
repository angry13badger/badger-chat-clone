import { Hash, User, ListTodo, Bot, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
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
import { Sheet, SheetContent, SheetPrimitiveTrigger } from "@/components/ui/sheet";
import { TodoList, type Task } from "./TodoList";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { type CustomCommand } from "@/pages/Index";

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
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  commands: CustomCommand[];
  setCommands: React.Dispatch<React.SetStateAction<CustomCommand[]>>;
}

export function MessageSidebar({ selectedChannel, selectedUser, onChannelSelect, onUserSelect, channels, directMessages, tasks, setTasks, commands, setCommands }: MessageSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { theme, setTheme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  return (
    <Sidebar className={`flex flex-col ${collapsed ? "w-16" : "w-64"} border-r border-sidebar-border bg-sidebar text-sidebar-foreground`}>
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

      <SidebarContent className="flex-grow">
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

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Sheet>
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
                <SheetContent className="w-[400px] sm:w-[540px] p-0">
                  <TodoList tasks={tasks} setTasks={setTasks} />
                </SheetContent>
              </Sheet>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Sheet>
                <SheetPrimitiveTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    className="mx-2 rounded text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <button
                      className="w-full flex items-center p-2"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      {!collapsed && <span>AI Assistant</span>}
                    </button>
                  </SidebarMenuButton>
                </SheetPrimitiveTrigger>
                <SheetContent className="w-[400px] sm:w-[540px] p-0">
                  <AIAssistantPanel commands={commands} setCommands={setCommands} />
                </SheetContent>
              </Sheet>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-center space-x-2">
          <Sun className="h-5 w-5" />
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => {
              setTheme(checked ? 'dark' : 'light');
            }}
          />
          <Moon className="h-5 w-5" />
        </div>
      </div>
    </Sidebar>
  );
}
