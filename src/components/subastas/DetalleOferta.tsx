
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
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, DollarSign, Clock, Star, FileText, Package, CheckCircle, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Detalles de la Oferta
            <Badge variant={oferta.estado === "seleccionada" ? "green" : (oferta.estado === "pendiente" ? "yellow" : "destructive")}>
              {oferta.estado === "seleccionada" ? "Seleccionada" : (oferta.estado === "pendiente" ? "Pendiente" : "Rechazada")}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Información detallada sobre la oferta del proveedor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información del proveedor */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={oferta.proveedor} />
              <AvatarFallback className="text-lg">{oferta.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{oferta.proveedor}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{oferta.rating} de calificación</span>
              </div>
            </div>
          </div>

          <Separator />
          
          {/* Detalles económicos */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Detalles Económicos</CardTitle>
              <CardDescription>Información financiera de la oferta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Monto Total</span>
                </div>
                <span className="text-xl font-bold">${oferta.monto}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Fecha de Entrega</span>
                </div>
                <span>{new Date(oferta.fechaEntrega).toLocaleDateString()}</span>
              </div>

              {/* Datos simulados de formas de pago */}
              <div className="pt-2 border-t">
                <h4 className="font-medium mb-2">Forma de Pago Propuesta</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-muted/50 p-2 rounded-md">
                    <div className="font-medium">Anticipo</div>
                    <div className="text-muted-foreground">30% del total</div>
                  </div>
                  <div className="bg-muted/50 p-2 rounded-md">
                    <div className="font-medium">Avance 50%</div>
                    <div className="text-muted-foreground">30% del total</div>
                  </div>
                  <div className="bg-muted/50 p-2 rounded-md">
                    <div className="font-medium">Entrega Final</div>
                    <div className="text-muted-foreground">40% del total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalles técnicos */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Detalles de la Propuesta</CardTitle>
              <CardDescription>Especificaciones técnicas ofrecidas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 rounded-md p-3">
                <h4 className="font-medium mb-2">Descripción de la Propuesta</h4>
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

              <div className="pt-2 border-t">
                <h4 className="font-medium mb-2">Documentos Adjuntos</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted/30 cursor-pointer">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Propuesta_Técnica.pdf</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted/30 cursor-pointer">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Certificaciones.pdf</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historial del proveedor */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Experiencia del Proveedor</CardTitle>
              <CardDescription>Historial de trabajos similares</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Trabajos similares completados</span>
                  <span>24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Años de experiencia</span>
                  <span>8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Cumplimiento de plazos</span>
                  <div className="flex items-center">
                    <span className="mr-2">98%</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
