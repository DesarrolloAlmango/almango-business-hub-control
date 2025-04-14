
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Users,
  FileText,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Dashboard() {
  // Dummy data for the dashboard
  const stats = [
    {
      title: "Total Solicitudes",
      value: "346",
      icon: FileText,
      description: "Últimos 30 días",
      change: "+12%",
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Subusuarios",
      value: "24",
      icon: Users,
      description: "Activos",
      change: "+2",
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      title: "Nivel de Satisfacción",
      value: "4.8/5",
      icon: Star,
      description: "Basado en 287 reseñas",
      change: "+0.2",
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      title: "Servicios Pendientes",
      value: "18",
      icon: Clock,
      description: "Requieren acción",
      change: "-4",
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
  ];

  const recentActivities = [
    { id: 1, type: "Solicitud", action: "Creada", info: "Servicio de Plomería #4582", time: "Hace 10 minutos" },
    { id: 2, type: "Incidencia", action: "Resuelta", info: "Retraso en servicio #4498", time: "Hace 25 minutos" },
    { id: 3, type: "Subusuario", action: "Agregado", info: "Carlos Mendoza", time: "Hace 1 hora" },
    { id: 4, type: "Pago", action: "Procesado", info: "Factura #INV-002345", time: "Hace 2 horas" },
    { id: 5, type: "QR", action: "Generado", info: "Campaña de Verano", time: "Hace 3 horas" },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Última actualización: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bg} p-2 rounded-full`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description} <span className={stat.color}>{stat.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Status Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Solicitudes</CardTitle>
            <CardDescription>Resumen de solicitudes activas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">En Progreso</div>
                    <div className="text-sm font-medium">45</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary/20">
                    <div className="h-2 rounded-full bg-secondary" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Completados</div>
                    <div className="text-sm font-medium">287</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-primary/20">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Incidencias</div>
                    <div className="text-sm font-medium">14</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-destructive/20">
                    <div className="h-2 rounded-full bg-destructive" style={{ width: "15%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas 5 actividades en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-muted">
                    {activity.type === "Solicitud" && <FileText className="h-4 w-4" />}
                    {activity.type === "Incidencia" && <AlertTriangle className="h-4 w-4" />}
                    {activity.type === "Subusuario" && <Users className="h-4 w-4" />}
                    {activity.type === "Pago" && <Activity className="h-4 w-4" />}
                    {activity.type === "QR" && <CheckCircle className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.type} {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.info}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
