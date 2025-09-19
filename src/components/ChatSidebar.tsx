import { Search, User, MessageCircle, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  isOnline: boolean;
  unreadCount?: number;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    lastMessage: "Hey! Are we still meeting today?",
    timestamp: "2m ago",
    avatar: "👩‍💻",
    isOnline: true,
    unreadCount: 2
  },
  {
    id: "2", 
    name: "Design Team",
    lastMessage: "Alex: The new mockups look great!",
    timestamp: "15m ago",
    avatar: "🎨",
    isOnline: true,
    unreadCount: 5
  },
  {
    id: "3",
    name: "Michael Rodriguez", 
    lastMessage: "Thanks for the feedback",
    timestamp: "1h ago",
    avatar: "👨‍💼",
    isOnline: false
  },
  {
    id: "4",
    name: "Emma Thompson",
    lastMessage: "Perfect! Let's schedule that call",
    timestamp: "3h ago", 
    avatar: "👩‍🔬",
    isOnline: true
  },
  {
    id: "5",
    name: "Development",
    lastMessage: "Code review completed ✅",
    timestamp: "5h ago",
    avatar: "💻", 
    isOnline: false
  }
];

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onChatSelect?: (chatId: string) => void;
  isMobile?: boolean;
}

export function ChatSidebar({ isOpen, onToggle, onChatSelect, isMobile }: ChatSidebarProps) {
  return (
    <div 
      className={`${
        isMobile 
          ? 'w-full h-full glass-panel-light border-0' 
          : `fixed left-0 top-0 h-full w-80 glass-panel-light border-r border-white/10 
             transform transition-all duration-300 ease-out z-40
             ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
      }`}
    >
      {/* Header */}
      <div className={`${isMobile ? 'p-4 pt-8' : 'p-6'} border-b border-white/10`}>
        <h1 className="text-xl font-semibold text-foreground mb-4">Messages</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 glass-panel focus-glow border-white/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onChatSelect?.(conversation.id)}
            className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex items-start space-x-3">
              {/* Avatar with Status */}
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-blue/20 to-primary-purple/20 flex items-center justify-center text-lg border border-white/10">
                  {conversation.avatar}
                </div>
                <div 
                  className={`
                    absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background
                    ${conversation.isOnline ? 'bg-green-400 pulse-glow' : 'bg-gray-400'}
                  `}
                />
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground truncate group-hover:text-primary-blue transition-colors">
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>

              {/* Unread Badge */}
              {conversation.unreadCount && (
                <div className="bg-gradient-to-r from-primary-blue to-primary-purple text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] h-5 flex items-center justify-center">
                  {conversation.unreadCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}