
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Servicio {
  id: string;
  nombre: string;
  fecha: string;
  estado: string;
}

interface ServiciosListProps {
  servicios: Servicio[];
  onServicioSelect: (servicioId: string) => void;
}

export function ServiciosList({ servicios, onServicioSelect }: ServiciosListProps) {
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'completado':
        return 'bg-green-500';
      case 'en progreso':
        return 'bg-blue-500';
      case 'pendiente':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Servicio</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicios.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No hay servicios disponibles
              </TableCell>
            </TableRow>
          ) : (
            servicios.map((servicio) => (
              <TableRow key={servicio.id}>
                <TableCell className="font-medium">{servicio.nombre}</TableCell>
                <TableCell>{formatFecha(servicio.fecha)}</TableCell>
                <TableCell>
                  <Badge className={getEstadoColor(servicio.estado)}>
                    {servicio.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onServicioSelect(servicio.id)}
                  >
                    Ver documentos
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
