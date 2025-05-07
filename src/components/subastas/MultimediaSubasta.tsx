
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Video, Plus, Trash, Upload, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MultimediaItem {
  id: string;
  tipo: string;
  titulo: string;
  archivo: File | null;
  url: string | null;
}

interface MultimediaSubastaProps {
  multimedia: MultimediaItem[];
  setMultimedia: React.Dispatch<React.SetStateAction<MultimediaItem[]>>;
}

export function MultimediaSubasta({ multimedia, setMultimedia }: MultimediaSubastaProps) {
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoArchivo, setNuevoArchivo] = useState<File | null>(null);
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [tipoActivo, setTipoActivo] = useState("imagen");
  
  const agregarMultimediaArchivo = () => {
    if (nuevoTitulo.trim() && nuevoArchivo) {
      const id = Date.now().toString();
      setMultimedia([...multimedia, { 
        id, 
        tipo: tipoActivo,
        titulo: nuevoTitulo.trim(),
        archivo: nuevoArchivo,
        url: null
      }]);
      setNuevoTitulo("");
      setNuevoArchivo(null);
    }
  };
  
  const agregarMultimediaUrl = () => {
    if (nuevoTitulo.trim() && nuevaUrl.trim()) {
      const id = Date.now().toString();
      setMultimedia([...multimedia, { 
        id, 
        tipo: "video-url",
        titulo: nuevoTitulo.trim(),
        archivo: null,
        url: nuevaUrl.trim()
      }]);
      setNuevoTitulo("");
      setNuevaUrl("");
    }
  };
  
  const eliminarMultimedia = (id: string) => {
    setMultimedia(multimedia.filter(item => item.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNuevoArchivo(e.target.files[0]);
    }
  };

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case "imagen":
        return <Image className="h-5 w-5 text-blue-600" />;
      case "video":
      case "video-url":
        return <Video className="h-5 w-5 text-red-600" />;
      default:
        return <Image className="h-5 w-5" />;
    }
  };
  
  const getTipoText = (tipo: string) => {
    switch (tipo) {
      case "imagen":
        return "Imagen";
      case "video":
        return "Video";
      case "video-url":
        return "Video (URL)";
      default:
        return tipo;
    }
  };
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="imagen" onValueChange={(value) => setTipoActivo(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="imagen">Imágenes</TabsTrigger>
          <TabsTrigger value="video">Video (Archivo)</TabsTrigger>
          <TabsTrigger value="video-url">Video (URL)</TabsTrigger>
        </TabsList>
        
        {/* Pestaña de Imágenes */}
        <TabsContent value="imagen" className="space-y-3 mt-3">
          <div>
            <Label htmlFor="titulo-imagen">Título de la imagen</Label>
            <Input
              id="titulo-imagen"
              placeholder="Ej: Vista frontal del proyecto"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="archivo-imagen">Seleccionar imagen</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="border rounded-md px-3 py-2 flex items-center gap-2 bg-muted/30">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {nuevoArchivo ? nuevoArchivo.name : 'Ninguna imagen seleccionada'}
                  </span>
                </div>
              </div>
              <label htmlFor="archivo-imagen" className="cursor-pointer">
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2 text-sm font-medium">
                  Examinar
                </div>
                <input
                  type="file"
                  id="archivo-imagen"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          
          <Button 
            type="button" 
            onClick={agregarMultimediaArchivo}
            disabled={!nuevoTitulo.trim() || !nuevoArchivo}
            className="w-full mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Imagen
          </Button>
        </TabsContent>
        
        {/* Pestaña de Video (Archivo) */}
        <TabsContent value="video" className="space-y-3 mt-3">
          <div>
            <Label htmlFor="titulo-video">Título del video</Label>
            <Input
              id="titulo-video"
              placeholder="Ej: Demostración del proyecto"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="archivo-video">Seleccionar video</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="border rounded-md px-3 py-2 flex items-center gap-2 bg-muted/30">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {nuevoArchivo ? nuevoArchivo.name : 'Ningún video seleccionado'}
                  </span>
                </div>
              </div>
              <label htmlFor="archivo-video" className="cursor-pointer">
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2 text-sm font-medium">
                  Examinar
                </div>
                <input
                  type="file"
                  id="archivo-video"
                  className="sr-only"
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          
          <Button 
            type="button" 
            onClick={agregarMultimediaArchivo}
            disabled={!nuevoTitulo.trim() || !nuevoArchivo}
            className="w-full mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Video
          </Button>
        </TabsContent>
        
        {/* Pestaña de Video (URL) */}
        <TabsContent value="video-url" className="space-y-3 mt-3">
          <div>
            <Label htmlFor="titulo-video-url">Título del video</Label>
            <Input
              id="titulo-video-url"
              placeholder="Ej: Instrucciones de instalación"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="url-video">URL del video</Label>
            <div className="flex items-center gap-2">
              <Input
                id="url-video"
                placeholder="Ej: https://youtube.com/..."
                value={nuevaUrl}
                onChange={(e) => setNuevaUrl(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <Button 
            type="button" 
            onClick={agregarMultimediaUrl}
            disabled={!nuevoTitulo.trim() || !nuevaUrl.trim()}
            className="w-full mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar URL de Video
          </Button>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-3 mt-6">
        <Label>Contenido multimedia</Label>
        {multimedia.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {multimedia.map((item) => (
              <Card key={item.id} className="p-3 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => eliminarMultimedia(item.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 h-7 w-7"
                >
                  <Trash className="h-3 w-3" />
                </Button>
                
                <div className="flex items-start gap-3">
                  <div className="bg-muted/40 p-2 rounded">
                    {getIconoTipo(item.tipo)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{item.titulo}</h4>
                    <p className="text-xs text-muted-foreground">
                      {getTipoText(item.tipo)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate max-w-[180px]">
                      {item.archivo ? item.archivo.name : item.url}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground border border-dashed rounded-md">
            No hay contenido multimedia
          </div>
        )}
      </div>
    </div>
  );
}
