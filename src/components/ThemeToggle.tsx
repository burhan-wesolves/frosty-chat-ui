import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="glass"
      onClick={toggleTheme}
      className="w-full justify-between gap-3 h-10 px-3 hover:text-primary-blue"
    >
      <div className="flex items-center gap-3">
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-yellow-400" />
        ) : (
          <Moon className="h-4 w-4 text-blue-400" />
        )}
        <span className="text-sm text-foreground">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      </div>
      <div className={`w-10 h-5 rounded-full transition-colors ${
        theme === 'dark' ? 'bg-primary-blue' : 'bg-gray-300'
      }`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${
          theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
        }`} />
      </div>
    </Button>
  );
}