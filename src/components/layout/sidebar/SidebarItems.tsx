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
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface SidebarItem {
  title: string
  icon: LucideIcon
  path: string
}

interface SidebarItemWithSubmenu extends SidebarItem {
  submenu?: SidebarItem[]
  isExpandable?: boolean
}

// Sidebar navigation items organized by sections
export const principalItems: SidebarItemWithSubmenu[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    title: 'Nuevo Proyecto',
    icon: Gavel,
    path: '/subastas/nueva',
  },
  {
    title: 'Seguimiento',
    icon: BarChart,
    path: '',
    isExpandable: true,
    submenu: [
      {
        title: 'Proyectos en Curso',
        icon: LineChart,
        path: '/reportes',
      },
      {
        title: 'Feedback y Evaluaciones',
        icon: Star,
        path: '/reportes/feedback',
      },
    ],
  },
  {
    title: 'Calendario',
    icon: Calendar,
    path: '/calendario',
  },
]

export const reportesItems: SidebarItem[] = [
  {
    title: 'Estadísticas',
    icon: LineChart,
    path: '/estadisticas',
  },
]

export const gestionItems: SidebarItem[] = [
  {
    title: 'Lista Negra',
    icon: UserX,
    path: '/lista-negra',
  },
  {
    title: 'Pagos y Facturación',
    icon: CreditCard,
    path: '/pagos',
  },

  {
    title: 'Comunicación',
    icon: MessageSquare,
    path: '/comunicacion',
  },
  {
    title: 'Documentación',
    icon: FolderArchive,
    path: '/documentacion-gestion',
  },
  {
    title: 'Documentación de Proveedores',
    icon: FileImage,
    path: '/documentacion',
  },
]
