import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { ChatInputBar } from "@/components/ChatInputBar";
import glassmorphismBg from "@/assets/glassmorphism-bg.jpg";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSendMessage = (message: string) => {
    // Handle sending message logic here
    console.log("Sending message:", message);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ 
        backgroundImage: `url(${glassmorphismBg})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-glassmorphism opacity-50" />
      
      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar Toggle Button */}
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="ghost"
          size="sm"
          className="fixed top-6 left-6 z-50 glass-panel glow-on-hover text-foreground hover:text-primary-blue"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Sidebar */}
        <ChatSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main Chat Area */}
        <div 
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarOpen ? 'ml-80' : 'ml-0'
          }`}
        >
          {/* Chat Window */}
          <div className="flex-1 flex">
            <ChatWindow />
          </div>
          
          {/* Input Bar */}
          <ChatInputBar onSendMessage={handleSendMessage} />
        </div>
      </div>
      
      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
