
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from './types';

interface ConversationItemProps {
  user: User;
  active: boolean;
  onClick: () => void;
}

export const ConversationItem = ({ 
  user, 
  active, 
  onClick 
}: ConversationItemProps) => {
  return (
    <div 
      className={`
        flex items-center p-3 gap-3 rounded-md cursor-pointer
        ${active ? 'bg-muted' : 'hover:bg-muted/50'}
      `}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          {user.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : (
            <AvatarFallback className={`${user.avatarColor || 'bg-primary/20'} text-primary`}>
              {user.initials}
            </AvatarFallback>
          )}
        </Avatar>
        {user.online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h4 className="text-sm font-medium truncate">{user.name}</h4>
          <span className="text-xs text-muted-foreground">
            {user.lastSeen || (user.online ? 'En línea' : '')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground truncate pr-2">
            {user.lastMessage}
          </p>
          {user.unreadCount && user.unreadCount > 0 ? (
            <Badge 
              variant="destructive" 
              className="h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              {user.unreadCount}
            </Badge>
          ) : null}
        </div>
      </div>
    </div>
  );
};
