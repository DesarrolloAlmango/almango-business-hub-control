
import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
  Mail 
} from "lucide-react";

export default function SubUsuarios() {
  // Dummy data for subusuarios
  const usuarios = [
    { 
      id: 1, 
      nombre: "María González", 
      email: "maria@empresa.com", 
      rol: "Administrador", 
      estado: "Activo",
      ultimoAcceso: "Hoy, 09:45 AM"
    },
    { 
      id: 2, 
      nombre: "Carlos Pérez", 
      email: "carlos@empresa.com", 
      rol: "Editor", 
      estado: "Activo",
      ultimoAcceso: "Ayer, 14:30 PM"
    },
    { 
      id: 3, 
      nombre: "Ana Rodríguez", 
      email: "ana@empresa.com", 
      rol: "Visualizador", 
      estado: "Inactivo",
      ultimoAcceso: "Hace 1 semana"
    },
    { 
      id: 4, 
      nombre: "Juan López", 
      email: "juan@empresa.com", 
      rol: "Editor", 
      estado: "Activo",
      ultimoAcceso: "Hoy, 11:25 AM"
    },
    { 
      id: 5, 
      nombre: "Laura Sánchez", 
      email: "laura@empresa.com", 
      rol: "Visualizador", 
      estado: "Activo",
      ultimoAcceso: "Hace 3 días"
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Subusuarios</h1>
        <Button className="bg-primary">
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
          <div className="flex items-center mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Buscar subusuario..." 
                className="pl-8"
              />
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
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">{usuario.nombre}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                      <Badge variant={usuario.rol === "Administrador" ? "default" : 
                              usuario.rol === "Editor" ? "secondary" : "outline"}>
                        {usuario.rol}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={usuario.estado === "Activo" ? "outline" : "destructive"} 
                        className={`${usuario.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
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
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Lock className="mr-2 h-4 w-4" />
                            <span>Cambiar permisos</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Reenviar invitación</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
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
    </DashboardLayout>
  );
}
