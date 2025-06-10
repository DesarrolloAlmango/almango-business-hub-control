import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Filter, Plus, X, TableProperties, LayoutGrid, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SubastasList } from "@/components/subastas/SubastasList";
import { SubastaFilters } from "@/components/subastas/SubastaFilters";
import { DetalleOferta } from "@/components/subastas/DetalleOferta";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data para indicadores de ofertas
const OFERTAS_NUEVAS = {
  activas: 5,
  pendientes: 2,
  finalizadas: 1,
  canceladas: 1,
  adjudicadas: 4,
  todas: 7,
  subastas: 3,
  ofertas: 2,
};

// Mock data para subastas destacadas (resolviendo el error de variable no definida)
const SUBASTAS_DESTACADAS = [
  {
    id: "SUB-2023-001",
    titulo: "Desarrollo de App Móvil Empresarial",
    estado: "en_postulacion",
    fecha_fin_postulacion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días desde ahora
    progreso: 65,
    postulantes: [
      {
        id: "POST-001",
        proveedor: "TechSolutions Inc.",
        avatar: "TS",
        rating: 4.8,
        fechaEntrega: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 12500,
        estado: "pendiente",
      },
      {
        id: "POST-002",
        proveedor: "DevMasters",
        avatar: "DM",
        rating: 4.5,
        fechaEntrega: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 14200,
        estado: "pendiente",
      },
      {
        id: "POST-003",
        proveedor: "AppCreators",
        avatar: "AC",
        rating: 4.9,
        fechaEntrega: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 11800,
        estado: "seleccionada",
      },
    ],
  },
  {
    id: "SUB-2023-002",
    titulo: "Rediseño de Plataforma Web Corporativa",
    estado: "en_postulacion",
    fecha_fin_postulacion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días desde ahora
    progreso: 80,
    postulantes: [
      {
        id: "POST-004",
        proveedor: "WebExperts",
        avatar: "WE",
        rating: 4.7,
        fechaEntrega: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 8500,
        estado: "pendiente",
      },
      {
        id: "POST-005",
        proveedor: "CreativeWeb",
        avatar: "CW",
        rating: 4.3,
        fechaEntrega: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 7800,
        estado: "rechazada",
      },
    ],
  },
  {
    id: "SUB-2023-003",
    titulo: "Implementación de Sistema CRM",
    estado: "adjudicada",
    fecha_fin_postulacion: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
    progreso: 100,
    postulantes: [
      {
        id: "POST-006",
        proveedor: "SystemPro",
        avatar: "SP",
        rating: 5.0,
        fechaEntrega: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 18500,
        estado: "seleccionada",
      },
      {
        id: "POST-007",
        proveedor: "CRMasters",
        avatar: "CR",
        rating: 4.6,
        fechaEntrega: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 16700,
        estado: "rechazada",
      },
    ],
  },
];

export default function SubastasIndex() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState("todas");
  const [selectedOferta, setSelectedOferta] = useState<any>(null);
  const [showDetalleOferta, setShowDetalleOferta] = useState(false);
  const [showPostulantes, setShowPostulantes] = useState<string | null>(null);

  //Estado para filtrado
  const [filtros, setFiltros] = useState({
    search: "",
    rubro: "todos",
    ubicacion: "todas",
    fecha_desde: "",
    fecha_hasta: "",
  });

  const [showSuggestionPopup, setShowSuggestionPopup] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // Cambia el valor por defecto a "table" para que el modo tabla sea el predeterminado
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSendSuggestion = () => {
    // Lógica para enviar el correo
    console.log("Sugerencia enviada:", suggestionText);
    setShowSuggestionPopup(false);
  };

  const onApplyFilters = (nuevosFiltros: any) => {
    setFiltros(nuevosFiltros);
  };
  ///
  const handleVerOferta = (oferta: any) => {
    setSelectedOferta(oferta);
    setShowDetalleOferta(true);
  };

  const togglePostulantes = (subastaId: string) => {
    if (showPostulantes === subastaId) {
      setShowPostulantes(null);
    } else {
      setShowPostulantes(subastaId);
    }
  };
  const hayFiltrosActivos = () => {
    return Object.values(filtros).some((valor) => valor !== "");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, filtros]);

  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4'>
        <div className='flex-1 min-w-0'>
          <h1 className='text-xl sm:text-2xl font-bold tracking-tight truncate text-[hsl(var(--blue))]'>PROYECTOS PUBLICADOS</h1>
          <p className='text-xs sm:text-sm text-muted-foreground truncate'>Gestione los proyectos, cree nuevos o revise los existentes</p>
        </div>
        <div className='flex gap-2 sm:gap-3'>
          <Button variant='outline' className='flex items-center gap-2 border-[#d6ccc2]' onClick={() => setShowFilters(!showFilters)}>
            <Filter className='h-4 w-4' />
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </Button>
          <Button className='bg-[#f0c14b] hover:bg-[#e5b94b] text-black border-[#a88734]' asChild>
            <Link to='/subastas/nueva' className='flex items-center gap-2'>
              <Plus className='h-4 w-4' />
              Nuevo Proyecto
            </Link>
          </Button>
        </div>
      </div>

      {showFilters ? (
        <Card className='mb-6 border-[#e6dfd7]'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg'>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <SubastaFilters
              onApplyFilters={onApplyFilters}
              onClearFilters={() => {
                setFiltros({
                  search: "",
                  rubro: "todos",
                  ubicacion: "todas",
                  fecha_desde: "",
                  fecha_hasta: "",
                });
              }}
            />
          </CardContent>
        </Card>
      ) : (
        hayFiltrosActivos() && (
          <div className='flex flex-wrap gap-2 mb-2'>
            {filtros.search && (
              <Badge className='flex items-center gap-2 px-3 py-1.5 bg-[#f7f5f2] text-black hover:bg-gray-200 transition-colors duration-200 cursor-pointer rounded-sm'>
                Id-Título: {filtros.search}
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-4 w-4 p-0 hover:bg-transparent hover:text-red-500'
                  onClick={() => setFiltros({ ...filtros, search: "" })}
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            )}
            {filtros.rubro !== "todos" && (
              <Badge className='flex items-center gap-2 px-3 py-1.5 bg-[#f7f5f2] text-black hover:bg-gray-200 transition-colors duration-200 cursor-pointer rounded-sm'>
                Rubro: {filtros.rubro}
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-4 w-4 p-0 hover:bg-transparent hover:text-red-500'
                  onClick={() => setFiltros({ ...filtros, rubro: "todos" })}
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            )}
            {filtros.ubicacion !== "todas" && (
              <Badge className='flex items-center gap-2 px-3 py-1.5 bg-[#f7f5f2] text-black hover:bg-gray-200 transition-colors duration-200 cursor-pointer rounded-sm'>
                Ubicación: {filtros.ubicacion}
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-4 w-4 p-0 hover:bg-transparent hover:text-red-500'
                  onClick={() => setFiltros({ ...filtros, ubicacion: "todas" })}
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            )}
            {(filtros.fecha_desde || filtros.fecha_hasta) && (
              <Badge className='flex items-center gap-2 px-3 py-1.5 bg-[#f7f5f2] text-black hover:bg-gray-200 transition-colors duration-200 cursor-pointer rounded-sm'>
                Fechas: {filtros.fecha_desde} {filtros.fecha_desde && "-"}
                {filtros.fecha_hasta}
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-4 w-4 p-0 hover:bg-transparent hover:text-red-500'
                  onClick={() =>
                    setFiltros({
                      ...filtros,
                      fecha_desde: "",
                      fecha_hasta: "",
                    })
                  }
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            )}
          </div>
        )
      )}

      <Tabs defaultValue='todas' className='w-full' value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className='flex items-center justify-between bg-[#f7f5f2] p-2'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Label htmlFor='modalidad' className='text-sm text-muted-foreground'>Modalidad:</Label>
              <Select                               
                value={selectedTab.startsWith("oferta") ? "ofertas" : selectedTab.startsWith("subasta") ? "subastas" : "todas"}
                onValueChange={(value) => setSelectedTab(value)}
              >
                <SelectTrigger id='modalidad' className='w-[120px] h-8'>
                  <SelectValue placeholder='Modalidad' />
                </SelectTrigger>
                <SelectContent className='bg-[#f7f5f2]'>
                  <SelectItem value='ofertas'>Ofertas</SelectItem>
                  <SelectItem value='subastas'>Subastas</SelectItem>
                  <SelectItem value='todas'>Todas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center gap-2'>
              <Label htmlFor='estado'className='text-sm text-muted-foreground'>Estado:</Label>
              <Select
                value={
                  ["activas", "pendientes", "finalizadas", "adjudicadas", "canceladas", "en_revision"].includes(selectedTab)
                    ? selectedTab
                    : "todas"
                }
                onValueChange={(value) => setSelectedTab(value)}
              >
                <SelectTrigger id='estado' className='w-[120px] h-8'>
                  <SelectValue placeholder='Estado' />
                </SelectTrigger>
                <SelectContent className='bg-[#f7f5f2]'>
                  <SelectItem value='canceladas'>Cancelados</SelectItem>
                  <SelectItem value='activas'>Activos</SelectItem>
                  <SelectItem value='pendientes'>Pendientes</SelectItem>
                  <SelectItem value='finalizadas'>Finalizados</SelectItem>
                  <SelectItem value='en_revision'>En Revisión</SelectItem>
                  <SelectItem value='adjudicadas'>Adjudicados</SelectItem>
                  <SelectItem value='todas'>Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <div className='relative hidden lg:flex lg:w-64'>
              <label htmlFor="search" className="sr-only">Buscar proyectos por id o título</label>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                id="search"
                name="search"
                placeholder='Buscar proyectos por id o título'
                className='w-full rounded-lg pl-8 shadow-none h-9'
                value={filtros.search ?? ""}
                onChange={(e) => setFiltros({ ...filtros, search: e.target.value })}
              />
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}
              aria-label={viewMode === "table" ? "Ver como Tarjetas" : "Ver como Tabla"}
            >
              {viewMode === "table" ? <LayoutGrid className='h-4 w-4' /> : <TableProperties className='h-4 w-4' />}
            </Button>
          </div>
        </TabsList>

        <TabsContent value='ofertas'>
          <SubastasList modalidad='oferta' viewMode={viewMode} onShowPostulantes={handleVerOferta} filtros={filtros} />
        </TabsContent>
        <TabsContent value='subastas'>
          <SubastasList modalidad='subasta' viewMode={viewMode} onShowPostulantes={handleVerOferta} filtros={filtros} />
        </TabsContent>
        <TabsContent value='activas'>
          <SubastasList estado='activa' viewMode={viewMode} onShowPostulantes={handleVerOferta} filtros={filtros} />
        </TabsContent>
        <TabsContent value='pendientes'>
          <SubastasList estado='pendiente' viewMode={viewMode} onShowPostulantes={handleVerOferta} filtros={filtros} />
        </TabsContent>
        <TabsContent value='finalizadas'>
          <SubastasList estado='finalizada' viewMode={viewMode} onShowPostulantes={handleVerOferta} filtros={filtros} />
        </TabsContent>

        <TabsContent value='adjudicadas'>
          <SubastasList estado='adjudicada' viewMode={viewMode} onShowPostulantes={handleVerOferta} filtros={filtros} />
        </TabsContent>
        <TabsContent value='canceladas'>
          <SubastasList estado='cancelada' viewMode={viewMode} onShowPostulantes={handleVerOferta} filtros={filtros} />
        </TabsContent>
        <TabsContent value='todas'>
          <SubastasList estado='todas' viewMode={viewMode} onShowPostulantes={handleVerOferta} filtros={filtros} />
        </TabsContent>
        <TabsContent value='en_revision'>
          <SubastasList estado='en_revision' viewMode={viewMode} onShowPostulantes={handleVerOferta} filtros={filtros} />
        </TabsContent>
      </Tabs>

      {/* Modal para ver detalle de la oferta */}
      <DetalleOferta oferta={selectedOferta} open={showDetalleOferta} onClose={() => setShowDetalleOferta(false)} />

      {/* Botones flotantes alineados verticalmente */}
      <TooltipProvider>
        <div className='fixed right-0 bottom-3 z-50 flex flex-col'>
          {/* Botón de buzón de sugerencias */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setShowSuggestionPopup(true)}
                className='flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-l-lg text-white relative overflow-hidden'
              >
                <img src='/mailIcon.png' alt='Email' className='absolute inset-0 w-full h-full object-cover p-1' />
              </button>
            </TooltipTrigger>
            <TooltipContent side='left' className='bg-white shadow-md border border-gray-200'>
              <p>Buzón de sugerencias</p>
            </TooltipContent>
          </Tooltip>

          {/* Botón de WhatsApp */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href='https://wa.me/59899713934'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-l-lg text-white  relative overflow-hidden'
              >
                <img src='/wpIcon.png' alt='WhatsApp' className='absolute inset-0 w-full h-full object-cover' />
              </a>
            </TooltipTrigger>
            <TooltipContent side='left' className='bg-white shadow-md border border-gray-200'>
              <p>Contactar al ejecutivo de cuentas</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {/* Popup de sugerencias consultar para usar biblioteca o peticion al backend*/}

      {showSuggestionPopup && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]'
          onClick={() => setShowSuggestionPopup(false)}
        >
          <Card className='w-full max-w-md border-[#e6dfd7]  ' onClick={(e) => e.stopPropagation()}>
            <CardHeader className='bg-[#f7f5f2] border-b border-[#e6dfd7]'>
              <CardTitle className='text-lg font-semibold text-[#333]'>¿Cómo podemos mejorar?</CardTitle>
            </CardHeader>
            <CardContent className='p-6 bg-white'>
              <div className='space-y-4 '>
                <div>
                  <label className='block text-sm font-medium text-[#666] mb-1'>Tu email</label>
                  <input
                    type='email'
                    placeholder='ejemplo@email.com'
                    className='w-full border border-[#e6dfd7] rounded p-2 focus:ring-2 focus:ring-[#f0c14b] focus:border-[#f0c14b]'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-[#666] mb-1'>Tu sugerencia</label>
                  <textarea
                    className='w-full border border-[#e6dfd7] rounded p-2 h-32 focus:ring-2 focus:ring-[#f0c14b] focus:border-[#f0c14b]'
                    placeholder='Te leemos...'
                    value={suggestionText}
                    onChange={(e) => setSuggestionText(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <div className='flex justify-end gap-2 p-4 bg-[#f7f5f2] border-t border-[#e6dfd7] rounded-b-lg'>
              <Button
                variant='outline'
                className='border-[#e6dfd7] hover:bg-[#f0c14b] hover:text-black'
                onClick={() => setShowSuggestionPopup(false)}
              >
                Cancelar
              </Button>
              <Button
                className='bg-[#f0c14b] hover:bg-[#e5b94b] text-black'
                onClick={handleSendSuggestion}
                disabled={!suggestionText || !userEmail}
              >
                Enviar sugerencia
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
