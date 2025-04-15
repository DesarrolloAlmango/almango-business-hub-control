
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
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

// Sidebar navigation items
const sidebarItems = [
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
  {
    title: "Links/QR",
    icon: Link,
    path: "/links-qr",
  },
  {
    title: "Feedback y Evaluaciones",
    icon: Star,
    path: "/feedback",
  },
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
  {
    title: "Desarrollador",
    icon: Code,
    path: "/developer",
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="bg-[hsl(var(--sidebar-background))] border-r border-border">
      <SidebarHeader className="flex items-center justify-start p-4">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/bbb7cf38-3978-487f-8d60-82f4e16d39c6.png" 
            alt="Almango Logo" 
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-white">
            <span className="text-[hsl(var(--primary))]">Almango</span> Business
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[hsl(var(--secondary))]">Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.slice(0, 3).map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    asChild
                  >
                    <RouterLink to={item.path} className={cn("flex items-center hover:text-[hsl(var(--primary))] transition-colors")}>
                      <item.icon className="mr-2 text-[hsl(var(--primary))]" size={20} />
                      <span>{item.title}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[hsl(var(--secondary))]">Visualización</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.slice(3, 6).map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    asChild
                  >
                    <RouterLink to={item.path} className={cn("flex items-center hover:text-[hsl(var(--primary))] transition-colors")}>
                      <item.icon className="mr-2 text-[hsl(var(--secondary))]" size={20} />
                      <span>{item.title}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[hsl(var(--secondary))]">Reportes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.slice(6, 11).map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    asChild
                  >
                    <RouterLink to={item.path} className={cn("flex items-center hover:text-[hsl(var(--primary))] transition-colors")}>
                      <item.icon className="mr-2 text-[hsl(var(--accent))]" size={20} />
                      <span>{item.title}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[hsl(var(--secondary))]">Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.slice(11, 16).map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    asChild
                  >
                    <RouterLink to={item.path} className={cn("flex items-center hover:text-[hsl(var(--primary))] transition-colors")}>
                      <item.icon className="mr-2 text-[hsl(var(--secondary))]" size={20} />
                      <span>{item.title}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[hsl(var(--secondary))]">Desarrollo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.slice(16).map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    asChild
                  >
                    <RouterLink to={item.path} className={cn("flex items-center hover:text-[hsl(var(--primary))] transition-colors")}>
                      <item.icon className="mr-2 text-[hsl(var(--primary))]" size={20} />
                      <span>{item.title}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-[hsl(var(--secondary))] text-center">
          Almango Business Hub © {new Date().getFullYear()}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
