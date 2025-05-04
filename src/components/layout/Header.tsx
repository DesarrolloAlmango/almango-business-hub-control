
import { Bell, ChevronDown, LogOut, MessageSquare, Moon, Search, Settings, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";
import { Toggle } from "@/components/ui/toggle";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // Clear the login state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    toast({
      title: "Sesión cerrada",
      description: "Ha cerrado sesión correctamente",
    });
    
    // Redirect to login page
    navigate('/login');
  };
  
  // Get user email from localStorage
  const userEmail = localStorage.getItem('userEmail') || 'Administrador';
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-[hsl(var(--background))] px-4 sm:px-6">
      <SidebarTrigger className="h-9 w-9 lg:hidden" />
      
 
      <div className="relative hidden lg:flex lg:w-64 xl:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar..."
          className="w-full rounded-lg border-border pl-8 shadow-none white-on-black-input"
        />
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <Toggle 
          pressed={theme === 'light'} 
          onPressedChange={toggleTheme}
          className="rounded-full hover:bg-secondary/10 h-10 w-10 p-0 flex items-center justify-center"
          aria-label="Cambiar tema"
        >
          {theme === 'light' ? (
            <Moon className="rounded-full hover:bg-secondary/10 text-secondary" />
          ) : (
            <Sun className="h-5 w-5 text-primary" />
          )}
        </Toggle>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/10 text-secondary"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/10 text-secondary"
          aria-label="Mensajes"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-accent/10 text-accent"
          aria-label="Configuración"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 rounded-full pr-1 hover:bg-primary/10"
            >
              <Avatar className="h-8 w-8 border border-primary/30">
                <AvatarImage src="" alt="Usuario" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block highlight-text">
                {userEmail}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 white-on-black-card">
            <DropdownMenuLabel className="highlight-text">Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-border" />
            <DropdownMenuItem 
              className="hover:bg-primary/10 text-foreground cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <User className="mr-2 h-4 w-4 text-primary" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary/10 text-foreground cursor-pointer"
              onClick={() => navigate('/settings')}
            >
              <Settings className="mr-2 h-4 w-4 text-primary" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-border" />
            <DropdownMenuItem 
              className="hover:bg-destructive/10 text-destructive cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
