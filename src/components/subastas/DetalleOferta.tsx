
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { OfertaHeader } from "./detalleOferta/OfertaHeader";
import { ProveedorInfo } from "./detalleOferta/ProveedorInfo";
import { ProgresoContratacion } from "./detalleOferta/ProgresoContratacion";
import { DetallesEconomicos } from "./detalleOferta/DetallesEconomicos";
import { DetallesPropuesta } from "./detalleOferta/DetallesPropuesta";
import { ExperienciaProveedor } from "./detalleOferta/ExperienciaProveedor";

interface DetalleOfertaProps {
  oferta: any;
  open: boolean;
  onClose: () => void;
}

export function DetalleOferta({ oferta, open, onClose }: DetalleOfertaProps) {
  if (!oferta) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[640px] max-h-[80vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background border-b pt-4 px-6 pb-4">
          <OfertaHeader estado={oferta.estado} />
        </div>

        <div className="p-6 space-y-6">
          {/* Información del proveedor */}
          <ProveedorInfo 
            proveedor={oferta.proveedor} 
            avatar={oferta.avatar} 
            rating={oferta.rating} 
          />

          {/* Timeline indicador de progreso */}
          <ProgresoContratacion estado={oferta.estado} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detalles económicos */}
            <DetallesEconomicos 
              monto={oferta.monto} 
              fechaEntrega={oferta.fechaEntrega} 
            />

            {/* Detalles técnicos */}
            <DetallesPropuesta 
              propuesta={oferta.propuesta}
              incluye_capacitacion={oferta.incluye_capacitacion}
              incluye_garantia={oferta.incluye_garantia}
              incluye_postventa={oferta.incluye_postventa}
            />
          </div>

          {/* Historial del proveedor */}
          <ExperienciaProveedor estado={oferta.estado} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
