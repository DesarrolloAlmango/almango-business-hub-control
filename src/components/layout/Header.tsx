
import { Bell, ChevronDown, MessageSquare, Moon, Search, Settings, Sun, User } from "lucide-react";
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

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-[hsl(var(--background))] px-4 sm:px-6">
      <SidebarTrigger className="h-9 w-9 lg:hidden" />
      
      <div className="flex items-center gap-2 lg:hidden">
        <img 
          src="/lovable-uploads/bbb7cf38-3978-487f-8d60-82f4e16d39c6.png" 
          alt="Almango Logo" 
          className="h-8 w-8"
        />
        <span className="font-semibold text-lg highlight-text">Almango</span>
      </div>

      <div className="relative hidden lg:flex lg:w-64 xl:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar..."
          className="w-full rounded-lg border-border pl-8 shadow-none white-on-black-input"
        />
      </div>
      
      <div className="ml-auto flex items-center ">
        <Toggle 
          pressed={theme === 'light'} 
          onPressedChange={toggleTheme}
          className="rounded-full hover:bg-primary/10 h-10 w-10 p-0 flex items-center justify-center"
          aria-label="Cambiar tema"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-primary" />
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
                Administrador
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 white-on-black-card">
            <DropdownMenuLabel className="highlight-text">Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-border" />
            <DropdownMenuItem className="hover:bg-primary/10 text-foreground">
              <User className="mr-2 h-4 w-4 text-primary" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/10 text-foreground">
              <Settings className="mr-2 h-4 w-4 text-primary" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-border" />
            <DropdownMenuItem className="hover:bg-destructive/10 text-destructive">
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
