import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FiStar, FiCopy, FiXCircle, FiEdit2 } from "react-icons/fi";

const estados = ["Pendiente", "Aceptado", "Finalizado"];
const departamentos = ["Ventas", "Soporte", "Administración"];
const sucursales = ["Sucursal A", "Sucursal B", "Sucursal C"];
const profesionales = ["Prof. Juan", "Prof. Ana", "Prof. Luis"];
const usuariosAlta = ["Usuario1", "Usuario2", "Usuario3"];
const rubros = ["Rubro1", "Rubro2", "Rubro3"];

const mockSolicitudes = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  estado: estados[i % estados.length],
  fechaAlta: "2025-06-03",
  nroSolicitud: `SOL-000${i + 1}`,
  sucursal: sucursales[i % sucursales.length],
  cliente: `Cliente ${i + 1}`,
  telefono: `+54 9 11 1234 567${i}`,
  departamento: departamentos[i % departamentos.length],
  fechaTrabajo: "2025-06-10",
  direccion: `Dirección ${i + 1}`,
  importe: (1000 + i * 250).toFixed(2),
  profesional: profesionales[i % profesionales.length],
  usuarioAlta: usuariosAlta[i % usuariosAlta.length],
}));

const SelectFilter = ({ label, options, value, onChange }) => (
  <select
    className="border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white w-full"
    value={value}
    onChange={onChange}
  >
    <option value="">{label}</option>
    {options.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
);

const QuickFilters = ({ filters, setFilters }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
    <SelectFilter
      label="Estado"
      options={estados}
      value={filters.estado}
      onChange={(e) => setFilters((f) => ({ ...f, estado: e.target.value }))}
    />
    <SelectFilter
      label="Departamento"
      options={departamentos}
      value={filters.departamento}
      onChange={(e) => setFilters((f) => ({ ...f, departamento: e.target.value }))}
    />
    <SelectFilter
      label="Sucursal"
      options={sucursales}
      value={filters.sucursal}
      onChange={(e) => setFilters((f) => ({ ...f, sucursal: e.target.value }))}
    />
  </div>
);

const Input = ({ value, onChange, placeholder, type = "text", className = "" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white w-full ${className}`}
  />
);

const SearchBar = ({ filters, setFilters }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
    <Input
      placeholder="N° Solicitud"
      value={filters.nroSolicitud}
      onChange={(e) => setFilters((f) => ({ ...f, nroSolicitud: e.target.value }))}
    />
    <Input
      placeholder="N° Teléfono"
      value={filters.telefono}
      onChange={(e) => setFilters((f) => ({ ...f, telefono: e.target.value }))}
    />
    <Input
      placeholder="Nombre Cliente"
      value={filters.cliente}
      onChange={(e) => setFilters((f) => ({ ...f, cliente: e.target.value }))}
    />
    <Input
      placeholder="Dirección"
      value={filters.direccion}
      onChange={(e) => setFilters((f) => ({ ...f, direccion: e.target.value }))}
    />
  </div>
);

const AdvancedFilters = ({ filters, setFilters }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
    <Input
      placeholder="Nombre Profesional"
      value={filters.profesional}
      onChange={(e) => setFilters((f) => ({ ...f, profesional: e.target.value }))}
    />
    <Input
      placeholder="Usuario de Alta"
      value={filters.usuarioAlta}
      onChange={(e) => setFilters((f) => ({ ...f, usuarioAlta: e.target.value }))}
    />
    <SelectFilter
      label="Rubro"
      options={rubros}
      value={filters.rubro}
      onChange={(e) => setFilters((f) => ({ ...f, rubro: e.target.value }))}
    />
    <div className="flex flex-col text-sm w-full">
      <label className="mb-1 text-gray-700">Fecha Trabajo</label>
      <input
        type="date"
        className="border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white w-full"
        value={filters.fechaTrabajo}
        onChange={(e) => setFilters((f) => ({ ...f, fechaTrabajo: e.target.value }))}
      />
    </div>
    <div className="flex flex-col text-sm w-full">
      <label className="mb-1 text-gray-700">Fecha Solicitud</label>
      <input
        type="date"
        className="border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white w-full"
        value={filters.fechaAlta}
        onChange={(e) => setFilters((f) => ({ ...f, fechaAlta: e.target.value }))}
      />
    </div>
  </div>
);

const ViewToggle = ({ view, setView }) => (
  <div className="flex gap-2 mb-6">
    {["fila", "tarjeta"].map((v) => (
      <button
        key={v}
        onClick={() => setView(v)}
        className={`px-4 py-2 rounded transition ${
          view === v
            ? "bg-orange-500 text-white shadow"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        type="button"
        aria-pressed={view === v}
      >
        {v === "fila" ? "Vista en Fila" : "Vista en Tarjeta"}
      </button>
    ))}
  </div>
);

const actionIcons = [
  {
    icon: <FiStar size={18} />,
    label: "Fijar",
  },
  {
    icon: <FiCopy size={18} />,
    label: "Duplicar",
  },
  {
    icon: <FiXCircle size={18} />,
    label: "Cancelar",
  },
  {
    icon: <FiEdit2 size={18} />,
    label: "Modificar",
  },
];

const Actions = () => (
  <div className="flex gap-1 text-xs">
    {actionIcons.map(({ icon, label }) => (
      <button
        key={label}
        className="relative group bg-transparent p-1 rounded hover:bg-orange-50 transition"
        type="button"
        aria-label={label}
      >
        {icon}
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 opacity-0 group-hover:opacity-100 pointer-events-none bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 transition-opacity">
          {label}
        </span>
      </button>
    ))}
  </div>
);

const RequestRow = ({ req }) => (
  <tr className="border-b hover:bg-gray-50 transition bg-white">
    <td className="p-2">
      <input type="checkbox" aria-label={`Seleccionar solicitud ${req.nroSolicitud}`} />
    </td>
    <td className="p-2 whitespace-nowrap text-sm">
      <Actions />
    </td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.estado}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.fechaAlta}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.nroSolicitud}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.sucursal}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.cliente}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.telefono}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.departamento}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.fechaTrabajo}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.direccion}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">${req.importe}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.profesional}</td>
    <td className="p-2 whitespace-nowrap text-sm text-gray-800">{req.usuarioAlta}</td>
  </tr>
);

const RequestCard = ({ req }) => (
  <div className="border rounded-2xl p-6 shadow-md flex flex-col gap-3 text-sm bg-white transition hover:shadow-lg">
    <div className="flex justify-between items-center">
      <input type="checkbox" aria-label={`Seleccionar solicitud ${req.nroSolicitud}`} />
      <span className="font-semibold text-lg text-gray-900">{req.nroSolicitud}</span>
      <Actions />
    </div>
    <div><span className="font-semibold text-gray-700">Estado: </span>{req.estado}</div>
    <div><span className="font-semibold text-gray-700">Fecha Alta: </span>{req.fechaAlta}</div>
    <div><span className="font-semibold text-gray-700">Sucursal: </span>{req.sucursal}</div>
    <div><span className="font-semibold text-gray-700">Cliente: </span>{req.cliente}</div>
    <div><span className="font-semibold text-gray-700">Teléfono: </span>{req.telefono}</div>
    <div><span className="font-semibold text-gray-700">Departamento: </span>{req.departamento}</div>
    <div><span className="font-semibold text-gray-700">Fecha Trabajo: </span>{req.fechaTrabajo}</div>
    <div><span className="font-semibold text-gray-700">Dirección: </span>{req.direccion}</div>
    <div><span className="font-semibold text-gray-700">Importe: </span>${req.importe}</div>
    <div><span className="font-semibold text-gray-700">Profesional: </span>{req.profesional}</div>
    <div><span className="font-semibold text-gray-700">Usuario Alta: </span>{req.usuarioAlta}</div>
  </div>
);

const RequestList = ({ solicitudes, view }) =>
  view === "fila" ? (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="table-auto border-collapse border w-full text-left mt-2 text-gray-700 bg-white">
        <thead>
          <tr className="bg-orange-100 border-b text-xs uppercase text-orange-700 select-none">
            <th className="p-3 w-6"></th>
            <th className="p-3">Acciones</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Fecha Alta</th>
            <th className="p-3">N° Solicitud</th>
            <th className="p-3">Sucursal</th>
            <th className="p-3">Cliente</th>
            <th className="p-3">Teléfono</th>
            <th className="p-3">Departamento</th>
            <th className="p-3">Fecha Trabajo</th>
            <th className="p-3">Dirección</th>
            <th className="p-3">Importe</th>
            <th className="p-3">Profesional</th>
            <th className="p-3">Usuario Alta</th>
          </tr>
        </thead>
        <tbody>{solicitudes.map((req) => <RequestRow key={req.id} req={req} />)}</tbody>
      </table>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
      {solicitudes.map((req) => (
        <RequestCard key={req.id} req={req} />
      ))}
    </div>
  );

const filterSolicitudes = (solicitudes, filters) => {
  const keys = Object.entries(filters).filter(([, v]) => v);
  if (!keys.length) return solicitudes;
  return solicitudes.filter((s) =>
    keys.every(([k, v]) =>
      s[k]?.toString().toLowerCase().includes(v.toString().toLowerCase())
    )
  );
};

const initialFilters = {
  estado: "",
  departamento: "",
  sucursal: "",
  nroSolicitud: "",
  telefono: "",
  cliente: "",
  direccion: "",
  profesional: "",
  usuarioAlta: "",
  rubro: "",
  fechaTrabajo: "",
  fechaAlta: "",
};

export default function SolicitudesPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [view, setView] = useState("fila");

  const filteredSolicitudes = filterSolicitudes(mockSolicitudes, filters);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Solicitudes</h1>
      <QuickFilters filters={filters} setFilters={setFilters} />
      <SearchBar filters={filters} setFilters={setFilters} />
      <AdvancedFilters filters={filters} setFilters={setFilters} />
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setFilters(initialFilters)}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          type="button"
        >
          Limpiar Filtros
        </button>
      </div>
      <ViewToggle view={view} setView={setView} />
      <RequestList solicitudes={filteredSolicitudes} view={view} />
    </DashboardLayout>
  );
}
