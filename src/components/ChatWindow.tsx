import { useState, useEffect, useRef } from "react";
import { User, Phone, Video, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatOptionsPopover } from "./ChatOptionsPopover";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOutgoing: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hey! How's the new project coming along?",
    timestamp: "10:30 AM",
    isOutgoing: false
  },
  {
    id: "2", 
    content: "Going really well! Just finished the design system setup. The glassmorphism effects are looking amazing ✨",
    timestamp: "10:32 AM",
    isOutgoing: true,
    status: 'read'
  },
  {
    id: "3",
    content: "That sounds fantastic! Can't wait to see it",
    timestamp: "10:33 AM", 
    isOutgoing: false
  },
  {
    id: "4",
    content: "I'll share some screenshots in a bit. The blur effects and gradients really make it pop!",
    timestamp: "10:35 AM",
    isOutgoing: true,
    status: 'delivered'
  }
];

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col glass-panel-dark border border-white/10 mx-4 my-4 rounded-3xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/10 glass-panel-light">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-blue/20 to-primary-purple/20 flex items-center justify-center text-lg border border-white/10">
                👩‍💻
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background pulse-glow" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Sarah Chen</h3>
              <p className="text-sm text-muted-foreground">Active now</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="glow-on-hover text-muted-foreground hover:text-foreground">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="glow-on-hover text-muted-foreground hover:text-foreground">
              <Video className="h-5 w-5" />
            </Button>
            <ChatOptionsPopover>
              <Button variant="ghost" size="sm" className="glow-on-hover text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </ChatOptionsPopover>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.isOutgoing ? 'justify-end' : 'justify-start'} animate-message-slide`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`
                max-w-xs lg:max-w-md xl:max-w-lg px-6 py-4 rounded-3xl
                ${message.isOutgoing 
                  ? 'message-outgoing ml-auto' 
                  : 'message-incoming mr-auto'
                }
              `}
            >
              <p className="text-sm leading-relaxed">
                {message.content}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-70">
                  {message.timestamp}
                </span>
                {message.isOutgoing && message.status && (
                  <span className={`
                    text-xs ml-2
                    ${message.status === 'read' ? 'text-primary-blue' : 
                      message.status === 'delivered' ? 'text-muted-foreground' : 'text-muted-foreground'}
                  `}>
                    {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}