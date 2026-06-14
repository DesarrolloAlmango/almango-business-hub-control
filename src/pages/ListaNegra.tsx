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
import { Ban, Search, Edit, Trash, Check, MoreHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ListaNegra() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [entries, setEntries] = useState([
    {
      id: 1,
      proveedor: "ACME S.A.",
      motivo: "Entregas defectuosas",
      estado: "Pendiente",
      fecha: "2025-07-01",
    },
    {
      id: 2,
      proveedor: "Global Foods",
      motivo: "Incumplimiento de pagos",
      estado: "Activo",
      fecha: "2025-06-15",
    },
  ]);

  const filtered = useMemo(
    () =>
      entries.filter((e) => {
        const textMatch = `${e.proveedor}${e.motivo}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const statusMatch =
          statusFilter === "Todos" || e.estado === statusFilter;
        return textMatch && statusMatch;
      }),
    [entries, search, statusFilter]
  );

  const handleAdd = () => {
    Swal.fire({
      title: "Nuevo proveedor en lista negra",
      html: `
      <input id="swal-proveedor" class="swal2-input" placeholder="Proveedor" />
      <input id="swal-motivo"   class="swal2-input" placeholder="Motivo" />
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      preConfirm: () => {
        const proveedor = (
          document.getElementById("swal-proveedor") as HTMLInputElement
        ).value.trim();
        const motivo = (
          document.getElementById("swal-motivo") as HTMLInputElement
        ).value.trim();
        if (!proveedor || !motivo) {
          Swal.showValidationMessage("Completá todos los campos");
          return;
        }
        return { proveedor, motivo };
      },
    }).then((r) => {
      if (r.isConfirmed && r.value) {
        const { proveedor, motivo } = r.value;
        const nuevo = {
          id: Date.now(),
          proveedor,
          motivo,
          estado: "Pendiente",
          fecha: new Date().toISOString().slice(0, 10),
        };
        setEntries((prev) => [...prev, nuevo]);
      }
    });
  };
  const handleEdit = (entry) => {
    Swal.fire({
      title: "Editar proveedor",
      html: `
      <input id="swal-proveedor" class="swal2-input" placeholder="Proveedor" value="${entry.proveedor}" />
      <input id="swal-motivo"   class="swal2-input" placeholder="Motivo"    value="${entry.motivo}" />
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      preConfirm: () => {
        const proveedor = (
          document.getElementById("swal-proveedor") as HTMLInputElement
        ).value.trim();
        const motivo = (
          document.getElementById("swal-motivo") as HTMLInputElement
        ).value.trim();
        if (!proveedor || !motivo) {
          Swal.showValidationMessage("Completá todos los campos");
          return;
        }
        return { proveedor, motivo };
      },
    }).then((r) => {
      if (r.isConfirmed && r.value) {
        const { proveedor, motivo } = r.value;
        setEntries((prev) =>
          prev.map((p) => (p.id === entry.id ? { ...p, proveedor, motivo } : p))
        );
      }
    });
  };
  const handleApprove = (e) => {
    Swal.fire({
      title: "Activar bloqueo?",
      showCancelButton: true,
      confirmButtonText: "Sí",
    }).then((r) => {
      if (r.isConfirmed) {
        setEntries((prev) =>
          prev.map((p) => (p.id === e.id ? { ...p, estado: "Activo" } : p))
        );
      }
    });
  };
  const handleDisable = (e) => {
    Swal.fire({
      title: "Deshabilitar bloqueo?",
      showCancelButton: true,
      confirmButtonText: "Sí, deshabilitar",
    }).then((r) => {
      if (r.isConfirmed) {
        setEntries((prev) =>
          prev.map((p) => (p.id === e.id ? { ...p, estado: "Pendiente" } : p))
        );
      }
    });
  };

  const handleDelete = (e) => {
    Swal.fire({
      title: "Eliminar entrada?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#ef4444",
    }).then((r) => {
      if (r.isConfirmed) {
        setEntries((prev) => prev.filter((p) => p.id !== e.id));
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Lista Negra de Proveedores</h1>
        <Button className="bg-primary" onClick={handleAdd}>
          <Ban className="mr-2 h-4 w-4" />
          Nuevo Registro
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proveedores Restringidos</CardTitle>
          <CardDescription>
            Solicitá y gestioná bloqueos de proveedores con incidencias.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex flex-col">
              <small className="mb-1 text-muted-foreground">
                Buscar proveedor o motivo
              </small>
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Ingresá tu búsqueda ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <small className="mb-1 text-muted-foreground">Estado</small>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-md p-2 bg-background"
              >
                <option value="Todos">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Activo">Activo</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.proveedor}
                    </TableCell>
                    <TableCell>{item.motivo}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.estado === "Activo" ? "default" : "secondary"
                        }
                        className={
                          item.estado === "Activo"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {item.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.fecha}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          {item.estado === "Pendiente" && (
                            <DropdownMenuItem
                              onClick={() => handleApprove(item)}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              <span>Activar bloqueo</span>
                            </DropdownMenuItem>
                          )}
                          {item.estado === "Activo" && (
                            <DropdownMenuItem
                              onClick={() => handleDisable(item)}
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              <span>Deshabilitar bloqueo</span>
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(item)}
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
