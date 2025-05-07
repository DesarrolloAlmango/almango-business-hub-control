
import { Button } from "@/components/ui/button";
import { ImagePlus, UploadCloud, Video } from "lucide-react";
import { useState } from "react";

// Mock data
const MOCK_EVIDENCIAS = [
  {
    id: "1",
    tipo: "imagen",
    url: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
    titulo: "Preparación de paredes",
    fecha: "2025-08-10"
  },
  {
    id: "2",
    tipo: "imagen",
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    titulo: "Instalación eléctrica",
    fecha: "2025-08-15"
  },
  {
    id: "3",
    tipo: "video",
    url: "#",
    titulo: "Presentación de avances",
    fecha: "2025-08-20"
  }
];

interface EvidenciasTrabajosProps {
  id: string;
}

export function EvidenciasTrabajos({ id }: EvidenciasTrabajosProps) {
  const [evidencias] = useState(MOCK_EVIDENCIAS);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {evidencias.map((evidencia) => (
          <div 
            key={evidencia.id} 
            className="group relative overflow-hidden rounded-md border aspect-[3/2] cursor-pointer"
          >
            {evidencia.tipo === "imagen" ? (
              <img 
                src={evidencia.url} 
                alt={evidencia.titulo}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <Video className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute bottom-2 left-2 right-2">
                <h4 className="text-xs font-medium text-white">{evidencia.titulo}</h4>
                <p className="text-xs text-gray-300">
                  {new Date(evidencia.fecha).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ImagePlus className="h-4 w-4" />
          <span className="text-xs">Imagen</span>
        </Button>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Video className="h-4 w-4" />
          <span className="text-xs">Video</span>
        </Button>
      </div>
    </div>
  );
}
