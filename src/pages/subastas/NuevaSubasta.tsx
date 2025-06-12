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
import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Save, Trash, FileText, Upload, Video } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Link, useNavigate } from "react-router-dom";
import { DocumentosSubasta } from "@/components/subastas/DocumentosSubasta";
import { MultimediaSubasta } from "@/components/subastas/MultimediaSubasta";
import { Checkbox } from "@/components/ui/checkbox";

//Seccion monedas reutilizable
type Moneda = {
  PaisId: string;
  PaisNombre: string;
  MonedaId: number;
  MonedaNombre: string;
};

type ApiResponse = {
  SDTPaisMoneda: Moneda[];
};

function obtenerMonedasPorPais(paisId: string, data: ApiResponse): { MonedaId: number; MonedaNombre: string }[] {
  return data.SDTPaisMoneda
    .filter((moneda) => moneda.PaisId === paisId)
    .map(({ MonedaId, MonedaNombre }) => ({ MonedaId, MonedaNombre }));
}
//

// Definir esquema de validación
const subastaFormSchema = z.object({
  rubros: z
    .array(
      z.object({
        rubro: z.string().min(3, "El rubro debe tener al menos 3 caracteres"),
        subrubros: z.array(z.string()).min(1, "Debe seleccionar al menos un subrubro"),
      })
    ).min(1, "Debe agregar al menos un rubro"),
  PublicacionesTitulo: z.string().min(5, "El título debe tener al menos 5 caracteres").max(80, "El título no puede exceder los 100 caracteres"),
  PublicacionesDescripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  incluye_materiales: z.boolean().default(false),
  PublicacionesDetalleMateriales: z.string().max(100, "La descripción de materiales no puede exceder los 100 caracteres").optional(),   
  DepartamentoId: z.number().min(1, "Debe seleccionar un departamento"),
  DepartamentoMunicipioId: z.number().optional(),
  PublicacionesFecTentInicio: z.string().optional(),
  PublicacionesFecRealInicio: z.string().optional(),
  PublicacionesFecFinPostulacion: z.string().min(1, "Debe seleccionar una fecha de fin de postulación"),
  visita_obligatoria: z.boolean().default(false),
  PublicacionesFecVisita: z.string().optional(),
  PublicacionesHoraVisita: z.string().optional(),
  PublicacionesDirVisita: z.string().max(40,"La direccion no puede exceder los 40 caracteres").optional(),
  mostrar_contratante: z.enum(["publico", "privado"]),
  pliego_llamado: z.string().max(40,"La URL no puede superar los 40 caracteres").optional().refine((val) => val === undefined || val === "" || z.string().url().safeParse(val).success, {
    message: "Debe ser una URL válida",
  }),
  PublicacionesCondiciones: z.string().max(100, "Las condiciones no pueden exceder los 100 caracteres").optional(),
  PublicacionesTipoDesembolso: z.enum(["total", "parcial", "porcentaje", "convenir", "otro"]).default("convenir"),
  PublicacionesOtroTipoDes: z.string().max(40,"La forma de pago no debe exceder los 40 caracteres").optional(),
  PublicacionesModalidad: z.enum(["S", "O"]).default("S"),
  PublicacionesPrecio: z.number().nullable().default(null).optional(),
  MonedaId: z.number().optional(),
  PublicacionesFecCierre: z.string().min(1, "Debe seleccionar una fecha de cierre"),
  documentacion_requerida: z.array(z.string()).default([]).optional(),
  PublicacionesDocDescripcion: z.string().max(100,"La descripción no puede exceder los 100 caracteres").optional(),
  PublicacionesTipoEmpresa: z.enum(["no_aplica", "cualquier_tipo", "monotributo", "literal_e", "regimen_general"]).default("no_aplica"),
  PublicacionesContratoId: z.string().max(40,"La URL no puede superar los 40 caracteres").optional().refine((val) => val === undefined || val === "" || z.string().url().safeParse(val).success, {
    message: "Debe ser una URL válida",
  }),
  PublicacionesTerminoObra:  z.string().max(40,"La URL no puede superar los 40 caracteres").optional().refine((val) => val === undefined || val === "" || z.string().url().safeParse(val).success, {
    message: "Debe ser una URL válida",
  }),
}).superRefine((data, ctx) => {
   // 🔸 Validación 1: incluye materiales → detalle obligatorio
  if (data.incluye_materiales && (!data.PublicacionesDetalleMateriales || data.PublicacionesDetalleMateriales.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Debe ingresar una descripción de materiales si incluye materiales',
      path: ['PublicacionesDetalleMateriales'],
    });
  }

   // 🔸 Validación 2: visita obligaoria → datos relacionados obligatorios
  if (data.visita_obligatoria) {
    if (!data.PublicacionesFecVisita || data.PublicacionesFecVisita.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar una fecha de visita si la visita es obligatoria',
        path: ['PublicacionesFecVisita'],
      });
    }
    if (!data.PublicacionesHoraVisita || data.PublicacionesHoraVisita.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar una hora de visita si la visita es obligatoria',
        path: ['PublicacionesHoraVisita'],
      });
    }
    if (!data.PublicacionesDirVisita || data.PublicacionesDirVisita.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar una dirección de visita si la visita es obligatoria',
        path: ['PublicacionesDirVisita'],
      });
    }
  }

  // 🔸 Validación 3: modalidad "oferta" → moneda y precio obligatorios
  if (data.PublicacionesModalidad === 'O') {
    if (!data.MonedaId || data.MonedaId <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe seleccionar una moneda si la modalidad es oferta',
        path: ['MonedaId'],
      });
    }
    if (!data.PublicacionesPrecio || data.PublicacionesPrecio <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar un precio válido si la modalidad es oferta',
        path: ['PublicacionesPrecio'],
      });
    }
  }

  // 🔸 Validación 4: fechas de publicación → al menos una debe estar presente
  const tieneFechaTentativa = data.PublicacionesFecTentInicio?.trim();
  const tieneFechaReal = data.PublicacionesFecRealInicio?.trim();

  if (!tieneFechaTentativa && !tieneFechaReal) {
    ctx.addIssue({
      path: ["PublicacionesFecTentInicio"],
      message: "Debe ingresar al menos una fecha: tentativa o real.",
      code: z.ZodIssueCode.custom,
    });

    ctx.addIssue({
      path: ["PublicacionesFecRealInicio"],
      message: "Debe ingresar al menos una fecha: tentativa o real.",
      code: z.ZodIssueCode.custom,
    });
  }

   // Validación 5: si ambas están presentes, tentativa no puede ser después de la real
  if (tieneFechaTentativa && tieneFechaReal) {
    const fechaTent = new Date(tieneFechaTentativa);
    const fechaReal = new Date(tieneFechaReal);

    if (fechaTent > fechaReal) {
      ctx.addIssue({
        path: ["PublicacionesFecTentInicio"],
        message: "La fecha tentativa no puede ser posterior a la fecha real.",
        code: z.ZodIssueCode.custom,
      });
    }
  }

  // Validacion 6. Ambas fechas deben ser hoy o futuro
  const hoy= new Date();
  hoy.setHours(0, 0, 0, 0);
  if (tieneFechaTentativa) {
    const fechaTent = new Date(tieneFechaTentativa);
    if (fechaTent < hoy) {
      ctx.addIssue({
        path: ["PublicacionesFecTentInicio"],
        message: "La fecha tentativa debe ser igual o posterior a hoy.",
        code: z.ZodIssueCode.custom,
      });
    }
  }

  if (tieneFechaReal) {
    const fechaReal = new Date(tieneFechaReal);
    if (fechaReal < hoy) {
      ctx.addIssue({
        path: ["PublicacionesFecRealInicio"],
        message: "La fecha real debe ser igual o posterior a hoy.",
        code: z.ZodIssueCode.custom,
      });
    }
  }

  // Validación 7: cierre posterior a fin de postulación
  const fecFinPost = data.PublicacionesFecFinPostulacion?.trim();
  const fecCierre = data.PublicacionesFecCierre?.trim();
  if (fecFinPost && fecCierre) {
    const fechaFin = new Date(fecFinPost);
    const fechaCierre = new Date(fecCierre);
    if (fechaCierre <= fechaFin) {
      ctx.addIssue({
        path: ["PublicacionesFecCierre"],
        message: "La fecha de cierre debe ser posterior a la fecha de fin de postulación.",
        code: z.ZodIssueCode.custom,
      });
    }
  }
  // Validación 8: Si selecciona forma pago otra -> debe completar el campo "Otro tipo de desembolso"
  if (data.PublicacionesTipoDesembolso === "otro") {
    if (!data.PublicacionesOtroTipoDes || data.PublicacionesOtroTipoDes.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["PublicacionesOtroTipoDes"],
        message: "Debe completar el campo 'Otro tipo de desembolso' si selecciona 'otro'",
      });
    }
  }

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
  const [departamentos, setDepartamentos] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [monedas, setMonedas] = useState([]);

  const form = useForm<z.infer<typeof subastaFormSchema>>({
    resolver: zodResolver(subastaFormSchema),
    defaultValues: {
      rubros: [],
      PublicacionesTitulo: "",
      PublicacionesDescripcion: "",
      DepartamentoId: 0,
      DepartamentoMunicipioId: 0,
      PublicacionesFecTentInicio: "",
      PublicacionesFecRealInicio: "",
      PublicacionesFecFinPostulacion: "",
      visita_obligatoria: false,
      incluye_materiales: false,
      PublicacionesFecVisita: "",
      PublicacionesHoraVisita: "",
      PublicacionesDirVisita: "",
      mostrar_contratante: "publico",
      pliego_llamado: "",
      PublicacionesCondiciones: "",
      PublicacionesTipoDesembolso: "convenir",
      PublicacionesOtroTipoDes: "",
      PublicacionesModalidad: "S",
      PublicacionesPrecio: null,
      MonedaId: 0,
      PublicacionesFecCierre: "",
      documentacion_requerida: [],
      PublicacionesDocDescripcion: "",
      PublicacionesTipoEmpresa: "no_aplica",
      PublicacionesContratoId: "",
      PublicacionesTerminoObra: "",
      PublicacionesDetalleMateriales: "",
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
      const [departamentosResponse, monedasResponse] = await Promise.all([
        fetch("https://app.almango.com.uy/WebAPI/ObtenerDepto"),
        fetch("http://109.199.100.16/AlmangoXV1NETFramework/SubastasAPI/ObtenerPaisMoneda"),
      ]);

      const departamentosData = await departamentosResponse.json();
      const monedasData = await monedasResponse.json();      

      const monedasDataCountry = obtenerMonedasPorPais("UY", monedasData);
      
      setDepartamentos(departamentosData);
      setMonedas(monedasDataCountry); 
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
    };
    
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchLocalidades = async () => {
      const selectedDepartamento = form.watch("DepartamentoId");     
      if (selectedDepartamento) {
        try {
          const response = await fetch(`https://app.almango.com.uy/WebAPI/ObtenerMunicipio?DepartamentoId=${selectedDepartamento}`);
          const data = await response.json();
          
          setLocalidades(data);
        } catch (error) {
          console.error("Error fetching localidades:", error);
        }
      }
    };

    fetchLocalidades();
  }, [form.watch("DepartamentoId")]);

  const rubros = {
    construccion: ["Albañilería", "Carpintería", "Electricidad", "Pintura", "Plomería"],
    tecnologia: ["Desarrollo Web", "Desarrollo Móvil", "Soporte Técnico", "Redes", "Seguridad"],
  };

  async function onSubmit(values: z.infer<typeof subastaFormSchema>) {
    try {
        // Configurar publicacionesFields
        const publicacionesFields = Object.fromEntries(
            Object.entries({
                PublicacionesTitulo: values.PublicacionesTitulo,
                PublicacionesDescripcion: values.PublicacionesDescripcion,
                PublicacionesFecTentInicio: values.PublicacionesFecTentInicio ? new Date(values.PublicacionesFecTentInicio).toISOString().replace(".000Z", "") : null,
                PublicacionesFecRealInicio: values.PublicacionesFecRealInicio ? new Date(values.PublicacionesFecRealInicio).toISOString().replace(".000Z", "") : null,
                PublicacionesFecFinPostulacion: values.PublicacionesFecFinPostulacion ? new Date(values.PublicacionesFecFinPostulacion).toISOString().replace(".000Z", "") : null,
                PublicacionesFecCierre: values.PublicacionesFecCierre ? new Date(values.PublicacionesFecCierre).toISOString().replace(".000Z", "") : null,
                PublicacionesFecVisita: values.PublicacionesFecVisita ? new Date(values.PublicacionesFecVisita).toISOString().replace(".000Z", "") : null,
                PublicacionesHoraVisita: values.PublicacionesHoraVisita ? `${values.PublicacionesHoraVisita}:00` : null,
                PublicacionesDirVisita: values.PublicacionesDirVisita,
                PublicacionesCondiciones: values.PublicacionesCondiciones,
                PublicacionesTipoDesembolso: values.PublicacionesTipoDesembolso,
                PublicacionesOtroTipoDes: values.PublicacionesOtroTipoDes,
                PublicacionesModalidad: values.PublicacionesModalidad,
                PublicacionesPrecio: values.PublicacionesPrecio,
                PublicacionesDocDescripcion: values.PublicacionesDocDescripcion,
                PublicacionesTipoEmpresa: values.PublicacionesTipoEmpresa,
                PublicacionesContratoId: values.PublicacionesContratoId,
                PublicacionesTerminoObra: values.PublicacionesTerminoObra,
                PublicacionesDetalleMateriales: values.PublicacionesDetalleMateriales,
                DepartamentoId: values.DepartamentoId,
                DepartamentoMunicipioId: values.DepartamentoMunicipioId || null,
                MonedaId: values.MonedaId || null,
                PublicacionesEstado: "PEN",
                PublicacionesDocReq: "bps",
            }).map(([key, value]) => [key, value || null])
        );

        console.log("Publicaciones fields:", publicacionesFields);

        // Convertir publicacionesFields a JSON y codificarlo para la URL
        const queryParam = encodeURIComponent(JSON.stringify(publicacionesFields));
        // Realizar la solicitud GET con el parámetro en la URL usando el proxy configurado
        const url = `/api/SubastasAPI/AltaPublicaciones?Jsonpublicaciones=${queryParam}`;

        const response = await fetch(url, {
            method: "GET",
            credentials: "include", // Incluir cookies en la solicitud
        });

        if (!response.ok) {
            throw new Error("Error al enviar los datos");
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        toast.success("Subasta creada correctamente");
        navigate("/");
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
                                <FormLabel htmlFor={`subrubro_${index}`}>Subrubros</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="rubros"
                      render={() => (
                        <FormItem>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name='PublicacionesTitulo'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='PublicacionesTitulo'>Título del Llamado</FormLabel>
                        <FormControl>
                          <Input id='PublicacionesTitulo' name='PublicacionesTitulo' placeholder='Ej: Remodelación de oficina' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='PublicacionesDescripcion'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='PublicacionesDescripcion'>Resumen del trabajo</FormLabel>
                        <FormControl>
                          <Textarea
                            id='PublicacionesDescripcion'
                            name='PublicacionesDescripcion'
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
                            <Switch checked={field.value} onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (!checked) {
                                  form.setValue("PublicacionesDetalleMateriales", ""); // Limpiar el campo si incluye_materiales es false
                                }
                              }} 
                              />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("incluye_materiales") && (
                      <FormField
                        control={form.control}
                        name='PublicacionesDetalleMateriales'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor='PublicacionesDetalleMateriales'>Especifique</FormLabel>
                            <FormControl>
                              <Textarea id='PublicacionesDetalleMateriales' name='PublicacionesDetalleMateriales' {...field} />
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
                      name='DepartamentoId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ubicación</FormLabel>
                          <Select onValueChange={(value)=>field.onChange(Number(value))} defaultValue={field.value === 0 ? "" : field.value.toString()}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione departamento' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-popover border rounded-md bg-white'>
                              {departamentos.map((departamento) => (
                                <SelectItem key={departamento.DepartamentoId} value={departamento.DepartamentoId.toString()}>
                                  {departamento.DepartamentoDepartamento}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("DepartamentoId") ? (
                      <FormField
                        control={form.control}
                        name='DepartamentoMunicipioId'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Localidad / Barrio</FormLabel>
                            <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value === 0 ? "" : field.value.toString()}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Seleccione localidad' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='bg-white'>
                                {localidades?.map((localidad) => (
                                  <SelectItem key={localidad.DepartamentoMunicipioId} value={localidad.DepartamentoMunicipioId.toString()}>
                                    {localidad.DepartamentoMunicipioNombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ): null}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='PublicacionesFecTentInicio'
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
                      name='PublicacionesFecFinPostulacion'
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
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='PublicacionesFecRealInicio'
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
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (!checked) {
                                  form.setValue("PublicacionesDirVisita", "");
                                  form.setValue("PublicacionesFecVisita", "");
                                  form.setValue("PublicacionesHoraVisita", "");
                                }
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("visita_obligatoria") && (
                      <div className='grid grid-cols-1 gap-4'>
                        <FormField
                          control={form.control}
                          name='PublicacionesDirVisita'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor='PublicacionesDirVisita'>Dirección del Proyecto</FormLabel>
                              <FormControl>
                                <Input
                                  id='PublicacionesDirVisita'
                                  name='PublicacionesDirVisita'
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
                            name='PublicacionesFecVisita'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor='PublicacionesFecVisita'>Fecha de Visita</FormLabel>
                                <FormControl>
                                  <Input id='PublicacionesFecVisita' name='PublicacionesFecVisita' type='date' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name='PublicacionesHoraVisita'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor='PublicacionesHoraVisita'>Hora de Visita</FormLabel>
                                <FormControl>
                                  <Input id='PublicacionesHoraVisita' name='PublicacionesHoraVisita' type='time' {...field} />
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='pliego_llamado'>Pliego del Llamado</FormLabel>
                          <FormControl>
                            <Input
                              id='pliego_llamado'
                              name='pliego_llamado'
                              type='url'
                              placeholder='Ingrese la URL del pliego del llamado'
                              {...field}
                            />
                          </FormControl>                          
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='grid grid-cols-1 gap-4'>
                    <FormField
                      control={form.control}
                      name='PublicacionesCondiciones'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='PublicacionesCondiciones'>Condiciones Particulares</FormLabel>
                          <FormControl>
                            <Textarea
                              id='PublicacionesCondiciones'
                              name='PublicacionesCondiciones'
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
                      name='PublicacionesTipoDesembolso'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forma de Pago</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              if (value !== "otro") {
                                form.setValue("PublicacionesOtroTipoDes", "");
                              }
                            }}
                            defaultValue={field.value}>
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
                    {form.watch("PublicacionesTipoDesembolso") === "otro" && (
                      <FormField
                        control={form.control}
                        name='PublicacionesOtroTipoDes'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor='PublicacionesOtroTipoDes'>Especifique</FormLabel>
                            <FormControl>
                              <Input id='PublicacionesOtroTipoDes' name='PublicacionesOtroTipoDes' type='text' {...field} />
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
                      name='PublicacionesModalidad'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modalidad</FormLabel>
                          <Select onValueChange={(value) => {
                              field.onChange(value);
                                if (value === "S") {
                                  form.setValue("MonedaId", 0); // Limpiar el campo MonedaId
                                  form.setValue("PublicacionesPrecio", null); // Limpiar el campo PublicacionesPrecio
                                }
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Seleccione modalidad' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-white'>
                              <SelectItem value="S">Subasta</SelectItem>
                              <SelectItem value="O">Oferta de Servicio</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Seleccione la modalidad de publicación del proyecto</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("PublicacionesModalidad") === "O" && (
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='MonedaId'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Moneda</FormLabel>
                              <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value === 0 ? "" : field.value.toString()}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Seleccione moneda' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className='bg-white'>
                                  {monedas.map((moneda) => (
                                    <SelectItem key={moneda.MonedaId} value={moneda.MonedaId.toString()}>
                                      {moneda.MonedaNombre}
                                    </SelectItem>
                                  ))}                                  
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='PublicacionesPrecio'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor='PublicacionesPrecio'>¿Cuánto querés pagar?</FormLabel>
                              <FormControl>
                                <Input
                                  id='PublicacionesPrecio'
                                  name='PublicacionesPrecio'
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
                    name='PublicacionesFecCierre'
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
                        name='PublicacionesDocDescripcion'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor='PublicacionesDocDescripcion'>Descripción de Otros Documentos</FormLabel>
                            <FormControl>
                              <Textarea
                                id='PublicacionesDocDescripcion'
                                name='PublicacionesDocDescripcion'
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
                      name='PublicacionesTipoEmpresa'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='PublicacionesTipoEmpresa'>Tipo de Empresa del Proveedor</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id='PublicacionesTipoEmpresa' name='PublicacionesTipoEmpresa'>
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
                    name='PublicacionesContratoId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='PublicacionesContratoId'>Contrato de Trabajo</FormLabel>
                        <FormControl>
                          <Input
                            id='PublicacionesContratoId'
                            name='PublicacionesContratoId'
                            type='url'
                            placeholder='Ingrese la URL del contrato de trabajo'
                            {...field}
                          />
                        </FormControl>                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='PublicacionesTerminoObra'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='PublicacionesTerminoObra'>Término de Obra</FormLabel>
                        <FormControl>
                          <Input
                            id='PublicacionesTerminoObra'
                            name='PublicacionesTerminoObra'
                            type='url'
                            placeholder='Ingrese la URL del documento de término de obra'
                            {...field}
                          />
                        </FormControl>
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
