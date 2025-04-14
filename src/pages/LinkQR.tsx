
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Link as LinkIcon, 
  QrCode, 
  Plus, 
  ExternalLink, 
  Copy, 
  Download, 
  BarChart, 
  Eye, 
  Search, 
  Share2, 
  Trash 
} from "lucide-react";

export default function LinkQR() {
  // Dummy data for links and QRs
  const links = [
    { 
      id: 1, 
      nombre: "Servicios de Plomería", 
      tipo: "Link", 
      url: "https://almango.com/s/ABC123", 
      creado: "12/04/2023", 
      usos: 45,
      activo: true
    },
    { 
      id: 2, 
      nombre: "Electricistas Zona Sur", 
      tipo: "QR", 
      url: "https://almango.com/s/DEF456", 
      creado: "15/04/2023", 
      usos: 32,
      activo: true
    },
    { 
      id: 3, 
      nombre: "Mantenimiento AC", 
      tipo: "Link", 
      url: "https://almango.com/s/GHI789", 
      creado: "20/04/2023", 
      usos: 18,
      activo: true
    },
    { 
      id: 4, 
      nombre: "Pintores Residenciales", 
      tipo: "QR", 
      url: "https://almango.com/s/JKL012", 
      creado: "25/04/2023", 
      usos: 27,
      activo: false
    },
    { 
      id: 5, 
      nombre: "Limpieza de Hogar", 
      tipo: "Link", 
      url: "https://almango.com/s/MNO345", 
      creado: "28/04/2023", 
      usos: 53,
      activo: true
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Generación de Links/QR</h1>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" />
          Crear Nuevo
        </Button>
      </div>

      <Tabs defaultValue="todos">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="qr">Códigos QR</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Links y QR Personalizados</CardTitle>
              <CardDescription>
                Genera y gestiona enlaces y códigos QR para que tus clientes puedan crear solicitudes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Buscar por nombre..." 
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead>Usos</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {links.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell className="font-medium">{link.nombre}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {link.tipo === "Link" ? (
                              <LinkIcon className="h-4 w-4 text-blue-500" />
                            ) : (
                              <QrCode className="h-4 w-4 text-purple-500" />
                            )}
                            {link.tipo}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          <div className="flex items-center gap-2">
                            {link.url}
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{link.creado}</TableCell>
                        <TableCell>{link.usos}</TableCell>
                        <TableCell>
                          <Badge variant={link.activo ? "outline" : "destructive"} 
                            className={`${link.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {link.activo ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Abrir</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <BarChart className="h-4 w-4" />
                              <span className="sr-only">Estadísticas</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                              <span className="sr-only">Compartir</span>
                            </Button>
                            {link.tipo === "QR" && (
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Descargar QR</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Uso</CardTitle>
                <CardDescription>
                  Análisis de uso de tus links y códigos QR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Links</div>
                        <div className="text-sm font-medium">116</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-blue-100">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Códigos QR</div>
                        <div className="text-sm font-medium">59</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-purple-100">
                        <div className="h-2 rounded-full bg-purple-500" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Solicitudes Generadas</CardTitle>
                <CardDescription>
                  Solicitudes creadas a través de links y QR
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">Total Solicitudes</span>
                    <span className="text-2xl font-bold">175</span>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Ver todas las solicitudes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Links Personalizados</CardTitle>
              <CardDescription>
                Gestiona tus links de servicio personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido de links...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="qr">
          <Card>
            <CardHeader>
              <CardTitle>Códigos QR</CardTitle>
              <CardDescription>
                Gestiona tus códigos QR personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido de QR...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
