
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings2, Bell, Moon, Sun, Palette, Globe, Shield, CreditCard } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme"; // Aseguramos que use el hook correcto
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [accentColor, setAccentColor] = useState("#9b87f5");

  const handleSaveChanges = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido aplicados correctamente.",
    });
  };

  const colorOptions = [
    { name: "Púrpura", value: "#9b87f5" },
    { name: "Azul", value: "#0ea5e9" },
    { name: "Verde", value: "#10b981" },
    { name: "Rojo", value: "#ef4444" },
    { name: "Naranja", value: "#f97316" },
    { name: "Rosa", value: "#ec4899" },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Configuración</h1>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="apariencia">Apariencia</TabsTrigger>
            <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
            <TabsTrigger value="facturacion">Facturación</TabsTrigger>
          </TabsList>

          {/* Tab: General */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-primary" />
                  Configuración General
                </CardTitle>
                <CardDescription>
                  Configura las opciones generales de tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nombre de empresa</Label>
                    <Input id="businessName" defaultValue="Almango Business Services" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email de contacto</Label>
                    <Input id="contactEmail" type="email" defaultValue="contacto@almangobusiness.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Teléfono de contacto</Label>
                    <Input id="contactPhone" defaultValue="+52 55 1234 5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio web</Label>
                    <Input id="website" defaultValue="www.almangobusiness.com" />
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h3 className="font-medium">Opciones de servicio</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoAssign" className="font-medium">Asignación automática</Label>
                        <p className="text-sm text-muted-foreground">Asigna automáticamente las solicitudes a proveedores disponibles</p>
                      </div>
                      <Switch id="autoAssign" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoNotify" className="font-medium">Notificaciones automáticas</Label>
                        <p className="text-sm text-muted-foreground">Enviar notificaciones cuando cambie el estado de una solicitud</p>
                      </div>
                      <Switch id="autoNotify" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="feedbackRequest" className="font-medium">Solicitud de feedback</Label>
                        <p className="text-sm text-muted-foreground">Solicitar feedback al cliente cuando se completa un servicio</p>
                      </div>
                      <Switch id="feedbackRequest" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveChanges} className="ml-auto">
                  Guardar Cambios
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Configuración Regional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Label htmlFor="currency">Moneda</Label>
                    <select 
                      id="currency"
                      className="w-full p-2 rounded-md border"
                      defaultValue="MXN"
                    >
                      <option value="MXN">Peso Mexicano (MXN)</option>
                      <option value="USD">Dólar Estadounidense (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
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
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveChanges} className="ml-auto">
                  Guardar Cambios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tab: Apariencia */}
          <TabsContent value="apariencia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Personalización
                </CardTitle>
                <CardDescription>
                  Personaliza la apariencia de tu panel de administración
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Tema</h3>
                  <div className="flex items-center gap-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => theme === "dark" && toggleTheme()}
                    >
                      <Sun className="h-4 w-4" />
                      Claro
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => theme === "light" && toggleTheme()}
                    >
                      <Moon className="h-4 w-4" />
                      Oscuro
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h3 className="font-medium">Color de acento</h3>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        className={`w-8 h-8 rounded-full border-2 ${
                          accentColor === color.value ? "border-black dark:border-white" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setAccentColor(color.value)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h3 className="font-medium">Densidad de la interfaz</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-center">Compacta</Button>
                    <Button variant="default" className="justify-center">Normal</Button>
                    <Button variant="outline" className="justify-center">Cómoda</Button>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <h3 className="font-medium">Opciones de visualización</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="animations" className="font-medium">Animaciones</Label>
                        <p className="text-sm text-muted-foreground">Activa o desactiva las animaciones de la interfaz</p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="highContrast" className="font-medium">Alto contraste</Label>
                        <p className="text-sm text-muted-foreground">Mejora la visibilidad para usuarios con problemas de visión</p>
                      </div>
                      <Switch id="highContrast" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reducedMotion" className="font-medium">Movimiento reducido</Label>
                        <p className="text-sm text-muted-foreground">Reduce las animaciones y transiciones</p>
                      </div>
                      <Switch id="reducedMotion" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveChanges} className="ml-auto">
                  Guardar Apariencia
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tab: Notificaciones */}
          <TabsContent value="notificaciones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Configuración de Notificaciones
                </CardTitle>
                <CardDescription>
                  Administra cómo y cuándo recibes notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Canales de notificación</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifs" className="font-medium">Email</Label>
                        <p className="text-sm text-muted-foreground">Recibir notificaciones por correo electrónico</p>
                      </div>
                      <Switch id="emailNotifs" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifs" className="font-medium">Push</Label>
                        <p className="text-sm text-muted-foreground">Recibir notificaciones push en el navegador</p>
                      </div>
                      <Switch id="pushNotifs" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifs" className="font-medium">SMS</Label>
                        <p className="text-sm text-muted-foreground">Recibir notificaciones por mensaje de texto</p>
                      </div>
                      <Switch id="smsNotifs" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Tipos de notificaciones</h3>
                  <div className="space-y-3">
                    <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between">
                      <div>
                        <p className="font-medium">Nuevas solicitudes de servicio</p>
                        <p className="text-sm text-muted-foreground">Cuando se recibe una nueva solicitud</p>
                      </div>
                      <div className="flex gap-2">
                        <Switch id="newServiceRequests" defaultChecked />
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between">
                      <div>
                        <p className="font-medium">Actualizaciones de estado</p>
                        <p className="text-sm text-muted-foreground">Cuando cambie el estado de una solicitud</p>
                      </div>
                      <div className="flex gap-2">
                        <Switch id="statusUpdates" defaultChecked />
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between">
                      <div>
                        <p className="font-medium">Nuevo feedback</p>
                        <p className="text-sm text-muted-foreground">Cuando un cliente deja una evaluación</p>
                      </div>
                      <div className="flex gap-2">
                        <Switch id="newFeedback" defaultChecked />
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recordatorios</p>
                        <p className="text-sm text-muted-foreground">Recordatorios de servicios próximos</p>
                      </div>
                      <div className="flex gap-2">
                        <Switch id="reminders" defaultChecked />
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between">
                      <div>
                        <p className="font-medium">Alertas de sistema</p>
                        <p className="text-sm text-muted-foreground">Actualizaciones importantes del sistema</p>
                      </div>
                      <div className="flex gap-2">
                        <Switch id="systemAlerts" defaultChecked />
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing y promociones</p>
                        <p className="text-sm text-muted-foreground">Ofertas especiales y actualizaciones de producto</p>
                      </div>
                      <div className="flex gap-2">
                        <Switch id="marketing" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveChanges} className="ml-auto">
                  Guardar Preferencias
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tab: Facturación */}
          <TabsContent value="facturacion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Información de facturación
                </CardTitle>
                <CardDescription>
                  Gestiona tu plan de suscripción y métodos de pago
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Plan actual</h3>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-lg">Plan Empresarial</p>
                        <p className="text-sm text-muted-foreground">Facturado anualmente</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">$5,988 MXN/año</p>
                        <p className="text-sm text-muted-foreground">$499 MXN/mes</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm">Próxima renovación: <span className="font-medium">15 de diciembre, 2025</span></p>
                    </div>
                    <div className="mt-4 flex gap-2 justify-end">
                      <Button variant="outline">Cambiar plan</Button>
                      <Button variant="destructive">Cancelar plan</Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Métodos de pago</h3>
                  <div className="space-y-3">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <p className="font-medium">•••• •••• •••• 4532</p>
                            <p className="text-xs text-muted-foreground">Vence: 03/25 - Predeterminada</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="outline" size="sm">Eliminar</Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Añadir método de pago
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Historial de facturación</h3>
                  <div className="space-y-3">
                    {[
                      { id: "INV-2025-001", date: "15/01/2025", amount: "$5,988.00 MXN", status: "Pagada" },
                      { id: "INV-2024-012", date: "15/12/2024", amount: "$5,988.00 MXN", status: "Pagada" },
                      { id: "INV-2024-006", date: "15/06/2024", amount: "$2,994.00 MXN", status: "Pagada" }
                    ].map((invoice) => (
                      <div key={invoice.id} className="bg-muted/50 p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{invoice.id}</p>
                            <p className="text-xs text-muted-foreground">{invoice.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{invoice.amount}</p>
                            <p className="text-xs text-green-500">{invoice.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Información fiscal</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="taxName">Razón social</Label>
                        <Input id="taxName" defaultValue="Almango Business Solutions S.A. de C.V." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rfc">RFC</Label>
                        <Input id="rfc" defaultValue="ABS120523AB9" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxAddress">Dirección fiscal</Label>
                        <Input id="taxAddress" defaultValue="Av. Revolución 123, Col. Centro, CDMX" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxRegimen">Régimen fiscal</Label>
                        <Input id="taxRegimen" defaultValue="601 - General de Ley" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveChanges} className="ml-auto">
                  Guardar Información Fiscal
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
