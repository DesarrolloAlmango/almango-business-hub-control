
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";

export function SubastaFilters() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Buscar</Label>
          <div className="relative">
            <Input id="search" placeholder="Búsqueda por título o ID" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select>
            <SelectTrigger id="estado">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="borrador">Borrador</SelectItem>
              <SelectItem value="publicada">Publicada</SelectItem>
              <SelectItem value="en_revision">En Revisión</SelectItem>
              <SelectItem value="en_postulacion">En Postulación</SelectItem>
              <SelectItem value="adjudicada">Adjudicada</SelectItem>
              <SelectItem value="en_progreso">En Progreso</SelectItem>
              <SelectItem value="finalizada">Finalizada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tipo_precio">Tipo de Precio</Label>
          <Select>
            <SelectTrigger id="tipo_precio">
              <SelectValue placeholder="Todos los tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="fijo">Precio Fijo</SelectItem>
              <SelectItem value="mejor_oferta">Mejor Oferta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fecha_desde">Fecha Desde</Label>
          <Input id="fecha_desde" type="date" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fecha_hasta">Fecha Hasta</Label>
          <Input id="fecha_hasta" type="date" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="incluye_materiales">Materiales</Label>
          <Select>
            <SelectTrigger id="incluye_materiales">
              <SelectValue placeholder="Cualquier opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cualquiera">Cualquier opción</SelectItem>
              <SelectItem value="con_materiales">Con materiales</SelectItem>
              <SelectItem value="sin_materiales">Sin materiales</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button variant="outline" type="button" className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Limpiar Filtros
        </Button>
        
        <Button type="button" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}
