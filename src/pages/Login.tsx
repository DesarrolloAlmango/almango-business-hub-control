import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Dialog states
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  // Registration states
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

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
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a Almango Business Hub",
      });

      setIsLoading(false);
      navigate("/"); // Redirect to home/dashboard
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
        description:
          "Se ha enviado un enlace de recuperación a su correo electrónico",
      });

      // Reset form after 3 seconds and close dialog
      setTimeout(() => {
        setRecoveryEmail("");
        setRecoverySuccess(false);
        setIsRecoveryOpen(false);
      }, 3000);
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate
    if (
      !registerEmail ||
      !registerPassword ||
      !registerConfirmPassword ||
      !registerName
    ) {
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
        description:
          "Se ha creado su cuenta exitosamente. Ya puede iniciar sesión.",
      });

      setIsLoading(false);

      // Close dialog and reset form
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
      setRegisterName("");
      setIsRegisterOpen(false);
    }, 1500);
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col lg:flex-row bg-cover bg-center"
      style={{ backgroundImage: "url(/lovable-uploads/header-almango1.jpg)" }}
    >
      <div className="flex min-h-screen w-full items-center justify-center px-4 py-10 sm:p-6 lg:min-h-0 lg:w-1/2">
        <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-2xl">
          <Card className="bg-transparent shadow-none border-none rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-black">
                Iniciar sesión
              </CardTitle>
              <CardDescription className="text-gray-600">
                Complete con sus datos para continuar
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-800">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="bg-white text-black border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-800">
                      Contraseña
                    </Label>
                    <button
                      type="button"
                      onClick={() => setIsRecoveryOpen(true)}
                      className="text-sm font-medium text-orange-600 hover:underline focus:outline-none rounded-lg"
                      style={{ color: "#ff8800" }}
                    >
                      ¿Olvidó su contraseña?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="bg-white text-black border-gray-300"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    ¿Primera vez aquí?{" "}
                    <button
                      type="button"
                      onClick={() => setIsRegisterOpen(true)}
                      className="text-orange-600 hover:underline font-medium rounded-lg"
                      style={{ color: "#ff8800" }}
                    >
                      Crear cuenta
                    </button>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 items-center justify-start text-white text-left px-10">
        <div className="w-full">
          <img
            src="/lovable-uploads/placeholder.svg"
            alt="Almango Business Logo"
            className="h-auto"
            style={{ width: "20%" }}
          />
          <h1 className="text-5xl font-extrabold leading-tight text-left m-0 w-full">
            Controle su negocio desde cualquier lugar
          </h1>
          <p className="mt-6 text-base max-w-xl">
            Gestione su empresa fácilmente y acceda a sus datos en todo momento.
          </p>
          <a
            href="https://almango.com.uy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8"
          >
            <Button className="btn-primary px-4 py-2 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
              Conocer más
            </Button>
          </a>
        </div>
      </div>

      <Dialog open={isRecoveryOpen} onOpenChange={setIsRecoveryOpen}>
        <DialogContent className="white-on-black-card shadow-xl rounded-2xl border">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Recuperar Contraseña
            </DialogTitle>
            <DialogDescription>
              Ingrese su correo y le enviaremos un enlace de recuperación.
            </DialogDescription>
          </DialogHeader>

          {recoverySuccess ? (
            <Alert className="bg-primary/20 border border-primary mt-4">
              <Lock className="h-4 w-4" aria-hidden />
              <AlertDescription>
                Revise su correo. Enviamos un enlace a {recoveryEmail}
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleRecovery} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recoveryEmail">Correo Electrónico</Label>
                <Input
                  id="recoveryEmail"
                  type="email"
                  placeholder="usuario@correo.com"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  autoComplete="email"
                  className="white-on-black-input"
                />
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRecoveryOpen(false)}
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

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="white-on-black-card shadow-xl rounded-2xl border">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Crear Cuenta
            </DialogTitle>
            <DialogDescription>
              Complete el formulario para crear una cuenta nueva
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
                autoComplete="name"
                className="white-on-black-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registerEmail">Correo Electrónico</Label>
              <Input
                id="registerEmail"
                type="email"
                placeholder="usuario@correo.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                autoComplete="email"
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
                autoComplete="new-password"
                className="white-on-black-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registerConfirmPassword">
                Confirmar Contraseña
              </Label>
              <Input
                id="registerConfirmPassword"
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="white-on-black-input"
              />
            </div>

            <Alert className="bg-accent/10 border border-accent">
              <Info className="h-4 w-4" aria-hidden />
              <AlertDescription>
                Al registrarse, acepta los términos y condiciones de Almango.
              </AlertDescription>
            </Alert>

            <DialogFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRegisterOpen(false)}
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
