
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
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

// Import new error pages
import NotFound404 from "./pages/errors/NotFound404";
import Unauthorized401 from "./pages/errors/Unauthorized401";
import Forbidden403 from "./pages/errors/Forbidden403";
import ServerError500 from "./pages/errors/ServerError500";
import GatewayTimeout504 from "./pages/errors/GatewayTimeout504";

const queryClient = new QueryClient();

// Auth check component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      setIsCheckingAuth(false);
    };
    
    // Small delay to prevent flash of login screen
    setTimeout(checkAuth, 100);
  }, []);
  
  if (isCheckingAuth) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/subusuarios" element={<ProtectedRoute><SubUsuarios /></ProtectedRoute>} />
              <Route path="/solicitudes" element={<ProtectedRoute><Solicitudes /></ProtectedRoute>} />
              <Route path="/links-qr" element={<ProtectedRoute><LinkQR /></ProtectedRoute>} />
              <Route path="/visualizacion-solicitudes" element={<ProtectedRoute><VisualizacionSolicitudes /></ProtectedRoute>} />
              <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
              <Route path="/reportes" element={<ProtectedRoute><Reportes /></ProtectedRoute>} />
              <Route path="/lista-negra" element={<ProtectedRoute><ListaNegra /></ProtectedRoute>} />
              <Route path="/documentacion" element={<ProtectedRoute><Documentacion /></ProtectedRoute>} />
              <Route path="/incidencias" element={<ProtectedRoute><Incidencias /></ProtectedRoute>} />
              <Route path="/estadisticas" element={<ProtectedRoute><Estadisticas /></ProtectedRoute>} />
              <Route path="/calendario" element={<ProtectedRoute><Calendario /></ProtectedRoute>} />
              <Route path="/pagos" element={<ProtectedRoute><Pagos /></ProtectedRoute>} />
              <Route path="/campanas" element={<ProtectedRoute><Campanas /></ProtectedRoute>} />
              <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
              <Route path="/comunicacion" element={<ProtectedRoute><Comunicacion /></ProtectedRoute>} />
              <Route path="/developer" element={<ProtectedRoute><DeveloperEnhanced /></ProtectedRoute>} />
              
              {/* Error Pages */}
              <Route path="/error/401" element={<Unauthorized401 />} />
              <Route path="/error/403" element={<Forbidden403 />} />
              <Route path="/error/404" element={<NotFound404 />} />
              <Route path="/error/500" element={<ServerError500 />} />
              <Route path="/error/504" element={<GatewayTimeout504 />} />
              
              {/* Use the new 404 page */}
              <Route path="*" element={<NotFound404 />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
