
import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
  currentUser: string;
}

export const MessageBubble = ({ message, currentUser }: MessageBubbleProps) => {
  const isMine = message.senderId === currentUser;
  
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`
          max-w-[80%] rounded-lg px-4 py-2
          ${isMine 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted text-muted-foreground'}
        `}
      >
        <p className="text-sm">{message.content}</p>
        <div className={`flex justify-${isMine ? 'end' : 'start'} mt-1`}>
          <span className="text-xs opacity-70">{message.timestamp}</span>
          {isMine && (
            <div className="ml-1">
              {message.read ? (
                <CheckCheck className="h-3 w-3 opacity-70" />
              ) : (
                <Check className="h-3 w-3 opacity-70" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
