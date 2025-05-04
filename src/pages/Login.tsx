
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dialog states
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  
  // Registration states
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  
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
  
  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!recoveryEmail) {
      toast({
        title: "Error",
        description: "Por favor ingrese su correo electrónico",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Mock password recovery
    setTimeout(() => {
      setRecoverySuccess(true);
      setIsLoading(false);
      
      toast({
        title: "Solicitud enviada",
        description: "Se ha enviado un enlace de recuperación a su correo electrónico",
      });
      
      // Reset form after 3 seconds and close dialog
      setTimeout(() => {
        setRecoveryEmail('');
        setRecoverySuccess(false);
        setIsRecoveryOpen(false);
      }, 3000);
    }, 1500);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate
    if (!registerEmail || !registerPassword || !registerConfirmPassword || !registerName) {
      toast({
        title: "Error de registro",
        description: "Por favor complete todos los campos",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Error de registro",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Mock registration
    setTimeout(() => {
      toast({
        title: "Registro exitoso",
        description: "Se ha creado su cuenta exitosamente. Ya puede iniciar sesión.",
      });
      
      setIsLoading(false);
      
      // Close dialog and reset form
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
      setRegisterName('');
      setIsRegisterOpen(false);
    }, 1500);
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
                  <button 
                    type="button"
                    onClick={() => setIsRecoveryOpen(true)} 
                    className="text-xs text-[hsl(var(--primary))] hover:underline"
                  >
                    ¿Olvidó su contraseña?
                  </button>
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
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
              <div className="text-center w-full">
                <span className="text-sm text-muted-foreground">
                  ¿No tiene una cuenta?{" "}
                  <button 
                    type="button" 
                    onClick={() => setIsRegisterOpen(true)}
                    className="text-[hsl(var(--primary))] hover:underline"
                  >
                    Registrarse
                  </button>
                </span>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      {/* Password Recovery Dialog */}
      <Dialog open={isRecoveryOpen} onOpenChange={setIsRecoveryOpen}>
        <DialogContent className="white-on-black-card">
          <DialogHeader>
            <DialogTitle>Recuperar Contraseña</DialogTitle>
            <DialogDescription>
              Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.
            </DialogDescription>
          </DialogHeader>
          
          {recoverySuccess ? (
            <Alert className="bg-primary/20 border border-primary mt-2">
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Revise su bandeja de entrada. Hemos enviado un enlace de recuperación a {recoveryEmail}
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleRecovery} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recoveryEmail">Correo Electrónico</Label>
                <Input
                  id="recoveryEmail"
                  type="email"
                  placeholder="correo@almango.com.uy"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="white-on-black-input"
                />
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRecoveryOpen(false)}
                  className="mr-2"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar Enlace"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Registration Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="white-on-black-card">
          <DialogHeader>
            <DialogTitle>Registrarse</DialogTitle>
            <DialogDescription>
              Complete el formulario para crear una nueva cuenta
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="registerName">Nombre Completo</Label>
              <Input
                id="registerName"
                type="text"
                placeholder="Juan Pérez"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="white-on-black-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registerEmail">Correo Electrónico</Label>
              <Input
                id="registerEmail"
                type="email"
                placeholder="correo@almango.com.uy"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="white-on-black-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registerPassword">Contraseña</Label>
              <Input
                id="registerPassword"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="white-on-black-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registerConfirmPassword">Confirmar Contraseña</Label>
              <Input
                id="registerConfirmPassword"
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                className="white-on-black-input"
              />
            </div>
            
            <Alert className="bg-accent/10 border border-accent">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Al registrarse, acepta los términos y condiciones de servicio de Almango Business Hub.
              </AlertDescription>
            </Alert>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsRegisterOpen(false)}
                className="mr-2"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Registrando..." : "Crear Cuenta"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
