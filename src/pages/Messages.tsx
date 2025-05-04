
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Search, 
  Send, 
  Plus, 
  MoreVertical, 
  PhoneCall,
  Video,
  Paperclip,
  Smile,
  Image,
  File,
  ArrowLeft,
  Info,
  ChevronDown,
  Check,
  CheckCheck,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  online: boolean;
  lastSeen?: string;
  lastMessage?: string;
  unreadCount?: number;
  avatarColor?: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  receiverId: string;
  read: boolean;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Martínez',
    initials: 'AM',
    online: true,
    lastMessage: 'Necesito información sobre el nuevo sistema de reportes que implementaron...',
    unreadCount: 1,
    avatarColor: 'bg-primary/20'
  },
  {
    id: '2',
    name: 'Juan Rodríguez',
    initials: 'JR',
    online: false,
    lastSeen: '15 min',
    lastMessage: 'Hola, ¿podrías revisar el documento que te envié la semana pasada?',
    unreadCount: 1,
    avatarColor: 'bg-secondary/20'
  },
  {
    id: '3',
    name: 'María López',
    initials: 'ML',
    online: true,
    lastMessage: '¡Gracias por la información!',
    avatarColor: 'bg-blue-500/20'
  },
  {
    id: '4',
    name: 'Carlos González',
    initials: 'CG',
    online: false,
    lastSeen: '2h',
    lastMessage: 'Ok, perfecto',
    avatarColor: 'bg-green-500/20'
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    initials: 'LS',
    online: true,
    lastMessage: '¿Para cuándo necesitas el informe?',
    avatarColor: 'bg-amber-500/20'
  },
  {
    id: '6',
    name: 'Soporte Técnico',
    initials: 'ST',
    online: true,
    lastMessage: 'Hemos solucionado el problema que reportaste',
    avatarColor: 'bg-indigo-500/20'
  }
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      content: 'Hola, ¿cómo estás?',
      timestamp: '09:25',
      senderId: 'currentUser',
      receiverId: '1',
      read: true
    },
    {
      id: '102',
      content: 'Bien, gracias. ¿Me podrías dar información sobre el nuevo sistema de reportes?',
      timestamp: '09:26',
      senderId: '1',
      receiverId: 'currentUser',
      read: true
    },
    {
      id: '103',
      content: 'Claro, el nuevo sistema permite generar reportes personalizados con gráficos interactivos',
      timestamp: '09:27',
      senderId: 'currentUser',
      receiverId: '1',
      read: true
    },
    {
      id: '104',
      content: 'Necesito información sobre el nuevo sistema de reportes que implementaron. ¿Está disponible para todos los usuarios o solo para administradores?',
      timestamp: '09:28',
      senderId: '1',
      receiverId: 'currentUser',
      read: false
    }
  ],
  '2': [
    {
      id: '201',
      content: 'Hola Juan, ¿qué tal?',
      timestamp: 'Ayer',
      senderId: 'currentUser',
      receiverId: '2',
      read: true
    },
    {
      id: '202',
      content: 'Todo bien. Oye, te envié un documento la semana pasada',
      timestamp: 'Ayer',
      senderId: '2',
      receiverId: 'currentUser',
      read: true
    },
    {
      id: '203',
      content: 'Hola, ¿podrías revisar el documento que te envié la semana pasada?',
      timestamp: 'Hoy 08:15',
      senderId: '2',
      receiverId: 'currentUser',
      read: false
    }
  ]
};

const ConversationItem = ({ 
  user, 
  active, 
  onClick 
}: { 
  user: User, 
  active: boolean,
  onClick: () => void
}) => {
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

const MessageBubble = ({ message, currentUser }: { message: Message, currentUser: string }) => {
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

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || 
      (activeTab === "unread" && user.unreadCount && user.unreadCount > 0) ||
      (activeTab === "online" && user.online);
    
    return matchesSearch && matchesTab;
  });
  
  const currentMessages = selectedUser 
    ? mockMessages[selectedUser.id] || []
    : [];
  
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedUser) return;
    
    // In a real app, we would send the message to the backend
    console.log(`Sending message to ${selectedUser.name}: ${inputMessage}`);
    
    // Clear the input
    setInputMessage("");
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Sidebar with conversations (hidden on mobile when a conversation is selected) */}
        <div className={`
          border-r border-border w-full md:w-80 lg:w-96 flex-shrink-0
          ${(isMobileView && selectedUser) ? 'hidden' : 'flex flex-col'}
        `}>
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
                        {mockUsers.reduce((count, user) => count + (user.unreadCount || 0), 0)}
                      </Badge>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="online" className="flex-1">
                    En línea
                    <span className="ml-1.5">
                      <Badge variant="secondary">
                        {mockUsers.filter(user => user.online).length}
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
                  onClick={() => {
                    setSelectedUser(user);
                    setIsMobileView(window.innerWidth < 768);
                  }}
                />
              ))
            ) : (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No se encontraron conversaciones</p>
              </div>
            )}
          </ScrollArea>
        </div>
        
        {/* Chat area */}
        <div className={`
          flex-1 flex flex-col
          ${(!isMobileView || selectedUser) ? 'flex' : 'hidden'}
        `}>
          {selectedUser ? (
            <>
              {/* Chat header */}
              <div className="py-2 px-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center">
                  {isMobileView && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                      onClick={() => setSelectedUser(null)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Avatar className="h-8 w-8 mr-3">
                    {selectedUser.avatar ? (
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    ) : (
                      <AvatarFallback className={`${selectedUser.avatarColor || 'bg-primary/20'} text-primary`}>
                        {selectedUser.initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div>
                    <h3 className="font-medium text-sm">{selectedUser.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedUser.online ? 'En línea' : `Última vez: ${selectedUser.lastSeen || 'Desconocido'}`}
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
                          onClick={() => setShowChatInfo(!showChatInfo)}
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
              
              {/* Main chat and info sidebar */}
              <div className="flex-1 flex overflow-hidden">
                {/* Messages area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-2">
                      {currentMessages.map(message => (
                        <MessageBubble 
                          key={message.id} 
                          message={message} 
                          currentUser="currentUser" 
                        />
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Input area */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                          <DropdownMenuItem>
                            <Image className="h-4 w-4 mr-2" />
                            Imagen
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <File className="h-4 w-4 mr-2" />
                            Documento
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Input
                        className="flex-1"
                        placeholder="Escribe un mensaje..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                      
                      <Button variant="ghost" size="icon">
                        <Smile className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        disabled={!inputMessage.trim()} 
                        size="icon"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Chat info sidebar */}
                {showChatInfo && (
                  <div className="w-80 border-l border-border overflow-y-auto">
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Detalles</h3>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setShowChatInfo(false)}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-col items-center py-6">
                        <Avatar className="h-20 w-20 mb-4">
                          {selectedUser.avatar ? (
                            <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                          ) : (
                            <AvatarFallback className={`${selectedUser.avatarColor || 'bg-primary/20'} text-primary`}>
                              {selectedUser.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <h4 className="font-bold text-lg">{selectedUser.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.online ? 'En línea' : `Última vez: ${selectedUser.lastSeen || 'Desconocido'}`}
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
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-bold mb-2">Tus mensajes</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Selecciona una conversación o inicia una nueva para comenzar a hablar.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva conversación
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
