
import { SidebarHeader as UISidebarHeader } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function SidebarHeader() {
  const { toggleSidebar, state } = useSidebar();
  const { theme } = useTheme();
  
  return (
    <UISidebarHeader className="flex items-center justify-between p-3">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/bbb7cf38-3978-487f-8d60-82f4e16d39c6.png" 
          alt="Almango Logo" 
          className="h-8 w-8"
        />
        {state === "expanded" && (
          <span className={`text-lg font-bold ${theme === 'light' ? 'text-primary' : 'text-white'}`}>
            <span className="text-[hsl(var(--primary))]">Almango</span> Business
          </span>
        )}
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className={`${theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-sidebar-accent'} transition-all duration-300`}
      >
        {state === "expanded" ? (
          <ChevronRight size={18} />
        ) : (
          <Menu size={18} />
        )}
      </Button>
    </UISidebarHeader>
  );
}
