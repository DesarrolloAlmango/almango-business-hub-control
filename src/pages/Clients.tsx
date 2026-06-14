import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserPlus,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  History,
  DollarSign,
} from "lucide-react";

const initialClientes = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@example.com",
    frecuencia: 15,
    historial: [
      { servicio: "Traslado", fecha: "2025-06-10" },
      { servicio: "Carga Ligera", fecha: "2025-06-20" },
    ],
    promocional: true,
  },
  {
    id: 2,
    nombre: "María García",
    email: "maria@example.com",
    frecuencia: 5,
    historial: [{ servicio: "Mudanza", fecha: "2025-05-05" }],
    promocional: false,
  },
];

export default function Clientes() {
  const [clientes, setClientes] = useState(initialClientes);
  const [busqueda, setBusqueda] = useState("");
  const [filtroSegmento, setFiltroSegmento] = useState("Todos");

  const segmento = (f) => (f > 20 ? "VIP" : f > 10 ? "Frecuente" : "Ocasional");

  const badgeVariant = (seg) =>
    seg === "VIP" ? "default" : seg === "Frecuente" ? "secondary" : "outline";

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      const coincideTexto =
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.email.toLowerCase().includes(busqueda.toLowerCase());
      const coincideSegmento =
        filtroSegmento === "Todos" || segmento(c.frecuencia) === filtroSegmento;
      return coincideTexto && coincideSegmento;
    });
  }, [clientes, busqueda, filtroSegmento]);

  type ClienteFormData = {
    nombre?: string;
    email?: string;
    frecuencia?: number;
    promocional?: boolean;
  };

  const swalClienteForm = async (titulo: string, datos: ClienteFormData = {}) => {
    const { value } = await Swal.fire({
      title: titulo,
      html: `
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${datos.nombre || ""}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${datos.email || ""}">
        <input id="swal-frecuencia" type="number" class="swal2-input" placeholder="Frecuencia" value="${datos.frecuencia ?? 0}">
        <label class="swal2-checkbox" style="margin-top:0.5rem"><input type="checkbox" id="swal-promocional" ${
          datos.promocional ? "checked" : ""
        }><span>Precio Promocional</span></label>
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      preConfirm: () => {
        const nombre = (document.getElementById("swal-nombre") as HTMLInputElement).value.trim();
        const email = (document.getElementById("swal-email") as HTMLInputElement).value.trim();
        const frecuencia = parseInt((document.getElementById("swal-frecuencia") as HTMLInputElement).value, 10) || 0;
        const promocional = (document.getElementById("swal-promocional") as HTMLInputElement).checked;
        if (!nombre || !email) {
          Swal.showValidationMessage("Nombre y Email son obligatorios");
          return;
        }
        return { nombre, email, frecuencia, promocional };
      },
    });
    return value;
  };

  const handleNuevo = async () => {
    const data = await swalClienteForm("Nuevo Cliente");
    if (data) {
      setClientes([
        ...clientes,
        {
          id: Date.now(),
          historial: [],
          ...data,
        },
      ]);
    }
  };

  const handleEditar = async (cliente) => {
    const data = await swalClienteForm("Editar Cliente", cliente);
    if (data) {
      setClientes(
        clientes.map((c) => (c.id === cliente.id ? { ...c, ...data } : c))
      );
    }
  };

  const handleEliminar = (cliente) => {
    Swal.fire({
      title: "Eliminar Cliente",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((r) => {
      if (r.isConfirmed) {
        setClientes(clientes.filter((c) => c.id !== cliente.id));
      }
    });
  };

  const handleHistorial = (cliente) => {
    const html =
      cliente.historial.length === 0
        ? "Sin servicios registrados"
        : `<ul style='text-align:left'>${cliente.historial
            .map(
              (h) => `<li>${h.fecha}: ${h.servicio}</li>`
            )
            .join("")}</ul>`;
    Swal.fire({ title: `Historial – ${cliente.nombre}`, html, confirmButtonText: "Cerrar" });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <Button className="bg-primary" onClick={handleNuevo}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clientes Registrados</CardTitle>
          <CardDescription>Administra la base de clientes frecuentes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex flex-col">
              <small className="mb-1 text-muted-foreground">Buscar nombre o email</small>
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Ingresa búsqueda ..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <small className="mb-1 text-muted-foreground">Segmento</small>
              <select
                value={filtroSegmento}
                onChange={(e) => setFiltroSegmento(e.target.value)}
                className="border rounded-md p-2 bg-background"
              >
                <option value="Todos">Todos</option>
                <option value="VIP">VIP</option>
                <option value="Frecuente">Frecuente</option>
                <option value="Ocasional">Ocasional</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Frecuencia</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Promocional</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientesFiltrados.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell className="font-medium">{cliente.nombre}</TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.frecuencia}</TableCell>
                    <TableCell>
                      <Badge variant={badgeVariant(segmento(cliente.frecuencia))}>
                        {segmento(cliente.frecuencia)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {cliente.promocional && <DollarSign className="h-4 w-4" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditar(cliente)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleHistorial(cliente)}>
                            <History className="mr-2 h-4 w-4" />
                            Historial
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEliminar(cliente)} className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
