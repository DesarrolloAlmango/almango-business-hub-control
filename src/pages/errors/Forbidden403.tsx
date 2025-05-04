
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function Forbidden403() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--sidebar-background))] p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto bg-destructive/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">403</h1>
        <h2 className="text-xl text-[hsl(var(--primary))] mb-4">Acceso Prohibido</h2>
        
        <p className="text-white/70 mb-6">
          No tiene permisos suficientes para acceder a esta página o recurso solicitado.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate("/")} className="btn-primary">
            Volver al Dashboard
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()} className="border-white/20 text-white hover:text-white">
            Reintentar
          </Button>
        </div>
      </div>
    </div>
  );
}
