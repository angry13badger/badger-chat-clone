
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Message {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-6">
      <div className="space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex space-x-3 group hover:bg-accent -mx-6 px-6 py-2 rounded transition-colors">
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold ${
                message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {message.avatar}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline space-x-2">
                <span className="font-semibold text-foreground">{message.user}</span>
                {message.user === "AI Assistant" && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    Autoreply
                  </span>
                )}
                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
              </div>
              <p className="mt-1 text-foreground/90 leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
