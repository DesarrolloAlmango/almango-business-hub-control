
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Filter, Plus, Bell, Users, Calendar, ChevronRight, Star, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SubastasList } from "@/components/subastas/SubastasList";
import { SubastaFilters } from "@/components/subastas/SubastaFilters";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CountdownTimer } from "@/components/subastas/CountdownTimer";
import { Progress } from "@/components/ui/progress";
import { DetalleOferta } from "@/components/subastas/DetalleOferta";

// Mock data para indicadores de ofertas
const OFERTAS_NUEVAS = {
  activas: 5,
  pendientes: 2,
  finalizadas: 0,
  todas: 7,
};

// Mock data para las subastas destacadas con postulantes
const SUBASTAS_DESTACADAS = [
  {
    id: "1",
    titulo: "Remodelación de oficina central",
    estado: "en_postulacion",
    progreso: 70,
    fecha_fin_postulacion: "2025-07-15",
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
    estado: "adjudicada",
    progreso: 45,
    fecha_fin_postulacion: "2025-06-20",
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
  }
];

export default function SubastasIndex() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState("activas");
  const [selectedOferta, setSelectedOferta] = useState<any>(null);
  const [showDetalleOferta, setShowDetalleOferta] = useState(false);
  const [showPostulantes, setShowPostulantes] = useState<string | null>(null);

  const handleVerOferta = (oferta: any) => {
    setSelectedOferta(oferta);
    setShowDetalleOferta(true);
  };

  const togglePostulantes = (subastaId: string) => {
    if (showPostulantes === subastaId) {
      setShowPostulantes(null);
    } else {
      setShowPostulantes(subastaId);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subastas de Servicios</h1>
          <p className="text-muted-foreground">
            Gestione las subastas de servicios, cree nuevas o revise las existentes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </Button>
          <Button asChild>
            <Link to="/subastas/nueva" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Subasta
            </Link>
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filtros</CardTitle>
            <CardDescription>Filtre las subastas según sus necesidades</CardDescription>
          </CardHeader>
          <CardContent>
            <SubastaFilters />
          </CardContent>
        </Card>
      )}

      <div className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900">
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                  <Bell className="h-5 w-5" />
                  <h3 className="font-medium">Ofertas Nuevas</h3>
                </div>
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  {OFERTAS_NUEVAS.todas} Total
                </Badge>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                {OFERTAS_NUEVAS.activas} ofertas nuevas en subastas activas
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900">
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
                  <Users className="h-5 w-5" />
                  <h3 className="font-medium">Postulantes</h3>
                </div>
                <Badge className="bg-green-600 hover:bg-green-700">12 Total</Badge>
              </div>
              <p className="text-sm text-green-700 dark:text-green-400">
                8 postulantes en subastas activas
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900">
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <Calendar className="h-5 w-5" />
                  <h3 className="font-medium">Próximos Cierres</h3>
                </div>
                <Badge className="bg-amber-600 hover:bg-amber-700">3 Subastas</Badge>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                La próxima subasta cierra en 5 días
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Destacados con countdown y postulantes */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Subastas Destacadas</h2>
        <div className="space-y-4">
          {SUBASTAS_DESTACADAS.map((subasta) => (
            <Card key={subasta.id} className="overflow-hidden border-gray-200 hover:border-gray-300 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-9 p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link to={`/subastas/${subasta.id}`} className="text-lg font-medium hover:underline">
                          {subasta.titulo}
                        </Link>
                        <Badge 
                          variant={subasta.estado === "en_postulacion" ? "outline" : "secondary"}
                          className={subasta.estado === "en_postulacion" ? "border-blue-400 text-blue-600" : ""}
                        >
                          {subasta.estado === "en_postulacion" ? "En Postulación" : "Adjudicada"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <CountdownTimer endDate={subasta.fecha_fin_postulacion} variant="compact" />
                        <span className="text-xs text-muted-foreground">
                          ID: {subasta.id}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => togglePostulantes(subasta.id)}
                        className="flex items-center gap-1"
                      >
                        <Users className="h-3.5 w-3.5" />
                        <span>{subasta.postulantes?.length || 0} Postulantes</span>
                        <ChevronRight 
                          className={`h-3.5 w-3.5 transition-transform ${showPostulantes === subasta.id ? "rotate-90" : ""}`}
                        />
                      </Button>
                      <Button size="sm" asChild>
                        <Link to={`/subastas/${subasta.id}`}>
                          Ver Detalles
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progreso general</span>
                      <span className="text-sm text-muted-foreground">{subasta.progreso}%</span>
                    </div>
                    <Progress value={subasta.progreso} className="h-2" />
                  </div>
                  
                  {showPostulantes === subasta.id && (
                    <div className="mt-4 border rounded-md">
                      <div className="bg-muted/50 p-3 border-b">
                        <h4 className="font-medium">Lista de Postulantes</h4>
                      </div>
                      <div className="p-2 divide-y">
                        {subasta.postulantes && subasta.postulantes.map((postulante) => (
                          <div key={postulante.id} className="py-2 px-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{postulante.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{postulante.proveedor}</div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <div className="flex items-center">
                                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-0.5" />
                                      <span>{postulante.rating}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-0.5" />
                                      <span>Entrega: {new Date(postulante.fechaEntrega).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="font-medium">${postulante.monto}</div>
                                  <Badge 
                                    variant={
                                      postulante.estado === "seleccionada" ? "outline" : 
                                      postulante.estado === "pendiente" ? "secondary" : "destructive"
                                    }
                                    className={
                                      postulante.estado === "seleccionada" 
                                        ? "border-green-400 text-green-600" 
                                        : ""
                                    }
                                  >
                                    {postulante.estado === "seleccionada" ? "Seleccionada" : 
                                      postulante.estado === "pendiente" ? "Pendiente" : "Rechazada"}
                                  </Badge>
                                </div>
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleVerOferta(postulante)}
                                >
                                  Ver Oferta
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="lg:col-span-3 bg-muted/30 border-t lg:border-t-0 lg:border-l">
                  <CountdownTimer endDate={subasta.fecha_fin_postulacion} variant="card" className="border-0 rounded-none" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Tabs 
        defaultValue="activas" 
        className="w-full"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-none md:flex">
          <TabsTrigger value="activas" className="relative">
            Activas
            {OFERTAS_NUEVAS.activas > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-600">
                {OFERTAS_NUEVAS.activas}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="pendientes" className="relative">
            Pendientes
            {OFERTAS_NUEVAS.pendientes > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-amber-500 hover:bg-amber-600">
                {OFERTAS_NUEVAS.pendientes}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="finalizadas">Finalizadas</TabsTrigger>
          <TabsTrigger value="todas" className="relative">
            Todas
            {OFERTAS_NUEVAS.todas > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-blue-500 hover:bg-blue-600">
                {OFERTAS_NUEVAS.todas}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="activas">
          <SubastasList estado="activa" onShowPostulantes={handleVerOferta} />
        </TabsContent>
        <TabsContent value="pendientes">
          <SubastasList estado="pendiente" onShowPostulantes={handleVerOferta} />
        </TabsContent>
        <TabsContent value="finalizadas">
          <SubastasList estado="finalizada" onShowPostulantes={handleVerOferta} />
        </TabsContent>
        <TabsContent value="todas">
          <SubastasList estado="todas" onShowPostulantes={handleVerOferta} />
        </TabsContent>
      </Tabs>

      {/* Modal para ver detalle de la oferta */}
      <DetalleOferta 
        oferta={selectedOferta} 
        open={showDetalleOferta} 
        onClose={() => setShowDetalleOferta(false)} 
      />
    </DashboardLayout>
  );
}
