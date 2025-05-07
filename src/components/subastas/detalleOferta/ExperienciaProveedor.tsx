
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ExperienciaProveedorProps {
  estado: string;
  onClose: () => void;
}

export function ExperienciaProveedor({ estado, onClose }: ExperienciaProveedorProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Experiencia del Proveedor</CardTitle>
        <CardDescription>Historial de trabajos similares</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border rounded-md p-4 flex flex-col items-center">
            <span className="text-2xl font-bold">24</span>
            <span className="text-sm text-muted-foreground">Trabajos similares</span>
          </div>
          <div className="border rounded-md p-4 flex flex-col items-center">
            <span className="text-2xl font-bold">8</span>
            <span className="text-sm text-muted-foreground">Años de experiencia</span>
          </div>
          <div className="border rounded-md p-4 flex flex-col items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-1">98%</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <span className="text-sm text-muted-foreground">Cumplimiento</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 flex justify-end gap-2">
        {estado === "pendiente" ? (
          <>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button>
              Aprobar Oferta
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
