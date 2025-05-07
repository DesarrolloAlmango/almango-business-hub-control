
import { Card, CardContent } from "@/components/ui/card";

interface ProgresoContratacionProps {
  estado: string;
}

export function ProgresoContratacion({ estado }: ProgresoContratacionProps) {
  return (
    <Card className="border-muted bg-muted/10">
      <CardContent className="p-4">
        <div className="space-y-4">
          <h4 className="font-medium">Proceso de Contratación</h4>
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-muted-foreground/20"></div>
            <div className="space-y-6">
              <div className="relative pl-8">
                <div className={`absolute left-0 w-4 h-4 rounded-full ${estado !== "rechazada" ? "bg-green-500" : "bg-muted-foreground/20"}`}>
                </div>
                <p className="font-medium">Recepción de Oferta</p>
                <p className="text-sm text-muted-foreground">Oferta recibida correctamente</p>
              </div>
              <div className="relative pl-8">
                <div className={`absolute left-0 w-4 h-4 rounded-full ${estado === "seleccionada" ? "bg-green-500" : "bg-muted-foreground/20"}`}>
                </div>
                <p className="font-medium">Evaluación de Propuesta</p>
                <p className="text-sm text-muted-foreground">
                  {estado === "seleccionada" ? "Propuesta aprobada" : 
                  estado === "pendiente" ? "En evaluación" : "Propuesta rechazada"}
                </p>
              </div>
              <div className="relative pl-8">
                <div className={`absolute left-0 w-4 h-4 rounded-full ${estado === "seleccionada" ? "bg-amber-500" : "bg-muted-foreground/20"}`}>
                </div>
                <p className="font-medium">Inicio del Proyecto</p>
                <p className="text-sm text-muted-foreground">
                  {estado === "seleccionada" ? "Próximo paso" : "Pendiente de selección"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
