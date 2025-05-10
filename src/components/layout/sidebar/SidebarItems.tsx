
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
  FolderArchive,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

interface SidebarItemWithSubmenu extends SidebarItem {
  submenu?: SidebarItem[];
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
    title: "Oferta de Servicio",
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
  // {
  //   title: "Links/QR",
  //   icon: Link,
  //   path: "/links-qr",
  // },
  {
    title: "Subastas",
    icon: Gavel,
    path: "/subastas",
  },
];

export const reportesItems: SidebarItemWithSubmenu[] = [
  {
    title: "Seguimiento de Obras",
    icon: BarChart,
    path: "/reportes",
    submenu: [
      {
        title: "Feedback y Evaluaciones",
        icon: Star,
        path: "/reportes/feedback",
      },
      {
        title: "Reportes de Actividad",
        icon: LineChart,
        path: "/reportes/actividad",
      },
    ],
  },
  {
    title: "Lista Negra",
    icon: UserX,
    path: "/lista-negra",
  },
  {
    title: "Documentación de Proveedores",
    icon: FileImage,
    path: "/documentacion",
  },
  // {
  //   title: "Gestión de Incidencias",
  //   icon: Flag,
  //   path: "/incidencias",
  // },
  {
    title: "Estadísticas",
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
  // {
  //   title: "Campañas y Promociones",
  //   icon: Tag,
  //   path: "/campanas",
  // },
  // {
  //   title: "Gestión de Clientes",
  //   icon: UserCircle,
  //   path: "/clientes",
  // },
  {
    title: "Comunicación",
    icon: MessageSquare,
    path: "/comunicacion",
  },
  {
    title: "Documentación de gestión",
    icon: FolderArchive,
    path: "/documentacion-gestion",
  },
];

// export const desarrolloItems: SidebarItem[] = [
//   {
//     title: "Desarrollador",
//     icon: Code,
//     path: "/developer",
//   },
// ];
