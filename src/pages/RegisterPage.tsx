import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Info } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error de registro",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error de registro",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      toast({
        title: "Cuenta creada",
        description: "Registro exitoso. Ya puede iniciar sesión.",
      });

      setIsLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Columna izquierda con imagen de fondo centrada */}
      <div
        className="hidden lg:flex lg:w-1/2 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/lovable-uploads/bg-1.jpg')" }}
      >
        <div className="text-white text-left max-w-lg px-6">
          <h1 className="text-3xl font-bold leading-snug">
            ¡Gracias por unirte a Almango!
          </h1>
          <p className="mt-4 text-base">
            Comenzá a gestionar tu negocio con eficiencia desde cualquier lugar.
          </p>
          <Button
            type="button"
            onClick={() => navigate("/info")}
            className="mt-6 font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          >
            Conocer más
          </Button>
        </div>
      </div>

      {/* Columna derecha con formulario pantalla completa */}
      <div className="w-full lg:w-1/2 h-screen flex items-center justify-center px-6 py-12 bg-white">
        <Card className="w-full max-w-2xl border-none shadow-none p-6 rounded-none">
          <CardHeader className="pb-3 text-left">
            <CardTitle className="text-2xl font-bold text-black">
              Crear cuenta
            </CardTitle>
            <CardDescription className="text-gray-600">
              Complete sus datos para registrarse
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-800">
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="bg-white text-black border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="bg-white text-black border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-800">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className="bg-white text-black border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business" className="text-gray-800">
                  Nombre del Negocio
                </Label>
                <Input
                  id="business"
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  className="bg-white text-black border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="bg-white text-black border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-800">
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="bg-white text-black border-gray-300"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex items-start gap-2 pt-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 accent-orange-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  Acepto los{" "}
                  <a
                    href="/terminos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:underline"
                  >
                    términos y condiciones
                  </a>
                </label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-6 text-left">
              <Button
                type="submit"
                className="w-full font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                disabled={isLoading || !acceptTerms}
              >
                {isLoading ? "Registrando..." : "Crear Cuenta"}
              </Button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm text-orange-600 hover:underline font-medium"
              >
                Ya tengo una cuenta
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
