
import { Hash, User, Users, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface ChatHeaderProps {
  selectedChannel: string;
  selectedUser: string | null;
}

export function ChatHeader({ selectedChannel, selectedUser }: ChatHeaderProps) {
  const { theme, setTheme } = useTheme();

  const getChannelInfo = () => {
    if (selectedUser) {
      const userNames: Record<string, string> = {
        "sarah-johnson": "Sarah Johnson",
        "john-smith": "John Smith",
        "emma-wilson": "Emma Wilson",
        "alex-brown": "Alex Brown",
      };
      return {
        icon: <User className="w-5 h-5" />,
        name: userNames[selectedUser] || selectedUser,
        description: "Direct Message",
      };
    }

    const channelInfo: Record<string, { name: string; description: string }> = {
      general: { name: "general", description: "Company-wide announcements and general discussion" },
      random: { name: "random", description: "Random chatter and off-topic conversations" },
      development: { name: "development", description: "Development discussions and code reviews" },
      design: { name: "design", description: "Design critiques and creative discussions" },
      marketing: { name: "marketing", description: "Marketing campaigns and growth strategies" },
    };

    const info = channelInfo[selectedChannel] || { name: selectedChannel, description: "Channel description" };
    
    return {
      icon: <Hash className="w-5 h-5" />,
      name: info.name,
      description: info.description,
    };
  };

  const channelInfo = getChannelInfo();

  return (
    <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <SidebarTrigger>
          <Menu className="h-6 w-6" />
        </SidebarTrigger>
        <div className="text-muted-foreground">{channelInfo.icon}</div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground flex items-center">
            {channelInfo.name}
            {!selectedUser && (
              <div className="ml-3 flex items-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-1" />
                12 members
              </div>
            )}
          </h2>
          <p className="text-sm text-muted-foreground">{channelInfo.description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
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
  );
}
