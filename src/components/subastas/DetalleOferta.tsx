
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, DollarSign, Clock, Star, FileText, CheckCircle, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface DetalleOfertaProps {
  oferta: any;
  open: boolean;
  onClose: () => void;
}

export function DetalleOferta({ oferta, open, onClose }: DetalleOfertaProps) {
  if (!oferta) return null;

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
  }

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
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[640px] max-h-[80vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background border-b pt-4 px-6 pb-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Detalles de la Oferta
              <Badge 
                variant={getBadgeVariant(oferta.estado)} 
                className={getBadgeClass(oferta.estado)}
              >
                {oferta.estado === "seleccionada" ? "Seleccionada" : (oferta.estado === "pendiente" ? "Pendiente" : "Rechazada")}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Información detallada sobre la oferta del proveedor
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Información del proveedor */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={oferta.proveedor} />
              <AvatarFallback className="text-lg bg-primary/10 text-primary">{oferta.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{oferta.proveedor}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{oferta.rating} de calificación</span>
              </div>
            </div>
          </div>

          {/* Timeline indicador de progreso */}
          <Card className="border-muted bg-muted/10">
            <CardContent className="p-4">
              <div className="space-y-4">
                <h4 className="font-medium">Proceso de Contratación</h4>
                <div className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-muted-foreground/20"></div>
                  <div className="space-y-6">
                    <div className="relative pl-8">
                      <div className={`absolute left-0 w-4 h-4 rounded-full ${oferta.estado !== "rechazada" ? "bg-green-500" : "bg-muted-foreground/20"}`}>
                      </div>
                      <p className="font-medium">Recepción de Oferta</p>
                      <p className="text-sm text-muted-foreground">Oferta recibida correctamente</p>
                    </div>
                    <div className="relative pl-8">
                      <div className={`absolute left-0 w-4 h-4 rounded-full ${oferta.estado === "seleccionada" ? "bg-green-500" : "bg-muted-foreground/20"}`}>
                      </div>
                      <p className="font-medium">Evaluación de Propuesta</p>
                      <p className="text-sm text-muted-foreground">
                        {oferta.estado === "seleccionada" ? "Propuesta aprobada" : 
                        oferta.estado === "pendiente" ? "En evaluación" : "Propuesta rechazada"}
                      </p>
                    </div>
                    <div className="relative pl-8">
                      <div className={`absolute left-0 w-4 h-4 rounded-full ${oferta.estado === "seleccionada" ? "bg-amber-500" : "bg-muted-foreground/20"}`}>
                      </div>
                      <p className="font-medium">Inicio del Proyecto</p>
                      <p className="text-sm text-muted-foreground">
                        {oferta.estado === "seleccionada" ? "Próximo paso" : "Pendiente de selección"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detalles económicos */}
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
                  <span className="text-xl font-bold">${oferta.monto}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Fecha de Entrega</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(oferta.fechaEntrega).toLocaleDateString()}</span>
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

            {/* Detalles técnicos */}
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
                    {oferta.propuesta || "Nuestra propuesta incluye materiales de alta calidad y un equipo experimentado para completar el trabajo en el tiempo estimado. Garantizamos un acabado profesional y nos comprometemos a cumplir con todas las especificaciones requeridas."}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Elementos Incluidos</h4>
                  <div className="space-y-1 text-sm">
                    {renderIncluye("Materiales de alta calidad", true)}
                    {renderIncluye("Transporte e instalación", true)}
                    {renderIncluye("Capacitación de uso", oferta.incluye_capacitacion || false)}
                    {renderIncluye("Garantía extendida", oferta.incluye_garantia || true)}
                    {renderIncluye("Servicio post-venta", oferta.incluye_postventa || true)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historial del proveedor */}
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
              {oferta.estado === "pendiente" ? (
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
