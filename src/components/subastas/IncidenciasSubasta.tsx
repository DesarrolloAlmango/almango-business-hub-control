import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Incidencia {
  id: string;
  descripcion: string;
  estado?: "Pendiente" | "Resuelta" | "En curso"; // Añadido para manejar el estado de la incidencia
  fechaCreacion?: string; // Fecha de creación de la incidencia
}

interface IncidenciaSubastaProps {
  subasta: { id: string; titulo: string };
  onFinalizar?: () => void;
}

export function IncidenciasSubasta({ subasta, onFinalizar }: IncidenciaSubastaProps) {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [nuevaIncidencia, setNuevaIncidencia] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (finalizado) {
      // Aquí podrías agregar lógica para enviar las incidencias a la API o guardarlas en el estado global
      //setIncidencias([]); // Inicializar incidencias al montar el componente
    }
  }, [finalizado]);

  const agregarIncidencia = () => {
    if (!nuevaIncidencia.trim()) {
      toast({
        title: "Completa la descripción",
        description: "Ingresa una breve descripción para la incidencia.",
        variant: "default",
      });
      return;
    }
    if (!nuevaFecha) {
      toast({
        title: "Selecciona una fecha",
        description: "Debes elegir una fecha para la incidencia.",
        variant: "default",
      });
      return;
    }
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

  const handleFinalizar = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setLoading(false);
    toast({
      title: "Incidencias agregadas",
      description: "Las incidencias fueron agregadas con éxito.",
      variant: "default",
    });
    setIncidencias([]); // Limpiar incidencias aquí, no en el render
    setFinalizado(true);
  };

  if (finalizado) {
    if (onFinalizar) onFinalizar();
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-md p-4 md:p-6 max-w-3xl mx-auto my-4">
      <h3 className="text-lg md:text-xl font-bold text-primary mb-1 flex items-center gap-2">
        <span className="inline-block bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 text-xs font-mono">
          Proyecto ID {subasta.id}
        </span>
      </h3>
      <h4 className="text-base md:text-lg font-semibold text-gray-700 mb-4 truncate">{subasta.titulo}</h4>
      <div className="space-y-4">
        {/* Formulario de nueva incidencia */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row md:items-end gap-2 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <Input
                id="nueva-incidencia"
                name="nueva-incidencia"
                placeholder="Nueva incidencia"
                value={nuevaIncidencia}
                onChange={(e) => setNuevaIncidencia(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-sm"
              />
              <div className="flex flex-row gap-2 items-end">
                <Input
                  id="fecha-incidencia"
                  name="fecha-incidencia"
                  type="date"
                  value={nuevaFecha}
                  onChange={(e) => setNuevaFecha(e.target.value)}
                  className="w-36 text-xs"
                />
                <Button
                  type="button"
                  onClick={agregarIncidencia}
                  className="w-auto text-xs flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Tabla/lista de incidencias */}
        <div className="space-y-2">
          {incidencias.length > 0 ? (
            <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="hidden md:grid grid-cols-12 bg-gray-50 text-xs font-semibold text-gray-500 px-4 py-2">
                <div className="col-span-7">Descripción</div>
                <div className="col-span-2">Fecha</div>
                <div className="col-span-2">Estado</div>
                <div className="col-span-1 text-center">Acción</div>
              </div>
              {incidencias.map((incidencia, idx) => (
                <div
                  key={incidencia.id}
                  className={`grid grid-cols-1 md:grid-cols-12 items-center px-4 py-3 border-b last:border-b-0 transition-colors duration-150 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-yellow-50`}
                >
                  <div className="col-span-7 font-medium text-primary text-base md:text-sm mb-1 md:mb-0 truncate">
                    {incidencia.descripcion}
                  </div>
                  <div className="col-span-2 text-xs text-gray-600 flex items-center gap-1">
                    <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5 font-mono">
                      {incidencia.fechaCreacion
                        ? (() => {
                            // Mostrar la fecha en formato local sin desfase de zona horaria
                            const [y, m, d] = incidencia.fechaCreacion.split("-");
                            return `${d}/${m}/${y}`;
                          })()
                        : "-"}
                    </span>
                  </div>
                  <div className="col-span-2 text-xs flex items-center gap-1">
                    <span
                      className={`inline-block rounded px-2 py-0.5 font-mono ${
                        incidencia.estado === "Resuelta"
                          ? "bg-green-100 text-green-700"
                          : incidencia.estado === "En curso"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {incidencia.estado || "-"}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-center md:justify-end mt-2 md:mt-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => eliminarIncidencia(incidencia.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors duration-150"
                      aria-label="Eliminar incidencia"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Añada incidencias a este proyecto
            </div>
          )}
        </div>
        {/* Botón Finalizar debajo de la tabla */}
        <div className="flex flex-row w-full mt-2">
          <div className="w-1/2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleFinalizar}
              className="w-full mt-1"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              Finalizar
            </Button>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
