
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Bell,
  Check, 
  CheckCheck, 
  Clock, 
  Info, 
  Settings, 
  Trash2, 
  User, 
  FileText, 
  AlertTriangle, 
  Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NotificationType = 'info' | 'warning' | 'success';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: NotificationType;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nueva solicitud pendiente",
    description: "Carlos Pérez ha enviado una nueva solicitud de servicio",
    time: "10 minutos",
    isRead: false,
    type: "info"
  },
  {
    id: "2",
    title: "Actualización de sistema",
    description: "Se ha instalado correctamente la actualización v2.4.1",
    time: "2 horas",
    isRead: false,
    type: "success"
  },
  {
    id: "3",
    title: "Reporte mensual disponible",
    description: "El reporte de abril 2025 está listo para revisión",
    time: "1 día",
    isRead: false,
    type: "info"
  },
  {
    id: "4",
    title: "Incidencia reportada",
    description: "Se ha reportado un error en el módulo de facturación",
    time: "3 días",
    isRead: true,
    type: "warning"
  },
  {
    id: "5",
    title: "Nuevo usuario registrado",
    description: "María González se ha registrado en la plataforma",
    time: "5 días",
    isRead: true,
    type: "info"
  },
  {
    id: "6",
    title: "Mantenimiento programado",
    description: "El sistema estará en mantenimiento el 15 de mayo de 2025",
    time: "1 semana",
    isRead: true,
    type: "warning"
  }
];

const NotificationItem = ({ 
  notification, 
  onRead, 
  onDelete 
}: { 
  notification: Notification, 
  onRead: (id: string) => void,
  onDelete: (id: string) => void
}) => {
  const TypeIcon = () => {
    switch (notification.type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCheck className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className={`mb-4 p-4 rounded-lg border ${notification.isRead ? 'bg-background' : 'bg-muted/10 border-primary/20'}`}>
      <Alert className="border-none p-0 m-0">
        <div className="flex items-start">
          <div className="mr-3 mt-0.5">
            <TypeIcon />
          </div>
          <div className="flex-1">
            <AlertTitle className={`text-base ${!notification.isRead ? 'font-semibold' : ''}`}>
              {notification.title}
            </AlertTitle>
            <AlertDescription className="text-sm mt-1">
              {notification.description}
            </AlertDescription>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{notification.time}</span>
              </div>
              <div className="flex space-x-2">
                {!notification.isRead && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 px-2 text-xs"
                    onClick={() => onRead(notification.id)}
                  >
                    <Check className="h-3 w-3 mr-1" /> Marcar como leído
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(notification.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<string>("all");
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    if (activeTab === "info") return notification.type === "info";
    if (activeTab === "warning") return notification.type === "warning";
    if (activeTab === "success") return notification.type === "success";
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
    
    toast({
      title: "Notificación leída",
      description: "La notificación ha sido marcada como leída",
    });
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    
    toast({
      title: "Notificación eliminada",
      description: "La notificación ha sido eliminada",
      variant: "destructive",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    
    toast({
      title: "Todas las notificaciones leídas",
      description: "Se han marcado todas las notificaciones como leídas",
    });
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    
    toast({
      title: "Notificaciones eliminadas",
      description: "Se han eliminado todas las notificaciones",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Notificaciones</h1>
              <p className="text-muted-foreground">
                Gestiona tus alertas y notificaciones del sistema
              </p>
            </div>
            
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Opciones
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Gestión de notificaciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleMarkAllAsRead}>
                    <Check className="h-4 w-4 mr-2" />
                    Marcar todas como leídas
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive" 
                    onClick={handleDeleteAll}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar todas
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all" className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Todas
                  {notifications.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {notifications.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  No leídas
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="info" className="hidden md:flex items-center">
                  <Info className="h-4 w-4 mr-2 text-blue-500" />
                  Información
                </TabsTrigger>
                <TabsTrigger value="warning" className="hidden md:flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Alertas
                </TabsTrigger>
                <TabsTrigger value="success" className="hidden md:flex items-center">
                  <CheckCheck className="h-4 w-4 mr-2 text-green-500" />
                  Éxito
                </TabsTrigger>
              </TabsList>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por tipo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("info")}>
                    <Info className="h-4 w-4 mr-2 text-blue-500" />
                    Información
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("warning")}>
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                    Alertas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("success")}>
                    <CheckCheck className="h-4 w-4 mr-2 text-green-500" />
                    Éxito
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <TabsContent value="all" className="mt-4">
              <div className="space-y-1">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification}
                      onRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay notificaciones</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      No tienes notificaciones que mostrar en esta categoría.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Duplicate content for other tabs */}
            <TabsContent value="unread" className="mt-4">
              <div className="space-y-1">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification}
                      onRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay notificaciones sin leer</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Has leído todas tus notificaciones. ¡Genial!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="mt-4">
              <div className="space-y-1">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification}
                      onRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay notificaciones informativas</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      No tienes notificaciones informativas que mostrar.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="warning" className="mt-4">
              <div className="space-y-1">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification}
                      onRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay alertas</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      No tienes notificaciones de alerta que mostrar.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="success" className="mt-4">
              <div className="space-y-1">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification}
                      onRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay notificaciones de éxito</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      No tienes notificaciones de éxito que mostrar.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
