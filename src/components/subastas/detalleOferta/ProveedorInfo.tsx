
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ProveedorInfoProps {
  proveedor: string;
  avatar: string;
  rating: number;
}

export function ProveedorInfo({ proveedor, avatar, rating }: ProveedorInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src="" alt={proveedor} />
        <AvatarFallback className="text-lg bg-primary/10 text-primary">{avatar}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-xl font-semibold">{proveedor}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>{rating} de calificación</span>
        </div>
      </div>
    </div>
  );
}
