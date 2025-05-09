
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Datos de ejemplo - en una implementación real vendrían de una API
const documentosEjemplo = [
  { 
    id: "1", 
    nombre: "Contrato de servicio.pdf", 
    tipo: "PDF", 
    fechaSubida: "2023-06-16", 
    tamaño: "2.4 MB",
    url: "#"
  },
  { 
    id: "2", 
    nombre: "Factura 2023-001.pdf", 
    tipo: "PDF", 
    fechaSubida: "2023-06-17", 
    tamaño: "1.1 MB",
    url: "#"
  },
  { 
    id: "3", 
    nombre: "Especificaciones técnicas.docx", 
    tipo: "DOCX", 
    fechaSubida: "2023-06-18", 
    tamaño: "3.2 MB",
    url: "#"
  },
  { 
    id: "4", 
    nombre: "Reporte de inspección.xlsx", 
    tipo: "XLSX", 
    fechaSubida: "2023-06-19", 
    tamaño: "1.8 MB",
    url: "#"
  },
];

interface DocumentosListProps {
  servicioId: string;
  servicioNombre: string;
}

export function DocumentosList({ servicioId, servicioNombre }: DocumentosListProps) {
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<any | null>(null);
  const [visualizacionAbierta, setVisualizacionAbierta] = useState(false);

  // Filtrado de documentos por servicio - En una implementación real esto vendría de una API
  const documentos = documentosEjemplo;

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const visualizarDocumento = (documento: any) => {
    setDocumentoSeleccionado(documento);
    setVisualizacionAbierta(true);
  };

  const descargarDocumento = (documento: any) => {
    // En una implementación real, esto iniciaría la descarga del documento
    console.log(`Descargando documento: ${documento.nombre}`);
    // window.open(documento.url, '_blank');
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Documentos para: {servicioNombre}</h3>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del documento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha de subida</TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No hay documentos disponibles para este servicio
                </TableCell>
              </TableRow>
            ) : (
              documentos.map((documento) => (
                <TableRow key={documento.id}>
                  <TableCell className="font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    {documento.nombre}
                  </TableCell>
                  <TableCell>{documento.tipo}</TableCell>
                  <TableCell>{formatFecha(documento.fechaSubida)}</TableCell>
                  <TableCell>{documento.tamaño}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => visualizarDocumento(documento)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => descargarDocumento(documento)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={visualizacionAbierta} onOpenChange={setVisualizacionAbierta}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{documentoSeleccionado?.nombre}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-muted/30 rounded-md p-4 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                La visualización de documentos estaría implementada aquí, mostrando el contenido del archivo {documentoSeleccionado?.nombre}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
