
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Clock, DollarSign, Package, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { DetalleTrabajos } from "@/components/subastas/DetalleTrabajos";
import { ComentariosSubasta } from "@/components/subastas/ComentariosSubasta";
import { OfertasSubasta } from "@/components/subastas/OfertasSubasta";
import { ProgresoSubasta } from "@/components/subastas/ProgresoSubasta";
import { EvidenciasTrabajos } from "@/components/subastas/EvidenciasTrabajos";
import { useState, useEffect } from "react";

// Mock data - en una implementación real, esto vendría de una API
const MOCK_SUBASTA = {
  id: "1",
  titulo: "Remodelación de oficina central",
  descripcion: "Proyecto de remodelación completa de la oficina central incluyendo pintura, instalación eléctrica y mobiliario",
  tipo_precio: "fijo",
  precio_base: 15000,
  fecha_fin_postulacion: "2025-07-15",
  fecha_entrega: "2025-09-30",
  incluye_materiales: true,
  incluye_bonificacion: true,
  detalle_bonificacion: "Bonificación del 5% si se entrega antes de la fecha acordada",
  estado: "en_postulacion",
  fecha_creacion: "2025-05-01",
  trabajos: [
    { id: "t1", descripcion: "Pintura completa de oficina", completado: false },
    { id: "t2", descripcion: "Renovación de sistema eléctrico", completado: false },
    { id: "t3", descripcion: "Instalación de mobiliario", completado: false }
  ]
};

export default function DetalleSubasta() {
  const { id } = useParams<{ id: string }>();
  const [subasta, setSubasta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulamos una carga de datos
    setLoading(true);
    setTimeout(() => {
      setSubasta(MOCK_SUBASTA);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-center">
            <p>Cargando detalles de la subasta...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!subasta) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Subasta no encontrada</h2>
            <p className="text-muted-foreground mb-4">No pudimos encontrar la subasta solicitada</p>
            <Button asChild>
              <Link to="/subastas">Volver a Subastas</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  const getBadgeVariant = (estado: string) => {
    switch(estado) {
      case "borrador": return "secondary";
      case "publicada": return "default";
      case "en_revision": return "outline";
      case "en_postulacion": return "blue";
      case "adjudicada": return "purple";
      case "en_progreso": return "yellow";
      case "finalizada": return "green";
      default: return "default";
    }
  };
  
  const getEstadoText = (estado: string) => {
    switch(estado) {
      case "borrador": return "Borrador";
      case "publicada": return "Publicada";
      case "en_revision": return "En Revisión";
      case "en_postulacion": return "En Postulación";
      case "adjudicada": return "Adjudicada";
      case "en_progreso": return "En Progreso";
      case "finalizada": return "Finalizada";
      default: return estado;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/subastas" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{subasta.titulo}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={getBadgeVariant(subasta.estado) as any}>{getEstadoText(subasta.estado)}</Badge>
              <span className="text-muted-foreground text-sm">ID: {id}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">Editar</Button>
          <Button variant="default">Cambiar Estado</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Detalles de la Subasta</CardTitle>
              <CardDescription>Información general sobre esta subasta de servicios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Descripción</h3>
                  <p className="text-muted-foreground mt-1">{subasta.descripcion}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Tipo de Precio</h4>
                      <p className="text-muted-foreground">
                        {subasta.tipo_precio === "fijo" ? "Precio Fijo" : "Mejor Oferta"}
                        {subasta.tipo_precio === "fijo" && subasta.precio_base && (
                          <span className="font-semibold ml-2">${subasta.precio_base}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Fecha de Entrega</h4>
                      <p className="text-muted-foreground">
                        {new Date(subasta.fecha_entrega).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Fin de Postulación</h4>
                      <p className="text-muted-foreground">
                        {new Date(subasta.fecha_fin_postulacion).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Materiales</h4>
                      <p className="text-muted-foreground">
                        {subasta.incluye_materiales ? "Incluidos" : "No incluidos"}
                      </p>
                    </div>
                  </div>
                </div>
                
                {subasta.incluye_bonificacion && (
                  <div className="flex items-start gap-2 border-t pt-4">
                    <Star className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Bonificación</h4>
                      <p className="text-muted-foreground">{subasta.detalle_bonificacion}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="trabajos" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trabajos">Trabajos</TabsTrigger>
              <TabsTrigger value="progreso">Progreso</TabsTrigger>
              <TabsTrigger value="ofertas">Ofertas</TabsTrigger>
              <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
            </TabsList>
            <TabsContent value="trabajos">
              <DetalleTrabajos trabajos={subasta.trabajos} />
            </TabsContent>
            <TabsContent value="progreso">
              <ProgresoSubasta id={subasta.id} />
            </TabsContent>
            <TabsContent value="ofertas">
              <OfertasSubasta id={subasta.id} />
            </TabsContent>
            <TabsContent value="comentarios">
              <ComentariosSubasta id={subasta.id} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Evidencias</CardTitle>
              <CardDescription>Fotografías y videos del trabajo</CardDescription>
            </CardHeader>
            <CardContent>
              <EvidenciasTrabajos id={subasta.id} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>Evaluaciones sobre los postulantes</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                No hay feedback disponible para esta subasta
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" disabled>
                Añadir Feedback
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
