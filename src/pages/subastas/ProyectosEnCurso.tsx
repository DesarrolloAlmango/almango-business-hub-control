import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SubastasList } from "@/components/subastas/SubastasList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, LayoutGrid, TableProperties } from "lucide-react";
import { SubastaFilters } from "@/components/subastas/SubastaFilters";
import { SubastasTabList } from "@/components/subastas/SubastasTabList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrabajosSubasta } from "@/components/subastas/TrabajosSubasta";
import { IncidenciasSubasta } from "@/components/subastas/IncidenciasSubasta";

export default function ProyectosEnCurso() {
  // Estado para filtros reutilizables

  // Estado para el modo de vista
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [incidencias, setIncidencias] = useState<{ id: string; descripcion: string }[]>([]);
  const [search, setSearch] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [filtros, setFiltros] = useState({
    search: "",
    rubro: "todos",
    ubicacion: "todas",
    fecha_desde: "",
    fecha_hasta: "",
  });

  const [mostrarTareas, setMostrarTareas] = useState(false);
  const [mostrarIncidencias, setMostrarIncidencias] = useState(false);
  const [subastaSeleccionada, setSubastaSeleccionada] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [subastaConTareas, setSubastaConTareas] = useState<string | null>(null);

  const handleAgregarTarea = (subasta) => {
    setMostrarTareas(true), setSubastaSeleccionada(subasta);
  };
  const handleAgregarIncidencia = (subasta) => {
    setMostrarIncidencias(true);
    setSubastaSeleccionada(subasta);
  };
  const handleSearchChange = (nuevoSearch: string) => {
    setSearch(nuevoSearch);
    setFiltros((f) => ({ ...f, search: nuevoSearch }));
  };

  // Handler para limpiar un filtro individual
  const handleClearFiltro = (key: string) => {
    setFiltros((f) => ({ ...f, [key]: key === "rubro" ? "todos" : key === "ubicacion" ? "todas" : "" }));
  };

  // Handler para mostrar/ocultar filtros avanzados
  const handleToggleFilters = () => setShowFilters((f) => !f);

  // Definir columnas a mostrar (puedes ajustar según lo que quieras ocultar)
  const columnsVisible = {
    consultas: false,
    customActions: true,
    progreso: true,
    adjudicacion: true,
    // El resto quedan visibles por defecto
  };

  return (
    <DashboardLayout>
      <div>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4'>
          <h1 className='text-2xl font-bold'>Proyectos adjudicados en curso</h1>
          <div className='flex gap-2 items-center'>
            <Button variant='outline' onClick={handleToggleFilters} className='flex items-center gap-2'>
              <Filter className='h-4 w-4' />
              {showFilters ? "Ocultar filtro" : "Mostrar filtro"}
            </Button>
          </div>
        </div>
        {/* Mostrar/ocultar filtros avanzados */}
        {showFilters && (
          <SubastaFilters
            onApplyFilters={setFiltros}
            onClearFilters={() => setFiltros({ search: "", rubro: "todos", ubicacion: "todas", fecha_desde: "", fecha_hasta: "" })}
          />
        )}
        <div className='mt-4'>
          <SubastasTabList
            modalidad={modalidad}
            onModalidadChange={setModalidad}
            search={search}
            onSearchChange={handleSearchChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            filtros={filtros}
            onClearFiltro={handleClearFiltro}
            showFilters={showFilters}
            onToggleFilters={handleToggleFilters}
          />
          <SubastasList
            estado='adjudicada'
            modalidad={modalidad}
            filtros={filtros}
            viewMode={viewMode}
            columnsVisible={columnsVisible}
            subastaConTareas={subastaConTareas}
            onSetSubastaConTareas={setSubastaConTareas}
            onAgregarTarea={(subasta) => setSubastaConTareas(subasta.id)}
            onAgregarIncidencia={handleAgregarIncidencia}
          />
        </div>
        {mostrarTareas && (
          <Card className='my-4'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Tareas a Realizar</CardTitle>
                  <CardDescription>Lista de tareas incluidos en este proyecto</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TrabajosSubasta subasta={subastaSeleccionada} onFinalizar={() => setMostrarTareas(false)} />
            </CardContent>
          </Card>
        )}
        <div>
          {mostrarIncidencias && (
            <Card className='my-4'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle>Incidencias</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <IncidenciasSubasta
                  subasta={subastaSeleccionada}
                  incidencias={incidencias}
                  setIncidencias={setIncidencias}
                  onFinalizar={() => setMostrarIncidencias(false)}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
