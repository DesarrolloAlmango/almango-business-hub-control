
import React from 'react';
import { PhoneCall, Video, Search, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User } from './types';

interface ChatInfoProps {
  user: User;
  onClose: () => void;
}

export const ChatInfo = ({ user, onClose }: ChatInfoProps) => {
  return (
    <div className="w-80 border-l border-border overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Detalles</h3>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col items-center py-6">
          <Avatar className="h-20 w-20 mb-4">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback className={`${user.avatarColor || 'bg-primary/20'} text-primary`}>
                {user.initials}
              </AvatarFallback>
            )}
          </Avatar>
          <h4 className="font-bold text-lg">{user.name}</h4>
          <p className="text-sm text-muted-foreground">
            {user.online ? 'En línea' : `Última vez: ${user.lastSeen || 'Desconocido'}`}
          </p>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Acciones</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="flex flex-col h-auto py-2">
                <PhoneCall className="h-4 w-4 mb-1" />
                <span className="text-xs">Llamar</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-auto py-2">
                <Video className="h-4 w-4 mb-1" />
                <span className="text-xs">Video</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-auto py-2">
                <Search className="h-4 w-4 mb-1" />
                <span className="text-xs">Buscar</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Archivos compartidos</h4>
            <div className="text-sm text-muted-foreground">
              No hay archivos compartidos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
