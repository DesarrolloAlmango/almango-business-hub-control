
import { Bell, ChevronDown, MessageSquare, Search, Settings, User } from "lucide-react";
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

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <SidebarTrigger className="h-9 w-9 lg:hidden" />
      
      <div className="flex items-center gap-2 lg:hidden">
        <img 
          src="/lovable-uploads/bbb7cf38-3978-487f-8d60-82f4e16d39c6.png" 
          alt="Almango Logo" 
          className="h-8 w-8"
        />
        <span className="font-semibold text-lg">Almango</span>
      </div>

      <div className="relative hidden lg:flex lg:w-64 xl:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar..."
          className="w-full rounded-lg bg-background pl-8 shadow-none md:bg-muted"
        />
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Mensajes"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Configuración"
        >
          <Settings className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 rounded-full pr-1"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Usuario" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                Administrador
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
