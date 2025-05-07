
import { FileText, CheckCircle, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface DetallesPropuestaProps {
  propuesta: string;
  incluye_capacitacion?: boolean;
  incluye_garantia?: boolean;
  incluye_postventa?: boolean;
}

export function DetallesPropuesta({ 
  propuesta, 
  incluye_capacitacion = false, 
  incluye_garantia = true, 
  incluye_postventa = true 
}: DetallesPropuestaProps) {
  const renderIncluye = (item: string, incluido: boolean) => (
    <div className="flex items-center justify-between border-b py-2 last:border-0">
      <span>{item}</span>
      {incluido ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
    </div>
  );
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Detalles de la Propuesta
        </CardTitle>
        <CardDescription>Especificaciones técnicas ofrecidas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 rounded-md p-3">
          <h4 className="font-medium mb-2">Descripción</h4>
          <p className="text-sm text-muted-foreground">
            {propuesta || "Nuestra propuesta incluye materiales de alta calidad y un equipo experimentado para completar el trabajo en el tiempo estimado. Garantizamos un acabado profesional y nos comprometemos a cumplir con todas las especificaciones requeridas."}
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Elementos Incluidos</h4>
          <div className="space-y-1 text-sm">
            {renderIncluye("Materiales de alta calidad", true)}
            {renderIncluye("Transporte e instalación", true)}
            {renderIncluye("Capacitación de uso", incluye_capacitacion)}
            {renderIncluye("Garantía extendida", incluye_garantia)}
            {renderIncluye("Servicio post-venta", incluye_postventa)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
