
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Bienvenido a Almango Business Hub</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Acceso Rápido</CardTitle>
            <CardDescription>Navega a las secciones principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/solicitudes" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Solicitudes
              </Link>
              <Link to="/subusuarios" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Subusuarios
              </Link>
              <Link to="/links-qr" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Links/QR
              </Link>
              <Link to="/feedback" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Feedback
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gestión</CardTitle>
            <CardDescription>Control y administración</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/clientes" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Clientes
              </Link>
              <Link to="/pagos" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Pagos
              </Link>
              <Link to="/documentacion" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Documentos
              </Link>
              <Link to="/incidencias" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Incidencias
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Análisis</CardTitle>
            <CardDescription>Métricas y rendimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/estadisticas" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Estadísticas
              </Link>
              <Link to="/reportes" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Reportes
              </Link>
              <Link to="/visualizacion-solicitudes" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Visualización
              </Link>
              <Link to="/calendario" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-center">
                Calendario
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Nueva solicitud de servicio recibida",
                "Actualización de estado: Servicio #1042 completado",
                "Nuevo feedback recibido para el servicio #1038",
                "Factura #F-2023-044 generada"
              ].map((item, i) => (
                <li key={i} className="p-2 bg-muted/50 rounded-md text-sm">{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                { title: "Mantenimiento preventivo", date: "28 de Mayo, 2023" },
                { title: "Renovación de contrato", date: "2 de Junio, 2023" },
                { title: "Capacitación de personal", date: "15 de Junio, 2023" }
              ].map((event, i) => (
                <li key={i} className="p-2 bg-muted/50 rounded-md">
                  <div className="font-medium text-sm">{event.title}</div>
                  <div className="text-xs text-muted-foreground">{event.date}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
