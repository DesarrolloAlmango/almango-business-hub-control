
import React from 'react';
import { ArrowLeft, PhoneCall, Video, Info, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from './types';

interface ChatHeaderProps {
  user: User;
  isMobileView: boolean;
  onBack: () => void;
  onInfoToggle: () => void;
}

export const ChatHeader = ({ 
  user, 
  isMobileView, 
  onBack, 
  onInfoToggle 
}: ChatHeaderProps) => {
  return (
    <div className="py-2 px-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center">
        {isMobileView && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        
        <Avatar className="h-8 w-8 mr-3">
          {user.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : (
            <AvatarFallback className={`${user.avatarColor || 'bg-primary/20'} text-primary`}>
              {user.initials}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div>
          <h3 className="font-medium text-sm">{user.name}</h3>
          <p className="text-xs text-muted-foreground">
            {user.online ? 'En línea' : `Última vez: ${user.lastSeen || 'Desconocido'}`}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <PhoneCall className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Llamada de voz
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Videollamada
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onInfoToggle}
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Información del chat
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones de chat</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Buscar en esta conversación</DropdownMenuItem>
            <DropdownMenuItem>Silenciar notificaciones</DropdownMenuItem>
            <DropdownMenuItem>Archivar chat</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Eliminar conversación
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
