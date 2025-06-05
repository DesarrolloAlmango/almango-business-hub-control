import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Settings,
  EditIcon,
  Plus,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Users,
  ChevronRight,
  MessageSquare,
  Clock,
  MoreVertical,
  Calendar,
  PinOff,
  Pin,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getBadgeVariant, getEstadoText, getSubastaText } from "./subastaUtils";
import { CountdownTimer } from "./CountdownTimer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function SubastaCardView({
  subastas,
  columnsVisible,
  pinnedSubastas,
  setPinnedSubastas,
  onShowPostulantes,
  onAgregarTarea,
  onAgregarIncidencia,
  expandedRows,
  setExpandedRows,
  isMobile,
  isTablet,
}: {
  subastas: any[];
  columnsVisible: {
    consultas?: boolean;
    customActions?: boolean;
    progreso?: boolean;
    adjudicacion?: boolean;
  };
  pinnedSubastas: string[];
  setPinnedSubastas: React.Dispatch<React.SetStateAction<string[]>>;

  onShowPostulantes?: (postulante: any) => void;
  onAgregarTarea?: (subasta: any) => void;
  onAgregarIncidencia?: (subasta: any) => void;
  expandedRows: string[];
  setExpandedRows: React.Dispatch<React.SetStateAction<string[]>>;
  isMobile: boolean;
  isTablet: boolean;
}) {
  const navigate = useNavigate();
  const { consultas = false, customActions = false, progreso = false, adjudicacion = false } = columnsVisible || {};
  return (
    <div className='grid grid-cols-1  lg:grid-cols-3 gap-4 w-full'>
      {subastas.map((subasta) => (
        <div key={subasta.id} className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='sm'
                className='h-4 w-4 p-0 hover:bg-transparent hover:text-[hsl(var(--secondary))]'
                onClick={() => {
                  setPinnedSubastas((prev) => (prev.includes(subasta.id) ? prev.filter((id) => id !== subasta.id) : [...prev, subasta.id]));
                }}
              >
                {pinnedSubastas.includes(subasta.id) ? (
                  <PinOff className='h-4 w-4 hover:text-primary' />
                ) : (
                  <Pin className='h-4 w-4 hover:text-primary' />
                )}
              </Button>
              <Link
                to={`/subastas/${subasta.id}`}
                state={{ from: window.location.pathname }}
                className='font-medium hover:underline text-[#0066c0] text-base'
              >
                {subasta.titulo}
              </Link>
            </div>
            <Badge
              variant={getBadgeVariant(subasta.estado) as any}
              className={`text-xs md:text-sm ${isMobile || isTablet ? "px-2 py-0.5" : ""}`}
            >
              {getEstadoText(subasta.estado)}
            </Badge>
          </div>
          {/* ID y trabajos, igual que en la tabla */}
          <div className='text-xs text-muted-foreground mt-1 flex flex-wrap gap-2'>
            <span>ID: {subasta.id}</span>
            <span>•</span>
            <span>{subasta.trabajos} trabajos</span>
            {subasta.estado === "finalizada" && (
              <>
                <span>•</span>
                <span>
                  {subasta.moneda?.toLocaleUpperCase()} {subasta.precio_base?.toLocaleString("es-UY", { maximumFractionDigits: 0 })}
                </span>
              </>
            )}
          </div>

          <div className='mt-2 space-y-2 text-sm'>
            <div className='flex items-center gap-2'>
              <MapPin className='h-4 w-4 text-muted-foreground' />
              <span>{subasta.ubicacion.toUpperCase()}</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Settings className='h-4 w-4 text-muted-foreground' />
            <span>{subasta.rubro.toUpperCase()}</span>
          </div>
          {progreso && (
            <div className='gap-2 mt-2'>
              <span className='text-muted-foreground text-sm font-medium'>Progreso: </span>
              <span className='text-xs'>{subasta.progreso}%</span>
              <Progress value={subasta.progreso} className='h-2 flex-1 mb-2' />
            </div>
          )}
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <CountdownTimer endDate={subasta.fecha_fin_postulacion} variant='compact' />
          </div>
          {consultas && (
            <div className='flex items-center gap-2 mt-2'>
              <MessageSquare className='h-4 w-4 text-blue-500' />
              <span>{subasta.consultas}</span>
            </div>
          )}
          <div className='mt-2 space-y-1 text-sm'>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-7 flex items-center gap-1 border-[#d6ccc2]'
                  disabled={!subasta.postulantes?.length || (subasta.estado !== "adjudicada" && subasta.estado !== "finalizada")}
                >
                  <Users className='h-4 w-4 text-muted-foreground' />
                  <span>{subasta.postulantes?.length || 0} postulantes</span>
                  <ChevronRight className={`h-3.5 w-3.5 transition-transform ${expandedRows.includes(subasta.id) ? "rotate-90" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='bg-[#f7f5f2] p-3 mt-2 rounded-md'>
                  <h4 className='font-medium mb-2'>Postulantes</h4>
                  <div className='space-y-2'>
                    {subasta.postulantes?.map((postulante) => (
                      <div
                        key={postulante.id}
                        className='bg-white p-3 rounded-md border border-[#e6dfd7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'
                      >
                        <div>
                          <div className='font-medium'>{subasta.estado === "finalizada" ? '"..."' : postulante.proveedor}</div>
                          <div className='flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-muted-foreground mt-1'>
                            <div className='flex items-center gap-1'>
                              <Clock className='h-3.5 w-3.5' />
                              <span>Entrega: {new Date(postulante.fechaEntrega).toLocaleDateString()}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <span>
                                {subasta.moneda === "uyu" ? "U$ " : "USD "}
                                {postulante.monto.toLocaleString("es-UY", {
                                  maximumFractionDigits: 0,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Badge
                            variant={
                              postulante.estado === "seleccionada" ? "green" : postulante.estado === "pendiente" ? "amber" : "destructive"
                            }
                          >
                            {postulante.estado === "seleccionada"
                              ? "Seleccionada"
                              : postulante.estado === "pendiente"
                              ? "Pendiente"
                              : "Rechazada"}
                          </Badge>
                          <Button
                            size='sm'
                            variant='outline'
                            className='border-[#d6ccc2]'
                            onClick={() => onShowPostulantes && onShowPostulantes(postulante)}
                          >
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className='mt-4 flex items-center gap-2'>
            {customActions ? (
              <>
                <span className='text-sm font-medium'>Acciones</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <MoreVertical className='h-5 w-5' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='start'
                    sideOffset={4}
                    className='mt-2 bg-white shadow-lg rounded-md w-48 p-1'
                    avoidCollisions
                    collisionPadding={8}
                  >
                    <DropdownMenuItem
                      className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#f7f5f2] rounded cursor-pointer '
                      onClick={() => navigate(`/subastas/${subasta.id}`, { state: { from: window.location.pathname } })}
                    >
                      <Settings className='h-4 w-4 text-muted-foreground' />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#f7f5f2] rounded cursor-pointer'
                      onClick={() => navigate(`/subastas/editar/${subasta.id}`)}
                    >
                      <EditIcon className='h-4 w-4 text-muted-foreground' />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#f7f5f2] rounded cursor-pointer '
                      onClick={() => onAgregarTarea && onAgregarTarea(subasta)}
                    >
                      <Plus className='h-4 w-4 text-muted-foreground' />
                      Agregar tarea
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#f7f5f2] rounded cursor-pointer'
                      onClick={() => navigate(`/pagos`)}
                    >
                      <DollarSign className='h-4 w-4 text-muted-foreground' />
                      Pagos
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#f7f5f2] rounded cursor-pointer'
                      onClick={() => onAgregarIncidencia && onAgregarIncidencia(subasta)}
                    >
                      <AlertTriangle className='h-4 w-4 text-amber-500' />
                      Registrar incidencia
                    </DropdownMenuItem>
                    <div className='border-t my-1' />
                    <DropdownMenuItem className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 text-red-600 rounded cursor-pointer'>
                      <CheckCircle className='h-4 w-4 text-red-500' />
                      Finalizar proyecto
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button size='sm' className='bg-[#f0c14b] hover:bg-[#e5b94b] text-black border-[#a88734]'>
                  <Link to={`/subastas/${subasta.id}`} state={{ from: window.location.pathname }}>
                    Ver Detalles
                  </Link>
                </Button>
                {subasta.estado === "finalizada" && (
                  <Button size='sm' variant='outline' className='border-[#d6ccc2] hover:bg-[#f7f5f2]'>
                    Adjudicar
                  </Button>
                )}
                {["en_postulacion", "en_progreso"].includes(subasta.estado) && (
                  <>
                    <Button
                      size='sm'
                      variant='outline'
                      className='border-[#d6ccc2] hover:bg-[#f7f5f2]'
                      onClick={() => navigate(`/subastas/editar/${subasta.id}`)}
                    >
                      Editar
                    </Button>
                    <Button size='sm' variant='outline' className='border-[#d6ccc2] hover:bg-[#f7f5f2] text-red-600 hover:text-red-700'>
                      Cancelar
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  // ...copia aquí el contenido de CardView desde SubastasList.tsx...
}
