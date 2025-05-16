import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Save,
  Trash,
  FileText,
  Upload,
  Video,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Link, useNavigate } from 'react-router-dom';
import { TrabajosSubasta } from '@/components/subastas/TrabajosSubasta';
import { DocumentosSubasta } from '@/components/subastas/DocumentosSubasta';
import { MultimediaSubasta } from '@/components/subastas/MultimediaSubasta';
import { Checkbox } from '@/components/ui/checkbox';

// Definir esquema de validación
const subastaFormSchema = z.object({
  rubro: z.string().min(3, 'El rubro debe tener al menos 3 caracteres'), // Nuevo campo
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  descripcion: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  departamento: z.string().min(1, 'Debe seleccionar un departamento'),
  localidad: z.string().optional(),
  fecha_fin_postulacion: z.string().min(1, 'Debe seleccionar una fecha'),
  fecha_entrega: z.string().min(1, 'Debe seleccionar una fecha'),
  visita_obligatoria: z.boolean().default(false),
  fecha_visita: z.string().optional(),
  hora_visita: z.string().optional(),
  mostrar_contratante: z.enum(['publico', 'privado']), // Nuevo campo
  pliego_llamado: z.instanceof(File).optional(),
  condiciones_particulares: z.string().optional(),
  tipo_desembolso: z.enum(['total', 'parcial', 'porcentaje']).default('total'),
  modalidad: z.enum(['subasta', 'oferta_servicio']).default('subasta'),
  monto_oferta: z.number().optional(),
  fecha_cierre: z.string().min(1, 'Debe seleccionar una fecha de cierre'),
  documentacion_requerida: z.array(z.string()).default([]),
  descripcion_otros_documentos: z.string().optional(),
  tipo_empresa: z
    .enum([
      'no_aplica',
      'cualquier_tipo',
      'monotributo',
      'literal_e',
      'regimen_general',
    ])
    .default('no_aplica'),
  contrato_trabajo_id: z.string().optional(),
  termino_obra: z.instanceof(File).optional(),
  // precio_base: z.number().optional(),
  // tipo_precio: z.enum(["fijo", "mejor_oferta"]),
  // incluye_materiales: z.boolean().default(false),
  // incluye_bonificacion: z.boolean().default(false),
  // detalle_bonificacion: z.string().optional(),
  //detalle_desembolso: z.string().optional(),
});

export default function NuevaSubasta() {
  const navigate = useNavigate();
  const [trabajos, setTrabajos] = useState<
    { id: string; descripcion: string }[]
  >([]);
  const [documentos, setDocumentos] = useState<
    { id: string; titulo: string; descripcion: string; archivo: File | null }[]
  >([]);
  const [multimedia, setMultimedia] = useState<
    {
      id: string;
      tipo: string;
      titulo: string;
      archivo: File | null;
      url: string | null;
    }[]
  >([]);

  const departamentos = {
    montevideo: ['Centro', 'Pocitos', 'Carrasco', 'Prado', 'Malvín', 'Buceo'],
    canelones: [
      'Las Piedras',
      'Pando',
      'La Paz',
      'Ciudad de la Costa',
      'Santa Lucía',
    ],
  };

  const form = useForm<z.infer<typeof subastaFormSchema>>({
    resolver: zodResolver(subastaFormSchema),
    defaultValues: {
      rubro: '', // Nuevo valor por defecto
      titulo: '',
      descripcion: '',
      departamento: '',
      localidad: '',
      fecha_fin_postulacion: '',
      fecha_entrega: '',
      visita_obligatoria: false,
      fecha_visita: '',
      hora_visita: '',
      mostrar_contratante: 'publico',
      pliego_llamado: null,
      condiciones_particulares: '',
      tipo_desembolso: 'total',
      modalidad: 'subasta',
      monto_oferta: undefined,
      fecha_cierre: '',
      documentacion_requerida: [],
      descripcion_otros_documentos: '',
      tipo_empresa: 'no_aplica',
      contrato_trabajo_id: '',
      termino_obra: null,
      // tipo_precio: "fijo",
      // incluye_materiales: false,
      // incluye_bonificacion: false,
      //detalle_bonificacion: "",
      //detalle_desembolso: "",
    },
  });

  async function onSubmit(values: z.infer<typeof subastaFormSchema>) {
    try {
      if (trabajos.length === 0) {
        toast.error('Debe agregar al menos un trabajo a realizar');
        return;
      }

      // Aquí iría la lógica para guardar la subasta
      console.log({ ...values, trabajos, documentos, multimedia });

      toast.success('Subasta creada correctamente');
      navigate('/subastas');
    } catch (error) {
      toast.error('Error al crear la subasta');
      console.error(error);
    }
  }

  return (
    <DashboardLayout>
      <div className='flex items-center mb-6'>
        <Button variant='ghost' size='sm' asChild className='mr-4'>
          <Link to='/subastas' className='flex items-center gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Volver
          </Link>
        </Button>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Nueva Subasta</h1>
          <p className='text-muted-foreground'>
            Complete la información para crear una nueva subasta de servicios
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Información General</CardTitle>
                  <CardDescription>Datos básicos de la subasta</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='rubro'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rubro</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Se va a poder seleccionar distintos rubros y apareceran subrubros'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Ingrese el rubro o categoría principal del trabajo
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='titulo'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título del Llamado</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ej: Remodelación de oficina'
                            {...field}
                          />
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
                        <FormLabel>Resumen del trabajo</FormLabel>
                        <FormControl>
                          <Textarea
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
                      name='departamento'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ubicación</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione departamento' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-popover border rounded-md absolute z-[9999]'>
                              <SelectItem value='montevideo'>
                                Montevideo
                              </SelectItem>
                              <SelectItem value='canelones'>
                                Canelones
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch('departamento') && (
                      <FormField
                        control={form.control}
                        name='localidad'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Localidad / Barrio</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Seleccione localidad' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {departamentos[
                                  form.watch(
                                    'departamento'
                                  ) as keyof typeof departamentos
                                ].map((localidad) => (
                                  <SelectItem
                                    key={localidad}
                                    value={localidad.toLowerCase()}
                                  >
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

                  {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='ubicacion'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ubicación</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione ubicación' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='montevideo'>
                                Montevideo
                              </SelectItem>
                              <SelectItem value='salto'>Salto</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("ubicacion") != "" && (
                      <FormField
                        control={form.control}
                        name='ubicacion'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Localidad / Barrio</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='Ej: San Rafael'
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div> */}

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='fecha_fin_postulacion'
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex items-center gap-2 min-h-[28px]'>
                            <FormLabel className='leading-none py-1'>
                              Fecha Tentativa
                            </FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className='h-4 w-4 text-muted-foreground cursor-help hover:text-primary' />
                              </TooltipTrigger>
                              <TooltipContent className='text-sm text-popover-foreground'>
                                <p className='text-sm text-popover-foreground'>
                                  Esta es la fecha estimada para finalizar el
                                  trabajo.
                                </p>
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
                      name='fecha_entrega'
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex items-center gap-2 min-h-[28px]'>
                            <FormLabel className='leading-none py-1'>
                              Fecha Real
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input type='date' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='visita_obligatoria'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Visita Obligatoria
                            </FormLabel>
                            <FormDescription>
                              Marque si se requiere visita obligatoria al sitio
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

                    {form.watch('visita_obligatoria') && (
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='fecha_visita'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha de Visita</FormLabel>
                              <FormControl>
                                <Input type='date' {...field} />
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
                              <FormLabel>Hora de Visita</FormLabel>
                              <FormControl>
                                <Input type='time' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl className='relative'>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione visibilidad del contratante' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-popover border rounded-md fixed z-50 shadow-md'>
                              <SelectItem value='publico'>Público</SelectItem>
                              <SelectItem value='privado'>Privado</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Define si el nombre del contratante será visible
                            para los proveedores
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='tipo_precio'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Precio</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione tipo' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='fijo'>Precio Fijo</SelectItem>
                              <SelectItem value='mejor_oferta'>
                                Mejor Oferta
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("tipo_precio") === "fijo" && (
                      <FormField
                        control={form.control}
                        name='precio_base'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Precio Base</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='0.00'
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div> */}

                  {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='incluye_materiales'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Incluye Materiales
                            </FormLabel>
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
                      name='incluye_bonificacion'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Incluye Bonificación
                            </FormLabel>
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
                      name='detalle_bonificacion'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detalle de Bonificación</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Describa la bonificación'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )} */}

                  {/* Nuevo campo: Tipo de desembolso */}

                  {/* {form.watch("tipo_desembolso") !== "total" && (
                    <FormField
                      control={form.control}
                      name='detalle_desembolso'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detalles del Plan de Desembolso</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Describa el plan de desembolsos (ej: 30% al iniciar, 40% al llegar a la mitad, 30% al finalizar)'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )} */}
                </CardContent>
              </Card>
              <div className='grid grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name='pliego_llamado'
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Pliego del Llamado</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          accept='.pdf,.doc,.docx'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Adjunte el documento del pliego en formato PDF o Word
                      </FormDescription>
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
                      <FormLabel>Condiciones Particulares</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Ingrese las condiciones particulares del llamado'
                          className='min-h-[100px]'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Especifique cualquier condición especial o requisito
                        particular para este llamado
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle>Trabajos a Realizar</CardTitle>
                      <CardDescription>
                        Lista de trabajos incluidos en esta subasta
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <TrabajosSubasta
                    trabajos={trabajos}
                    setTrabajos={setTrabajos}
                  />
                </CardContent>
              </Card> */}

              {/* Nueva sección: Documentos */}
              <Card>
                <CardHeader>
                  <CardTitle>Adjuntar archivos</CardTitle>
                  <CardDescription>
                    Archivos relacionados al proyecto (planos, especificaciones,
                    etc.)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentosSubasta
                    documentos={documentos}
                    setDocumentos={setDocumentos}
                  />
                </CardContent>
              </Card>

              {/* Nueva sección: Multimedia */}
              <Card>
                <CardHeader>
                  <CardTitle>Contenido Multimedia</CardTitle>
                  <CardDescription>
                    Videos y fotos relacionados al proyecto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MultimediaSubasta
                    multimedia={multimedia}
                    setMultimedia={setMultimedia}
                  />
                </CardContent>
              </Card>

              <div className='grid grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name='tipo_desembolso'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forma de Pago</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione tipo' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='convenir'>A Convenir</SelectItem>
                          <SelectItem value='acopio_avance'>
                            Acopio + Pagos por avance
                          </SelectItem>
                          <SelectItem value='avance_30dias'>
                            Por avance + 30 días
                          </SelectItem>
                          <SelectItem value='avance_60dias'>
                            Por avance + 60 días
                          </SelectItem>
                          <SelectItem value='avance_90dias'>
                            Por avance + 90 días
                          </SelectItem>
                          <SelectItem value='finalizado'>
                            Inmediato al finalizar
                          </SelectItem>
                          <SelectItem value='finalizado_30dias'>
                            Al finalizar + 30 días
                          </SelectItem>
                          <SelectItem value='finalizado_60dias'>
                            Al finalizar + 60 días
                          </SelectItem>
                          <SelectItem value='finalizado_90dias'>
                            Al finalizar + 90 días
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Defina cómo se realizarán los pagos del proyecto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='modalidad'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modalidad</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione modalidad' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='subasta'>Subasta</SelectItem>
                          <SelectItem value='oferta_servicio'>
                            Oferta de Servicio
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Seleccione el tipo de modalidad para este llamado
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('modalidad') === 'oferta_servicio' && (
                  <FormField
                    control={form.control}
                    name='monto_oferta'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>¿Cuánto querés pagar?</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='0.00'
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Ingrese el monto que está dispuesto a pagar
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name='fecha_cierre'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Cierre del Llamado</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormDescription>
                      Fecha límite para el cierre del llamado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle>Documentación Requerida</CardTitle>
                      <CardDescription>Lista de documentación</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4 '>
                    <FormField
                      control={form.control}
                      name='documentacion_requerida'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Documentación Requerida</FormLabel>
                          <div className='grid grid-cols-2 gap-4'>
                            {[
                              'BPS',
                              'BSE',
                              'Carnet de salud',
                              'Psicofisico',
                              'Plan de trabajo',
                              'Plan de seguridad',
                              'Induccion de seguridad',
                              'Otros',
                            ].map((doc) => (
                              <div
                                key={doc}
                                className='flex items-center space-x-2'
                              >
                                <Checkbox
                                  checked={field.value.includes(doc)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...field.value, doc]
                                      : field.value.filter(
                                          (value) => value !== doc
                                        );
                                    field.onChange(updatedValue);
                                  }}
                                />
                                <Label>{doc}</Label>
                              </div>
                            ))}
                          </div>
                          <FormDescription>
                            Seleccione la documentación requerida para este
                            llamado
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form
                      .watch('documentacion_requerida')
                      .includes('Otros') && (
                      <FormField
                        control={form.control}
                        name='descripcion_otros_documentos'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Descripción de Otros Documentos
                            </FormLabel>
                            <FormControl>
                              <Textarea
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
                          <FormLabel>Tipo de Empresa</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione tipo de empresa' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='no_aplica'>
                                No aplica
                              </SelectItem>
                              <SelectItem value='cualquier_tipo'>
                                Cualquier tipo
                              </SelectItem>
                              <SelectItem value='monotributo'>
                                Monotributo
                              </SelectItem>
                              <SelectItem value='literal_e'>
                                Literal E
                              </SelectItem>
                              <SelectItem value='regimen_general'>
                                Régimen general
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Seleccione el tipo de empresa requerido para este
                            llamado
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='space-y-4 border rounded-lg p-4'>
                    <h3 className='font-medium'>Adjuntos</h3>

                    <FormField
                      control={form.control}
                      name='contrato_trabajo_id'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contrato de Trabajo</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione un contrato' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {documentos.map((doc) => (
                                <SelectItem key={doc.id} value={doc.id}>
                                  {doc.titulo}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Seleccione el contrato de trabajo aplicable
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='termino_obra'
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Término de Obra</FormLabel>
                          <FormControl>
                            <Input
                              type='file'
                              accept='.pdf,.doc,.docx'
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                onChange(file);
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Adjunte el documento de término de obra
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardFooter className='flex justify-between pt-6'>
                  <Button variant='outline' type='button' asChild>
                    <Link to='/subastas'>Cancelar</Link>
                  </Button>
                  <Button type='submit'>
                    <Save className='h-4 w-4 mr-2' />
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
              <CardDescription>
                Configuración del estado inicial
              </CardDescription>
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
                  <p className='font-medium text-amber-800 dark:text-amber-400'>
                    Nota importante:
                  </p>
                  <p>
                    Una vez que la subasta sea aceptada, no se podrá modificar
                    ningún dato.
                  </p>
                  <p>
                    Solo se podrá cambiar el estado mediante una solicitud de
                    cierre total del proyecto.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
