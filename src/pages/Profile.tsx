
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Building, Briefcase, Calendar, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Profile() {
  // Get user email from localStorage or use a default
  const userEmail = localStorage.getItem('userEmail') || 'usuario@example.com';
  const [name, setName] = useState("Alex Herrera");
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    setIsEditing(false);
    toast({
      title: "Perfil actualizado",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <Button 
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancelar" : "Editar Perfil"}
        </Button>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="informacion" className="space-y-6">
          <TabsList>
            <TabsTrigger value="informacion">Información Personal</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
          </TabsList>

          {/* Tab: Información Personal */}
          <TabsContent value="informacion" className="space-y-6">
            {/* Profile Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar className="h-24 w-24 border-2 border-primary">
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm">Cambiar foto</Button>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-4 text-center md:text-left">
                    {isEditing ? (
                      <div className="grid gap-3">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold">{name}</h2>
                        <div className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                          <Mail className="h-4 w-4" />
                          {userEmail}
                        </div>
                      </>
                    )}
                    
                    {isEditing && (
                      <Button onClick={handleSaveChanges} className="mt-4">
                        Guardar Cambios
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Información Personal
                </CardTitle>
                <CardDescription>
                  Detalles de contacto y personales
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="flex gap-2 items-center">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        value={userEmail} 
                        readOnly={!isEditing} 
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="flex gap-2 items-center">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        defaultValue="+52 55 1234 5678"
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <div className="flex gap-2 items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="address" 
                        defaultValue="Av. Revolución 123, Ciudad de México"
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <div className="flex gap-2 items-center">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="company" 
                        defaultValue="Almango Business Services"
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button onClick={handleSaveChanges} className="ml-auto">
                    Guardar Cambios
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Professional Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Información Profesional
                </CardTitle>
                <CardDescription>
                  Detalles laborales y de facturación
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="position">Cargo</Label>
                    <div className="flex gap-2 items-center">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="position" 
                        defaultValue="Director de Operaciones"
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de inicio</Label>
                    <div className="flex gap-2 items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="startDate" 
                        defaultValue="01/01/2022"
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rfc">RFC</Label>
                    <Input 
                      id="rfc" 
                      defaultValue="HERA901231ABC"
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRegimen">Régimen Fiscal</Label>
                    <Input 
                      id="taxRegimen" 
                      defaultValue="Persona Moral"
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button onClick={handleSaveChanges} className="ml-auto">
                    Guardar Cambios
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          {/* Tab: Seguridad */}
          <TabsContent value="seguridad" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Seguridad de la Cuenta
                </CardTitle>
                <CardDescription>
                  Actualiza tu contraseña y configura la autenticación de dos factores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Cambiar Contraseña</h3>
                  <div className="grid gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña actual</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva contraseña</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button>Actualizar Contraseña</Button>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Autenticación de Dos Factores</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Estado: <span className="text-rose-500">No activado</span></p>
                      <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta</p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Sesiones Activas</h3>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Chrome en Windows</p>
                          <p className="text-sm text-muted-foreground">Ciudad de México • Sesión actual</p>
                        </div>
                        <Button variant="ghost" size="sm">Esta sesión</Button>
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Safari en iPhone</p>
                          <p className="text-sm text-muted-foreground">Guadalajara • Hace 2 días</p>
                        </div>
                        <Button variant="outline" size="sm">Cerrar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Preferencias */}
          <TabsContent value="preferencias" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de notificaciones</CardTitle>
                <CardDescription>
                  Personaliza cómo y cuándo recibes notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email</h3>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-services" className="flex-1">
                        Nuevas solicitudes de servicio
                      </Label>
                      <Input 
                        type="checkbox"
                        id="notify-services"
                        defaultChecked
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-updates" className="flex-1">
                        Actualizaciones de estado
                      </Label>
                      <Input 
                        type="checkbox"
                        id="notify-updates"
                        defaultChecked
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-feedback" className="flex-1">
                        Nuevo feedback recibido
                      </Label>
                      <Input 
                        type="checkbox"
                        id="notify-feedback"
                        defaultChecked
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-marketing" className="flex-1">
                        Promociones y noticias
                      </Label>
                      <Input 
                        type="checkbox"
                        id="notify-marketing"
                        className="h-4 w-4"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Idioma y región</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <select 
                        id="language"
                        className="w-full p-2 rounded-md border"
                        defaultValue="es"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zona horaria</Label>
                      <select 
                        id="timezone"
                        className="w-full p-2 rounded-md border"
                        defaultValue="America/Mexico_City"
                      >
                        <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                        <option value="America/Monterrey">Monterrey (GMT-6)</option>
                        <option value="America/Tijuana">Tijuana (GMT-8)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Formato de fecha</Label>
                      <select 
                        id="dateFormat"
                        className="w-full p-2 rounded-md border"
                        defaultValue="dd/mm/yyyy"
                      >
                        <option value="dd/mm/yyyy">DD/MM/AAAA</option>
                        <option value="mm/dd/yyyy">MM/DD/AAAA</option>
                        <option value="yyyy-mm-dd">AAAA-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Guardar Preferencias</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
