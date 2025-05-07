
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  BadgeCheck,
  Edit,
  File,
  Gavel,
  CheckCircle,
  Clock,
  Users,
  BarChart,
  Calendar,
  PenSquare,
  LineChart
} from "lucide-react";

// Mock data
const MOCK_PROGRESO = [
  {
    id: "1",
    fecha: "2025-05-01",
    titulo: "Creación de la subasta",
    descripcion: "La subasta ha sido creada y está en estado de borrador",
    completado: true,
    icono: File
  },
  {
    id: "2",
    fecha: "2025-05-03",
    titulo: "Publicación de la subasta",
    descripcion: "La subasta ha sido publicada y está disponible para los proveedores",
    completado: true,
    icono: PenSquare
  },
  {
    id: "3",
    fecha: "2025-05-15",
    titulo: "Período de postulación",
    descripcion: "Los proveedores pueden enviar sus ofertas hasta el 15 de julio",
    completado: true,
    icono: Calendar
  },
  {
    id: "4",
    fecha: "2025-07-20",
    titulo: "Evaluación de ofertas",
    descripcion: "Se están evaluando las ofertas recibidas",
    completado: true,
    icono: BarChart
  },
  {
    id: "5",
    fecha: "2025-07-25",
    titulo: "Adjudicación de la subasta",
    descripcion: "La subasta ha sido adjudicada a Constructora Herrera",
    completado: false,
    icono: Gavel
  },
  {
    id: "6",
    fecha: "2025-08-01",
    titulo: "Inicio de los trabajos",
    descripcion: "Comienzan los trabajos de remodelación",
    completado: false,
    icono: Calendar
  },
  {
    id: "7",
    fecha: "2025-09-30",
    titulo: "Finalización de los trabajos",
    descripcion: "Fecha límite para la entrega de todos los trabajos",
    completado: false,
    icono: CheckCircle
  }
];

interface ProgresoSubastaProps {
  id: string;
}

export function ProgresoSubasta({ id }: ProgresoSubastaProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progreso de la Subasta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Eventos */}
          <div className="space-y-4">
            {MOCK_PROGRESO.map((evento, index) => (
              <div key={evento.id} className="relative pl-8">
                {/* Círculo con icono */}
                <div className={`absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 ${
                  evento.completado 
                    ? "border-primary bg-primary" 
                    : "border-gray-300 bg-white"
                }`}>
                </div>
                
                {/* Contenido del evento */}
                <div className={`rounded-lg border p-3 ${
                  evento.completado 
                    ? "border-gray-200" 
                    : "border-dashed border-gray-300"
                }`}>
                  <div className="mb-1 flex items-center gap-2">
                    <evento.icono className={`h-4 w-4 ${
                      evento.completado ? "text-primary" : "text-muted-foreground"
                    }`} />
                    
                    <h4 className="text-sm font-medium">
                      {evento.titulo}
                    </h4>
                    
                    <span className="ml-auto text-xs text-muted-foreground">
                      {new Date(evento.fecha).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {evento.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
