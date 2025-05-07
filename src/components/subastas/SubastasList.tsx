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
import { Calendar, DollarSign, Users, ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { CountdownTimer } from "./CountdownTimer";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

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
    trabajos: 5,
    progreso: 70,
    postulantes: [
      {
        id: "p1",
        proveedor: "Constructora ABC",
        avatar: "CA",
        monto: 15800,
        fechaEntrega: "2025-10-01",
        rating: 4.7,
        estado: "pendiente",
        propuesta: "Ofrecemos un servicio rápido con materiales de calidad superior y acabados premium.",
        incluye_capacitacion: true,
        incluye_garantia: true,
        incluye_postventa: true
      },
      {
        id: "p2",
        proveedor: "Soluciones Integrales",
        avatar: "SI",
        monto: 14200,
        fechaEntrega: "2025-10-10",
        rating: 4.9,
        estado: "pendiente",
        propuesta: "Nuestra propuesta incluye diseño personalizado con materiales ecológicos.",
        incluye_capacitacion: true,
        incluye_garantia: false,
        incluye_postventa: true
      }
    ]
  },
  {
    id: "2",
    titulo: "Desarrollo de aplicación móvil",
    estado: "borrador",
    tipo_precio: "mejor_oferta",
    precio_base: null,
    fecha_fin_postulacion: "2025-06-20",
    fecha_entrega: "2025-08-15",
    trabajos: 8,
    progreso: 45,
    postulantes: []
  },
  {
    id: "3",
    titulo: "Mantenimiento sistema HVAC",
    estado: "adjudicada",
    tipo_precio: "fijo",
    precio_base: 3500,
    fecha_fin_postulacion: "2025-05-28",
    fecha_entrega: "2025-06-30",
    trabajos: 3,
    progreso: 20,
    postulantes: [
      {
        id: "p3",
        proveedor: "Tech Solutions",
        avatar: "TS",
        monto: 22500,
        fechaEntrega: "2025-08-15",
        rating: 4.5,
        estado: "seleccionada",
        propuesta: "Ofrecemos desarrollo ágil con actualizaciones semanales y soporte técnico.",
        incluye_capacitacion: true,
        incluye_garantia: true,
        incluye_postventa: true
      }
    ]
  },
  {
    id: "4",
    titulo: "Servicio de limpieza anual",
    estado: "finalizada",
    tipo_precio: "fijo",
    precio_base: 12000,
    fecha_fin_postulacion: "2025-04-15",
    fecha_entrega: "2025-05-01",
    trabajos: 4,
    progreso: 100,
    postulantes: [
      {
        id: "p4",
        proveedor: "Servicios Técnicos",
        avatar: "ST",
        monto: 8900,
        fechaEntrega: "2025-07-30",
        rating: 4.2,
        estado: "rechazada",
        propuesta: "Servicio completo de revisión y mantenimiento con piezas originales.",
        incluye_capacitacion: false,
        incluye_garantia: true,
        incluye_postventa: false
      }
    ]
  },
];

interface SubastasListProps {
  estado: string;
  onShowPostulantes?: (postulante: any) => void;
}

export function SubastasList({ estado, onShowPostulantes }: SubastasListProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

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
      case "en_revision": return "sand";
      case "en_postulacion": return "blue";
      case "adjudicada": return "purple";
      case "en_progreso": return "amber";
      case "finalizada": return "green";
      default: return "default";
    }
  };
  
  const getBadgeClass = (estado: string) => {
    switch(estado) {
      case "borrador": return "";
      case "publicada": return "";
      case "en_revision": return "";
      case "en_postulacion": return "border-blue-400 text-blue-600";
      case "adjudicada": return "border-purple-400 text-purple-600";
      case "en_progreso": return "border-amber-400 text-amber-600";
      case "finalizada": return "border-green-400 text-green-600";
      default: return "";
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
  
  const toggleRowExpand = (id: string) => {
    setExpandedRows(current => 
      current.includes(id) 
        ? current.filter(rowId => rowId !== id) 
        : [...current, id]
    );
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
    <div className="rounded-md border border-[#e6dfd7]">
      <Table amazonStyle={true}>
        <TableHeader>
          <TableRow>
            <TableHead>Subasta</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Progreso</TableHead>
            <TableHead>Postulantes</TableHead>
            <TableHead>Fecha Límite</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subastas.map((subasta) => (
            <Collapsible 
              key={subasta.id} 
              open={expandedRows.includes(subasta.id)} 
              onOpenChange={() => toggleRowExpand(subasta.id)}
              asChild
            >
              <>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/subastas/${subasta.id}`} 
                        className="font-medium hover:underline text-[#0066c0]"
                      >
                        {subasta.titulo}
                      </Link>
                      {subasta.estado === "en_postulacion" && subasta.postulantes?.length > 0 && (
                        <Badge variant="blue" className="ml-2 text-xs">
                          {subasta.postulantes.length} ofertas
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span>ID: {subasta.id}</span>
                      <span className="mx-2">•</span>
                      <span>{subasta.trabajos} trabajos</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getBadgeVariant(subasta.estado) as any}
                    >
                      {getEstadoText(subasta.estado)}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-44">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{subasta.progreso}%</span>
                    </div>
                    <Progress value={subasta.progreso} className="h-2" />
                  </TableCell>
                  <TableCell>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 flex items-center gap-1 border-[#d6ccc2]"
                        disabled={!subasta.postulantes?.length}
                      >
                        <Users className="h-3.5 w-3.5" />
                        <span>{subasta.postulantes?.length || 0}</span>
                        <ChevronRight 
                          className={`h-3.5 w-3.5 transition-transform ${
                            expandedRows.includes(subasta.id) ? "rotate-90" : ""
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CountdownTimer endDate={subasta.fecha_fin_postulacion} variant="compact" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" className="bg-[#f0c14b] hover:bg-[#e5b94b] text-black border-[#a88734]">
                      <Link to={`/subastas/${subasta.id}`}>
                        Ver Detalles
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>

                <CollapsibleContent asChild>
                  <TableRow className="hover:bg-transparent border-t-0">
                    <TableCell colSpan={6} className="p-0">
                      <div className="bg-[#f7f5f2] p-3">
                        <h4 className="font-medium mb-2">Postulantes para "{subasta.titulo}"</h4>
                        <div className="space-y-2">
                          {subasta.postulantes?.map((postulante) => (
                            <div 
                              key={postulante.id}
                              className="bg-white p-3 rounded-md border border-[#e6dfd7] flex items-center justify-between"
                            >
                              <div>
                                <div className="font-medium">{postulante.proveedor}</div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Entrega: {new Date(postulante.fechaEntrega).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3.5 w-3.5" />
                                    <span>${postulante.monto}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={
                                    postulante.estado === "seleccionada" ? "green" : 
                                    postulante.estado === "pendiente" ? "amber" : "destructive"
                                  }
                                >
                                  {postulante.estado === "seleccionada" ? "Seleccionada" : 
                                    postulante.estado === "pendiente" ? "Pendiente" : "Rechazada"}
                                </Badge>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-[#d6ccc2]"
                                  onClick={() => onShowPostulantes && onShowPostulantes(postulante)}
                                >
                                  Ver Detalles
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </CollapsibleContent>
              </>
            </Collapsible>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
