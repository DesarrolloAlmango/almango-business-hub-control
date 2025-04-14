
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, Wrench } from "lucide-react";

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function ModulePlaceholder({ 
  title, 
  description, 
  icon = <Wrench className="h-6 w-6" /> 
}: ModulePlaceholderProps) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <Card className="border border-dashed border-muted">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-primary">
            {icon}
            <span className="ml-2">Módulo: {title}</span>
          </CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10">
            <BadgeCheck className="h-8 w-8 text-primary" />
          </div>
          <p className="mb-6 text-center max-w-md text-muted-foreground">
            Este módulo está en desarrollo. Muy pronto tendrás acceso a todas las funcionalidades 
            relacionadas con {title.toLowerCase()}.
          </p>
          <Button>Explorar otras funciones</Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
