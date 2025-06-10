import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
// We're not using ThemeProvider from utils/theme-provider anymore
// import { ThemeProvider } from "@/utils/theme-provider";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SubUsuarios from "./pages/SubUsuarios";
import Solicitudes from "./pages/Solicitudes";
import LinkQR from "./pages/LinkQR";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import DeveloperEnhanced from "./pages/DeveloperEnhanced";
import DocumentacionGestion from "./pages/DocumentacionGestion";
import ReportesFeedback from "./pages/reportes/ReportesFeedback";
import {
  VisualizacionSolicitudes,
  Reportes,
  ListaNegra,
  Documentacion,
  Incidencias,
  Estadisticas,
  Calendario,
  Pagos,
  Campanas,
  Clientes,
  Comunicacion,
} from "./pages/PlaceholderRoutes";
import RegisterPage from "./pages/RegisterPage";

import SolicitudesPage from "./pages/newDashboard2";

// Import Subastas pages
import SubastasIndex from "./pages/subastas/SubastasIndex";
import NuevaSubasta from "./pages/subastas/NuevaSubasta";
import DetalleSubasta from "./pages/subastas/DetalleSubasta";

// Import error pages
import NotFound from "./pages/NotFound";
import NotFound404 from "./pages/errors/NotFound404";
import Unauthorized401 from "./pages/errors/Unauthorized401";
import Forbidden403 from "./pages/errors/Forbidden403";
import ServerError500 from "./pages/errors/ServerError500";
import GatewayTimeout504 from "./pages/errors/GatewayTimeout504";
import EditarSubasta from "./pages/subastas/EditarSubasta";
import ProyectosEnCurso from "./pages/subastas/ProyectosEnCurso";
import { GoogleCalendarEmbed } from "./components/GoogleCalendarEmbed";

const queryClient = new QueryClient();

// Auth check component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <SubastasIndex />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subusuarios"
              element={
                <ProtectedRoute>
                  <SubUsuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/solicitudes"
              element={
                <ProtectedRoute>
                  <Solicitudes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/links-qr"
              element={
                <ProtectedRoute>
                  <LinkQR />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualizacion-solicitudes"
              element={
                <ProtectedRoute>
                  <VisualizacionSolicitudes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reportes"
              element={
                <ProtectedRoute>
                  <ProyectosEnCurso />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reportes/feedback"
              element={
                <ProtectedRoute>
                  <ReportesFeedback />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lista-negra"
              element={
                <ProtectedRoute>
                  <ListaNegra />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documentacion"
              element={
                <ProtectedRoute>
                  <Documentacion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documentacion-gestion"
              element={
                <ProtectedRoute>
                  <DocumentacionGestion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/incidencias"
              element={
                <ProtectedRoute>
                  <Incidencias />
                </ProtectedRoute>
              }
            />
            <Route
              path="/estadisticas"
              element={
                <ProtectedRoute>
                  <Estadisticas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendario"
              element={
                <ProtectedRoute>
                  <GoogleCalendarEmbed calendarId="ignaciotorresmayobre8@gmail.com" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pagos"
              element={
                <ProtectedRoute>
                  <Pagos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campanas"
              element={
                <ProtectedRoute>
                  <Campanas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <ProtectedRoute>
                  <Clientes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/comunicacion"
              element={
                <ProtectedRoute>
                  <Comunicacion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/developer"
              element={
                <ProtectedRoute>
                  <DeveloperEnhanced />
                </ProtectedRoute>
              }
            />
            <Route
              path="/newDashboard"
              element={
                <ProtectedRoute>
                  <SolicitudesPage />
                </ProtectedRoute>
              }
            />
            {/* Subastas Routes */}
            <Route
              path="/subastas"
              element={
                <ProtectedRoute>
                  <SubastasIndex />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subastas/nueva"
              element={
                <ProtectedRoute>
                  <NuevaSubasta />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subastas/:id"
              element={
                <ProtectedRoute>
                  <DetalleSubasta />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subastas/editar/:id"
              element={
                <ProtectedRoute>
                  <EditarSubasta />
                </ProtectedRoute>
              }
            />

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
    </QueryClientProvider>
  );
};

export default App;
