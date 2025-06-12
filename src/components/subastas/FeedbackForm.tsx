import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          aria-label={`Calificar ${star}`}
        >
          <Star
            className={
              star <= value
                ? "w-6 h-6 text-yellow-400 fill-yellow-400 cursor-pointer"
                : "w-6 h-6 text-gray-300 cursor-pointer"
            }
          />
        </button>
      ))}
    </div>
  );
}

export function FeedbackForm({postulanteId, subastaId}: { postulanteId: string; subastaId: string }) {
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(1);
   
  const onSubmit = (comentario: string, calificacion: number) => {
    // Aquí puedes manejar el envío del feedback
    console.log("Comentario:", comentario);
    console.log("Calificación:", calificacion);
  };
  return (    
    <form
      className="flex flex-col gap-2 mt-2"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(comentario, calificacion);
        setComentario("");
        setCalificacion(5);
      }}
    >
      <label className="font-medium">Calificación</label>
      <StarRating value={calificacion} onChange={setCalificacion} />
      <label className="font-medium">Comentario</label>
      <Textarea
        value={comentario}
        onChange={e => setComentario(e.target.value)}
        placeholder="Escribe tu feedback..."
      />
      <Button type="submit" size="sm" className="self-end">Enviar feedback</Button>
    </form>
  );
}
