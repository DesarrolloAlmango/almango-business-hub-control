
import { 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface OfertaHeaderProps {
  estado: string;
}

export function OfertaHeader({ estado }: OfertaHeaderProps) {
  // Function to get the appropriate badge variant
  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "seleccionada":
        return "outline";
      case "pendiente":
        return "secondary";
      default:
        return "destructive";
    }
  };

  // Function to get the appropriate badge class
  const getBadgeClass = (estado: string) => {
    switch (estado) {
      case "seleccionada":
        return "border-green-400 text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-900/30";
      case "pendiente":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "";
    }
  };

  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        Detalles de la Oferta
        <Badge 
          variant={getBadgeVariant(estado)} 
          className={getBadgeClass(estado)}
        >
          {estado === "seleccionada" ? "Seleccionada" : (estado === "pendiente" ? "Pendiente" : "Rechazada")}
        </Badge>
      </DialogTitle>
      <DialogDescription>
        Información detallada sobre la oferta del proveedor
      </DialogDescription>
    </DialogHeader>
  );
}
