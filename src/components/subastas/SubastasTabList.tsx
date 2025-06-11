import { useState } from "react";
import { Filter, List, ChevronDown, TableProperties, LayoutGrid, X } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SubastasTabListProps {
  modalidad: string;
  onModalidadChange: (modalidad: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  viewMode: "table" | "cards";
  onViewModeChange: (mode: "table" | "cards") => void;
  filtros?: {
    rubro?: string;
    ubicacion?: string;
    fecha_desde?: string;
    fecha_hasta?: string;
    [key: string]: any;
  };
  onClearFiltro?: (key: string) => void;
  showFilters?: boolean;
  onToggleFilters?: () => void;
}

export function SubastasTabList({
  modalidad,
  onModalidadChange,
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  filtros = {},
  onClearFiltro,
}: SubastasTabListProps) {
  const modalidadLabel = modalidad === "subasta" ? "Subasta" : modalidad === "oferta" ? "Oferta" : "Todas las modalidades";

  // Determinar si hay filtros activos (excluyendo search y modalidad)
  const filtroKeys = ["rubro", "ubicacion", "fecha_desde", "fecha_hasta"];
  const filtrosActivos = filtroKeys.filter(
    (key) => filtros[key] && filtros[key] !== "todos" && filtros[key] !== "todas" && filtros[key] !== ""
  );

  return (
    <>
      {/* Etiquetas de filtros activos */}
      {filtrosActivos.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-2'>
          {filtrosActivos.map((key) => (
            <span key={key} className='inline-flex items-center bg-[#f7f5f2] text-xs rounded px-2 py-1 border border-[#e6dfd7]'>
              {key === "rubro" && `Rubro: ${filtros[key]}`}
              {key === "ubicacion" && `Ubicación: ${filtros[key]}`}
              {key === "fecha_desde" && `Desde: ${filtros[key]}`}
              {key === "fecha_hasta" && `Hasta: ${filtros[key]}`}
              {onClearFiltro && (
                <button className='ml-1 text-muted-foreground hover:text-red-500' onClick={() => onClearFiltro(key)} type='button'>
                  <X className='h-3 w-3' />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
      <div className='flex flex-row items-center gap-2 mb-4 w-full justify-between bg-[#f7f5f2] h-10'>
        {/* Filtro por modalidad a la izquierda */}
        <div className='flex-shrink-0'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className='flex items-center gap-2 bg-white rounded mx-1 px-2 py-1 text-xs md:text-sm text-muted-foreground hover:bg-[#ece7e1] transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-primary'
                type='button'
              >
                <List className='h-4 w-4' />
                <span>{modalidadLabel}</span>
                <ChevronDown className='h-4 w-4' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-48 bg-white'>
              <DropdownMenuItem onClick={() => onModalidadChange("")}>Todas las modalidades</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onModalidadChange("subasta")}>Subasta</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onModalidadChange("oferta")}>Oferta</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Buscador y botón de formato de vista a la derecha */}
        <div className='flex items-center gap-2 flex-shrink-0'>
          <div className='relative max-w-xs hidden md:block'>
            <input
              id='search-input'
              name='search-input'
              type='text'
              placeholder='Buscar por ID o título'
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className='input input-bordered w-full md:w-64 pl-8 py-2 pr-2 text-sm'
              aria-label='Buscar por ID o título'
            />
            <div className='absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center'>
              <svg className='h-4 w-4 text-muted-foreground' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                <circle cx='11' cy='11' r='8' />
                <line x1='21' y1='21' x2='16.65' y2='16.65' />
              </svg>
            </div>
          </div>
          <Button
            variant='outline'
            size='icon'
            aria-label={viewMode === "table" ? "Ver como Tarjetas" : "Ver como Tabla"}
            onClick={() => onViewModeChange(viewMode === "table" ? "cards" : "table")}
          >
            {viewMode === "table" ? <LayoutGrid className='h-5 w-5' /> : <TableProperties className='h-5 w-5' />}
          </Button>
        </div>
      </div>
    </>
  );
}
