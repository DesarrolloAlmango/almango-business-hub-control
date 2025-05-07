
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - en una implementación real, esto vendría de una API
const MOCK_SUBASTAS = [
  {
    id: "1",
    titulo: "Remodelación de oficina central",
    estado: "en_postulacion",
    tipo_precio: "fijo",
    precio_base: 15000,
    fecha_fin_postulacion: "2025-07-15",
    fecha_entrega: "2025-09-30",
    trabajos: 5
  },
  {
    id: "2",
    titulo: "Desarrollo de aplicación móvil",
    estado: "borrador",
    tipo_precio: "mejor_oferta",
    precio_base: null,
    fecha_fin_postulacion: "2025-06-20",
    fecha_entrega: "2025-08-15",
    trabajos: 8
  },
  {
    id: "3",
    titulo: "Mantenimiento sistema HVAC",
    estado: "adjudicada",
    tipo_precio: "fijo",
    precio_base: 3500,
    fecha_fin_postulacion: "2025-05-28",
    fecha_entrega: "2025-06-30",
    trabajos: 3
  },
  {
    id: "4",
    titulo: "Servicio de limpieza anual",
    estado: "finalizada",
    tipo_precio: "fijo",
    precio_base: 12000,
    fecha_fin_postulacion: "2025-04-15",
    fecha_entrega: "2025-05-01",
    trabajos: 4
  },
];

interface SubastasListProps {
  estado: string;
}

export function SubastasList({ estado }: SubastasListProps) {
  // Filtrar subastas según el estado seleccionado
  const subastas = estado === "todas" 
    ? MOCK_SUBASTAS 
    : MOCK_SUBASTAS.filter(s => {
        if (estado === "activa") return ["en_postulacion", "adjudicada", "en_progreso"].includes(s.estado);
        if (estado === "pendiente") return ["borrador", "publicada", "en_revision"].includes(s.estado);
        if (estado === "finalizada") return s.estado === "finalizada";
        return true;
      });
  
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
  
  if (subastas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h3 className="text-lg font-medium mb-2">No hay subastas disponibles</h3>
        <p className="text-muted-foreground mb-4">No encontramos subastas que coincidan con los filtros actuales.</p>
        <Button asChild>
          <Link to="/subastas/nueva">Crear Nueva Subasta</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Tipo de Precio</TableHead>
            <TableHead>Fecha Límite</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subastas.map((subasta) => (
            <TableRow key={subasta.id}>
              <TableCell className="font-medium">{subasta.id}</TableCell>
              <TableCell>
                <div>
                  <Link to={`/subastas/${subasta.id}`} className="font-medium hover:underline">
                    {subasta.titulo}
                  </Link>
                  <div className="text-xs text-muted-foreground mt-1">
                    <span className="mr-2">{subasta.trabajos} trabajos</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(subasta.estado) as any}>
                  {getEstadoText(subasta.estado)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>
                    {subasta.tipo_precio === "fijo" 
                      ? `Fijo: $${subasta.precio_base}` 
                      : "Mejor oferta"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{new Date(subasta.fecha_fin_postulacion).toLocaleDateString()}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
