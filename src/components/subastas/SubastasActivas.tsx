
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Gavel, FileText, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data para las subastas activas
const SUBASTAS_ACTIVAS = [
  {
    id: "1",
    titulo: "Remodelación de oficina central",
    estado: "en_postulacion",
    progreso: 70,
    fecha_fin_postulacion: "2025-07-15",
    trabajos_totales: 5,
    trabajos_completados: 4,
    documentos: 3,
    multimedia: 2
  },
  {
    id: "2",
    titulo: "Desarrollo de aplicación móvil",
    estado: "adjudicada",
    progreso: 45,
    fecha_fin_postulacion: "2025-06-20",
    trabajos_totales: 8,
    trabajos_completados: 3,
    documentos: 5,
    multimedia: 4
  },
  {
    id: "3",
    titulo: "Mantenimiento sistema HVAC",
    estado: "en_progreso",
    progreso: 20,
    fecha_fin_postulacion: "2025-05-28",
    trabajos_totales: 3,
    trabajos_completados: 0,
    documentos: 2,
    multimedia: 1
  }
];

const getBadgeVariant = (estado: string) => {
  switch(estado) {
    case "borrador": return "secondary";
    case "publicada": return "default";
    case "en_revision": return "outline";
    case "en_postulacion": return "blue";
    case "adjudicada": return "purple";
    case "en_progreso": return "yellow";
    case "finalizada": return "green";
    default: return "default";
  }
};

const getEstadoText = (estado: string) => {
  switch(estado) {
    case "borrador": return "Borrador";
    case "publicada": return "Publicada";
    case "en_revision": return "En Revisión";
    case "en_postulacion": return "En Postulación";
    case "adjudicada": return "Adjudicada";
    case "en_progreso": return "En Progreso";
    case "finalizada": return "Finalizada";
    default: return estado;
  }
};

export function SubastasActivas() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Subastas Activas</h2>
        <Button asChild>
          <Link to="/subastas/nueva" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Nueva Subasta
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBASTAS_ACTIVAS.map((subasta) => (
          <Card key={subasta.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    <Link to={`/subastas/${subasta.id}`} className="hover:underline">
                      {subasta.titulo}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>Vence: {new Date(subasta.fecha_fin_postulacion).toLocaleDateString()}</span>
                  </CardDescription>
                </div>
                <Badge variant={getBadgeVariant(subasta.estado) as any}>
                  {getEstadoText(subasta.estado)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Progreso general</span>
                    <span className="text-xs text-muted-foreground">{subasta.progreso}%</span>
                  </div>
                  <Progress value={subasta.progreso} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 py-2 text-center">
                  <div className="border rounded-md p-2">
                    <p className="text-xs text-muted-foreground">Trabajos</p>
                    <p className="text-sm font-medium">{subasta.trabajos_completados}/{subasta.trabajos_totales}</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <p className="text-xs text-muted-foreground">Documentos</p>
                    <p className="text-sm font-medium">{subasta.documentos}</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <p className="text-xs text-muted-foreground">Multimedia</p>
                    <p className="text-sm font-medium">{subasta.multimedia}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 mt-auto">
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to={`/subastas/${subasta.id}`}>
                  Ver detalles
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link to="/subastas" className="flex items-center gap-2">
            <Gavel className="h-4 w-4" />
            Ver todas las subastas
          </Link>
        </Button>
      </div>
    </div>
  );
}
