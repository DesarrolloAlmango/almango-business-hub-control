import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, Save, Loader2, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Trabajo {
  id: string;
  descripcion: string;
  fecha?: string;
  adjudicatario?: string;
  precio?: number;
  moneda?: string;
  estado?: "pendiente" | "en_curso" | "finalizada";
}

interface TrabajosSubastaProps {
  subasta: { id: string; titulo: string; postulantes?: { id: string; proveedor: string }[] };
  onFinalizar?: () => void;
  forceVerticalLayout?: boolean;
}

export function TrabajosSubasta({ onFinalizar, subasta, forceVerticalLayout }: TrabajosSubastaProps) {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [nuevoTrabajo, setNuevoTrabajo] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [nuevaMoneda, setNuevaMoneda] = useState<string>("usd");
  const [postulanteSeleccionado, setPostulanteSeleccionado] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState<"pendiente" | "en_curso" | "finalizada">("pendiente");
  const [finalizado, setFinalizado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [asideOpen, setAsideOpen] = useState(true);
  const [asideOpenTareaAdicional, setAsideOpenTareaAdicional] = useState(true);
  const { toast } = useToast();

  const agregarTrabajo = () => {
    // Elimina separadores de miles (puntos) y usa coma como decimal
    const precioNumerico = parseFloat(nuevoPrecio.replace(/\./g, "").replace(",", "."));
    if (!nuevoTrabajo.trim()) {
      toast({
        title: "Completa la descripción",
        description: "Ingresa una breve descripción para la tarea.",
        variant: "default",
      });
      return;
    }
    if (!nuevaFecha) {
      toast({
        title: "Selecciona una fecha",
        description: "Debes elegir una fecha para la tarea.",
        variant: "default",
      });
      return;
    }
    if (!postulanteSeleccionado) {
      toast({
        title: "Selecciona adjudicatario",
        description: "Elige un proveedor adjudicatario.",
        variant: "default",
      });
      return;
    }
    if (!nuevoPrecio || isNaN(precioNumerico)) {
      toast({
        title: "Precio inválido",
        description: "Ingresa un precio válido para la tarea.",
        variant: "default",
      });
      return;
    }
    if (!nuevaMoneda) {
      toast({
        title: "Selecciona moneda",
        description: "Debes elegir una moneda.",
        variant: "default",
      });
      return;
    }
    if (!nuevoEstado) {
      toast({
        title: "Selecciona estado",
        description: "Debes elegir un estado para la tarea.",
        variant: "default",
      });
      return;
    }
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();

    setTrabajos([
      ...trabajos,
      {
        id,
        descripcion: nuevoTrabajo.trim(),
        fecha: nuevaFecha,
        adjudicatario: postulanteSeleccionado,
        precio: precioNumerico,
        moneda: nuevaMoneda,
        estado: nuevoEstado,
      },
    ]);
    setNuevoTrabajo("");
    setNuevaFecha("");
    setNuevoPrecio("");
    setNuevaMoneda("usd");
    setPostulanteSeleccionado("");
    setNuevoEstado("pendiente");
  };

  const eliminarTrabajo = (id: string) => {
    setTrabajos(trabajos.filter((trabajo) => trabajo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      agregarTrabajo();
    }
  };

  // Formatea el precio con separadores de miles usando punto mientras el usuario escribe
  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d,]/g, "");
    // Permite solo una coma decimal
    const parts = raw.split(",");
    let formatted = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (parts.length > 1) {
      formatted += "," + parts[1].slice(0, 2); // máximo 2 decimales
    }
    setNuevoPrecio(formatted);
  };

  function formatFechaLatina(fecha: string) {
    if (!fecha) return "-";
    const [y, m, d] = fecha.split("-");
    if (!y || !m || !d) return fecha;
    return `${d}/${m}/${y}`;
  }

  const handleFinalizar = async () => {
    setLoading(true);
    // Simula llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setLoading(false);
    toast({
      title: "Tareas agregadas",
      description: "Las tareas fueron agregadas con éxito.",
      variant: "default",
    });
    setFinalizado(true);
  };

  useEffect(() => {
    if (finalizado) {
      setTrabajos([]);
      if (onFinalizar) onFinalizar();
    }
  }, [finalizado, onFinalizar]);

  // Mock de tareas originales de la subasta
  const tareasOriginales = [
    {
      id: "t1",
      descripcion: "Instalación de cableado eléctrico",
      fecha: "2025-06-01",
      adjudicatario: "Proveedor A",
      precio: 1200,
      moneda: "usd",
      estado: "pendiente",
    },
    {
      id: "t2",
      descripcion: "Montaje de luminarias",
      fecha: "2025-06-03",
      adjudicatario: "Proveedor B",
      precio: 800,
      moneda: "uyu",
      estado: "en_curso",
    },
    {
      id: "t3",
      descripcion: "Pruebas de funcionamiento",
      fecha: "2025-06-10",
      adjudicatario: "Proveedor A",
      precio: 500,
      moneda: "usd",
      estado: "finalizada",
    },
    {
      id: "t4",
      descripcion: "Pruebas de funcionamiento",
      fecha: "2025-06-10",
      adjudicatario: "Proveedor A",
      precio: 500,
      moneda: "usd",
      estado: "finalizada",
    },
  ];

  if (finalizado) {    
    return null;
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-md p-4 md:p-6 max-w-[1400px] xl:max-w-[1600px] mx-auto my-4">
      <header>
      <h3 className="text-lg md:text-xl font-bold text-primary mb-1 flex items-center gap-2">
        <span className="inline-block bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 text-xs font-mono">Proyecto ID {subasta.id}</span>
      </h3>
      <h4 className="text-base md:text-lg font-semibold text-gray-700 mb-4 truncate">{subasta.titulo}</h4>
      </header>
      <div className={`${forceVerticalLayout ? 'flex flex-col' : 'flex flex-col xl:flex-row'} gap-4 w-full`}>
        {/* Columna principal: formulario y tabla de trabajos */}
        <main className={forceVerticalLayout ? 'w-full min-w-0 space-y-4' : 'w-full xl:w-3/5 2xl:w-2/3 min-w-0 space-y-4'}>
          {/* Formulario de nueva tarea y botón Finalizar juntos en el form */}
          <form className="flex flex-col gap-2 w-full" onSubmit={e => { e.preventDefault(); handleFinalizar(); }}>
            {/* Descripción ocupa toda la fila */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor='nueva-tarea' className='text-xs text-muted-foreground mb-1'>Descripción:</label>
              <Input
                id='nueva-tarea'
                name='nueva-tarea'
                placeholder='Nueva tarea'
                value={nuevoTrabajo}
                onChange={(e) => setNuevoTrabajo(e.target.value)}
                className='text-sm w-full'
              />
            </div>
            {/* Fecha, Precio y Moneda: apilados en modo tarjetas, en fila en tabla */}
            <div className={forceVerticalLayout ? 'flex flex-col gap-2 w-full' : 'flex flex-col md:flex-row gap-2 w-full'}>
              <div className={forceVerticalLayout ? 'flex flex-col gap-2 w-full' : 'flex flex-row gap-2 w-full md:w-1/2'}>
                <div className={forceVerticalLayout ? 'w-full' : 'w-1/2 flex flex-col'}>
                  <label htmlFor={`fecha-tarea-${subasta.id}`} className='text-xs text-muted-foreground mb-1'>Fecha:</label>
                  <Input
                    id={`fecha-tarea-${subasta.id}`}
                    name={`fecha-tarea-${subasta.id}`}
                    type='date'
                    value={nuevaFecha}
                    onChange={(e) => setNuevaFecha(e.target.value)}
                    className='w-full text-xs'
                  />
                </div>
                <div className={forceVerticalLayout ? 'w-full' : 'w-1/2 flex flex-col'}>
                  <label htmlFor={`precio-tarea-${subasta.id}`} className='text-xs text-muted-foreground mb-1'>Precio:</label>
                  <Input
                    id={`precio-tarea-${subasta.id}`}
                    name={`precio-tarea-${subasta.id}`}
                    type='text'
                    inputMode='decimal'
                    min='0'
                    step='0.01'
                    placeholder='Precio'
                    value={nuevoPrecio}
                    onChange={handlePrecioChange}
                    className='w-full text-xs'
                  />
                </div>
              </div>
              <div className={forceVerticalLayout ? 'w-full' : 'w-full md:w-1/2 flex flex-col'}>
                <label htmlFor={`moneda-tarea-${subasta.id}`} className='text-xs text-muted-foreground mb-1'>Moneda:</label>
                <Select name={`moneda-tarea-${subasta.id}`} value={nuevaMoneda} onValueChange={(v) => setNuevaMoneda(v)}>
                  <SelectTrigger id={`moneda-tarea-${subasta.id}`} className='w-full text-xs'>
                    <SelectValue placeholder='Moneda' />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value='usd'>Dólares</SelectItem>
                    <SelectItem value='uyu'>Pesos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Asignar a y Estado: apilados en modo tarjetas, en fila en tabla */}
            <div className={forceVerticalLayout ? 'flex flex-col gap-2 w-full mt-2' : 'flex flex-col md:flex-row gap-2 w-full mt-2'}>
              <div className={forceVerticalLayout ? 'w-full' : 'w-full md:w-1/2'}>
                <label htmlFor='postulante-tarea' className='text-xs text-muted-foreground mb-1'>Asignar a:</label>
                <Select name={`postulante-tarea-${subasta.id}`}
                  value={postulanteSeleccionado}
                  onValueChange={setPostulanteSeleccionado}
                  disabled={!subasta.postulantes || subasta.postulantes.length === 0}
                >
                  <SelectTrigger id='postulante-tarea' className='w-full text-xs'>
                    <SelectValue
                      placeholder={subasta.postulantes && subasta.postulantes.length > 0 ? "Seleccionar proveedor..." : "Sin proveedores"}
                    />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {subasta.postulantes && subasta.postulantes.length > 0
                      ? subasta.postulantes.map((p: any) => (
                          <SelectItem key={p.id} value={p.id} className="text-xs">
                            {p.proveedor}
                        </SelectItem>
                      ))
                      : null}
                  </SelectContent>
                </Select>
              </div>
              <div className={forceVerticalLayout ? 'w-full' : 'w-full md:w-1/2'}>
                <label htmlFor='estado-tarea' className='text-xs text-muted-foreground mb-1'>Estado:</label>
                <Select name={`estado-tarea-${subasta.id}`}
                  value={nuevoEstado} onValueChange={(v) => setNuevoEstado(v as any)}>
                  <SelectTrigger id='estado-tarea' className='w-full text-xs'>
                    <SelectValue placeholder='Estado' />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value='pendiente'>Pendiente</SelectItem>
                    <SelectItem value='en_curso'>En curso</SelectItem>
                    <SelectItem value='finalizada'>Finalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Botón Agregar debajo de Asignar a y Estado, mismo ancho que Finalizar */}
            <div className={forceVerticalLayout ? "flex w-full mt-2" : "flex w-full mt-2"}>
              <div className={forceVerticalLayout ? "w-full" : "w-full md:w-1/2"}>
                <Button type='button' onClick={agregarTrabajo} className='w-full text-xs flex items-center justify-center'>
                  <Plus className='h-4 w-4 mr-1' />Agregar
                </Button>
              </div>
            </div>
            {/* Botón Finalizar debajo de la tabla, dentro del form */}
            <div className={forceVerticalLayout ? "flex flex-col w-full mt-2 gap-2" : "flex flex-col md:flex-row w-full mt-2 gap-2"}>
              <div className={forceVerticalLayout ? "w-full" : "w-full md:w-1/2"}>
                <Button type='submit' variant='secondary' className="w-full mt-1">
                  {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                  Finalizar
                </Button>
              </div>
            </div>
          </form>
          {/* Tabla de trabajos */}
          <div className='space-y-2'>
            {trabajos.length > 0 ? (
              <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                {/* Desktop/tablet table */}
                <div className="hidden md:grid grid-cols-7 bg-gray-50 text-xs font-semibold text-gray-500 px-4 py-2">
                  <div className="col-span-2">Descripción</div>
                  <div className="col-span-1">Fecha</div>
                  <div className="col-span-1">Precio</div>
                  <div className="col-span-1">Estado</div>
                  <div className="col-span-1">Adjudicado</div>
                  <div className="col-span-1 text-center">Acción</div>
                </div>
                {/* Desktop/tablet rows */}
                <div className="hidden md:block">
                  {trabajos.map((trabajo, idx) => (
                    <div
                      key={trabajo.id}
                      className={`grid grid-cols-1 md:grid-cols-7 items-center px-4 py-3 border-b last:border-b-0 transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-50`}
                    >
                      <div className="col-span-2 font-medium text-primary text-base md:text-sm mb-1 md:mb-0 md:truncate">{trabajo.descripcion}</div>
                      <div className="col-span-1 text-xs text-gray-600 flex items-center gap-1">
                        <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5 font-mono">
                          {trabajo.fecha ? formatFechaLatina(trabajo.fecha) : "-"}
                        </span>
                      </div>
                      <div className="col-span-1 text-xs flex items-center gap-1">
                        <span className={`inline-block rounded px-2 py-0.5 font-mono ${trabajo.moneda === 'usd' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}> 
                          {typeof trabajo.precio === "number" ? `${trabajo.moneda === "uyu" ? "$" : "u$s"}${trabajo.precio.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : "-"}
                        </span>
                      </div>
                      <div className="col-span-1 text-xs flex items-center gap-1">
                        <span className={`inline-block rounded px-2 py-0.5 font-mono ${
                          trabajo.estado === 'finalizada' ? 'bg-green-100 text-green-700' : trabajo.estado === 'en_curso' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {trabajo.estado === 'finalizada' ? 'Finalizada' : trabajo.estado === 'en_curso' ? 'En curso' : 'Pendiente'}
                        </span>
                      </div>
                      <div className="col-span-1 text-xs text-gray-600 flex items-center gap-1">
                        <span className="inline-block bg-gray-100 text-gray-700 rounded px-2 py-0.5">
                          {subasta.postulantes?.find((p: any) => p.id === trabajo.adjudicatario)?.proveedor || "-"}
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-center md:justify-end mt-2 md:mt-0">
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => eliminarTrabajo(trabajo.id)}
                          className='text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors duration-150'
                          aria-label="Eliminar trabajo"
                        >
                          <Trash className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mobile cards */}
                <div className="md:hidden">
                  {trabajos.map((trabajo, idx) => (
                    <div
                      key={trabajo.id}
                      className={`rounded-lg border border-gray-100 px-3 py-3 mb-3 shadow-sm ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <div className="mb-1">
                        <span className="block text-[11px] text-gray-500 font-semibold">Descripción:</span>
                        <span className="block text-primary text-sm font-medium">{trabajo.descripcion}</span>
                      </div>
                      <div className="mb-1 flex flex-row flex-wrap gap-2">
                        <div>
                          <span className="block text-[11px] text-gray-500 font-semibold">Fecha:</span>
                          <span className="block text-xs text-blue-700 font-mono bg-blue-100 rounded px-2 py-0.5">{trabajo.fecha ? formatFechaLatina(trabajo.fecha) : "-"}</span>
                        </div>
                        <div>
                          <span className="block text-[11px] text-gray-500 font-semibold">Precio:</span>
                          <span className={`block text-xs font-mono rounded px-2 py-0.5 ${trabajo.moneda === 'usd' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{typeof trabajo.precio === "number" ? `${trabajo.moneda === "uyu" ? "$" : "u$s"}${trabajo.precio.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : "-"}</span>
                        </div>
                        <div>
                          <span className="block text-[11px] text-gray-500 font-semibold">Estado:</span>
                          <span className={`block text-xs font-mono rounded px-2 py-0.5 ${trabajo.estado === 'finalizada' ? 'bg-green-100 text-green-700' : trabajo.estado === 'en_curso' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{trabajo.estado === 'finalizada' ? 'Finalizada' : trabajo.estado === 'en_curso' ? 'En curso' : 'Pendiente'}</span>
                        </div>
                      </div>
                      <div className="mb-1">
                        <span className="block text-[11px] text-gray-500 font-semibold">Adjudicado:</span>
                        <span className="block text-xs text-gray-700 bg-gray-100 rounded px-2 py-0.5">{subasta.postulantes?.find((p: any) => p.id === trabajo.adjudicatario)?.proveedor || "-"}</span>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => eliminarTrabajo(trabajo.id)}
                          className='text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors duration-150'
                          aria-label="Eliminar trabajo"
                        >
                          <Trash className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='text-center py-4 text-muted-foreground'>Añada tareas a realizar en este proyecto</div>
            )}
          </div>
        </main>
        {/* Columna lateral: tareas originales */}
        <aside
          className={forceVerticalLayout
            ? `w-full flex-shrink-0 rounded-xl p-0 pt-0 h-fit mt-6 transition-colors duration-200 max-h-[600px] overflow-y-auto ${asideOpen ? 'bg-gray-50 border border-gray-200' : 'bg-white border-0'}`
            : `w-full xl:w-2/5 2xl:w-1/3 flex-shrink-0 rounded-xl p-4 pt-0 h-fit mt-6 xl:mt-0 transition-colors duration-200 max-h-[600px] overflow-y-auto ${asideOpen ? 'bg-gray-50 border border-gray-200' : 'bg-white border-0'}`
          }
        >
          <Collapsible open={asideOpen} onOpenChange={setAsideOpen}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer select-none mb-3">
                <h5 className="text-sm font-semibold text-gray-700">Tareas originales del proyecto</h5>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${asideOpen ? '' : '-rotate-90'}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-3">
                {tareasOriginales.map((t) => (
                  <div key={t.id} className="rounded-lg border border-gray-100 bg-white px-3 py-2 shadow-sm">
                    <div className="mb-1">
                      <span className="block text-[11px] text-gray-500 font-semibold">Descripción:</span>
                      <span className="block text-primary text-sm font-medium">{t.descripcion}</span>
                    </div>
                    <div className="mb-1 flex flex-row flex-wrap gap-2">
                      <div>
                        <span className="block text-[11px] text-gray-500 font-semibold">Fecha:</span>
                        <span className="block text-xs text-blue-700 font-mono bg-blue-100 rounded px-2 py-0.5">{formatFechaLatina(t.fecha)}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-gray-500 font-semibold">Precio:</span>
                        <span className={`block text-xs font-mono rounded px-2 py-0.5 ${t.moneda === 'usd' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.moneda === "uyu" ? "$" : "u$s"}{t.precio.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-gray-500 font-semibold">Estado:</span>
                        <span className={`block text-xs font-mono rounded px-2 py-0.5 ${t.estado === 'finalizada' ? 'bg-green-100 text-green-700' : t.estado === 'en_curso' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.estado === 'finalizada' ? 'Finalizada' : t.estado === 'en_curso' ? 'En curso' : 'Pendiente'}</span>
                      </div>
                    </div>
                    <div className="mb-1">
                      <span className="block text-[11px] text-gray-500 font-semibold">Adjudicado:</span>
                      <span className="block text-xs text-gray-700 bg-gray-100 rounded px-2 py-0.5">{t.adjudicatario}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
           <Collapsible open={asideOpenTareaAdicional} onOpenChange={setAsideOpenTareaAdicional}>
            <CollapsibleTrigger asChild> 
              <div className="flex items-center gap-2 cursor-pointer select-none mb-3">
                <h5 className="text-sm font-semibold text-gray-700">Tareas adicionales del proyecto</h5>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${asideOpenTareaAdicional ? '' : '-rotate-90'}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              
            </CollapsibleContent>
          </Collapsible>
        </aside>
      </div>
    </section>
  );
}
