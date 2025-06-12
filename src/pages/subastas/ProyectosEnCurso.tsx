import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SubastasList } from "@/components/subastas/SubastasList";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { SubastaFilters } from "@/components/subastas/SubastaFilters";
import { SubastasTabList } from "@/components/subastas/SubastasTabList";

export default function ProyectosEnCurso({estadoSubasta, mostrarFeedback}: { estadoSubasta?: string, mostrarFeedback?: boolean }) {
  
  // Estado para el modo de vista
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [search, setSearch] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [filtros, setFiltros] = useState({
    search: "",
    rubro: "todos",
    ubicacion: "todas",
    fecha_desde: "",
    fecha_hasta: "",
  });

  const [subastaConTareas, setSubastaConTareas] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
  const columnsVisible = mostrarFeedback 
    ?{
      fechaLimite: false,
      consultas: false,
      customActions: true,      
      adjudicacion: true,
      
    }:
  {
    consultas: false,
    customActions: true,
    progreso:estadoSubasta !== "finalizada",
    adjudicacion: true,
    fechaLimite: false,
    // El resto quedan visibles por defecto
  };

  useEffect(() => {
    setModalidad("");
    setSearch("");    
    setFiltros({
      search: "",
      rubro: "todos",
      ubicacion: "todas",
      fecha_desde: "",
      fecha_hasta: "",
    });
    setCurrentPage(1);
  }, [estadoSubasta]);

  const titulo= (estadoSubasta === "adjudicada" && !mostrarFeedback)? "PROYECTOS ADJUDICADOS EN CURSO": (estadoSubasta === "finalizada" && !mostrarFeedback)? "PROYECTOS FINALIZADOS": "FEEDBACK";   
  
  return (
    <>
      <div>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4'>
          <h1 className='text-2xl font-bold text-[hsl(var(--blue))]'>{titulo}</h1>
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
            key={estadoSubasta || "default"}
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
            estado={estadoSubasta}
            modalidad={modalidad}
            filtros={filtros}
            viewMode={viewMode}
            columnsVisible={columnsVisible}
            subastaConTareas={subastaConTareas}
            onSetSubastaConTareas={setSubastaConTareas}
            onAgregarTarea={(subasta) => setSubastaConTareas(subasta.id)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            mostrarFeedback={mostrarFeedback} // Prop para mostrar el formulario de feedback
          />
        </div>       
      </div>
    </>
  );
}
