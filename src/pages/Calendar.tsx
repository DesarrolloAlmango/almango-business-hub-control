import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MySwal = withReactContent(Swal);

const estados = ["Pendiente", "En ejecución", "Completado"];
const estadosColor = {
  Pendiente: "secondary",
  "En ejecución": "default",
  Completado: "outline",
};

const mockEventos = [
  {
    id: 1,
    proveedor: "Proveedor A",
    estado: "Pendiente",
    fecha: "2025-07-04",
    servicio: "Mantenimiento preventivo",
    detalle: "Cambio de filtros y revisión general",
  },
  {
    id: 2,
    proveedor: "Proveedor B",
    estado: "En ejecución",
    fecha: "2025-07-04",
    servicio: "Instalación de software",
    detalle: "Configuración del ERP",
  },
  {
    id: 3,
    proveedor: "Proveedor C",
    estado: "Completado",
    fecha: "2025-07-12",
    servicio: "Soporte técnico",
    detalle: "Resolución de incidencias en red",
  },
  {
    id: 4,
    proveedor: "Proveedor A",
    estado: "Pendiente",
    fecha: "2025-07-20",
    servicio: "Actualización de hardware",
    detalle: "Sustitución de discos SSD",
  },
];

const mockProveedores = ["Proveedor A", "Proveedor B", "Proveedor C"];

export default function AccesoCalendario() {
  const [mesActual, setMesActual] = useState(new Date());
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroProveedor, setFiltroProveedor] = useState("Todos");

  const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const diasDelMes = useMemo(() => {
    const primerDiaMes = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);
    const ultimoDiaMes = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0);
    const dias = [];
    const primerDiaSemana = (primerDiaMes.getDay() + 6) % 7; // lunes=0

    for (let i = 0; i < primerDiaSemana; i++) dias.push(null);

    for (let d = 1; d <= ultimoDiaMes.getDate(); d++)
      dias.push(new Date(mesActual.getFullYear(), mesActual.getMonth(), d));

    return dias;
  }, [mesActual]);

  const eventosFiltrados = useMemo(() => {
    return mockEventos.filter((e) => {
      if (filtroEstado !== "Todos" && e.estado !== filtroEstado) return false;
      if (filtroProveedor !== "Todos" && e.proveedor !== filtroProveedor) return false;
      return (
        new Date(e.fecha).getMonth() === mesActual.getMonth() &&
        new Date(e.fecha).getFullYear() === mesActual.getFullYear()
      );
    });
  }, [filtroEstado, filtroProveedor, mesActual]);

  const eventosPorDia = useMemo(() => {
    const map = {};
    eventosFiltrados.forEach((e) => {
      const fechaStr = new Date(e.fecha).toDateString();
      if (!map[fechaStr]) map[fechaStr] = [];
      map[fechaStr].push(e);
    });
    return map;
  }, [eventosFiltrados]);

  const cambiarMes = (offset) =>
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + offset, 1));

  const mostrarDetalleDia = (dia) => {
    const eventos = eventosPorDia[dia.toDateString()] || [];

    if (eventos.length === 0) {
      MySwal.fire({
        title: `Servicios del ${dia.toLocaleDateString("es-AR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`,
        html: `<p>No hay servicios agendados para este día.</p>`,
        icon: "info",
        background: "#1e293b",
        color: "#f1f5f9",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const htmlEventos = eventos
      .map(
        (e) => `
      <div style="margin-bottom:12px; padding:12px; border:1px solid #374151; border-radius:6px; background:#0f172a;">
        <p><strong>Proveedor:</strong> ${e.proveedor}</p>
        <p><strong>Servicio:</strong> ${e.servicio}</p>
        <p><strong>Estado:</strong> <span style="color:${
          e.estado === "Pendiente"
            ? "#22c55e"
            : e.estado === "En ejecución"
            ? "#3b82f6"
            : "#94a3b8"
        };">${e.estado}</span></p>
        <p><strong>Detalle:</strong> ${e.detalle}</p>
      </div>
    `
      )
      .join("");

    MySwal.fire({
      title: `Servicios del ${dia.toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`,
      html: htmlEventos,
      width: 600,
      background: "#1e293b",
      color: "#f1f5f9",
      confirmButtonColor: "#3b82f6",
      scrollbarPadding: false,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Acceso a Calendario</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => cambiarMes(-1)} aria-label="Mes anterior">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold select-none">
              {mesActual.toLocaleDateString("es-AR", { year: "numeric", month: "long" })}
            </h2>
            <Button variant="ghost" onClick={() => cambiarMes(1)} aria-label="Mes siguiente">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border rounded-md p-2 bg-background"
              aria-label="Filtrar por estado"
            >
              <option value="Todos">Todos los estados</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>

            <select
              value={filtroProveedor}
              onChange={(e) => setFiltroProveedor(e.target.value)}
              className="border rounded-md p-2 bg-background"
              aria-label="Filtrar por proveedor"
            >
              <option value="Todos">Todos los proveedores</option>
              {mockProveedores.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center border rounded-md p-2 select-none">
            {diasSemana.map((d) => (
              <div key={d} className="font-semibold text-muted-foreground">
                {d}
              </div>
            ))}

            {diasDelMes.map((dia, i) =>
              dia ? (
                <button
                  key={i}
                  type="button"
                  className="min-h-[80px] border rounded-md p-1 flex flex-col text-left hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Día ${dia.getDate()}`}
                  onClick={() => mostrarDetalleDia(dia)}
                >
                  <span className="font-semibold text-sm mb-1">{dia.getDate()}</span>
                  <div className="flex flex-col gap-1 overflow-y-auto max-h-[60px]">
                    {(eventosPorDia[dia.toDateString()] || []).map((evento) => (
                      <Badge
                        key={evento.id}
                        variant={estadosColor[evento.estado]}
                        className="text-xs cursor-default truncate"
                        title={`${evento.servicio} - ${evento.estado}`}
                      >
                        {evento.proveedor}
                      </Badge>
                    ))}
                  </div>
                </button>
              ) : (
                <div key={i} />
              )
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
