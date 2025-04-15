
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SubUsuarios from "./pages/SubUsuarios";
import Solicitudes from "./pages/Solicitudes";
import LinkQR from "./pages/LinkQR";
import DeveloperEnhanced from "./pages/DeveloperEnhanced"; // Use our enhanced developer page
import {
  VisualizacionSolicitudes,
  Feedback,
  Reportes,
  ListaNegra,
  Documentacion,
  Incidencias,
  Estadisticas,
  Calendario,
  Pagos,
  Campanas,
  Clientes,
  Comunicacion
} from "./pages/PlaceholderRoutes";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/use-theme";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subusuarios" element={<SubUsuarios />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/links-qr" element={<LinkQR />} />
            <Route path="/visualizacion-solicitudes" element={<VisualizacionSolicitudes />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/lista-negra" element={<ListaNegra />} />
            <Route path="/documentacion" element={<Documentacion />} />
            <Route path="/incidencias" element={<Incidencias />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/campanas" element={<Campanas />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/comunicacion" element={<Comunicacion />} />
            <Route path="/developer" element={<DeveloperEnhanced />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
