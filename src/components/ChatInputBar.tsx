import { useState } from "react";
import { Send, Paperclip, Smile, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AttachmentPopover } from "./AttachmentPopover";

interface ChatInputBarProps {
  onSendMessage: (message: string) => void;
}

export function ChatInputBar({ onSendMessage }: ChatInputBarProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6">
      <div className="glass-panel rounded-3xl p-4 border border-white/20">
        <div className="flex items-end space-x-4">
          {/* Attachment Button with Popover */}
          <AttachmentPopover>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground glow-on-hover rounded-full p-3"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
          </AttachmentPopover>

          {/* Message Input */}
          <div className="flex-1">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-0 bg-transparent focus:ring-0 focus-visible:ring-0 text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground glow-on-hover rounded-full p-3"
            >
              <Smile className="h-5 w-5" />
            </Button>

            {message.trim() ? (
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-primary-blue to-primary-purple hover:from-primary-blue/80 hover:to-primary-purple/80 text-white rounded-full p-3 pulse-glow"
              >
                <Send className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onMouseDown={() => setIsRecording(true)}
                onMouseUp={() => setIsRecording(false)}
                onMouseLeave={() => setIsRecording(false)}
                className={`
                  rounded-full p-3 transition-all duration-200
                  ${isRecording 
                    ? 'bg-red-500 text-white pulse-glow' 
                    : 'text-muted-foreground hover:text-foreground glow-on-hover'
                  }
                `}
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}