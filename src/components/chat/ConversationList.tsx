
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ConversationItem } from './ConversationItem';
import { User } from './types';

interface ConversationListProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export const ConversationList = ({ 
  users, 
  selectedUser, 
  onSelectUser 
}: ConversationListProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || 
      (activeTab === "unread" && user.unreadCount && user.unreadCount > 0) ||
      (activeTab === "online" && user.online);
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold mb-4">Mensajes</h1>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar conversaciones..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                No leídos
                <span className="ml-1.5">
                  <Badge variant="destructive">
                    {users.reduce((count, user) => count + (user.unreadCount || 0), 0)}
                  </Badge>
                </span>
              </TabsTrigger>
              <TabsTrigger value="online" className="flex-1">
                En línea
                <span className="ml-1.5">
                  <Badge variant="secondary">
                    {users.filter(user => user.online).length}
                  </Badge>
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2 flex-shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Nueva conversación
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <ConversationItem
              key={user.id}
              user={user}
              active={selectedUser?.id === user.id}
              onClick={() => onSelectUser(user)}
            />
          ))
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No se encontraron conversaciones</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
