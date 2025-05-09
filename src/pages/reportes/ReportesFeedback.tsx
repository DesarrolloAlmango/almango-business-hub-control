
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FeedbackList } from "@/components/dashboard/FeedbackList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Star } from "lucide-react";

export default function ReportesFeedback() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Seguimiento de Obras</h1>
      </div>

      <Tabs defaultValue="feedback" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">
            <BarChart className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <Star className="h-4 w-4 mr-2" />
            Feedback y Evaluaciones
          </TabsTrigger>
          <TabsTrigger value="estadisticas">
            <LineChart className="h-4 w-4 mr-2" />
            Estadísticas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard de Seguimiento</CardTitle>
              <CardDescription>Vista general del seguimiento de obras</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Aquí se mostrará el dashboard de seguimiento de obras.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <FeedbackList />
        </TabsContent>
        
        <TabsContent value="estadisticas">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Seguimiento</CardTitle>
              <CardDescription>Análisis detallado de las obras</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Aquí se mostrarán estadísticas detalladas sobre el seguimiento de obras.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
