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
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Error de inicio de sesión",
        description: "Por favor ingrese su correo y contraseña",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://109.199.100.16/AlmangoXV1NETFramework/APIs/APIComercio/ObtenerLogin?Secusername=${encodeURIComponent(
          email
        )}&Secuserpassword=${encodeURIComponent(password)}`
      );
      const data = await response.json();

      if (response.ok && data && data.ok === "S") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a Almango Business Hub",
        });

        setIsLoading(false);
        navigate("/");
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: data?.mensaje || "Credenciales incorrectas",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: "No se pudo conectar al servidor",
        variant: "destructive",
      });
      setIsLoading(false);
    }
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
                    type="text"
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
                      onClick={() => navigate("/register")}
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
        <DialogContent className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl border-none">
          <Card className="bg-transparent shadow-none border-none rounded-2xl space-y-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-black">
                Recuperar Contraseña
              </CardTitle>
              <CardDescription className="text-gray-600">
                Ingrese su correo y le enviaremos un enlace de recuperación
              </CardDescription>
            </CardHeader>

            {recoverySuccess ? (
              <Alert className="bg-orange-100 border border-orange-300">
                <Lock className="h-4 w-4 text-orange-600" aria-hidden />
                <AlertDescription className="text-black">
                  Revise su correo. Enviamos un enlace a {recoveryEmail}
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleRecovery} className="space-y-4">
                <CardContent className="space-y-2">
                  <Label htmlFor="recoveryEmail" className="text-gray-800">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="recoveryEmail"
                    type="email"
                    placeholder="usuario@correo.com"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    autoComplete="email"
                    className="bg-white text-black border-gray-300"
                  />
                </CardContent>

                <CardFooter className="pt-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRecoveryOpen(false)}
                    className="rounded-lg"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Enviar Enlace"}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
