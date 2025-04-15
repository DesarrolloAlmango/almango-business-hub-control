
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

// Service status types
type ServiceStatus = "pending" | "completed" | "in-progress" | "cancelled";

// Service interface
interface Service {
  id: string;
  name: string;
  client: string;
  date: string;
  status: ServiceStatus;
  amount: number;
}

// Sample data for services
const services: Service[] = [
  { 
    id: "SRV-001", 
    name: "Mantenimiento Eléctrico", 
    client: "Almacenes García", 
    date: "2025-04-10", 
    status: "completed",
    amount: 1200
  },
  { 
    id: "SRV-002", 
    name: "Instalación de Redes", 
    client: "Oficinas Centro", 
    date: "2025-04-12", 
    status: "in-progress",
    amount: 2500
  },
  { 
    id: "SRV-003", 
    name: "Servicio Plomería", 
    client: "Hotel Plaza", 
    date: "2025-04-14", 
    status: "pending",
    amount: 800
  },
  { 
    id: "SRV-004", 
    name: "Mantenimiento Aires", 
    client: "Clínica Norte", 
    date: "2025-04-09", 
    status: "cancelled",
    amount: 1500
  },
  { 
    id: "SRV-005", 
    name: "Instalación Cámaras", 
    client: "Supermercado Express", 
    date: "2025-04-15", 
    status: "pending",
    amount: 3200
  },
  { 
    id: "SRV-006", 
    name: "Soporte Técnico IT", 
    client: "Bufete Legal Mendez", 
    date: "2025-04-11", 
    status: "completed",
    amount: 950
  },
];

const getStatusBadge = (status: ServiceStatus) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">
        <Clock className="h-3 w-3 mr-1" /> Pendiente
      </Badge>;
    case "in-progress":
      return <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">
        <Clock className="h-3 w-3 mr-1" /> En Progreso
      </Badge>;
    case "completed":
      return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">
        <CheckCircle className="h-3 w-3 mr-1" /> Completado
      </Badge>;
    case "cancelled":
      return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">
        <XCircle className="h-3 w-3 mr-1" /> Cancelado
      </Badge>;
    default:
      return <Badge><Clock className="h-3 w-3 mr-1" /> Desconocido</Badge>;
  }
};

export function ServiceStatusGrid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Servicios Contratados</CardTitle>
        <CardDescription>Estado actual de los servicios en proceso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="border-l-4 hover:shadow-md transition-shadow duration-300" 
              style={{ 
                borderLeftColor: 
                  service.status === "completed" ? "hsl(var(--primary))" : 
                  service.status === "in-progress" ? "hsl(var(--secondary))" : 
                  service.status === "pending" ? "#EAB308" : 
                  "hsl(var(--destructive))"
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.client}</p>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-muted-foreground">ID: {service.id}</span>
                  <span className="font-medium">${service.amount.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Fecha: {new Date(service.date).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
