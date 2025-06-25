// import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  UserPlus,
  MoreHorizontal,
  Search,
  Edit,
  Trash,
  Lock,
  Mail,
} from "lucide-react";

import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function SubUsuarios() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // Dummy data for subusuarios
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "María González",
      email: "maria@empresa.com",
      rol: "Administrador",
      estado: "Activo",
      ultimoAcceso: "Hoy, 09:45 AM",
    },
    {
      id: 2,
      nombre: "Carlos Pérez",
      email: "carlos@empresa.com",
      rol: "Editor",
      estado: "Activo",
      ultimoAcceso: "Ayer, 14:30 PM",
    },
    {
      id: 3,
      nombre: "Ana Rodríguez",
      email: "ana@empresa.com",
      rol: "Visualizador",
      estado: "Inactivo",
      ultimoAcceso: "Hace 1 semana",
    },
    {
      id: 4,
      nombre: "Juan López",
      email: "juan@empresa.com",
      rol: "Editor",
      estado: "Activo",
      ultimoAcceso: "Hoy, 11:25 AM",
    },
    {
      id: 5,
      nombre: "Laura Sánchez",
      email: "laura@empresa.com",
      rol: "Visualizador",
      estado: "Activo",
      ultimoAcceso: "Hace 3 días",
    },
  ]);

  const roles = useMemo(
    () => ["Todos", ...new Set(usuarios.map((u) => u.rol))],
    [usuarios]
  );

  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideBusqueda =
      busqueda === "" ||
      [u.nombre, u.email].some((v) =>
        v.toLowerCase().includes(busqueda.toLowerCase())
      );
    const coincideRol = filtroRol === "Todos" || u.rol === filtroRol;
    const coincideEstado =
      filtroEstado === "Todos" || u.estado === filtroEstado;
    return coincideBusqueda && coincideRol && coincideEstado;
  });

  const handleEditUsuario = async (usuario) => {
    const { value } = await Swal.fire({
      title: "Editar Subusuario",
      html: `
      <input id="swal-input-nombre" class="swal2-input" placeholder="Nombre" value="${
        usuario.nombre
      }">
      <input id="swal-input-email" class="swal2-input" placeholder="Email" value="${
        usuario.email
      }">
      <select id="swal-input-estado" class="swal2-select">
        <option ${usuario.estado === "Activo" ? "selected" : ""}>Activo</option>
        <option ${
          usuario.estado === "Inactivo" ? "selected" : ""
        }>Inactivo</option>
      </select>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const nombre = (
          document.getElementById("swal-input-nombre") as HTMLInputElement
        ).value.trim();
        const email = (
          document.getElementById("swal-input-email") as HTMLInputElement
        ).value.trim();
        const estado = (
          document.getElementById("swal-input-estado") as HTMLSelectElement
        ).value;
        if (!nombre || !email)
          Swal.showValidationMessage("Nombre y Email obligatorios");
        return { nombre, email, estado };
      },
    });
    if (value) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuario.id ? { ...u, ...value } : u))
      );
    }
  };

  const handleChangeRol = async (usuario) => {
    const { value } = await Swal.fire({
      title: "Cambiar Rol",
      html: `
      <select id="swal-input-rol" class="swal2-select">
        <option ${
          usuario.rol === "Administrador" ? "selected" : ""
        }>Administrador</option>
        <option ${usuario.rol === "Editor" ? "selected" : ""}>Editor</option>
        <option ${
          usuario.rol === "Visualizador" ? "selected" : ""
        }>Visualizador</option>
      </select>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const rol = (
          document.getElementById("swal-input-rol") as HTMLSelectElement
        ).value;
        return { rol };
      },
    });
    if (value) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuario.id ? { ...u, rol: value.rol } : u))
      );
    }
  };

  const handleDeleteUsuario = async (usuario) => {
    const confirmed = await Swal.fire({
      title: "¿Eliminar subusuario?",
      text: `Esta acción eliminará a ${usuario.nombre}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e11d48",
    });
    if (confirmed.isConfirmed) {
      setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Subusuarios</h1>
        <Button className="bg-primary" onClick={handleEditUsuario}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Subusuario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subusuarios Registrados</CardTitle>
          <CardDescription>
            Gestiona los usuarios asociados a tu cuenta principal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex flex-col">
              <small className="mb-1 text-muted-foreground">
                Buscar nombre o email
              </small>
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Ingre su búsqueda ..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <small className="mb-1 text-muted-foreground">Rol</small>
              <select
                value={filtroRol}
                onChange={(e) => setFiltroRol(e.target.value)}
                className="border rounded-md p-2 bg-background"
              >
                <option value="Todos">Todos</option>
                {roles.map((rol) => (
                  <option key={rol} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <small className="mb-1 text-muted-foreground">Estado</small>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border rounded-md p-2 bg-background"
              >
                <option value="Todos">Todos</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosFiltrados.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">
                      {usuario.nombre}
                    </TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          usuario.rol === "Administrador"
                            ? "default"
                            : usuario.rol === "Editor"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {usuario.rol}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          usuario.estado === "Activo"
                            ? "outline"
                            : "destructive"
                        }
                        className={`${
                          usuario.estado === "Activo"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {usuario.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>{usuario.ultimoAcceso}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black">
                          <DropdownMenuItem
                            onClick={() => handleEditUsuario(usuario)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleChangeRol(usuario)}
                          >
                            <Lock className="mr-2 h-4 w-4" />
                            <span>Cambiar rol</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Reenviar invitación</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteUsuario(usuario)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
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
