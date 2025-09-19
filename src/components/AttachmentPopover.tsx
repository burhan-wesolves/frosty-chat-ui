import { Camera, FileText, Image, Music, Video, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const attachmentOptions = [
  { icon: Camera, label: "Camera", color: "text-green-400" },
  { icon: Image, label: "Photo", color: "text-blue-400" },
  { icon: Video, label: "Video", color: "text-red-400" },
  { icon: Music, label: "Audio", color: "text-purple-400" },
  { icon: FileText, label: "Document", color: "text-orange-400" },
  { icon: File, label: "File", color: "text-gray-400" }
];

interface AttachmentPopoverProps {
  children: React.ReactNode;
}

export function AttachmentPopover({ children }: AttachmentPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-64 p-4 glass-panel-light border-white/20 z-50" 
        side="top"
        sideOffset={8}
      >
        <div className="grid grid-cols-2 gap-3">
          {attachmentOptions.map((option) => (
              <Button
                key={option.label}
                variant="glass"
                className="flex flex-col items-center gap-2 h-auto py-3 px-2 hover:text-primary-blue"
              >
              <option.icon className={`h-6 w-6 ${option.color}`} />
              <span className="text-xs text-muted-foreground">{option.label}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}