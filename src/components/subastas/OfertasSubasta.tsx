
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Star, ThumbsUp } from "lucide-react";

// Mock data
const MOCK_OFERTAS = [
  {
    id: "1",
    proveedor: "Constructora Herrera",
    avatar: "CH",
    monto: 14500,
    fechaEntrega: "2025-09-25",
    rating: 4.8,
    estado: "seleccionada"
  },
  {
    id: "2",
    proveedor: "Servicios Técnicos RG",
    avatar: "RG",
    monto: 15200,
    fechaEntrega: "2025-09-15",
    rating: 4.5,
    estado: "pendiente"
  },
  {
    id: "3",
    proveedor: "Mantenimientos Profesionales",
    avatar: "MP",
    monto: 16000,
    fechaEntrega: "2025-09-10",
    rating: 4.2,
    estado: "rechazada"
  },
];

interface OfertasSubastaProps {
  id: string;
}

export function OfertasSubasta({ id }: OfertasSubastaProps) {
  const getBadgeVariant = (estado: string) => {
    switch(estado) {
      case "seleccionada": return "green";
      case "pendiente": return "yellow";
      case "rechazada": return "destructive";
      default: return "default";
    }
  };
  
  const getEstadoText = (estado: string) => {
    switch(estado) {
      case "seleccionada": return "Seleccionada";
      case "pendiente": return "Pendiente";
      case "rechazada": return "Rechazada";
      default: return estado;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ofertas Recibidas</CardTitle>
      </CardHeader>
      <CardContent>
        {MOCK_OFERTAS.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Fecha Entrega</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_OFERTAS.map((oferta) => (
                <TableRow key={oferta.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={oferta.proveedor} />
                        <AvatarFallback>{oferta.avatar}</AvatarFallback>
                      </Avatar>
                      <span>{oferta.proveedor}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">${oferta.monto}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(oferta.fechaEntrega).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{oferta.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(oferta.estado) as any}>
                      {getEstadoText(oferta.estado)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {oferta.estado === "pendiente" ? (
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" className="h-8 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Aprobar
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="ghost" className="h-8 px-2" disabled>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Decidido
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>No hay ofertas disponibles para esta subasta</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
