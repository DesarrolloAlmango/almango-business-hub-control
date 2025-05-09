
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileUp, File } from "lucide-react";

const documentoFormSchema = z.object({
  nombre: z.string().min(3, {
    message: "El nombre del documento debe tener al menos 3 caracteres",
  }),
  tipo: z.string({
    required_error: "Por favor seleccione un tipo de documento",
  }),
  descripcion: z.string().optional(),
  archivo: z.instanceof(FileList).refine(files => files.length > 0, {
    message: "Por favor seleccione un archivo",
  }),
});

interface SubirDocumentoProps {
  servicioId: string;
  servicioNombre: string;
  onExito: () => void;
}

export function SubirDocumento({ servicioId, servicioNombre, onExito }: SubirDocumentoProps) {
  const { toast } = useToast();
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [cargando, setCargando] = useState(false);

  const form = useForm<z.infer<typeof documentoFormSchema>>({
    resolver: zodResolver(documentoFormSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setArchivoSeleccionado(files[0]);
      form.setValue("archivo", files);
    }
  };

  const onSubmit = async (values: z.infer<typeof documentoFormSchema>) => {
    setCargando(true);
    
    try {
      // Simulamos una carga de archivo con un timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Documento subido:", {
        ...values,
        servicioId,
        archivo: archivoSeleccionado?.name,
      });
      
      toast({
        title: "Documento subido con éxito",
        description: `El documento '${values.nombre}' ha sido asociado al servicio '${servicioNombre}'`,
      });
      
      form.reset();
      setArchivoSeleccionado(null);
      onExito();
    } catch (error) {
      toast({
        title: "Error al subir documento",
        description: "Ha ocurrido un problema al subir el documento. Por favor intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Subir documento para: {servicioNombre}</h3>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del documento</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. Contrato de servicio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de documento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo de documento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="contrato">Contrato</SelectItem>
                      <SelectItem value="factura">Factura</SelectItem>
                      <SelectItem value="reporte">Reporte</SelectItem>
                      <SelectItem value="certificado">Certificado</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Añada una breve descripción del documento..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="archivo"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Archivo</FormLabel>
                <FormControl>
                  <div className="grid w-full gap-4">
                    <div className="grid gap-2">
                      <Input
                        id="archivo"
                        type="file"
                        className="hidden"
                        onChange={handleArchivoChange}
                        {...rest}
                      />
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                          <div className="bg-muted rounded-full p-3">
                            <Upload className="h-6 w-6" />
                          </div>
                          <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="text-sm font-medium">
                              {archivoSeleccionado ? (
                                <div className="flex items-center gap-2">
                                  <File className="h-4 w-4" />
                                  <span>{archivoSeleccionado.name}</span>
                                </div>
                              ) : (
                                <span>Arrastre un archivo aquí o haga clic para seleccionar</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              PDF, DOCX, XLSX, etc. (max 10MB)
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("archivo")?.click()}
                            className="mt-2"
                          >
                            <FileUp className="mr-2 h-4 w-4" />
                            {archivoSeleccionado ? "Cambiar archivo" : "Seleccionar archivo"}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Seleccione el archivo que desea subir. Asegúrese de que el tamaño no exceda los 10MB.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full md:w-auto" disabled={cargando}>
            {cargando ? (
              <>
                Subiendo documento...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Subir documento
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
