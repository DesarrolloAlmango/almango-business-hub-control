
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gavel, Plus, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SubastasList } from "@/components/subastas/SubastasList";
import { SubastaFilters } from "@/components/subastas/SubastaFilters";

export default function SubastasIndex() {
  const [showFilters, setShowFilters] = useState(false);

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

      <Tabs defaultValue="activas" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-none md:flex">
          <TabsTrigger value="activas">Activas</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="finalizadas">Finalizadas</TabsTrigger>
          <TabsTrigger value="todas">Todas</TabsTrigger>
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
