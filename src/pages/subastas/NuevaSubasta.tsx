import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { ArrowLeft, Plus, Save, Trash, FileText, Upload, Video } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Link, useNavigate } from "react-router-dom";
import { DocumentosSubasta } from "@/components/subastas/DocumentosSubasta";
import { MultimediaSubasta } from "@/components/subastas/MultimediaSubasta";
import { Checkbox } from "@/components/ui/checkbox";

// Definir esquema de validación
const subastaFormSchema = z.object({
  rubros: z
    .array(
      z.object({
        rubro: z.string().min(3, "El rubro debe tener al menos 3 caracteres"),
        subrubros: z.array(z.string()).min(1, "Debe seleccionar al menos un subrubro"),
      })
    )
    .min(1, "Debe seleccionar al menos un rubro"),
  titulo: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  incluye_materiales: z.boolean().default(false),
  detalle_materiales: z.string().optional(),
  departamento: z.string().min(1, "Debe seleccionar un departamento"),
  localidad: z.string().optional(),
  fecha_tentativa_inicio: z.string().min(1, "Debe seleccionar una fecha"),
  fecha_real_inicio: z.string().min(1, "Debe seleccionar una fecha"),
  fecha_fin_postulacion: z.string().min(1, "Debe seleccionar una fecha de fin de postulación"),
  visita_obligatoria: z.boolean().default(false),
  fecha_visita: z.string().optional(),
  hora_visita: z.string().optional(),
  direccion_visita: z.string().optional(),
  mostrar_contratante: z.enum(["publico", "privado"]),
  pliego_llamado: z.instanceof(File).optional(),
  condiciones_particulares: z.string().optional(),
  tipo_desembolso: z.enum(["total", "parcial", "porcentaje", "convenir", "otro"]).default("convenir"),
  otro_tipo_desembolso: z.string().min(1, "Especifique forma de pago").optional(),
  modalidad: z.enum(["subasta", "oferta"]).default("subasta"),
  monto_oferta: z.number().nullable().default(null).optional(),
  moneda: z.enum(["usd", "uyu"]).optional(),
  fecha_cierre: z.string().min(1, "Debe seleccionar una fecha de cierre"),
  documentacion_requerida: z.array(z.string()).default([]),
  descripcion_otros_documentos: z.string().optional(),
  tipo_empresa: z.enum(["no_aplica", "cualquier_tipo", "monotributo", "literal_e", "regimen_general"]).default("no_aplica"),
  contrato_trabajo_id: z.string().optional(),
  termino_obra: z.instanceof(File).optional(),
});

export default function NuevaSubasta() {
  const navigate = useNavigate();

  const [documentos, setDocumentos] = useState<{ id: string; titulo: string; descripcion: string; archivo: File | null }[]>([]);
  const [multimedia, setMultimedia] = useState<
    {
      id: string;
      tipo: string;
      titulo: string;
      archivo: File | null;
      url: string | null;
    }[]
  >([]);

  const rubros = {
    construccion: ["Albañilería", "Carpintería", "Electricidad", "Pintura", "Plomería"],
    tecnologia: ["Desarrollo Web", "Desarrollo Móvil", "Soporte Técnico", "Redes", "Seguridad"],
  };

  const departamentos = {
    montevideo: ["Centro", "Pocitos", "Carrasco", "Prado", "Malvín", "Buceo"],
    canelones: ["Las Piedras", "Pando", "La Paz", "Ciudad de la Costa", "Santa Lucía"],
  };

  const form = useForm<z.infer<typeof subastaFormSchema>>({
    resolver: zodResolver(subastaFormSchema),
    defaultValues: {
      rubros: [],
      titulo: "",
      descripcion: "",
      departamento: "",
      localidad: "",
      fecha_tentativa_inicio: "",
      fecha_real_inicio: "",
      fecha_fin_postulacion: "",
      visita_obligatoria: false,
      fecha_visita: "",
      hora_visita: "",
      direccion_visita: "",
      mostrar_contratante: "publico",
      pliego_llamado: null,
      condiciones_particulares: "",
      tipo_desembolso: "convenir",
      otro_tipo_desembolso: "",
      modalidad: "subasta",
      monto_oferta: null,
      moneda: "uyu",
      fecha_cierre: "",
      documentacion_requerida: [],
      descripcion_otros_documentos: "",
      tipo_empresa: "no_aplica",
      contrato_trabajo_id: "",
      termino_obra: null,
      detalle_materiales: "",
    },
  });

  async function onSubmit(values: z.infer<typeof subastaFormSchema>) {
    try {
      if (documentos.length === 0) {
        toast.error("Debe agregar al menos un documento");
        return;
      }

      // Aquí iría la lógica para guardar la subasta
      console.log({ ...values, documentos, multimedia });

      toast.success("Subasta creada correctamente");
      navigate("/subastas");
    } catch (error) {
      toast.error("Error al crear la subasta");
      console.error(error);
    }
  }

  return (
    <>
      <div className='flex items-center mb-6'>
        <Button variant='ghost' size='sm' asChild className='mr-4'>
          <Link to='/' className='flex items-center gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Volver
          </Link>
        </Button>
        <div>
          <h2 className='text-2xl font-bold flex items-center gap-2'>
            <FileText className='h-6 w-6' />
            Nuevo proyecto
          </h2>
          <p className='text-muted-foreground'>Complete la información para crear un nuevo proyecto de servicios</p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Información General</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-4'>
                    {form.watch("rubros")?.map((_, index) => (
                      <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg'>
                        <FormField
                          control={form.control}
                          name={`rubros.${index}.rubro`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rubro {index + 1}</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Seleccione un rubro' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className='bg-white'>
                                  <SelectItem value='construccion'>Construcción</SelectItem>
                                  <SelectItem value='tecnologia'>Tecnología</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {form.watch(`rubros.${index}.rubro`) && (
                          <FormField
                            control={form.control}
                            name={`rubros.${index}.subrubros`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subrubros</FormLabel>
                                <div className='space-y-2'>
                                  {rubros[form.watch(`rubros.${index}.rubro`) as keyof typeof rubros].map((subrubro) => (
                                    <div key={subrubro} className='flex items-center space-x-2'>
                                      <Checkbox
                                        id={`subrubro_${index}_${subrubro}`}
                                        name={`rubros.${index}.subrubros`}
                                        checked={field.value?.includes(subrubro.toLowerCase())}
                                        onCheckedChange={(checked) => {
                                          const value = field.value || [];
                                          if (checked) {
                                            field.onChange([...value, subrubro.toLowerCase()]);
                                          } else {
                                            field.onChange(value.filter((v) => v !== subrubro.toLowerCase()));
                                          }
                                        }}
                                      />
                                      <Label htmlFor={`subrubro_${index}_${subrubro}`}>{subrubro}</Label>
                                    </div>
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {index > 0 && (
                          <Button
                            type='button'
                            variant='destructive'
                            size='sm'
                            onClick={() => {
                              const rubros = form.getValues("rubros");
                              rubros.splice(index, 1);
                              form.setValue("rubros", rubros);
                            }}
                            className='mt-2'
                          >
                            <Trash className='h-4 w-4 mr-2' />
                            Eliminar Rubro
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => {
                        const rubros = form.getValues("rubros") || [];
                        form.setValue("rubros", [...rubros, { rubro: "", subrubros: [] }]);
                      }}
                    >
                      <Plus className='h-4 w-4 mr-2' />
                      Agregar Rubro
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name='titulo'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='titulo'>Título del Llamado</FormLabel>
                        <FormControl>
                          <Input id='titulo' name='titulo' placeholder='Ej: Remodelación de oficina' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='descripcion'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='descripcion'>Resumen del trabajo</FormLabel>
                        <FormControl>
                          <Textarea
                            id='descripcion'
                            name='descripcion'
                            placeholder='Describa detalladamente el llamado'
                            className='min-h-[100px]'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='incluye_materiales'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>Suministro de materiales</FormLabel>
                            <FormDescription>Marque si el proveedor debe suministrar materiales</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("incluye_materiales") && (
                      <FormField
                        control={form.control}
                        name='detalle_materiales'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor='detalle_materiales'>Especifique</FormLabel>
                            <FormControl>
                              <Textarea id='detalle_materiales' name='detalle_materiales' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='departamento'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ubicación</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione departamento' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-popover border rounded-md bg-white'>
                              <SelectItem value='montevideo'>Montevideo</SelectItem>
                              <SelectItem value='canelones'>Canelones</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("departamento") && (
                      <FormField
                        control={form.control}
                        name='localidad'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Localidad / Barrio</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Seleccione localidad' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='bg-white'>
                                {departamentos[form.watch("departamento") as keyof typeof departamentos].map((localidad) => (
                                  <SelectItem key={localidad} value={localidad.toLowerCase()}>
                                    {localidad}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-4'>
                      <FormField
                        control={form.control}
                        name='fecha_tentativa_inicio'
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-2 min-h-[28px]'>
                              <FormLabel className='leading-none py-1'>Fecha Tentativa</FormLabel>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className='h-4 w-4 text-muted-foreground cursor-help hover:text-primary' />
                                </TooltipTrigger>
                                <TooltipContent className='text-sm text-popover-foreground'>
                                  <p className='text-sm text-popover-foreground'>Fecha estimada de inicio del trabajo.</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <FormControl>
                              <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='fecha_fin_postulacion'
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-2 min-h-[28px]'>
                              <FormLabel className='leading-none py-1'>Fecha Fin Postulación</FormLabel>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className='h-4 w-4 text-muted-foreground cursor-help hover:text-primary' />
                                </TooltipTrigger>
                                <TooltipContent className='text-sm text-popover-foreground'>
                                  <p className='text-sm text-popover-foreground'>Fecha límite para postular a esta subasta.</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <FormControl>
                              <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name='fecha_real_inicio'
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-2 min-h-[28px]'>
                              <FormLabel className='leading-none py-1'>Fecha Real</FormLabel>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className='h-4 w-4 text-muted-foreground cursor-help hover:text-primary' />
                                </TooltipTrigger>
                                <TooltipContent className='text-sm text-popover-foreground'>
                                  <p className='text-sm text-popover-foreground'>Fecha en que debe ser iniciado el trabajo.</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <FormControl>
                              <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='visita_obligatoria'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>Visita Obligatoria</FormLabel>
                            <FormDescription>En caso de necesitar asistencia contactese con nosotros</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("visita_obligatoria") && (
                      <div className='grid grid-cols-1 gap-4'>
                        <FormField
                          control={form.control}
                          name='direccion_visita'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor='direccion_visita'>Dirección del Proyecto</FormLabel>
                              <FormControl>
                                <Input
                                  id='direccion_visita'
                                  name='direccion_visita'
                                  placeholder='Especifique la dirección exacta donde se realizará la visita técnica'
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <FormField
                            control={form.control}
                            name='fecha_visita'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor='fecha_visita'>Fecha de Visita</FormLabel>
                                <FormControl>
                                  <Input id='fecha_visita' name='fecha_visita' type='date' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name='hora_visita'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor='hora_visita'>Hora de Visita</FormLabel>
                                <FormControl>
                                  <Input id='hora_visita' name='hora_visita' type='time' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='mostrar_contratante'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mostrar nombre de Contratante</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl className='relative'>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione visibilidad del contratante' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className=' bg-white shadow-md'>
                              <SelectItem value='publico'>Público</SelectItem>
                              <SelectItem value='privado'>Privado</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Define si el nombre del contratante será visible para los proveedores</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Información Adicional</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-1 gap-4'>
                    <FormField
                      control={form.control}
                      name='pliego_llamado'
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel htmlFor='pliego_llamado'>Pliego del Llamado</FormLabel>
                          <FormControl>
                            <Input
                              id='pliego_llamado'
                              name='pliego_llamado'
                              type='file'
                              accept='.pdf,.doc,.docx'
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                onChange(file);
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Adjunte el documento del pliego en formato PDF o Word</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='grid grid-cols-1 gap-4'>
                    <FormField
                      control={form.control}
                      name='condiciones_particulares'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='condiciones_particulares'>Condiciones Particulares</FormLabel>
                          <FormControl>
                            <Textarea
                              id='condiciones_particulares'
                              name='condiciones_particulares'
                              placeholder='Especifique cualquier condición especial o requisito particular para este trabajo'
                              className='min-h-[100px]'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Nueva sección: Documentos */}
              <Card>
                <CardHeader>
                  <CardTitle>Adjuntar Archivos</CardTitle>
                  <CardDescription>Archivos relacionados al proyecto (planos, especificaciones, etc.)</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <DocumentosSubasta documentos={documentos} setDocumentos={setDocumentos} />
                </CardContent>
              </Card>

              {/* Nueva sección: Multimedia */}
              <Card>
                <CardHeader>
                  <CardTitle>Contenido Multimedia</CardTitle>
                  <CardDescription>Videos y fotos relacionados al proyecto</CardDescription>
                </CardHeader>
                <CardContent>
                  <MultimediaSubasta multimedia={multimedia} setMultimedia={setMultimedia} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Detalles Económicos</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-1 gap-4'>
                    <FormField
                      control={form.control}
                      name='tipo_desembolso'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forma de Pago</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione tipo' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-white'>
                              <SelectItem value='convenir'>A Convenir</SelectItem>
                              <SelectItem value='acopio_avance'>Acopio + Pagos por avance</SelectItem>
                              <SelectItem value='avance_30dias'>Por avance + 30 días</SelectItem>
                              <SelectItem value='avance_60dias'>Por avance + 60 días</SelectItem>
                              <SelectItem value='avance_90dias'>Por avance + 90 días</SelectItem>
                              <SelectItem value='finalizado'>Inmediato al finalizar</SelectItem>
                              <SelectItem value='finalizado_30dias'>Al finalizar + 30 días</SelectItem>
                              <SelectItem value='finalizado_60dias'>Al finalizar + 60 días</SelectItem>
                              <SelectItem value='finalizado_90dias'>Al finalizar + 90 días</SelectItem>
                              <SelectItem value='contado'>Contado al finalizar</SelectItem>
                              <SelectItem value='otro'>Otra</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.watch("tipo_desembolso") === "otro" && (
                      <FormField
                        control={form.control}
                        name='otro_tipo_desembolso'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor='otro_tipo_desembolso'>Especifique</FormLabel>
                            <FormControl>
                              <Input id='otro_tipo_desembolso' name='otro_tipo_desembolso' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='modalidad'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modalidad</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione modalidad' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-white'>
                              <SelectItem value='subasta'>Subasta</SelectItem>
                              <SelectItem value='oferta'>Oferta de Servicio</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Seleccione la modalidad de publicación del proyecto</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("modalidad") === "oferta" && (
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='moneda'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Moneda</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Seleccione moneda' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value='uyu'>Pesos Uruguayos (UYU)</SelectItem>
                                  <SelectItem value='usd'>Dólares Americanos (USD)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='monto_oferta'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor='monto_oferta'>¿Cuánto querés pagar?</FormLabel>
                              <FormControl>
                                <Input
                                  id='monto_oferta'
                                  name='monto_oferta'
                                  type='text'
                                  placeholder='0.00'
                                  {...field}
                                  value={field.value ? new Intl.NumberFormat("es-UY").format(field.value) : ""}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/[^\d]/g, "");
                                    const numberValue = value === "" ? null : Number(value);
                                    field.onChange(numberValue);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name='fecha_cierre'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha límite de entrega de trabajos</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle>Documentación Requerida del Proveedor</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-4 '>
                    <FormField
                      control={form.control}
                      name='documentacion_requerida'
                      render={({ field }) => (
                        <FormItem>
                          <div className='grid grid-cols-2 gap-4'>
                            {[
                              "BPS",
                              "BSE",
                              "Carnet de salud",
                              "Psicofisico",
                              "Plan de trabajo",
                              "Plan de seguridad",
                              "Induccion de seguridad",
                              "Otros",
                            ].map((doc) => (
                              <div key={doc} className='flex items-center space-x-2'>
                                <Checkbox
                                  id={`doc_req_${doc}`}
                                  name='documentacion_requerida'
                                  checked={field.value.includes(doc)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked ? [...field.value, doc] : field.value.filter((value) => value !== doc);
                                    field.onChange(updatedValue);
                                  }}
                                />
                                <Label htmlFor={`doc_req_${doc}`}>{doc}</Label>
                              </div>
                            ))}
                          </div>
                          <FormDescription>Seleccione la documentación requerida para este llamado</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("documentacion_requerida").includes("Otros") && (
                      <FormField
                        control={form.control}
                        name='descripcion_otros_documentos'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor='descripcion_otros_documentos'>Descripción de Otros Documentos</FormLabel>
                            <FormControl>
                              <Textarea
                                id='descripcion_otros_documentos'
                                name='descripcion_otros_documentos'
                                placeholder='Describa los documentos adicionales requeridos'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name='tipo_empresa'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='tipo_empresa'>Tipo de Empresa del Proveedor</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id='tipo_empresa' name='tipo_empresa'>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-white'>
                              <SelectItem value='no_aplica'>No aplica</SelectItem>
                              <SelectItem value='cualquier_tipo'>Cualquier tipo</SelectItem>
                              <SelectItem value='monotributo'>Monotributo</SelectItem>
                              <SelectItem value='literal_e'>Literal E</SelectItem>
                              <SelectItem value='regimen_general'>Régimen general</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <h4 className='font-medium mt-2'>Adjuntos</h4>

                  <FormField
                    control={form.control}
                    name='contrato_trabajo_id'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contrato de Trabajo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Seleccione un contrato' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='bg-white'>
                            {documentos.map((doc) => (
                              <SelectItem key={doc.id} value={doc.id}>
                                {doc.titulo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Seleccione el contrato de trabajo aplicable</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='termino_obra'
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel htmlFor='termino_obra'>Término de Obra</FormLabel>
                        <FormControl>
                          <Input
                            id='termino_obra'
                            name='termino_obra'
                            type='file'
                            accept='.pdf,.doc,.docx'
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              onChange(file);
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Adjunte el documento de término de obra</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardFooter className='flex justify-between pt-6'>
                  <Button variant='outline' type='button' asChild>
                    <Link to='/subastas'>Cancelar</Link>
                  </Button>
                  <Button variant='outline' type='button' asChild>
                    <Link to='/subastas'>
                      <Save className='h-4 w-4 mr-2' /> Guardar
                    </Link>
                  </Button>
                  <Button type='submit'>
                    <Upload className='h-4 w-4 mr-2' />
                    Publicar
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
              <div className='space-y-4'>
                <div>
                  <Label>Estado Inicial</Label>
                  <Select defaultValue='borrador'>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione estado' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='borrador'>Borrador</SelectItem>
                      <SelectItem value='publicada'>Publicada</SelectItem>
                      <SelectItem value='en_revision'>En Revisión</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='rounded-md border border-dashed p-4'>
                  <h4 className='font-medium mb-2'>Flujo de Estados</h4>
                  <div className='text-sm space-y-2 text-muted-foreground'>
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

          <div className='mt-6'>
            <Card>
              <CardHeader>
                <CardTitle>Restricciones</CardTitle>
                <CardDescription>Información importante</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-sm space-y-2 text-muted-foreground border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 dark:bg-amber-950/20 rounded'>
                  <p className='font-medium text-amber-800 dark:text-amber-400'>Nota importante:</p>
                  <p>Una vez que la subasta sea aceptada, no se podrá modificar ningún dato.</p>
                  <p>Solo se podrá cambiar el estado mediante una solicitud de cierre total del proyecto.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
