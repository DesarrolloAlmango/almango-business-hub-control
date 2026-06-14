import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FiStar, FiCopy, FiXCircle, FiEdit2 } from "react-icons/fi";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceStatusGrid } from "@/components/dashboard/ServiceStatusGrid";
import { FeedbackList } from "@/components/dashboard/FeedbackList";
import { EconomicSummary } from "@/components/dashboard/EconomicSummary";
import { SubastasActivas } from "@/components/subastas/SubastasActivas";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gavel, PlusCircle, Bell, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { DetalleOferta } from "@/components/subastas/DetalleOferta";

const estadosColors = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  Aceptado: "bg-blue-100 text-blue-800",
  Finalizado: "bg-green-100 text-green-800",
  Cancelada: "bg-red-100 text-red-800",
};

const mockSolicitudes = [
  {
    id: 1,
    estado: "Pendiente",
    fechaAlta: "2025-06-03",
    nroSolicitud: "SOL-0001",
    sucursal: "Sucursal A",
    cliente: "Cliente 1",
    telefono: "+54 9 11 1234 5670",
    departamento: "Montevideo",
    fechaTrabajo: "2025-06-10",
    direccion: "Dirección 1",
    importe: 1000.0,
    profesional: "Prof. Juan",
    usuarioAlta: "Usuario1",
    turno: "Mañana",
    rubro: "Electricidad",
    servicio: "Instalación de luminarias",
    productos: [
      { nombre: "Lampara LED", cantidad: 5 },
      { nombre: "Cable 2x1.5", cantidad: 20 },
    ],
    motivoCancelacion: null,
  },
  {
    id: 2,
    estado: "Aceptado",
    fechaAlta: "2025-06-03",
    nroSolicitud: "SOL-0002",
    sucursal: "Sucursal B",
    cliente: "Cliente 2",
    telefono: "+54 9 11 1234 5671",
    departamento: "Canelones",
    fechaTrabajo: "2025-06-10",
    direccion: "Dirección 2",
    importe: 1250.0,
    profesional: "Prof. Ana",
    usuarioAlta: "Usuario2",
    turno: "Tarde",
    rubro: "Plomería",
    servicio: "Cambio de cañerías",
    productos: [
      { nombre: "Cañería PVC", cantidad: 10 },
      { nombre: "Llave paso", cantidad: 2 },
    ],
    motivoCancelacion: null,
  },
  {
    id: 3,
    estado: "Finalizado",
    fechaAlta: "2025-06-03",
    nroSolicitud: "SOL-0003",
    sucursal: "Sucursal C",
    cliente: "Cliente 3",
    telefono: "+54 9 11 1234 5672",
    departamento: "Maldonado",
    fechaTrabajo: "2025-06-10",
    direccion: "Dirección 3",
    importe: 1500.0,
    profesional: "Prof. Luis",
    usuarioAlta: "Usuario3",
    turno: "Noche",
    rubro: "Gas",
    servicio: "Instalación de cocina",
    productos: [
      { nombre: "Manguera gas", cantidad: 1 },
      { nombre: "Regulador presión", cantidad: 1 },
    ],
    motivoCancelacion: null,
  },
  {
    id: 4,
    estado: "Pendiente",
    fechaAlta: "2025-06-03",
    nroSolicitud: "SOL-0004",
    sucursal: "Sucursal A",
    cliente: "Cliente 4",
    telefono: "+54 9 11 1234 5673",
    departamento: "Salto",
    fechaTrabajo: "2025-06-10",
    direccion: "Dirección 4",
    importe: 1750.0,
    profesional: "Prof. Juan",
    usuarioAlta: "Usuario1",
    turno: "Mañana",
    rubro: "Refrigeración",
    servicio: "Carga de gas aire acondicionado",
    productos: [
      { nombre: "Gas R410", cantidad: 1 },
      { nombre: "Manguera presión", cantidad: 2 },
    ],
    motivoCancelacion: null,
  },
  {
    id: 5,
    estado: "Aceptado",
    fechaAlta: "2025-06-03",
    nroSolicitud: "SOL-0005",
    sucursal: "Sucursal B",
    cliente: "Cliente 5",
    telefono: "+54 9 11 1234 5674",
    departamento: "Paysandú",
    fechaTrabajo: "2025-06-10",
    direccion: "Dirección 5",
    importe: 2000.0,
    profesional: "Prof. Ana",
    usuarioAlta: "Usuario2",
    turno: "Tarde",
    rubro: "Electricidad",
    servicio: "Instalación tablero secundario",
    productos: [
      { nombre: "Disyuntor", cantidad: 1 },
      { nombre: "Cable 4mm", cantidad: 15 },
    ],
    motivoCancelacion: null,
  },
  {
    id: 6,
    estado: "Finalizado",
    fechaAlta: "2025-06-03",
    nroSolicitud: "SOL-0006",
    sucursal: "Sucursal C",
    cliente: "Cliente 6",
    telefono: "+54 9 11 1234 5675",
    departamento: "Rivera",
    fechaTrabajo: "2025-06-10",
    direccion: "Dirección 6",
    importe: 2250.0,
    profesional: "Prof. Luis",
    usuarioAlta: "Usuario3",
    turno: "Noche",
    rubro: "Pintura",
    servicio: "Pintura interior completa",
    productos: [
      { nombre: "Latex blanco", cantidad: 20 },
      { nombre: "Rodillo", cantidad: 3 },
    ],
    motivoCancelacion: null,
  },
];

export default function SolicitudesPage() {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [pinnedRows, setPinnedRows] = React.useState([]);

  const [solicitudes, setSolicitudes] = React.useState(mockSolicitudes);

  const [filtros, setFiltros] = React.useState({
    estado: "",
    departamento: "",
    sucursal: "",
  });

  const [busqueda, setBusqueda] = React.useState("");

  const [filtrosAvanzados, setFiltrosAvanzados] = React.useState({
    profesional: "",
    usuarioAlta: "",
    fechaTipo: "fechaTrabajo",
    fechaDesde: "",
    fechaHasta: "",
    rubro: "",
  });

  const [mostrarFiltrosAvanzados, setMostrarFiltrosAvanzados] = useState(false);

  const [vistaTarjetas, setVistaTarjetas] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);

  const cancelarSolicitud = (id) => {
    setSolicitudes((prev) =>
      prev.map((s) =>
        s.id === id && s.estado === "Aceptado"
          ? { ...s, estado: "Cancelada" }
          : s
      )
    );
  };

  const abrirFormulario = (modo = "crear", data = null) => {
    Swal.fire({
      title:
        modo === "crear"
          ? "Nueva Solicitud"
          : modo === "clonar"
          ? "Clonar Solicitud"
          : "Modificar Solicitud",
      html: `
  <input id="cliente" class="swal2-input" placeholder="Cliente" value="${
    data?.cliente || ""
  }">
  <input id="telefono" class="swal2-input" placeholder="Teléfono" value="${
    data?.telefono || ""
  }">
  <input id="direccion" class="swal2-input" placeholder="Dirección" value="${
    data?.direccion || ""
  }">
  <input id="importe" type="number" class="swal2-input" placeholder="Importe" value="${
    data?.importe || ""
  }">
  <input id="turno" class="swal2-input" placeholder="Turno" value="${
    data?.turno || ""
  }">
  <input id="rubro" class="swal2-input" placeholder="Rubro" value="${
    data?.rubro || ""
  }">
  <input id="servicio" class="swal2-input" placeholder="Servicio" value="${
    data?.servicio || ""
  }">
  <textarea id="productos" class="swal2-textarea" placeholder="Productos: nombre:cantidad separados por coma">${
    data?.productos?.map((p) => `${p.nombre}:${p.cantidad}`).join(", ") || ""
  }</textarea>
`,
      showCancelButton: true,
      confirmButtonText:
        modo === "crear" || modo === "clonar" ? "Crear" : "Guardar",
      preConfirm: () => {
        const cliente = (
          document.getElementById("cliente") as HTMLInputElement
        ).value.trim();
        const telefono = (
          document.getElementById("telefono") as HTMLInputElement
        ).value.trim();
        const direccion = (
          document.getElementById("direccion") as HTMLInputElement
        ).value.trim();
        const importe = (
          document.getElementById("importe") as HTMLInputElement
        ).value.trim();

        const turno = (
          document.getElementById("turno") as HTMLInputElement
        ).value.trim();
        const rubro = (
          document.getElementById("rubro") as HTMLInputElement
        ).value.trim();
        const servicio = (
          document.getElementById("servicio") as HTMLInputElement
        ).value.trim();
        const productosRaw = (
          document.getElementById("productos") as HTMLTextAreaElement
        ).value.trim();

        if (!turno || !rubro || !servicio || !productosRaw) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }

        const productos = productosRaw.split(",").map((p) => {
          const [nombre, cantidad] = p.trim().split(":");
          return { nombre, cantidad: Number(cantidad) || 0 };
        });

        if (!cliente || !telefono || !direccion || !importe) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }
        return {
          cliente,
          telefono,
          direccion,
          importe,
          turno,
          rubro,
          servicio,
          productos,
        };
      },
    }).then((result) => {
      if (!result.isConfirmed) return;

      const nuevaFila = {
        id: modo === "editar" ? data.id : Date.now(),
        estado: modo === "editar" ? data.estado : "Pendiente",
        fechaAlta:
          modo === "editar"
            ? data.fechaAlta
            : new Date().toISOString().split("T")[0],
        nroSolicitud:
          modo === "editar"
            ? data.nroSolicitud
            : `SOL-${String(Date.now()).slice(-4)}`,
        sucursal: data?.sucursal || "Sucursal A",
        cliente: result.value.cliente,
        telefono: result.value.telefono,
        departamento: data?.departamento || "N/A",
        fechaTrabajo: data?.fechaTrabajo || "2025-06-10",
        direccion: result.value.direccion,
        importe: parseFloat(result.value.importe),
        profesional: data?.profesional || "Prof. Juan",
        usuarioAlta: data?.usuarioAlta || "MockUser",

        turno: result.value.turno,
        rubro: result.value.rubro,
        servicio: result.value.servicio,
        productos: result.value.productos,
        motivoCancelacion: modo === "editar" ? data?.motivoCancelacion : null,
      };

      setSolicitudes((prev) =>
        modo === "editar"
          ? prev.map((item) => (item.id === data.id ? nuevaFila : item))
          : [...prev, nuevaFila]
      );
    });
  };

  const togglePinRow = (id) => {
    setPinnedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const sortedSolicitudes = [
    ...solicitudes.filter((s) => pinnedRows.includes(s.id)),
    ...solicitudes.filter((s) => !pinnedRows.includes(s.id)),
  ];

  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    mockSolicitudes.length > 0 &&
    selectedRows.length === mockSolicitudes.length;

  const toggleSelectAll = () => {
    setSelectedRows(
      isAllSelected ? [] : mockSolicitudes.map((item) => item.id)
    );
  };

  const solicitudesFiltradas = sortedSolicitudes.filter((item) => {
    const matchesBusqueda =
      item.nroSolicitud.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.telefono.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.direccion.toLowerCase().includes(busqueda.toLowerCase());

    const matchesFiltros =
      (!filtros.estado || item.estado === filtros.estado) &&
      (!filtros.departamento || item.departamento === filtros.departamento) &&
      (!filtros.sucursal || item.sucursal === filtros.sucursal);

    const matchesFiltrosAvanzados =
      (!filtrosAvanzados.profesional ||
        item.profesional
          .toLowerCase()
          .includes(filtrosAvanzados.profesional)) &&
      (!filtrosAvanzados.usuarioAlta ||
        item.usuarioAlta
          .toLowerCase()
          .includes(filtrosAvanzados.usuarioAlta)) &&
      (!filtrosAvanzados.rubro ||
        item.rubro.toLowerCase().includes(filtrosAvanzados.rubro)) &&
      ((!filtrosAvanzados.fechaDesde && !filtrosAvanzados.fechaHasta) ||
        (() => {
          const fecha = new Date(item[filtrosAvanzados.fechaTipo]);
          if (isNaN(fecha.getTime())) return false;
          if (
            filtrosAvanzados.fechaDesde &&
            fecha < new Date(filtrosAvanzados.fechaDesde)
          )
            return false;
          if (
            filtrosAvanzados.fechaHasta &&
            fecha > new Date(filtrosAvanzados.fechaHasta)
          )
            return false;
          return true;
        })());

    return matchesBusqueda && matchesFiltros && matchesFiltrosAvanzados;
  });

  return (
    <>
      <div className="p-2 space-y-2">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Gestión de Solicitudes</h1>
          <p className="text-base mt-1 text-muted-foreground">
            Visualiza, filtra y gestiona las solicitudes de servicios de tu
            empresa.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 w-full">
          <div className="flex flex-col min-w-[200px] flex-1">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="busqueda"
            >
              Buscar por Cliente, dirección, teléfono o solicitud
            </label>
            <input
              id="busqueda"
              type="text"
              placeholder="Ingrese búsqueda..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="flex flex-col min-w-[140px]">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="estado"
            >
              Filtrar por Estado:
            </label>
            <select
              id="estado"
              value={filtros.estado}
              onChange={(e) =>
                setFiltros({ ...filtros, estado: e.target.value })
              }
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aceptado">Aceptado</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          <div className="flex flex-col min-w-[140px]">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="departamento"
            >
              Filtrar por Ubicación:
            </label>
            <select
              id="departamento"
              value={filtros.departamento}
              onChange={(e) =>
                setFiltros({ ...filtros, departamento: e.target.value })
              }
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">Todas</option>
              {[...new Set(solicitudes.map((s) => s.departamento))].map(
                (dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="flex flex-col min-w-[140px]">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="sucursal"
            >
              Filtrar por Sucursal:
            </label>
            <select
              id="sucursal"
              value={filtros.sucursal}
              onChange={(e) =>
                setFiltros({ ...filtros, sucursal: e.target.value })
              }
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">Todas</option>
              {[...new Set(solicitudes.map((s) => s.sucursal))].map((suc) => (
                <option key={suc} value={suc}>
                  {suc}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col min-w-[150px]">
            <label className="text-xs text-transparent mb-1" aria-hidden="true">
              Nueva Solicitud
            </label>
            <Button
              onClick={() => abrirFormulario("crear")}
              className="min-w-[150px]"
            >
              Nueva Solicitud
            </Button>
          </div>
          <div className="flex flex-col min-w-[150px]">
            <label className="text-xs text-transparent mb-1" aria-hidden="true">
              Filtros Avanzados
            </label>
            <Button
              variant={mostrarFiltrosAvanzados ? "outline" : "default"}
              onClick={() => setMostrarFiltrosAvanzados((prev) => !prev)}
              className="min-w-[150px]"
            >
              {mostrarFiltrosAvanzados
                ? "Ocultar Filtros Avanzados"
                : "Mostrar Filtros Avanzados"}
            </Button>
          </div>
          <div className="flex flex-col min-w-[140px]">
            <label className="text-xs text-transparent mb-1" aria-hidden="true">
              Vista
            </label>
            <button
              onClick={() => setVistaTarjetas((prev) => !prev)}
              className={`px-3 py-2 rounded-md border shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                vistaTarjetas
                  ? "bg-primary text-white border-primary"
                  : "bg-background text-foreground border-input"
              }`}
              aria-pressed={vistaTarjetas}
            >
              {vistaTarjetas ? "Tarjetas" : "Tabla"}
            </button>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-300 overflow-hidden ${
            mostrarFiltrosAvanzados
              ? "max-h-[500px] opacity-100 pt-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="profesional"
            >
              Profesional
            </label>
            <input
              id="profesional"
              type="text"
              value={filtrosAvanzados.profesional}
              onChange={(e) =>
                setFiltrosAvanzados({
                  ...filtrosAvanzados,
                  profesional: e.target.value,
                })
              }
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="usuarioAlta"
            >
              Usuario de Alta
            </label>
            <input
              id="usuarioAlta"
              type="text"
              value={filtrosAvanzados.usuarioAlta}
              onChange={(e) =>
                setFiltrosAvanzados({
                  ...filtrosAvanzados,
                  usuarioAlta: e.target.value,
                })
              }
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="fechaTipo"
            >
              Tipo de Fecha
            </label>
            <select
              id="fechaTipo"
              value={filtrosAvanzados.fechaTipo}
              onChange={(e) =>
                setFiltrosAvanzados({
                  ...filtrosAvanzados,
                  fechaTipo: e.target.value,
                })
              }
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="fechaTrabajo">Fecha de Trabajo</option>
              <option value="fechaAlta">Fecha de Alta</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="fechaDesde"
            >
              Fecha Desde
            </label>
            <input
              id="fechaDesde"
              type="date"
              value={filtrosAvanzados.fechaDesde}
              onChange={(e) =>
                setFiltrosAvanzados({
                  ...filtrosAvanzados,
                  fechaDesde: e.target.value,
                })
              }
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="fechaHasta"
            >
              Fecha Hasta
            </label>
            <input
              id="fechaHasta"
              type="date"
              value={filtrosAvanzados.fechaHasta}
              onChange={(e) =>
                setFiltrosAvanzados({
                  ...filtrosAvanzados,
                  fechaHasta: e.target.value,
                })
              }
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-xs text-muted-foreground mb-1"
              htmlFor="rubro"
            >
              Rubro
            </label>
            <input
              id="rubro"
              type="text"
              value={filtrosAvanzados.rubro}
              onChange={(e) =>
                setFiltrosAvanzados({
                  ...filtrosAvanzados,
                  rubro: e.target.value,
                })
              }
              className="px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-sm border border-muted">
          {vistaTarjetas ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {solicitudesFiltradas.map((item) => (
                <Card
                  key={item.id}
                  className="shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{item.cliente}</span>
                      <Badge
                        className={`${
                          estadosColors[item.estado] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.estado}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{item.nroSolicitud}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>
                      <strong>Turno:</strong> {item.turno}
                    </p>
                    <p>
                      <strong>Rubro:</strong> {item.rubro}
                    </p>
                    <p>
                      <strong>Servicio:</strong> {item.servicio}
                    </p>
                    <p>
                      <strong>Productos:</strong>{" "}
                      {item.productos.map((p, i) => (
                        <span key={i}>
                          {p.nombre} ({p.cantidad})
                          {i < item.productos.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                    <p>
                      <strong>Importe:</strong> ${item.importe.toFixed(2)}
                    </p>
                    <p>
                      <strong>Fecha Trabajo:</strong> {item.fechaTrabajo}
                    </p>
                    <p>
                      <strong>Dirección:</strong> {item.direccion}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => abrirFormulario("editar", item)}
                    >
                      Modificar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => cancelarSolicitud(item.id)}
                      disabled={item.estado !== "Aceptado"}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => abrirFormulario("clonar", item)}
                    >
                      Duplicar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePinRow(item.id)}
                    >
                      {pinnedRows.includes(item.id) ? "Desfijar" : "Fijar"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <table className="min-w-full bg-background text-sm text-foreground">
              {/* ... tabla tal cual la tenés actualmente ... */}
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="accent-primary"
                    />
                  </th>
                  <th className="p-3 text-center">Acciones</th>
                  <th className="p-3">Turno</th>
                  <th className="p-3">Rubro</th>
                  <th className="p-3">Servicio</th>
                  <th className="p-3">Productos</th>
                  <th className="p-3">Motivo Cancelación</th>
                  <th className="p-3">#</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Fecha Alta</th>
                  <th className="p-3">N° Solicitud</th>
                  <th className="p-3">Sucursal</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Teléfono</th>
                  <th className="p-3">Ubicación</th>
                  <th className="p-3">Fecha Trabajo</th>
                  <th className="p-3">Dirección</th>
                  <th className="p-3">Importe</th>
                  <th className="p-3">Profesional</th>
                  <th className="p-3">Usuario Alta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted">
                {solicitudesFiltradas.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition">
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleSelectRow(item.id)}
                        className="accent-primary"
                      />
                    </td>

                    <td className="p-3 text-left relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === item.id ? null : item.id
                          );
                        }}
                        aria-haspopup="true"
                        aria-expanded={openMenuId === item.id}
                        className="text-xl font-bold leading-none focus:outline-none"
                      >
                        &#8942;
                      </button>

                      {openMenuId === item.id && (
                        <div
                          className="absolute z-[999] right-0 mt-2 w-30 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              abrirFormulario("editar", item);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 w-min m-auto py-2 hover:bg-gray-100 text-black font-medium transition"
                          >
                            Modificar
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => {
                              cancelarSolicitud(item.id);
                              setOpenMenuId(null);
                            }}
                            disabled={item.estado !== "Aceptado"}
                            className={`flex items-center gap-2 w-min m-auto py-2 hover:bg-gray-100 text-black font-medium transition ${
                              item.estado !== "Aceptado"
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            Cancelar
                            <FiXCircle />
                          </button>
                          <button
                            onClick={() => {
                              abrirFormulario("clonar", item);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 w-min m-auto py-2 hover:bg-gray-100 text-black font-medium transition"
                          >
                            Duplicar
                            <FiCopy />
                          </button>
                          <button
                            onClick={() => {
                              togglePinRow(item.id);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 w-min m-auto py-2 hover:bg-gray-100 text-black font-medium transition"
                          >
                            {pinnedRows.includes(item.id)
                              ? "Desfijar"
                              : "Fijar"}
                            <FiStar />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="p-3">{item.turno}</td>
                    <td className="p-3">{item.rubro}</td>
                    <td className="p-3">{item.servicio}</td>
                    <td className="p-3">
                      {item.productos.map((p, i) => (
                        <div key={i}>
                          {p.nombre} ({p.cantidad})
                        </div>
                      ))}
                    </td>
                    <td className="p-3">{item.motivoCancelacion || "-"}</td>
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          estadosColors[item.estado] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.estado}
                      </span>
                    </td>
                    <td className="p-3">{item.fechaAlta}</td>
                    <td className="p-3">{item.nroSolicitud}</td>
                    <td className="p-3">{item.sucursal}</td>
                    <td className="p-3">{item.cliente}</td>
                    <td className="p-3">{item.telefono}</td>
                    <td className="p-3">{item.departamento}</td>
                    <td className="p-3">{item.fechaTrabajo}</td>
                    <td className="p-3">{item.direccion}</td>
                    <td className="p-3">${item.importe.toFixed(2)}</td>
                    <td className="p-3">{item.profesional}</td>
                    <td className="p-3">{item.usuarioAlta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
