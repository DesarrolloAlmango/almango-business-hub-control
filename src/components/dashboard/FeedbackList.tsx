
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Star, User, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Feedback {
  id: string;
  serviceId: string;
  serviceName: string;
  client: string;
  date: string;
  rating: number;
  comment: string;
}

// Sample data for feedback
const feedbacks: Feedback[] = [
  {
    id: "FB-001",
    serviceId: "SRV-001",
    serviceName: "Mantenimiento Eléctrico",
    client: "Juan García",
    date: "2025-04-11",
    rating: 5,
    comment: "Excelente servicio, muy profesional y rápido."
  },
  {
    id: "FB-002",
    serviceId: "SRV-002",
    serviceName: "Instalación de Redes",
    client: "María Rodríguez",
    date: "2025-04-12",
    rating: 4,
    comment: "Buen trabajo, aunque tardaron un poco más de lo previsto."
  },
  {
    id: "FB-003",
    serviceId: "SRV-006",
    serviceName: "Soporte Técnico IT",
    client: "Carlos Méndez",
    date: "2025-04-12",
    rating: 5,
    comment: "Resolvieron nuestro problema informático de manera inmediata. Muy recomendable."
  },
  {
    id: "FB-004",
    serviceId: "SRV-004",
    serviceName: "Mantenimiento Aires",
    client: "Laura Sánchez",
    date: "2025-04-10",
    rating: 2,
    comment: "No quedé satisfecha con el servicio, el técnico llegó tarde y no solucionó completamente el problema."
  },
  {
    id: "FB-005",
    serviceId: "SRV-001",
    serviceName: "Mantenimiento Eléctrico",
    client: "Roberto Torres",
    date: "2025-04-09",
    rating: 5,
    comment: "Trabajo perfecto, solucionaron todos los problemas eléctricos que teníamos."
  }
];

// Component to render stars based on rating
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16}
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
        />
      ))}
    </div>
  );
};

export function FeedbackList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback de Clientes</CardTitle>
        <CardDescription>Calificaciones recientes de servicios completados</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <Card key={feedback.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarFallback className="bg-secondary/10 text-secondary">
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{feedback.client}</p>
                        <p className="text-sm text-muted-foreground">Servicio: {feedback.serviceName}</p>
                      </div>
                      <RatingStars rating={feedback.rating} />
                    </div>
                    <p className="mt-2 text-sm">{feedback.comment}</p>
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      <Calendar size={12} className="mr-1" />
                      {new Date(feedback.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
