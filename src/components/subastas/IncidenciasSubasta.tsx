import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, Save } from "lucide-react";
import { useEffect, useState } from "react";

interface Incidencia {
  id: string;
  descripcion: string;
  estado?: "Pendiente" | "Resuelta" | "En curso"; // Añadido para manejar el estado de la incidencia
  fechaCreacion?: string; // Fecha de creación de la incidencia
}

interface IncidenciaSubastaProps {
  incidencias: Incidencia[];
  setIncidencias: React.Dispatch<React.SetStateAction<Incidencia[]>>;
  subasta: { id: string; titulo: string };
  onFinalizar?: () => void;
}

export function IncidenciasSubasta({ incidencias, setIncidencias, subasta, onFinalizar }: IncidenciaSubastaProps) {
  const [nuevaIncidencia, setNuevaIncidencia] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    if (finalizado) {
      // Aquí podrías agregar lógica para enviar las incidencias a la API o guardarlas en el estado global
      //setIncidencias([]); // Inicializar incidencias al montar el componente
    }
  }, [finalizado]);

  const agregarIncidencia = () => {
    if (nuevaIncidencia.trim()) {
      const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
      setIncidencias([
        ...incidencias,
        {
          id,
          descripcion: nuevaIncidencia.trim(),
          estado: "Pendiente",
          fechaCreacion: nuevaFecha,
        },
      ]);
      setNuevaIncidencia("");
      setNuevaFecha("");
    }
  };

  const eliminarIncidencia = (id: string) => {
    setIncidencias(incidencias.filter((incidencia) => incidencia.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      agregarIncidencia();
    }
  };

  if (finalizado) {
    //agregar logica para modificar las tareas de la subasta a la api
    if (onFinalizar) onFinalizar();
    return null;
  }

  return (
    <>
      <h3>Proyecto ID {subasta.id}</h3>
      <h3 className='my-1'>{subasta.titulo}</h3>
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <Input
            id='nueva-incidencia'
            name='nueva-incidencia'
            placeholder='Nueva incidencia'
            value={nuevaIncidencia}
            onChange={(e) => setNuevaIncidencia(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1'
          />
          <Input
            id='fecha-incidencia'
            name='fecha-incidencia'
            type='date'
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
            className='w-40'
          />
          <Button type='button' onClick={agregarIncidencia}>
            <Plus className='h-4 w-4 mr-2' />
            Agregar
          </Button>
        </div>

        <div className='space-y-2'>
          {incidencias.length > 0 ? (
            incidencias.map((incidencia) => (
              <div key={incidencia.id} className='flex items-center justify-between border rounded-md p-3'>
                <span className='flex-1'>{incidencia.descripcion}</span>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => eliminarIncidencia(incidencia.id)}
                  className='text-red-500 hover:text-red-700 hover:bg-red-50'
                >
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
            ))
          ) : (
            <div className='text-center py-4 text-muted-foreground'>Añada incidencias a este proyecto</div>
          )}
        </div>
        <Button type='button' variant='secondary' onClick={() => setFinalizado(true)}>
          Finalizar
        </Button>
      </div>
    </>
  );
}
