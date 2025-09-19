import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { ChatInputBar } from "@/components/ChatInputBar";
import { useIsMobile } from "@/hooks/use-mobile";
import glassmorphismBg from "@/assets/glassmorphism-bg.jpg";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'conversations' | 'chat'>('conversations');
  const isMobile = useIsMobile();

  const handleSendMessage = (message: string) => {
    // Handle sending message logic here
    console.log("Sending message:", message);
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    if (isMobile) {
      setMobileView('chat');
    }
  };

  const handleBackToConversations = () => {
    if (isMobile) {
      setMobileView('conversations');
      setSelectedChat(null);
    }
  };

  return (
    <div 
      className="min-h-screen relative noise-bg"
      style={{ 
        backgroundColor: 'hsl(var(--background))',
      }}
    >
      {/* Subtle ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-primary-purple/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-purple/8 rounded-full blur-3xl" />
      
      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Desktop Top Controls */}
        {!isMobile && (
          <div className="fixed top-6 left-6 z-50">
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              size="sm"
              className="glass-panel glow-on-hover text-foreground hover:text-primary-blue"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        )}

        {/* Mobile Layout */}
        {isMobile ? (
          <div className="flex-1 flex flex-col">
            {mobileView === 'conversations' ? (
              <ChatSidebar 
                isOpen={true} 
                onToggle={() => {}} 
                onChatSelect={handleChatSelect}
                isMobile={true}
              />
            ) : (
              <>
                <ChatWindow 
                  selectedChat={selectedChat} 
                  onBack={handleBackToConversations}
                  isMobile={true}
                />
                <ChatInputBar onSendMessage={handleSendMessage} />
              </>
            )}
          </div>
        ) : (
          /* Desktop Layout */
          <>
            {/* Sidebar */}
            <ChatSidebar 
              isOpen={sidebarOpen} 
              onToggle={() => setSidebarOpen(!sidebarOpen)} 
              onChatSelect={handleChatSelect}
            />
            
            {/* Main Chat Area */}
            <div 
              className={`flex-1 flex flex-col transition-all duration-300 ${
                sidebarOpen ? 'ml-80' : 'ml-0'
              }`}
            >
              {/* Chat Window */}
              <div className="flex-1 flex">
                <ChatWindow selectedChat={selectedChat} />
              </div>
              
              {/* Input Bar */}
              <ChatInputBar onSendMessage={handleSendMessage} />
            </div>
          </>
        )}
      </div>
      
      {/* Desktop Sidebar Backdrop */}
      {!isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
