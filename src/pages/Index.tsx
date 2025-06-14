import { useState } from "react";
import { MessageSidebar } from "@/components/MessageSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Message } from "@/components/MessageList";
import { type Task } from "@/components/TodoList";

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

const initialTasks: Task[] = [
  { id: '1', name: 'Review design mockups for the new landing page', author: 'Alice', completed: false },
  { id: '2', name: 'Implement sidebar functionality with animations', author: 'Bob', completed: true },
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

const otherUsers = initialDirectMessages.map(dm => ({ name: dm.name, avatar: dm.name.split(" ").map(n => n[0]).join("") }));

const sampleMessageContents = [
    "Hey, could you take a look at this when you have a moment?",
    "I've pushed the latest changes to the dev branch.",
    "What are your thoughts on the new design mockups?",
    "Let's sync up about this tomorrow morning.",
    "I'm running a bit late, will be there in 10 minutes.",
    "Can someone review my pull request?",
    "This is ready for QA.",
    "I'm blocked on this task, can anyone help?",
    "Just a heads up, the server will be down for maintenance tonight.",
    "Great job on the presentation!",
    "I have a question about the project requirements.",
    "Let's schedule a call to discuss this further.",
    "The latest build failed, looking into it now.",
    "I've updated the documentation with the new API endpoints.",
    "This looks awesome! ✨"
];

const generateMessages = (count: number, authors: {name: string, avatar: string}[]) => {
    const messages: Message[] = [];
    if (count === 0) return messages;

    const shuffledContents = [...sampleMessageContents].sort(() => 0.5 - Math.random());

    for (let i = 0; i < count; i++) {
        const author = authors[i % authors.length];
        const content = shuffledContents[i % shuffledContents.length];
        const timestamp = new Date(Date.now() - (count - i) * 60000 * 5);

        messages.push({
            id: `${author.name}-${Date.now()}-${i}`,
            user: author.name,
            avatar: author.avatar,
            content: content,
            timestamp: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: false,
        });
    }
    return messages;
};

const initialMessages: Record<string, Message[]> = {};

initialChannels.forEach(channel => {
    if (channel.id === 'general') {
        initialMessages.general = initialGeneralMessages;
    } else {
        initialMessages[channel.id] = generateMessages(channel.unread, otherUsers);
    }
});

initialDirectMessages.forEach(dm => {
    const author = { name: dm.name, avatar: dm.name.split(" ").map(n => n[0]).join("") };
    initialMessages[dm.id] = generateMessages(dm.unread, [author]);
});

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
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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

    if (content.startsWith("/task ")) {
      const taskName = content.substring("/task ".length).trim();
      if (taskName) {
        const newTask: Task = {
          id: crypto.randomUUID(),
          name: taskName,
          author: "Mike Badger",
          completed: false,
        };
        setTasks((currentTasks) => [newTask, ...currentTasks]);

        setTimeout(() => {
          const responseMessage: Message = {
            id: Date.now().toString(),
            user: "AI Assistant",
            avatar: "AI",
            content: "Task was created and added to your todo list.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isOwn: false,
          };

          setMessages((prev) => ({
            ...prev,
            [activeChatId]: [...(prev[activeChatId] || []), responseMessage],
          }));
        }, 1000);
      }
      return;
    }

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
          tasks={tasks}
          setTasks={setTasks}
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
