
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gavel, Plus, Filter, Bell } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SubastasList } from "@/components/subastas/SubastasList";
import { SubastaFilters } from "@/components/subastas/SubastaFilters";
import { Badge } from "@/components/ui/badge";

// Mock data para indicadores de ofertas
const OFERTAS_NUEVAS = {
  activas: 5,
  pendientes: 2,
  finalizadas: 0,
  todas: 7,
};

export default function SubastasIndex() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState("activas");

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
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre las subastas según sus necesidades</CardDescription>
          </CardHeader>
          <CardContent>
            <SubastaFilters />
          </CardContent>
        </Card>
      )}

      <div className="mb-4">
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h3 className="font-medium mb-1 text-blue-800 dark:text-blue-300">Ofertas Recibidas</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Hay un total de {OFERTAS_NUEVAS.todas} ofertas para sus subastas activas en postulación
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  {OFERTAS_NUEVAS.todas} Ofertas totales
                </Badge>
                {OFERTAS_NUEVAS.activas > 0 && (
                  <Badge className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
                    <Bell className="h-3 w-3" />
                    {OFERTAS_NUEVAS.activas} nuevas ofertas
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
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
          <SubastasList estado="activa" />
        </TabsContent>
        <TabsContent value="pendientes">
          <SubastasList estado="pendiente" />
        </TabsContent>
        <TabsContent value="finalizadas">
          <SubastasList estado="finalizada" />
        </TabsContent>
        <TabsContent value="todas">
          <SubastasList estado="todas" />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
