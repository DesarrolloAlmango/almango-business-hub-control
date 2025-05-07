
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

interface Trabajo {
  id: string;
  descripcion: string;
  completado: boolean;
}

interface DetalleTrabajosProps {
  trabajos: Trabajo[];
}

export function DetalleTrabajos({ trabajos }: DetalleTrabajosProps) {
  const totalTrabajos = trabajos.length;
  const completados = trabajos.filter((t) => t.completado).length;
  const porcentaje = totalTrabajos > 0 ? Math.round((completados / totalTrabajos) * 100) : 0;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Trabajos a Realizar</CardTitle>
            <CardDescription>
              Lista de trabajos incluidos en esta subasta
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">{porcentaje}%</span>
            <p className="text-xs text-muted-foreground">completado</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {trabajos.map((trabajo) => (
            <div
              key={trabajo.id}
              className={`flex items-center gap-3 border rounded-md p-3 ${
                trabajo.completado ? "border-green-200 bg-green-50" : ""
              }`}
            >
              {trabajo.completado ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
              <span>{trabajo.descripcion}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
