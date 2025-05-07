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

// Mock data para subastas destacadas (resolviendo el error de variable no definida)
const SUBASTAS_DESTACADAS = [
  {
    id: "SUB-2023-001",
    titulo: "Desarrollo de App Móvil Empresarial",
    estado: "en_postulacion",
    fecha_fin_postulacion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días desde ahora
    progreso: 65,
    postulantes: [
      {
        id: "POST-001",
        proveedor: "TechSolutions Inc.",
        avatar: "TS",
        rating: 4.8,
        fechaEntrega: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 12500,
        estado: "pendiente"
      },
      {
        id: "POST-002",
        proveedor: "DevMasters",
        avatar: "DM",
        rating: 4.5,
        fechaEntrega: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 14200,
        estado: "pendiente"
      },
      {
        id: "POST-003",
        proveedor: "AppCreators",
        avatar: "AC",
        rating: 4.9,
        fechaEntrega: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 11800,
        estado: "seleccionada"
      }
    ]
  },
  {
    id: "SUB-2023-002",
    titulo: "Rediseño de Plataforma Web Corporativa",
    estado: "en_postulacion",
    fecha_fin_postulacion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días desde ahora
    progreso: 80,
    postulantes: [
      {
        id: "POST-004",
        proveedor: "WebExperts",
        avatar: "WE",
        rating: 4.7,
        fechaEntrega: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 8500,
        estado: "pendiente"
      },
      {
        id: "POST-005",
        proveedor: "CreativeWeb",
        avatar: "CW",
        rating: 4.3,
        fechaEntrega: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 7800,
        estado: "rechazada"
      }
    ]
  },
  {
    id: "SUB-2023-003",
    titulo: "Implementación de Sistema CRM",
    estado: "adjudicada",
    fecha_fin_postulacion: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
    progreso: 100,
    postulantes: [
      {
        id: "POST-006",
        proveedor: "SystemPro",
        avatar: "SP",
        rating: 5.0,
        fechaEntrega: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 18500,
        estado: "seleccionada"
      },
      {
        id: "POST-007",
        proveedor: "CRMasters",
        avatar: "CR",
        rating: 4.6,
        fechaEntrega: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        monto: 16700,
        estado: "rechazada"
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
            className="flex items-center gap-2 border-[#d6ccc2]" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </Button>
          <Button className="bg-[#f0c14b] hover:bg-[#e5b94b] text-black border-[#a88734]" asChild>
            <Link to="/subastas/nueva" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Subasta
            </Link>
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card className="mb-6 border-[#e6dfd7]">
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
        <div className="amazon-card-info blue">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-800">
                <Bell className="h-5 w-5" />
                <h3 className="font-medium">Ofertas Nuevas</h3>
              </div>
              <Badge variant="blue">
                {OFERTAS_NUEVAS.todas} Total
              </Badge>
            </div>
            <p className="text-sm text-blue-700">
              {OFERTAS_NUEVAS.activas} ofertas nuevas en subastas activas
            </p>
          </div>
        </div>
        
        <div className="amazon-card-info green">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-800">
                <Users className="h-5 w-5" />
                <h3 className="font-medium">Postulantes</h3>
              </div>
              <Badge variant="green">12 Total</Badge>
            </div>
            <p className="text-sm text-green-700">
              8 postulantes en subastas activas
            </p>
          </div>
        </div>
        
        <div className="amazon-card-info amber">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800">
                <Calendar className="h-5 w-5" />
                <h3 className="font-medium">Próximos Cierres</h3>
              </div>
              <Badge variant="amber">3 Subastas</Badge>
            </div>
            <p className="text-sm text-amber-700">
              La próxima subasta cierra en 5 días
            </p>
          </div>
        </div>
      </div>

      {/* Destacados con countdown y postulantes */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Subastas Destacadas</h2>
        <div className="space-y-4">
          {SUBASTAS_DESTACADAS.map((subasta) => (
            <Card key={subasta.id} className="overflow-hidden border-[#e6dfd7] hover:border-[#d6ccc2] transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-9 p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link to={`/subastas/${subasta.id}`} className="text-lg font-medium hover:underline text-[#0066c0]">
                          {subasta.titulo}
                        </Link>
                        <Badge 
                          variant={subasta.estado === "en_postulacion" ? "blue" : "purple"}
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
                        className="flex items-center gap-1 border-[#d6ccc2]"
                      >
                        <Users className="h-3.5 w-3.5" />
                        <span>{subasta.postulantes?.length || 0} Postulantes</span>
                        <ChevronRight 
                          className={`h-3.5 w-3.5 transition-transform ${showPostulantes === subasta.id ? "rotate-90" : ""}`}
                        />
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-[#f0c14b] hover:bg-[#e5b94b] text-black border-[#a88734]" 
                        asChild
                      >
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
                    <div className="mt-4 border rounded-md border-[#e6dfd7]">
                      <div className="bg-[#f7f5f2] p-3 border-b border-[#e6dfd7]">
                        <h4 className="font-medium">Lista de Postulantes</h4>
                      </div>
                      <div className="p-2 divide-y divide-[#e6dfd7]">
                        {subasta.postulantes && subasta.postulantes.map((postulante) => (
                          <div key={postulante.id} className="py-2 px-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 bg-[#f7f5f2] text-gray-700">
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
                                      postulante.estado === "seleccionada" ? "green" : 
                                      postulante.estado === "pendiente" ? "amber" : "destructive"
                                    }
                                  >
                                    {postulante.estado === "seleccionada" ? "Seleccionada" : 
                                      postulante.estado === "pendiente" ? "Pendiente" : "Rechazada"}
                                  </Badge>
                                </div>
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="border-[#d6ccc2]"
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
                
                <div className="lg:col-span-3 bg-[#f7f5f2] border-t lg:border-t-0 lg:border-l border-[#e6dfd7]">
                  <CountdownTimer endDate={subasta.fecha_fin_postulacion} variant="box" className="border-0 rounded-none h-full" />
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
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-none md:flex bg-[#f7f5f2]">
          <TabsTrigger value="activas" className="relative data-[state=active]:bg-[#f0c14b] data-[state=active]:text-black">
            Activas
            {OFERTAS_NUEVAS.activas > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-600">
                {OFERTAS_NUEVAS.activas}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="pendientes" className="relative data-[state=active]:bg-[#f0c14b] data-[state=active]:text-black">
            Pendientes
            {OFERTAS_NUEVAS.pendientes > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-amber-500 hover:bg-amber-600">
                {OFERTAS_NUEVAS.pendientes}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="finalizadas" className="data-[state=active]:bg-[#f0c14b] data-[state=active]:text-black">
            Finalizadas
          </TabsTrigger>
          <TabsTrigger value="todas" className="relative data-[state=active]:bg-[#f0c14b] data-[state=active]:text-black">
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
