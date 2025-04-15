
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error de inicio de sesión",
        description: "Por favor ingrese su correo y contraseña",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Mock login - in a real app, this would call an API
    setTimeout(() => {
      // Store login state in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a Almango Business Hub",
      });
      
      setIsLoading(false);
      navigate('/'); // Redirect to home/dashboard
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--sidebar-background))] p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="/lovable-uploads/bbb7cf38-3978-487f-8d60-82f4e16d39c6.png" 
              alt="Almango Logo" 
              className="h-12 w-12"
            />
            <span className="text-3xl font-bold text-white">
              <span className="text-[hsl(var(--primary))]">Almango</span> Business
            </span>
          </div>
          <p className="text-[hsl(var(--secondary))]">
            Inicie sesión para acceder a su cuenta
          </p>
        </div>

        <Card className="white-on-black-card">
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingrese sus credenciales para continuar
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@almango.com.uy"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="white-on-black-input"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <a 
                    href="#" 
                    className="text-xs text-[hsl(var(--primary))] hover:underline"
                  >
                    ¿Olvidó su contraseña?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="white-on-black-input"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
