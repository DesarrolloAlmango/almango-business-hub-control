
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
import { Gavel, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
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
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="economic">Resumen Económico</TabsTrigger>
            <TabsTrigger value="subastas">Subastas</TabsTrigger>
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
                  {/* Mock data for active auctions overview */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Remodelación de oficina central</span>
                      <span className="text-xs text-muted-foreground">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Desarrollo aplicación móvil</span>
                      <span className="text-xs text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Mantenimiento sistema HVAC</span>
                      <span className="text-xs text-muted-foreground">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
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
    </DashboardLayout>
  );
}
