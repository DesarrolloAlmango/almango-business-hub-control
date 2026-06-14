import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import {
  Pin,
  PinOff,
  Users,
  ChevronRight,
  MessageSquare,
  Settings,
  EditIcon,
  Plus,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreVertical,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getBadgeVariant, getEstadoText, getSubastaText } from "./subastaUtils";
import { CountdownTimer } from "./CountdownTimer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { FeedbackForm, StarRating } from "./FeedbackForm";
import { useState } from "react"; // Add this import

export function SubastaTableRow({
  subasta,
  consultas,
  customActions,
  progreso,
  adjudicacion,
  fechaLimite,
  isPinned,
  onPin,
  onExpand,
  isExpanded,
  onShowPostulantes,
  onAgregarTarea,
  onAgregarIncidencia,
  mostrarFeedback
}: {
  subasta: any;
  consultas: boolean;
  customActions: boolean;
  progreso: boolean;
  adjudicacion: boolean;
  fechaLimite: boolean;
  isPinned: boolean;
  onPin: () => void;
  onExpand: () => void;
  isExpanded: boolean;
  onShowPostulantes?: (postulante: any) => void;
  onAgregarTarea?: (subasta: any) => void;
  onAgregarIncidencia?: (subasta: any) => void;
  mostrarFeedback?: boolean;
}) {
  const navigate = useNavigate();
  const [expandFeedback, setExpandFeedback] = useState(false); // State to control feedback expansion

  const handleCalificarClick = () => {
    if (!mostrarFeedback) {
      navigate(`/feedback`); 
    } else {
      onExpand();
    }
  };

  return (
    <>
      <TableRow>
        <TableCell className='w-10 !p-0'>
          <Button variant='ghost' size='sm' className='h-8 w-8 p-0 hover:bg-transparent hover:text-[hsl(var(--secondary))]' onClick={onPin}>
            {isPinned ? <PinOff className='h-4 w-4 hover:text-primary' /> : <Pin className='h-4 w-4 hover:text-primary' />}
          </Button>
        </TableCell>
        <TableCell>
          <div className='flex items-center justify-between'>
            <Link
              to={`/subastas/${subasta.id}`}
              state={{ from: window.location.pathname }}
              className='font-medium hover:underline text-[#0066c0]'
            >
              {subasta.titulo}
            </Link>
            {subasta.estado === "en_postulacion" && subasta.postulantes?.length > 0 && (
              <Badge variant='blue' className='ml-2 text-xs'>
                {subasta.postulantes.length} ofertas
              </Badge>
            )}
          </div>
          <div className='text-xs text-muted-foreground mt-1'>
            <span>ID: {subasta.id}</span>
            <span className='mx-2'>•</span>
            <span>{subasta.trabajos} trabajos</span>
            {subasta.estado === "finalizada" && (
              <>
                <span className='mx-2'>•</span>
                <span>
                  {subasta.moneda.toLocaleUpperCase()} {subasta.precio_base.toLocaleString("es-UY", { maximumFractionDigits: 0 })}
                </span>
              </>
            )}
          </div>
        </TableCell>
        {consultas && (
          <TableCell>
            <div className='flex items-center gap-1'>
              {subasta.consultas > 0 && (
                <Tooltip>
                  <TooltipTrigger>
                    <div className='relative'>
                      <MessageSquare className='h-5 w-5 text-blue-500' />
                      <span className='absolute -top-1 -right-1 text-xs font-medium text-white bg-red-500 rounded-full h-4 w-4 flex items-center justify-center'>
                        {subasta.consultas}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className='z-[100] bg-white shadow-md border border-gray-200'>
                    <p>Tiene consultas pendientes</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </TableCell>
        )}
        <TableCell>
          <span className='text-sm text-muted-foreground'>{getSubastaText(subasta.modalidad)}</span>
        </TableCell>
        <TableCell>
          <Badge variant={getBadgeVariant(subasta.estado) as any}>{getEstadoText(subasta.estado)}</Badge>
        </TableCell>
        {progreso && (
          <TableCell className='w-44'>
            <div className='flex items-center justify-between mb-1'>
              <span className='text-xs text-muted-foreground'>{subasta.progreso}%</span>
            </div>
            <Progress value={subasta.progreso} className='h-2 text-sm font-medium' />
          </TableCell>
        )}
        <TableCell className='hidden md:table-cell'>
          <span className='text-sm text-muted-foreground'>{subasta.ubicacion.toUpperCase()}</span>
        </TableCell>
        <TableCell>
          <span className='text-sm text-muted-foreground'>{subasta.rubro.toUpperCase() || "Sin especificar"}</span>
        </TableCell>
        {mostrarFeedback && (
          <TableCell>
            <div className="flex justify-start">
              <StarRating value={4} onChange={() => {}} /> {/* Simulated average rating */}
            </div>
          </TableCell>
        )}
        <TableCell>
          <CollapsibleTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='h-7 flex items-center gap-1 border-[#d6ccc2]'
              disabled={!subasta.postulantes?.length || (subasta.estado !== "adjudicada" && subasta.estado !== "finalizada")}
            >
              <Users className='h-3.5 w-3.5' />
              <span>{subasta.postulantes?.length || 0}</span>
              <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
            </Button>
          </CollapsibleTrigger>
        </TableCell>
        {fechaLimite && <TableCell>
          <div className='flex items-center gap-1'>
            {subasta.estado === "cancelada" ? (
              <span className='text-xs text-red-600'>Cancelada</span>
            ) : (
              <CountdownTimer
                endDate={
                  subasta.estado === "adjudicada"
                    ? subasta.fecha_cierre
                    : ["en_postulacion", "en_progreso"].includes(subasta.estado)
                    ? subasta.fecha_fin_postulacion
                    : subasta.fecha_cierre
                }
                variant='compact'
              />
            )}
          </div>
        </TableCell>}
        <TableCell>
          {customActions ? (
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
                {(subasta.estado !== 'finalizada'&& !mostrarFeedback) && (<DropdownMenuItem
                  className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#f7f5f2] rounded cursor-pointer'
                  onClick={() => navigate(`/subastas/editar/${subasta.id}`)}
                >
                  <EditIcon className='h-4 w-4 text-muted-foreground' />
                  Editar
                </DropdownMenuItem>)}
                {(subasta.estado !== "finalizada" && !mostrarFeedback) && (
                  <DropdownMenuItem
                    className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#f7f5f2] rounded cursor-pointer '
                    onClick={() => onAgregarTarea && onAgregarTarea(subasta)}
                  >
                    <Plus className='h-4 w-4 text-muted-foreground' />
                    Agregar tarea
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#f7f5f2] rounded cursor-pointer'
                  onClick={() => navigate(`/pagos`)}
                >
                  <DollarSign className='h-4 w-4 text-muted-foreground' />
                  Pagos
                </DropdownMenuItem>
                {(subasta.estado !== "finalizada" && !mostrarFeedback) && (
                  <DropdownMenuItem
                    className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#f7f5f2] rounded cursor-pointer'
                    onClick={() => onAgregarIncidencia && onAgregarIncidencia(subasta)}
                  >
                    <AlertTriangle className='h-4 w-4 text-amber-500' />
                    Registrar incidencia
                  </DropdownMenuItem>
                )}
                <div className='border-t my-1' />
                {(subasta.estado !== "finalizada" && !mostrarFeedback) && (
                  <DropdownMenuItem className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 text-red-600 rounded cursor-pointer'>
                    <CheckCircle className='h-4 w-4 text-red-500' />
                    Finalizar proyecto
                  </DropdownMenuItem>
                )}
                {(subasta.estado === "finalizada" || mostrarFeedback) && (
                  <DropdownMenuItem
                    className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-green-50 text-green-600 rounded cursor-pointer'
                    onClick={handleCalificarClick} // Use the updated handler
                  >
                    <CheckCircle className='h-4 w-4 text-green-500' />
                    Calificar proyecto
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
        </TableCell>
      </TableRow>
      <CollapsibleContent asChild>
        <TableRow className='hover:bg-transparent border-t-0'>
          <TableCell colSpan={10} className='p-0'>
            <div className='bg-[#f7f5f2] p-3'>
              <h4 className='font-medium mb-2'>Postulantes para "{subasta.titulo}"</h4>
              <div className='space-y-2'>
                {subasta.postulantes?.map((postulante: any, idx: number) => (
                  <div
                    key={postulante.id}
                    className={`space-y-0 ${mostrarFeedback ? (idx !== subasta.postulantes.length - 1 ? 'mb-4' : '') : ''}`}
                  >
                    <div
                      className={
                        mostrarFeedback
                          ? 'bg-white p-3 rounded-t-md border border-[#e6dfd7] flex items-center justify-between border-b-0'
                          : 'bg-white p-3 rounded-md border border-[#e6dfd7] flex items-center justify-between'
                      }
                    >
                      <div>
                        <div className='font-medium'>{subasta.estado === "finalizada" ? '"..."' : postulante.proveedor}</div>
                        <div className='flex items-center gap-3 text-xs text-muted-foreground mt-1'>
                          <div className='flex items-center gap-1'>
                            <Clock className='h-3.5 w-3.5' />
                            <span>Entrega: {new Date(postulante.fechaEntrega).toLocaleDateString()}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <span>
                              {subasta.moneda === "uyu" ? "U$ " : "USD "}
                              {postulante.monto.toLocaleString("es-UY", { maximumFractionDigits: 0 })}
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
                    {mostrarFeedback && (
                      <div className="bg-[#f7f5f2] p-3 rounded-b-md border border-[#e6dfd7] border-t-0">
                        <FeedbackForm postulanteId={postulante.id} subastaId={subasta.id} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleContent>
    </>
  );
}
