
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function GatewayTimeout504() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--sidebar-background))] p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto bg-secondary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-secondary" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">504</h1>
        <h2 className="text-xl text-[hsl(var(--primary))] mb-4">Tiempo de Espera Agotado</h2>
        
        <p className="text-white/70 mb-6">
          El servidor tardó demasiado en responder. Esto puede deberse a problemas de conectividad o alta carga en nuestros servicios.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => window.location.reload()} className="btn-primary">
            Reintentar
          </Button>
          <Button variant="outline" onClick={() => navigate("/")} className="border-white/20 text-white hover:text-white">
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
