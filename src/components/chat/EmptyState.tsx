
import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onNewConversation?: () => void;
}

export const EmptyState = ({ onNewConversation }: EmptyStateProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl font-bold mb-2">Tus mensajes</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Selecciona una conversación o inicia una nueva para comenzar a hablar.
        </p>
        <Button onClick={onNewConversation}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva conversación
        </Button>
      </div>
    </div>
  );
};
