
import { 
  BarChart, 
  Calendar, 
  CreditCard, 
  FileImage, 
  Flag, 
  LineChart, 
  ListChecks, 
  MessageSquare, 
  Star, 
  Tag, 
  UserCircle, 
  UserX 
} from "lucide-react";
import ModulePlaceholder from "@/components/ModulePlaceholder";

export function VisualizacionSolicitudes() {
  return (
    <ModulePlaceholder
      title="Visualización de Solicitudes"
      description="Accede a todas las solicitudes de servicio propias y de tus clientes."
      icon={<ListChecks className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Feedback() {
  return (
    <ModulePlaceholder
      title="Feedback y Evaluaciones"
      description="Accede al feedback y evaluaciones de tus clientes sobre los servicios realizados."
      icon={<Star className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Reportes() {
  return (
    <ModulePlaceholder
      title="Reportes de Actividad"
      description="Visualiza reportes detallados sobre los servicios solicitados."
      icon={<BarChart className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function ListaNegra() {
  return (
    <ModulePlaceholder
      title="Solicitudes Lista Negra"
      description="Gestiona restricciones y bloqueos de proveedores problemáticos."
      icon={<UserX className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Documentacion() {
  return (
    <ModulePlaceholder
      title="Documentación de Proveedores"
      description="Accede a la documentación de tus proveedores de servicios."
      icon={<FileImage className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Incidencias() {
  return (
    <ModulePlaceholder
      title="Gestión de Incidencias"
      description="Administra las incidencias y evidencias relacionadas con tus servicios."
      icon={<Flag className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Estadisticas() {
  return (
    <ModulePlaceholder
      title="Estadísticas y Métricas"
      description="Visualiza métricas clave sobre el desempeño de tus servicios."
      icon={<LineChart className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Calendario() {
  return (
    <ModulePlaceholder
      title="Calendario"
      description="Visualiza los servicios agendados en formato calendario."
      icon={<Calendar className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Pagos() {
  return (
    <ModulePlaceholder
      title="Pagos y Facturación"
      description="Gestiona los pagos y facturas asociadas a tus servicios."
      icon={<CreditCard className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Campanas() {
  return (
    <ModulePlaceholder
      title="Campañas y Promociones"
      description="Administra campañas exclusivas con descuentos para tus clientes."
      icon={<Tag className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Clientes() {
  return (
    <ModulePlaceholder
      title="Gestión de Clientes"
      description="Registra y gestiona tus clientes frecuentes."
      icon={<UserCircle className="h-6 w-6" />}
      showDemo={true}
    />
  );
}

export function Comunicacion() {
  return (
    <ModulePlaceholder
      title="Comunicación con Almango"
      description="Accede al centro de soporte exclusivo para tus consultas."
      icon={<MessageSquare className="h-6 w-6" />}
      showDemo={true}
    />
  );
}
