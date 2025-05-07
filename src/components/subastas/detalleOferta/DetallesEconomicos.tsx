
import { Calendar, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface DetallesEconomicosProps {
  monto: number;
  fechaEntrega: string;
}

export function DetallesEconomicos({ monto, fechaEntrega }: DetallesEconomicosProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Detalles Económicos
        </CardTitle>
        <CardDescription>Información financiera de la oferta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Monto Total</span>
          <span className="text-xl font-bold">${monto}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Fecha de Entrega</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(fechaEntrega).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Datos simulados de formas de pago */}
        <div className="pt-2 border-t">
          <h4 className="font-medium mb-2">Forma de Pago Propuesta</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="border rounded-md p-3 flex flex-col items-center">
              <div className="font-medium text-lg">30%</div>
              <div className="text-xs text-muted-foreground">Anticipo</div>
            </div>
            <div className="border rounded-md p-3 flex flex-col items-center">
              <div className="font-medium text-lg">30%</div>
              <div className="text-xs text-muted-foreground">Avance 50%</div>
            </div>
            <div className="border rounded-md p-3 flex flex-col items-center">
              <div className="font-medium text-lg">40%</div>
              <div className="text-xs text-muted-foreground">Final</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
