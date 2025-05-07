
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { ArrowLeft, Plus, Save, Trash } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Link, useNavigate } from "react-router-dom";
import { TrabajosSubasta } from "@/components/subastas/TrabajosSubasta";

// Definir esquema de validación
const subastaFormSchema = z.object({
  titulo: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  tipo_precio: z.enum(["fijo", "mejor_oferta"]),
  precio_base: z.number().optional(),
  fecha_fin_postulacion: z.string().min(1, "Debe seleccionar una fecha"),
  fecha_entrega: z.string().min(1, "Debe seleccionar una fecha"),
  incluye_materiales: z.boolean().default(false),
  incluye_bonificacion: z.boolean().default(false),
  detalle_bonificacion: z.string().optional(),
});

export default function NuevaSubasta() {
  const navigate = useNavigate();
  const [trabajos, setTrabajos] = useState<{id: string, descripcion: string}[]>([]);
  
  const form = useForm<z.infer<typeof subastaFormSchema>>({
    resolver: zodResolver(subastaFormSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      tipo_precio: "fijo",
      incluye_materiales: false,
      incluye_bonificacion: false,
      detalle_bonificacion: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof subastaFormSchema>) {
    try {
      if (trabajos.length === 0) {
        toast.error("Debe agregar al menos un trabajo a realizar");
        return;
      }
      
      // Aquí iría la lógica para guardar la subasta
      console.log({ ...values, trabajos });
      
      toast.success("Subasta creada correctamente");
      navigate("/subastas");
    } catch (error) {
      toast.error("Error al crear la subasta");
      console.error(error);
    }
  }
  
  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/subastas" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nueva Subasta</h1>
          <p className="text-muted-foreground">
            Complete la información para crear una nueva subasta de servicios
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información General</CardTitle>
                  <CardDescription>Datos básicos de la subasta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título de la Subasta</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Remodelación de oficina" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describa detalladamente la subasta" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="tipo_precio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Precio</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fijo">Precio Fijo</SelectItem>
                              <SelectItem value="mejor_oferta">Mejor Oferta</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("tipo_precio") === "fijo" && (
                      <FormField
                        control={form.control}
                        name="precio_base"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Precio Base</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0.00" 
                                {...field} 
                                onChange={e => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fecha_fin_postulacion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha Fin Postulación</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fecha_entrega"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha Entrega Proyecto</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="incluye_materiales"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Incluye Materiales</FormLabel>
                            <FormDescription>
                              Marque si los materiales están incluidos
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="incluye_bonificacion"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Incluye Bonificación</FormLabel>
                            <FormDescription>
                              Marque si incluye alguna bonificación
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {form.watch("incluye_bonificacion") && (
                    <FormField
                      control={form.control}
                      name="detalle_bonificacion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detalle de Bonificación</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describa la bonificación" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Trabajos a Realizar</CardTitle>
                      <CardDescription>Lista de trabajos incluidos en esta subasta</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <TrabajosSubasta trabajos={trabajos} setTrabajos={setTrabajos} />
                </CardContent>
              </Card>
              
              <Card>
                <CardFooter className="flex justify-between pt-6">
                  <Button variant="outline" type="button" asChild>
                    <Link to="/subastas">Cancelar</Link>
                  </Button>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Crear Subasta
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Estado de la Subasta</CardTitle>
              <CardDescription>Configuración del estado inicial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Estado Inicial</Label>
                  <Select defaultValue="borrador">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="publicada">Publicada</SelectItem>
                      <SelectItem value="en_revision">En Revisión</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-md border border-dashed p-4">
                  <h4 className="font-medium mb-2">Flujo de Estados</h4>
                  <div className="text-sm space-y-2 text-muted-foreground">
                    <p>1. Borrador → Revisión</p>
                    <p>2. Revisión → Publicada</p>
                    <p>3. Publicada → En Postulación</p>
                    <p>4. En Postulación → Adjudicada</p>
                    <p>5. Adjudicada → En Progreso</p>
                    <p>6. En Progreso → Finalizada</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
