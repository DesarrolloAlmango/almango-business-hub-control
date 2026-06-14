import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapsible } from "@/components/ui/collapsible";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { MOCK_SUBASTAS } from "./subastaUtils";
import { SubastaTableRow } from "./SubastaTableRow";
import { SubastaCardView } from "./SubastaCardView";
import { TrabajosSubasta } from "./TrabajosSubasta";
import { IncidenciasSubasta } from "./IncidenciasSubasta";
import React from "react";

interface SubastasListProps {
  estado?: string;
  modalidad?: string;
  viewMode?: "table" | "cards";
  onShowPostulantes?: (postulante: any) => void;
  onAgregarTarea?: (subasta: { id: string; titulo: string }) => void;
  onAgregarIncidencia?: (subasta: { id: string; titulo: string }) => void;
  subastaConTareas?: string | null;
  onSetSubastaConTareas?: (id: string | null) => void;
  filtros?: {
    search?: string;
    rubro?: string;
    ubicacion?: string;
    fecha_desde?: string;
    fecha_hasta?: string;
  };
  columnsVisible?: {
    consultas?: boolean;
    customActions?: boolean;
    progreso?: boolean;
    adjudicacion?: boolean;
    fechaLimite?: boolean;
  };
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  mostrarFeedback?: boolean;
}

export function SubastasList({
  estado,
  modalidad,
  onShowPostulantes,
  filtros,
  viewMode = "table",
  columnsVisible = {},
  onAgregarTarea,
  subastaConTareas,
  onSetSubastaConTareas,
  currentPage = 1,
  setCurrentPage,
  mostrarFeedback,
}: SubastasListProps) {
  const SafeFragment = ({ children }: { children: React.ReactNode }) => <>{children}</>;

  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  //estado para manejar orden por fecha limite
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  //Paginado
  const itemsPerPage = 3;
  const [pinnedSubastas, setPinnedSubastas] = useState<string[]>([]);
  // Estado local para incidencias
  const [subastaConIncidencias, setSubastaConIncidencias] = useState<string | null>(null);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const currentViewMode = isMobile || isTablet ? "cards" : viewMode;
  // Filtrar subastas según el estado seleccionado

  const { consultas = true, customActions = false, progreso = false, adjudicacion = false, fechaLimite=true } = columnsVisible;
  const toggleRowExpand = (id: string) => {
    setExpandedRows((current) => (current.includes(id) ? current.filter((rowId) => rowId !== id) : [...current, id]));
  };

  const subastas = MOCK_SUBASTAS.filter((s) => {
    // 1. Filtrar por modalidad
    if (modalidad && s.modalidad !== modalidad) return false;

    // 2. Filtrar por estado del tab
    if (estado) {
      if (estado === "todas") {
        // No aplicar filtro, mostrar todas
      } else if (estado === "activa") {
        if (!["en_postulacion", "en_progreso"].includes(s.estado)) {
          return false;
        }
      } else if (estado === "pendiente") {
        if (!["borrador", "publicada"].includes(s.estado)) {
          return false;
        }
      } else if (estado === "finalizada") {
        if (s.estado !== "finalizada") return false;
      } else if (estado === "cancelada") {
        if (s.estado !== "cancelada") return false;
      } else if (estado === "adjudicada") {
        if (s.estado !== "adjudicada") return false;
      } else if (estado === "en_revision") {
        if (s.estado !== "en_revision") return false;
      }
    }

    // 3. Aplicar filtros adicionales si existen
    if (filtros) {
      // Filtrar por búsqueda (título o ID)
      if (filtros.search) {
        const searchLower = filtros.search.toLowerCase();
        if (!s.titulo.toLowerCase().includes(searchLower) && !s.id.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Filtrar por rubro
      if (filtros.rubro && filtros.rubro !== "todos") {
        if (s.rubro.toLowerCase() !== filtros.rubro.toLowerCase()) return false;
      }

      // Filtrar por ubicación
      if (filtros.ubicacion && filtros.ubicacion !== "todas") {
        if (s.ubicacion.toLowerCase() !== filtros.ubicacion.toLowerCase()) {
          return false;
        }
      }

      // Filtrar por fecha desde
      if (filtros.fecha_desde) {
        const fechaDesde = new Date(filtros.fecha_desde);
        if (new Date(s.fecha_desde) < fechaDesde) return false;
      }

      // Filtrar por fecha hasta
      if (filtros.fecha_hasta) {
        const fechaHasta = new Date(filtros.fecha_hasta);
        if (new Date(s.fecha_hasta) > fechaHasta) return false;
      }
    }

    return true;
  });

  const sortedSubastas = [...subastas].sort((a, b) => {
    // Priorizar subastas fijadas
    const aPinned = pinnedSubastas.includes(a.id);
    const bPinned = pinnedSubastas.includes(b.id);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    // Si ambas están canceladas, mantener orden original
    if (a.estado === "cancelada" && b.estado === "cancelada") return 0;
    // Si solo a está cancelada, ponerla después
    if (a.estado === "cancelada") return 1;
    // Si solo b está cancelada, ponerla después
    if (b.estado === "cancelada") return -1;

    const dateA = new Date(a.fecha_fin_postulacion).getTime();
    const dateB = new Date(b.fecha_fin_postulacion).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Calcular el total de páginas
  const totalPages = Math.ceil(sortedSubastas.length / itemsPerPage);

  // Obtener las subastas de la página current
  const paginatedSubastas = sortedSubastas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
    setExpandedRows([]); // Resetear filas expandidas al cambiar de página
  };

  // Funciones para alternar tareas/incidencias
  const handleAgregarTarea = (id: string) => {
    if (onSetSubastaConTareas) onSetSubastaConTareas(id);
    setSubastaConIncidencias(null);
  };
  const handleAgregarIncidencia = (id: string) => {
    setSubastaConIncidencias(id);
    if (onSetSubastaConTareas) onSetSubastaConTareas(null);
  };

  if (subastas.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
        <h3 className='text-lg font-medium mb-2'>No hay proyectos disponibles</h3>
        <p className='text-muted-foreground mb-4'>No encontramos proyectos que coincidan con los filtros actuales.</p>
        <Button asChild>
          <Link to='/subastas/nueva'>Crear Nuevo Proyecto</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-4 overflow-x-auto'>
      {currentViewMode === "table" ? (
        <div className='overflow-x-auto'>
          <Table amazonStyle={true}>
            <TableHeader>
              <TableRow>
                <TableHead className='w-10'></TableHead>
                <TableHead>Proyecto</TableHead>
                {consultas && <TableHead>Consultas</TableHead>}
                <TableHead>Modalidad</TableHead>
                <TableHead>Estado</TableHead>
                {progreso && <TableHead>Progreso</TableHead>}
                <TableHead>Ubicación</TableHead>
                <TableHead>Rubro</TableHead>
                {mostrarFeedback && <TableHead>Calificación</TableHead>}
                <TableHead>{adjudicacion ? "Adjudicados" : "Postulantes"}</TableHead>
                {fechaLimite && <TableHead className='flex items-center gap-2'>
                  Fecha Límite
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-6 w-6 p-0'
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    <ArrowUpDown className={`h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                  </Button>
                </TableHead>}
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSubastas.map((subasta) => (
                <SafeFragment key={subasta.id}>
                  <Collapsible open={expandedRows.includes(subasta.id)} onOpenChange={() => toggleRowExpand(subasta.id)} asChild>
                    <SubastaTableRow
                      subasta={subasta}
                      consultas={consultas}
                      customActions={customActions}
                      progreso={progreso}
                      adjudicacion={adjudicacion}
                      fechaLimite={fechaLimite}
                      isPinned={pinnedSubastas.includes(subasta.id)}
                      onPin={() => {
                        setPinnedSubastas((prev) =>
                          prev.includes(subasta.id) ? prev.filter((id) => id !== subasta.id) : [...prev, subasta.id]
                        );
                      }}
                      onExpand={() => toggleRowExpand(subasta.id)}
                      isExpanded={expandedRows.includes(subasta.id)}
                      onShowPostulantes={onShowPostulantes}
                      onAgregarTarea={() => handleAgregarTarea(subasta.id)}
                      onAgregarIncidencia={() => handleAgregarIncidencia(subasta.id)}
                      mostrarFeedback={mostrarFeedback}
                    />
                  </Collapsible>
                  {subastaConTareas === subasta.id && (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <TrabajosSubasta
                          subasta={subasta}
                          onFinalizar={() => onSetSubastaConTareas && onSetSubastaConTareas(null)}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {subastaConIncidencias === subasta.id && (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <IncidenciasSubasta
                          subasta={subasta}
                          onFinalizar={() => setSubastaConIncidencias(null)}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </SafeFragment>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-1 gap-4'>
          <SubastaCardView
            subastas={paginatedSubastas}
            columnsVisible={columnsVisible}
            pinnedSubastas={pinnedSubastas}
            setPinnedSubastas={setPinnedSubastas}
            onShowPostulantes={onShowPostulantes}
            onAgregarTarea={(subasta) => handleAgregarTarea(subasta.id)}
            onAgregarIncidencia={(subasta) => handleAgregarIncidencia(subasta.id)}
            expandedRows={expandedRows}
            setExpandedRows={setExpandedRows}
            isMobile={isMobile}
            isTablet={isTablet}
            subastaConTareas={subastaConTareas}
            onSetSubastaConTareas={onSetSubastaConTareas}
            mostrarFeedback={mostrarFeedback}
          />
        </div>
      )}

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-2 mt-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='border-[#d6ccc2]'
          >
            Anterior
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size='sm'
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "bg-[#f0c14b] hover:bg-[#e5b94b] text-black border-[#a88734]" : "border-[#d6ccc2]"}
            >
              {page}
            </Button>
          ))}

          <Button
            variant='outline'
            size='sm'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='border-[#d6ccc2]'
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
