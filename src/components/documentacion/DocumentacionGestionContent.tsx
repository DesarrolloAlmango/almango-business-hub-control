
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiciosList } from "./ServiciosList";
import { DocumentosList } from "./DocumentosList";
import { SubirDocumento } from "./SubirDocumento";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Datos de ejemplo - en una implementación real vendrían de una API
const serviciosEjemplo = [
  { id: "1", nombre: "Mantenimiento Eléctrico", fecha: "2023-06-15", estado: "Completado" },
  { id: "2", nombre: "Instalación Plomería", fecha: "2023-07-22", estado: "En progreso" },
  { id: "3", nombre: "Remodelación Oficina", fecha: "2023-08-10", estado: "Pendiente" },
];

export function DocumentacionGestionContent() {
  const { toast } = useToast();
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string | null>(null);
  const [tabActiva, setTabActiva] = useState("servicios");
  
  const handleServicioSeleccionado = (servicioId: string) => {
    setServicioSeleccionado(servicioId);
    setTabActiva("documentos");
  };
  
  const handleDocumentoSubido = () => {
    toast({
      title: "Documento subido con éxito",
      description: "El documento ha sido asociado al servicio seleccionado."
    });
    setTabActiva("documentos");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documentación de Gestión</h1>
        <p className="text-muted-foreground mt-2">
          Gestione los documentos relacionados con los servicios de su empresa.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Centro de documentación</CardTitle>
          <CardDescription>
            Visualice, cargue y descargue documentos asociados a sus servicios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tabActiva} onValueChange={setTabActiva} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="servicios">Servicios</TabsTrigger>
              <TabsTrigger value="documentos" disabled={!servicioSeleccionado}>
                Documentos
              </TabsTrigger>
              <TabsTrigger value="subir" disabled={!servicioSeleccionado}>
                Subir Documento
              </TabsTrigger>
            </TabsList>
            <TabsContent value="servicios" className="pt-4">
              <ServiciosList 
                servicios={serviciosEjemplo} 
                onServicioSelect={handleServicioSeleccionado} 
              />
            </TabsContent>
            <TabsContent value="documentos" className="pt-4">
              {servicioSeleccionado && (
                <DocumentosList 
                  servicioId={servicioSeleccionado}
                  servicioNombre={serviciosEjemplo.find(s => s.id === servicioSeleccionado)?.nombre || ""}
                />
              )}
            </TabsContent>
            <TabsContent value="subir" className="pt-4">
              {servicioSeleccionado && (
                <SubirDocumento 
                  servicioId={servicioSeleccionado}
                  servicioNombre={serviciosEjemplo.find(s => s.id === servicioSeleccionado)?.nombre || ""}
                  onExito={handleDocumentoSubido}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
