
import {
  Users,
  FileText,
  ListChecks,
  Link,
  Star,
  BarChart,
  UserX,
  FileImage,
  Flag,
  LineChart,
  Calendar,
  CreditCard,
  Tag,
  UserCircle,
  MessageSquare,
  LayoutDashboard,
  Code,
  Gavel,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

// Sidebar navigation items organized by sections
export const principalItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Gestión de Subusuarios",
    icon: Users,
    path: "/subusuarios",
  },
  {
    title: "Solicitudes de Servicio",
    icon: FileText,
    path: "/solicitudes",
  },
  {
    title: "Visualización de Solicitudes",
    icon: ListChecks,
    path: "/visualizacion-solicitudes",
  },
];

export const visualizacionItems: SidebarItem[] = [
  {
    title: "Links/QR",
    icon: Link,
    path: "/links-qr",
  },
  {
    title: "Subastas de Servicios",
    icon: Gavel,
    path: "/subastas",
  },
  {
    title: "Feedback y Evaluaciones",
    icon: Star,
    path: "/feedback",
  },
];

export const reportesItems: SidebarItem[] = [
  {
    title: "Reportes de Actividad",
    icon: BarChart,
    path: "/reportes",
  },
  {
    title: "Solicitudes Lista Negra",
    icon: UserX,
    path: "/lista-negra",
  },
  {
    title: "Documentación de Proveedores",
    icon: FileImage,
    path: "/documentacion",
  },
  {
    title: "Gestión de Incidencias",
    icon: Flag,
    path: "/incidencias",
  },
  {
    title: "Estadísticas y Métricas",
    icon: LineChart,
    path: "/estadisticas",
  },
];

export const gestionItems: SidebarItem[] = [
  {
    title: "Calendario",
    icon: Calendar,
    path: "/calendario",
  },
  {
    title: "Pagos y Facturación",
    icon: CreditCard,
    path: "/pagos",
  },
  {
    title: "Campañas y Promociones",
    icon: Tag,
    path: "/campanas",
  },
  {
    title: "Gestión de Clientes",
    icon: UserCircle,
    path: "/clientes",
  },
  {
    title: "Comunicación",
    icon: MessageSquare,
    path: "/comunicacion",
  },
];

export const desarrolloItems: SidebarItem[] = [
  {
    title: "Desarrollador",
    icon: Code,
    path: "/developer",
  },
];
