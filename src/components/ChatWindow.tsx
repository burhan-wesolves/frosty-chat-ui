import { useState, useEffect, useRef } from "react";
import { Phone, Video, MoreHorizontal, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatOptionsPopover } from "@/components/ChatOptionsPopover";

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

interface ChatWindowProps {
  selectedChat?: string | null;
  onBack?: () => void;
  isMobile?: boolean;
}

export function ChatWindow({ selectedChat, onBack, isMobile }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`flex-1 flex flex-col ${isMobile ? 'h-full' : 'glass-panel-dark border border-white/10 m-4 rounded-3xl'} overflow-hidden`}>
      {!selectedChat && !isMobile ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h3>
            <p className="text-muted-foreground">Choose a chat from the sidebar to start messaging</p>
          </div>
        </div>
      ) : (
        <>
          {/* Chat Header */}
          <div className={`${isMobile ? 'border-b' : 'glass-panel-light border-b'} border-white/10 p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
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

        <div className="flex items-center gap-2">
          {!isMobile && (
            <>
              <Button variant="ghost" size="sm" className="glass-panel glow-on-hover">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="glass-panel glow-on-hover">
                <Video className="h-4 w-4" />
              </Button>
            </>
          )}
          
          <ChatOptionsPopover>
            <Button variant="ghost" size="sm" className="glass-panel glow-on-hover">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </ChatOptionsPopover>
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
        </>
      )}
    </div>
  );
}