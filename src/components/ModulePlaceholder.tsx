
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, BadgeCheck, CheckCircle, Clock, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  showDemo?: boolean;
}

export default function ModulePlaceholder({ 
  title, 
  description, 
  icon = <Wrench className="h-6 w-6" />,
  showDemo = true
}: ModulePlaceholderProps) {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const handleBackToDashboard = () => {
    navigate("/");
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <Card className="border border-muted mb-6">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            {icon}
            <span className="ml-2">Módulo: {title}</span>
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-4">
            {!showContent ? (
              <>
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10">
                  {showDemo ? <BadgeCheck className="h-8 w-8 text-primary" /> : <Clock className="h-8 w-8 text-muted-foreground" />}
                </div>
                <p className="mb-6 text-center max-w-md text-muted-foreground">
                  {showDemo 
                    ? "Haga clic en el botón para explorar un ejemplo de las funcionalidades disponibles en este módulo." 
                    : "Este módulo está en desarrollo. Muy pronto tendrás acceso a todas sus funcionalidades."}
                </p>
                <div className="flex gap-4">
                  {showDemo && (
                    <Button onClick={() => setShowContent(true)}>
                      Ver ejemplo
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleBackToDashboard}>
                    Volver al Dashboard
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-center mb-6 text-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  <span className="text-green-500 font-medium">Contenido de ejemplo cargado</span>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg mb-6 w-full">
                  {getDemoContent(title)}
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" onClick={() => setShowContent(false)}>
                    Ocultar ejemplo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-yellow-700 dark:text-yellow-500 text-base">
            <AlertCircle className="h-5 w-5 mr-2" />
            Nota de desarrollo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-700 dark:text-yellow-500">
            Este es un módulo de demostración. En una implementación completa, este módulo contendría todas las 
            funcionalidades relacionadas con <strong>{title.toLowerCase()}</strong>.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

// Helper function to generate demo content based on the module title
function getDemoContent(title: string) {
  switch (title) {
    case "Visualización de Solicitudes":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Solicitud #{i+1000}</CardTitle>
                  <CardDescription>Cliente: Empresa ABC</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div><strong>Servicio:</strong> Mantenimiento preventivo</div>
                    <div><strong>Fecha:</strong> {new Date().toLocaleDateString()}</div>
                    <div><strong>Estado:</strong> <span className="text-green-600">Completado</span></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Mostrando 3 de 24 solicitudes
          </p>
        </div>
      );
      
    case "Feedback y Evaluaciones":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {[
              { client: "Laura Martínez", rating: 5, comment: "Excelente servicio, muy profesionales." },
              { client: "Carlos Ruiz", rating: 4, comment: "Buen trabajo, aunque llegaron un poco tarde." },
              { client: "Ana Gómez", rating: 5, comment: "Superó mis expectativas, volveré a contratar." }
            ].map((item, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{item.client}</CardTitle>
                    <div className="flex">
                      {Array(5).fill(0).map((_, idx) => (
                        <span key={idx} className={`text-lg ${idx < item.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic">"{item.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
      
    case "Reportes de Actividad":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Servicios por categoría</CardTitle>
              </CardHeader>
              <CardContent className="h-40 flex items-center justify-center">
                <div className="w-full h-full bg-primary/10 rounded-md flex items-center justify-center">
                  [Gráfico de barras]
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tendencia mensual</CardTitle>
              </CardHeader>
              <CardContent className="h-40 flex items-center justify-center">
                <div className="w-full h-full bg-primary/10 rounded-md flex items-center justify-center">
                  [Gráfico de línea]
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
      
    case "Solicitudes Lista Negra":
      return (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Proveedor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Motivo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Servicios Técnicos XYZ</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Incumplimiento de plazo</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">01/05/2023</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Mantenimientos PRO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Servicio deficiente</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">15/03/2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
      
    // Add cases for other menu items
    case "Documentación de Proveedores":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Licencia Comercial", "Certificaciones", "Seguros"].map((doc, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{doc}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border border-dashed rounded-md flex flex-col items-center justify-center">
                    <div className="bg-muted rounded-md p-2 mb-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm">documento_{i+1}.pdf</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
      
    case "Gestión de Incidencias":
      return (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium">Incidencia #2023-056</h3>
              <p className="text-sm text-muted-foreground">Reportado: 28/04/2023</p>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Descripción:</h4>
                <p className="text-sm">Falla en sistema de climatización de oficinas centrales.</p>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Estado actual:</h4>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="text-sm">En progreso</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Asignado a:</p>
                  <p>Técnico: Juan Pérez</p>
                </div>
                <div>
                  <p className="font-medium">Prioridad:</p>
                  <p>Alta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
    case "Estadísticas y Métricas":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Servicios Completados", value: "132", change: "+12%" },
              { label: "Satisfacción del Cliente", value: "94%", change: "+2%" },
              { label: "Tiempo Promedio", value: "48h", change: "-5%" }
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</div>
                  <div className="flex items-baseline">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className={`ml-2 text-xs ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Rendimiento histórico</CardTitle>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center">
              <div className="w-full h-full bg-primary/10 rounded-md flex items-center justify-center">
                [Gráfico de área]
              </div>
            </CardContent>
          </Card>
        </div>
      );
      
    case "Calendario":
      return (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h3 className="font-medium">Mayo 2023</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Anterior</Button>
                <Button variant="outline" size="sm">Siguiente</Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-0">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              {Array(35).fill(0).map((_, i) => {
                const day = i - 1; // Adjusting for month start day
                const hasEvent = [10, 15, 22].includes(day);
                return (
                  <div key={i} className={`p-2 border-t border-r dark:border-gray-700 ${day < 1 || day > 31 ? 'bg-muted/20' : ''}`}>
                    {day >= 1 && day <= 31 && (
                      <>
                        <div className="text-center">{day}</div>
                        {hasEvent && (
                          <div className="mt-1 h-1.5 w-1.5 mx-auto bg-primary rounded-full"></div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
      
    case "Pagos y Facturación":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resumen de pagos</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Total facturado (mes actual):</dt>
                    <dd className="text-sm font-medium">$24,500.00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Pagos recibidos:</dt>
                    <dd className="text-sm font-medium">$18,350.00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Pagos pendientes:</dt>
                    <dd className="text-sm font-medium text-yellow-600">$6,150.00</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Últimas facturas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { id: "F-2023-042", client: "Corporación ABC", amount: "$3,500.00", status: "Pagada" },
                    { id: "F-2023-041", client: "Industrias XYZ", amount: "$1,850.00", status: "Pendiente" }
                  ].map((invoice, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                      <div>
                        <div className="font-medium text-sm">{invoice.id}</div>
                        <div className="text-xs text-muted-foreground">{invoice.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{invoice.amount}</div>
                        <div className={`text-xs ${invoice.status === "Pagada" ? "text-green-500" : "text-yellow-500"}`}>
                          {invoice.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case "Campañas y Promociones":
      return (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-primary/20 to-primary/5">
            <CardHeader>
              <CardTitle>Oferta Especial: Mantenimiento Preventivo</CardTitle>
              <CardDescription>Válido hasta: 30 de Junio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">20% de descuento en servicios de mantenimiento preventivo para clientes corporativos.</p>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">20%</div>
                <div className="text-sm">
                  <div className="font-medium">DESCUENTO</div>
                  <div className="text-muted-foreground">Código: PREV20</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Campaña: Referidos Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Recomienda nuestros servicios y obtén bonificaciones en tus próximas contrataciones.</p>
                <div className="flex justify-between text-sm">
                  <span>Estado:</span>
                  <span className="text-green-500">Activa</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ofertas Estacionales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Preparando tu empresa para el verano: Revisión de sistemas de climatización.</p>
                <div className="flex justify-between text-sm">
                  <span>Inicia:</span>
                  <span>1 de Junio</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
      
    case "Gestión de Clientes":
      return (
        <div className="space-y-4">
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <input 
                type="text" 
                placeholder="Buscar cliente..." 
                className="w-full pl-8 pr-4 py-2 border rounded-md bg-background"
              />
              <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Button size="sm">
              + Nuevo Cliente
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Empresa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Servicios
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { company: "Tech Solutions SA", contact: "María García", services: 12, status: "Activo" },
                    { company: "Industrias del Norte", contact: "Roberto Pérez", services: 8, status: "Activo" },
                    { company: "Comercial Express", contact: "Laura Torres", services: 5, status: "Inactivo" }
                  ].map((client, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {client.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {client.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {client.services}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${client.status === "Activo" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}>
                          {client.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
      
    case "Comunicación":
      return (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">Canales de soporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Chat en vivo", status: "Disponible", color: "bg-green-500" },
                      { name: "Teléfono de soporte", status: "Disponible", color: "bg-green-500" },
                      { name: "Correo electrónico", status: "24-48h", color: "bg-yellow-500" }
                    ].map((channel, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                        <span className="text-sm">{channel.name}</span>
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full ${channel.color} mr-2`}></span>
                          <span className="text-xs text-muted-foreground">{channel.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-2/3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">Mensajes recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { sender: "Soporte Técnico", preview: "Hemos recibido su solicitud de asistencia...", time: "10:30 AM", read: true },
                      { sender: "Facturación", preview: "Su factura #2023-044 está disponible para...", time: "Ayer", read: false }
                    ].map((message, i) => (
                      <div key={i} className={`p-3 rounded-md ${message.read ? "" : "bg-primary/5"}`}>
                        <div className="flex justify-between mb-1">
                          <span className={`font-medium ${message.read ? "" : "text-primary"}`}>{message.sender}</span>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm line-clamp-1">{message.preview}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
      
    default:
      return (
        <div className="p-4 border rounded text-center">
          No hay contenido de ejemplo disponible para este módulo.
        </div>
      );
  }
}
