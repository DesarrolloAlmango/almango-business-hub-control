
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, Save } from "lucide-react";
import { useState } from "react";

interface Trabajo {
  id: string;
  descripcion: string;
}

interface TrabajosSubastaProps {
  trabajos: Trabajo[];
  setTrabajos: React.Dispatch<React.SetStateAction<Trabajo[]>>;
}

export function TrabajosSubasta({ trabajos, setTrabajos }: TrabajosSubastaProps) {
  const [nuevoTrabajo, setNuevoTrabajo] = useState("");
  
  const agregarTrabajo = () => {
    if (nuevoTrabajo.trim()) {
      const id = Date.now().toString();
      setTrabajos([...trabajos, { id, descripcion: nuevoTrabajo.trim() }]);
      setNuevoTrabajo("");
    }
  };
  
  const eliminarTrabajo = (id: string) => {
    setTrabajos(trabajos.filter(trabajo => trabajo.id !== id));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      agregarTrabajo();
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Agregar nuevo trabajo"
          value={nuevoTrabajo}
          onChange={(e) => setNuevoTrabajo(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button type="button" onClick={agregarTrabajo}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </div>
      
      <div className="space-y-2">
        {trabajos.length > 0 ? (
          trabajos.map((trabajo) => (
            <div
              key={trabajo.id}
              className="flex items-center justify-between border rounded-md p-3"
            >
              <span className="flex-1">{trabajo.descripcion}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => eliminarTrabajo(trabajo.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Añada trabajos a realizar en esta subasta
          </div>
        )}
      </div>
    </div>
  );
}
