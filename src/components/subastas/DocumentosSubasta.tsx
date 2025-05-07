
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Plus, Trash, Upload } from "lucide-react";
import { useState } from "react";

interface Documento {
  id: string;
  titulo: string;
  descripcion: string;
  archivo: File | null;
}

interface DocumentosSubastaProps {
  documentos: Documento[];
  setDocumentos: React.Dispatch<React.SetStateAction<Documento[]>>;
}

export function DocumentosSubasta({ documentos, setDocumentos }: DocumentosSubastaProps) {
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  
  const agregarDocumento = () => {
    if (nuevoTitulo.trim() && archivoSeleccionado) {
      const id = Date.now().toString();
      setDocumentos([...documentos, { 
        id, 
        titulo: nuevoTitulo.trim(),
        descripcion: nuevaDescripcion.trim(),
        archivo: archivoSeleccionado
      }]);
      setNuevoTitulo("");
      setNuevaDescripcion("");
      setArchivoSeleccionado(null);
    }
  };
  
  const eliminarDocumento = (id: string) => {
    setDocumentos(documentos.filter(doc => doc.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoSeleccionado(e.target.files[0]);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <Label htmlFor="titulo-documento">Título del documento</Label>
          <Input
            id="titulo-documento"
            placeholder="Ej: Planos arquitectónicos"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="descripcion-documento">Descripción</Label>
          <Textarea
            id="descripcion-documento"
            placeholder="Ej: Contiene los planos de la estructura principal"
            value={nuevaDescripcion}
            onChange={(e) => setNuevaDescripcion(e.target.value)}
            rows={2}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Label htmlFor="archivo">Seleccionar archivo</Label>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="border rounded-md px-3 py-2 flex items-center gap-2 bg-muted/30">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {archivoSeleccionado ? archivoSeleccionado.name : 'Ningún archivo seleccionado'}
                </span>
              </div>
            </div>
            <label htmlFor="archivo" className="cursor-pointer">
              <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2 text-sm font-medium">
                Examinar
              </div>
              <input
                type="file"
                id="archivo"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        
        <Button 
          type="button" 
          onClick={agregarDocumento}
          disabled={!nuevoTitulo.trim() || !archivoSeleccionado}
          className="w-full mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Documento
        </Button>
      </div>
      
      <div className="space-y-3 mt-6">
        <Label>Documentos adjuntos</Label>
        {documentos.length > 0 ? (
          documentos.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between border rounded-md p-3">
              <div className="flex items-start gap-3">
                <div className="bg-muted/40 p-2 rounded">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{doc.titulo}</h4>
                  <p className="text-xs text-muted-foreground">{doc.descripcion}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {doc.archivo?.name} ({(doc.archivo?.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => eliminarDocumento(doc.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground border border-dashed rounded-md">
            No hay documentos adjuntos
          </div>
        )}
      </div>
    </div>
  );
}
