import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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

// Mock data for active auctions overview
const SUBASTAS_ACTIVAS_MOCK = [
  {
    id: "1",
    titulo: "Remodelación de oficina central",
    progreso: 70,
    ofertas_total: 5,
    ofertas_nuevas: 2,
    en_postulacion: true,
    postulantes: [
      {
        id: "p1",
        proveedor: "Constructora ABC",
        avatar: "CA",
        monto: 15800,
        fechaEntrega: "2025-10-01",
        rating: 4.7,
        estado: "pendiente",
        propuesta: "Ofrecemos un servicio rápido con materiales de calidad superior y acabados premium.",
        incluye_capacitacion: true,
        incluye_garantia: true,
        incluye_postventa: true
      },
      {
        id: "p2",
        proveedor: "Soluciones Integrales",
        avatar: "SI",
        monto: 14200,
        fechaEntrega: "2025-10-10",
        rating: 4.9,
        estado: "pendiente",
        propuesta: "Nuestra propuesta incluye diseño personalizado con materiales ecológicos.",
        incluye_capacitacion: true,
        incluye_garantia: false,
        incluye_postventa: true
      }
    ]
  },
  {
    id: "2",
    titulo: "Desarrollo aplicación móvil",
    progreso: 45,
    ofertas_total: 3,
    ofertas_nuevas: 0,
    en_postulacion: false,
    postulantes: [
      {
        id: "p3",
        proveedor: "Tech Solutions",
        avatar: "TS",
        monto: 22500,
        fechaEntrega: "2025-08-15",
        rating: 4.5,
        estado: "seleccionada",
        propuesta: "Ofrecemos desarrollo ágil con actualizaciones semanales y soporte técnico.",
        incluye_capacitacion: true,
        incluye_garantia: true,
        incluye_postventa: true
      }
    ]
  },
  {
    id: "3",
    titulo: "Mantenimiento sistema HVAC",
    progreso: 20,
    ofertas_total: 1,
    ofertas_nuevas: 0,
    en_postulacion: false,
    postulantes: [
      {
        id: "p4",
        proveedor: "Servicios Técnicos",
        avatar: "ST",
        monto: 8900,
        fechaEntrega: "2025-07-30",
        rating: 4.2,
        estado: "rechazada",
        propuesta: "Servicio completo de revisión y mantenimiento con piezas originales.",
        incluye_capacitacion: false,
        incluye_garantia: true,
        incluye_postventa: false
      }
    ]
  },
];

export default function Dashboard() {
  const [selectedOferta, setSelectedOferta] = useState<any>(null);
  const [showDetalleOferta, setShowDetalleOferta] = useState(false);

  const handleVerOferta = (oferta: any) => {
    setSelectedOferta(oferta);
    setShowDetalleOferta(true);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Última actualización: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="subastas">Subastas</TabsTrigger>            
            <TabsTrigger value="economic">Resumen Económico</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab - All sections */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Gavel className="mr-2 h-5 w-5" />
                      Subastas Activas
                    </CardTitle>
                    <CardDescription>Subastas en curso y su progreso</CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/subastas/nueva" className="flex items-center gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>Nueva Subasta</span>
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Subastas with indicators for offers */}
                  {SUBASTAS_ACTIVAS_MOCK.map((subasta) => (
                    <div key={subasta.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="text-sm font-medium">{subasta.titulo}</span>
                          <div className="flex gap-1">
                            {subasta.en_postulacion && (
                              <Badge variant="outline" className="text-xs py-0 px-2 h-5">
                                En postulación
                              </Badge>
                            )}
                            <Badge 
                              className="bg-blue-500 hover:bg-blue-600 text-xs py-0 px-2 h-5" 
                              title="Total ofertas"
                            >
                              {subasta.ofertas_total} ofertas
                            </Badge>
                            {subasta.ofertas_nuevas > 0 && (
                              <Badge 
                                className="bg-green-500 hover:bg-green-600 text-xs py-0 px-2 h-5 flex items-center"
                              >
                                <Bell className="h-3 w-3 mr-1" />
                                {subasta.ofertas_nuevas} nuevas
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{subasta.progreso}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Progress value={subasta.progreso} className="h-2" />
                        </div>
                        <Button variant="ghost" size="sm" asChild className="h-6 px-2 text-xs">
                          <Link to={`/subastas/${subasta.id}`}>
                            Ver
                          </Link>
                        </Button>
                      </div>
                      
                      {/* Mostrar postulantes si hay ofertas */}
                      {subasta.postulantes && subasta.postulantes.length > 0 && (
                        <div className="mt-2 bg-muted/20 p-2 rounded-md">
                          <div className="text-xs font-medium mb-1">Postulantes:</div>
                          <div className="space-y-1">
                            {subasta.postulantes.map((postulante) => (
                              <div key={postulante.id} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">{postulante.proveedor}</span>
                                  <Badge variant={
                                    postulante.estado === "seleccionada" ? "outline" :
                                    postulante.estado === "pendiente" ? "secondary" : "destructive"
                                  } className="text-xs py-0 h-4">
                                    {postulante.estado === "seleccionada" ? "Seleccionada" : 
                                     postulante.estado === "pendiente" ? "Pendiente" : "Rechazada"}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">${postulante.monto}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0" 
                                    onClick={() => handleVerOferta(postulante)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="ml-auto px-0">
                  <Link to="/subastas">
                    Ver todas las subastas
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <ServiceStatusGrid />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FeedbackList />
              <Card>
                <CardHeader>
                  <CardTitle>Resumen Rápido</CardTitle>
                  <CardDescription>Indicadores clave de rendimiento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Total Servicios</p>
                        <p className="text-3xl font-bold">346</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Ingresos Totales</p>
                        <p className="text-3xl font-bold">$407,500</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Clientes Activos</p>
                        <p className="text-3xl font-bold">124</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Satisfacción</p>
                        <p className="text-3xl font-bold">4.8/5</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-3">Rendimiento Mensual</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>Servicios Completados</div>
                          <div className="font-medium">287</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-primary/20">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center justify-between text-sm">
                          <div>Tasa de Conversión</div>
                          <div className="font-medium">72%</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary/20">
                          <div className="h-2 rounded-full bg-secondary" style={{ width: "72%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <EconomicSummary />
          </TabsContent>
          
          {/* Services Tab */}
          <TabsContent value="services">
            <ServiceStatusGrid />
          </TabsContent>
          
          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <FeedbackList />
          </TabsContent>
          
          {/* Economic Summary Tab */}
          <TabsContent value="economic">
            <EconomicSummary />
          </TabsContent>

          {/* Subastas Tab */}
          <TabsContent value="subastas">
            <SubastasActivas />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal para ver detalle de la oferta */}
      <DetalleOferta 
        oferta={selectedOferta} 
        open={showDetalleOferta} 
        onClose={() => setShowDetalleOferta(false)} 
      />
    </DashboardLayout>
  );
}
