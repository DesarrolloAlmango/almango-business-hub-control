
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Message } from './types';

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export const ChatArea = ({ messages, onSendMessage }: ChatAreaProps) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {messages.map(message => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              currentUser="currentUser" 
            />
          ))}
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};
