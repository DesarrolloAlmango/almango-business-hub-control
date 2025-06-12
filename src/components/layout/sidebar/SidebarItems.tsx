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
    title: 'New Dashboard',
    icon: LayoutDashboard,
    path: '/newDashboard',
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
        path: '/proyectos-en-curso',
      },
      {
        title: 'Proyectos Finalizados',
        icon: FileText,
        path: '/proyectos-finalizados',
      },
      {
        title: 'Feedback',
        icon: Star,
        path: '/feedback',
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

export const gestionItems: SidebarItemWithSubmenu[] = [
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
    path: '',
    isExpandable: true,
    submenu: [
      {
        title: 'Contratos',
        icon: FileImage,
        path: '/documentacion-gestion',
      },
      {
        title: 'Documentación de Proveedores',
        icon: FileImage,
        path: '/documentacion',
      },      
    ]
  },  
]
