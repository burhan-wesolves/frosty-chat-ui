import { UserPlus, Search, Archive, Trash2, Settings, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";

const chatOptions = [
  { icon: UserPlus, label: "Add People", color: "text-blue-400" },
  { icon: Search, label: "Search Messages", color: "text-green-400" },
  { icon: Archive, label: "Archive Chat", color: "text-yellow-400" },
  { icon: Flag, label: "Report", color: "text-orange-400" },
  { icon: Trash2, label: "Delete Chat", color: "text-red-400", destructive: true }
];

interface ChatOptionsPopoverProps {
  children: React.ReactNode;
}

export function ChatOptionsPopover({ children }: ChatOptionsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-2 glass-panel-light border-white/20 z-50" 
        side="bottom"
        sideOffset={8}
        align="end"
      >
        <div className="space-y-1">
          <ThemeToggle />
          <Separator className="my-2 bg-white/10" />
          {chatOptions.map((option, index) => (
            <div key={option.label}>
              {index === chatOptions.length - 1 && (
                <Separator className="my-2 bg-white/10" />
              )}
              <Button
                variant="ghost"
                className={`
                  w-full justify-start gap-3 h-10 px-3 glow-on-hover hover:bg-white/5
                  ${option.destructive ? 'hover:bg-red-500/10' : ''}
                `}
              >
                <option.icon className={`h-4 w-4 ${option.color}`} />
                <span className={`text-sm ${option.destructive ? 'text-red-400' : 'text-foreground'}`}>
                  {option.label}
                </span>
              </Button>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}