
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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Notification and message states
  const [notificationCount, setNotificationCount] = useState(3);
  const [messageCount, setMessageCount] = useState(2);
  
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
  
  const handleNotificationClick = () => {
    setNotificationCount(0);
    navigate('/notifications');
  };
  
  const handleMessageClick = () => {
    setMessageCount(0);
    navigate('/messages');
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
            <Moon className="h-5 w-5 text-primary bg-primary/10 p-0.5 rounded-full" />
          ) : (
            <Sun className="h-5 w-5 text-primary bg-primary/10 p-0.5 rounded-full" />
          )}
        </Toggle>
        
        {/* Notifications Button with HoverCard */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-secondary/10 text-secondary relative"
              aria-label="Notificaciones"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-0">
            <div className="p-3 border-b border-border">
              <h3 className="font-semibold">Notificaciones</h3>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <div className="p-3 border-b border-border hover:bg-muted/30 cursor-pointer" onClick={handleNotificationClick}>
                <Alert className="border-none p-0 m-0">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <AlertTitle className="text-sm">Nueva solicitud pendiente</AlertTitle>
                      <AlertDescription className="text-xs text-muted-foreground mt-1">
                        Carlos Pérez ha enviado una nueva solicitud de servicio
                      </AlertDescription>
                    </div>
                    <span className="text-xs text-muted-foreground">10 min</span>
                  </div>
                </Alert>
              </div>
              <div className="p-3 border-b border-border hover:bg-muted/30 cursor-pointer" onClick={handleNotificationClick}>
                <Alert className="border-none p-0 m-0">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <AlertTitle className="text-sm">Actualización de sistema</AlertTitle>
                      <AlertDescription className="text-xs text-muted-foreground mt-1">
                        Se ha instalado correctamente la actualización v2.4.1
                      </AlertDescription>
                    </div>
                    <span className="text-xs text-muted-foreground">2h</span>
                  </div>
                </Alert>
              </div>
              <div className="p-3 hover:bg-muted/30 cursor-pointer" onClick={handleNotificationClick}>
                <Alert className="border-none p-0 m-0">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <AlertTitle className="text-sm">Reporte mensual disponible</AlertTitle>
                      <AlertDescription className="text-xs text-muted-foreground mt-1">
                        El reporte de abril 2025 está listo para revisión
                      </AlertDescription>
                    </div>
                    <span className="text-xs text-muted-foreground">1d</span>
                  </div>
                </Alert>
              </div>
            </div>
            <div className="p-2 border-t border-border">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-primary"
                onClick={handleNotificationClick}
              >
                Ver todas las notificaciones
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        {/* Messages Button with HoverCard */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-secondary/10 text-secondary relative"
              aria-label="Mensajes"
              onClick={handleMessageClick}
            >
              <MessageSquare className="h-5 w-5" />
              {messageCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                >
                  {messageCount}
                </Badge>
              )}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-0">
            <div className="p-3 border-b border-border">
              <h3 className="font-semibold">Mensajes</h3>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <div 
                className="p-3 border-b border-border hover:bg-muted/30 cursor-pointer flex items-start gap-3"
                onClick={handleMessageClick}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="Ana Martínez" />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    AM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium truncate">Ana Martínez</p>
                    <span className="text-xs text-muted-foreground">12:34</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    Necesito información sobre el nuevo sistema de reportes que implementaron...
                  </p>
                </div>
              </div>
              <div 
                className="p-3 hover:bg-muted/30 cursor-pointer flex items-start gap-3"
                onClick={handleMessageClick}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="Juan Rodríguez" />
                  <AvatarFallback className="bg-secondary/20 text-secondary">
                    JR
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium truncate">Juan Rodríguez</p>
                    <span className="text-xs text-muted-foreground">Ayer</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    Hola, ¿podrías revisar el documento que te envié la semana pasada?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2 border-t border-border">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-primary"
                onClick={handleMessageClick}
              >
                Ver todos los mensajes
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
        
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
