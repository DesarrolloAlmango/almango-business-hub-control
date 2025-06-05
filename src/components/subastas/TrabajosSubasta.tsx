import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Trabajo {
  id: string;
  descripcion: string;
  fecha?: string;
  adjudicatario?: string;
  precio?: number;
  moneda?: string;
}

interface TrabajosSubastaProps {
  subasta: { id: string; titulo: string; postulantes?: { id: string; proveedor: string }[] };
  onFinalizar?: () => void;
}

export function TrabajosSubasta({ onFinalizar, subasta }: TrabajosSubastaProps) {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [nuevoTrabajo, setNuevoTrabajo] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [nuevaMoneda, setNuevaMoneda] = useState<string>("usd");
  const [postulanteSeleccionado, setPostulanteSeleccionado] = useState("");
  const [finalizado, setFinalizado] = useState(false);

  const agregarTrabajo = () => {
    // Elimina separadores de miles (puntos) y usa coma como decimal
    const precioNumerico = parseFloat(nuevoPrecio.replace(/\./g, "").replace(",", "."));
    if (nuevoTrabajo.trim() && nuevaFecha && postulanteSeleccionado && nuevoPrecio && nuevaMoneda && !isNaN(precioNumerico)) {
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
        },
      ]);
      setNuevoTrabajo("");
      setNuevaFecha("");
      setNuevoPrecio("");
      setNuevaMoneda("usd");
      setPostulanteSeleccionado("");
    }
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

  useEffect(() => {
    if (finalizado) {
      setTrabajos([]);
    }
  }, [finalizado]);

  if (finalizado) {
    //agregar logica para modificar las tareas de la subasta a la api

    // NO LLAMAR setFinalizado NI setTrabajos NI NINGÚN setState AQUÍ
    if (onFinalizar) onFinalizar();
    return null;
  }

  return (
    <>
      <h3>Proyecto ID {subasta.id}</h3>
      <h3 className='my-1'>{subasta.titulo}</h3>
      <div className='space-y-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col md:flex-row md:items-center gap-2'>
            <Input
              id='nueva-tarea'
              name='nueva-tarea'
              placeholder='Nueva tarea'
              value={nuevoTrabajo}
              onChange={(e) => setNuevoTrabajo(e.target.value)}
              onKeyDown={handleKeyDown}
              className='flex-1'
            />
            <Input
              id='fecha-tarea'
              name='fecha-tarea'
              type='date'
              value={nuevaFecha}
              onChange={(e) => setNuevaFecha(e.target.value)}
              className='w-40'
            />
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <Input
              id='precio-tarea'
              name='precio-tarea'
              type='text'
              inputMode='decimal'
              min='0'
              step='0.01'
              placeholder='Precio'
              value={nuevoPrecio}
              onChange={handlePrecioChange}
              className='w-28'
            />
            <Select value={nuevaMoneda} onValueChange={(v) => setNuevaMoneda(v)}>
              <SelectTrigger id='moneda-tarea' className='w-24'>
                <SelectValue placeholder='Moneda' />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                <SelectItem value='usd'>Dólares</SelectItem>
                <SelectItem value='uyu'>Pesos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:items-center gap-2'>
          <label htmlFor='postulante-tarea' className='text-xs text-muted-foreground md:w-20 px-1'>
            Asignar a:
          </label>
          <Select
            value={postulanteSeleccionado}
            onValueChange={setPostulanteSeleccionado}
            disabled={!subasta.postulantes || subasta.postulantes.length === 0}
          >
            <SelectTrigger id='postulante-tarea' className='w-full md:w-48'>
              <SelectValue
                placeholder={subasta.postulantes && subasta.postulantes.length > 0 ? "Seleccionar proveedor..." : "Sin proveedores"}
              />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              {subasta.postulantes && subasta.postulantes.length > 0
                ? subasta.postulantes.map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.proveedor}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
          <Button type='button' onClick={agregarTrabajo} className='self-end md:self-auto'>
            <Plus className='h-4 w-4 mr-2' />
            Agregar
          </Button>
        </div>

        <div className='space-y-2'>
          {trabajos.length > 0 ? (
            trabajos.map((trabajo) => (
              <div
                key={trabajo.id}
                className='flex flex-col md:flex-row md:items-center md:justify-between border rounded-md p-3 bg-[#f7f5f2] mb-2 shadow-sm'
              >
                <div className='flex-1'>
                  <div className='font-medium text-base text-primary'>{trabajo.descripcion}</div>
                  <div className='text-xs text-muted-foreground mt-1 flex flex-wrap gap-2'>
                    <span className='bg-white rounded px-2 py-0.5 border text-xs'>
                      Fecha: {trabajo.fecha ? formatFechaLatina(trabajo.fecha) : "-"}
                    </span>
                    <span className='bg-white rounded px-2 py-0.5 border text-xs'>
                      Precio:{" "}
                      {typeof trabajo.precio === "number" ? `${trabajo.moneda === "pesos" ? "$" : "u$s"}${trabajo.precio.toFixed(2)}` : "-"}
                    </span>
                    <span className='bg-white rounded px-2 py-0.5 border text-xs'>
                      Adjudicado a: {subasta.postulantes?.find((p: any) => p.id === trabajo.adjudicatario)?.proveedor || "-"}
                    </span>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => eliminarTrabajo(trabajo.id)}
                  className='text-red-500 hover:text-red-700 hover:bg-red-50 mt-2 md:mt-0'
                >
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
            ))
          ) : (
            <div className='text-center py-4 text-muted-foreground'>Añada tareas a realizar en este proyecto</div>
          )}
        </div>
        <Button type='button' variant='secondary' onClick={() => setFinalizado(true)}>
          Finalizar
        </Button>
      </div>
    </>
  );
}
