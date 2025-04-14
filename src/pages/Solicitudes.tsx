
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, FilePlus, Upload } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Definición del esquema de validación de formulario
const formSchema = z.object({
  tipoServicio: z.string().min(1, { message: "Seleccione un tipo de servicio" }),
  fechaServicio: z.date({ required_error: "Seleccione una fecha para el servicio" }),
  horaServicio: z.string().min(1, { message: "Seleccione una hora para el servicio" }),
  direccion: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres" }),
  descripcion: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  nombreContacto: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  telefonoContacto: z.string().min(10, { message: "Introduzca un número de teléfono válido" }),
  emailContacto: z.string().email({ message: "Introduzca un email válido" }).optional().or(z.literal("")),
});

export default function Solicitudes() {
  // Inicializar el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoServicio: "",
      direccion: "",
      descripcion: "",
      nombreContacto: "",
      telefonoContacto: "",
      emailContacto: "",
      horaServicio: "",
    },
  });

  // Manejar envío del formulario
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Aquí se procesaría la solicitud
    alert("Solicitud creada con éxito!");
    form.reset();
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Crear Solicitud de Servicio</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FilePlus className="mr-2 h-5 w-5 text-primary" />
            Nueva Solicitud de Servicio
          </CardTitle>
          <CardDescription>
            Complete el formulario para generar una nueva solicitud de servicio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="tipoServicio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Servicio</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione tipo de servicio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="plomeria">Plomería</SelectItem>
                          <SelectItem value="electricidad">Electricidad</SelectItem>
                          <SelectItem value="carpinteria">Carpintería</SelectItem>
                          <SelectItem value="limpieza">Limpieza</SelectItem>
                          <SelectItem value="pintura">Pintura</SelectItem>
                          <SelectItem value="jardineria">Jardinería</SelectItem>
                          <SelectItem value="aire_acondicionado">Aire Acondicionado</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Seleccione el tipo de servicio que necesita
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fechaServicio"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha del Servicio</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: es })
                              ) : (
                                <span>Seleccione una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Fecha en la que se realizará el servicio
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="horaServicio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora del Servicio</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una hora" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="8:00">8:00 AM</SelectItem>
                          <SelectItem value="9:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Hora aproximada para el servicio
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="direccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese la dirección completa" {...field} />
                      </FormControl>
                      <FormDescription>
                        Dirección donde se realizará el servicio
                      </FormDescription>
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
                    <FormLabel>Descripción del Servicio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describa detalladamente el servicio requerido"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporcione detalles específicos sobre el servicio que necesita
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="p-4 rounded-md bg-muted/50">
                <h3 className="text-lg font-medium mb-4">Información de Contacto</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="nombreContacto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de Contacto</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefonoContacto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono de Contacto</FormLabel>
                        <FormControl>
                          <Input placeholder="Número de teléfono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emailContacto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de Contacto (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="correo@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-t pt-6 flex justify-between items-center">
                <Button variant="outline" type="button" onClick={() => form.reset()}>
                  Cancelar
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" type="button">
                    <Upload className="mr-2 h-4 w-4" />
                    Adjuntar archivos
                  </Button>
                  <Button type="submit">Crear Solicitud</Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
