
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

// Mock data
const MOCK_COMENTARIOS = [
  {
    id: "1",
    usuario: "Ana López",
    avatar: "AL",
    fecha: "2025-05-05T14:48:00",
    contenido: "¿Podría obtener más detalles sobre los materiales necesarios para la pintura?"
  },
  {
    id: "2",
    usuario: "Roberto Martínez",
    avatar: "RM",
    fecha: "2025-05-06T09:22:00",
    contenido: "Estamos considerando presentar una oferta. ¿Podría aclarar el plazo para los trabajos eléctricos?"
  },
  {
    id: "3",
    usuario: "María Gómez",
    avatar: "MG",
    fecha: "2025-05-06T11:05:00",
    contenido: "Hemos revisado los planos de la oficina. Todo parece estar en orden para proceder."
  },
];

interface ComentariosSubastaProps {
  id: string;
}

export function ComentariosSubasta({ id }: ComentariosSubastaProps) {
  const [comentarios, setComentarios] = useState(MOCK_COMENTARIOS);
  const [nuevoComentario, setNuevoComentario] = useState("");
  
  const enviarComentario = () => {
    if (nuevoComentario.trim()) {
      const comentario = {
        id: Date.now().toString(),
        usuario: "Usuario Actual",
        avatar: "UA",
        fecha: new Date().toISOString(),
        contenido: nuevoComentario.trim()
      };
      
      setComentarios([...comentarios, comentario]);
      setNuevoComentario("");
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comentarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comentarios.map((comentario) => (
            <div key={comentario.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={comentario.usuario} />
                <AvatarFallback>{comentario.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comentario.usuario}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comentario.fecha)}
                  </span>
                </div>
                <p className="mt-1">{comentario.contenido}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Textarea
            placeholder="Escribir un comentario..."
            className="flex-1"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
          />
          <Button size="icon" onClick={enviarComentario}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
