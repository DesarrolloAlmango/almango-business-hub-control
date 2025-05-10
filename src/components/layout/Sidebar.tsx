
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { SidebarMenuSection } from "./sidebar/SidebarMenuSection";
import { useTheme } from "@/hooks/use-theme";
import {
  principalItems,
  visualizacionItems,
  reportesItems,
  gestionItems,
  // desarrolloItems
} from "./sidebar/SidebarItems";

export function DashboardSidebar() {
  const { theme } = useTheme();
  
  return (
    <Sidebar 
      className={
        theme === 'light'
          ? 'bg-white border-r border-gray-200'
          : 'bg-[#1c1c1c] border-r border-border'
      }
      collapsible="icon"
    >
      <SidebarHeader />

      <SidebarContent className="px-2">
        <SidebarMenuSection
          label='Principal'
          items={principalItems}
          iconColor={theme === 'light' ? 'text-primary' : 'text-secondary'}
        />

        <SidebarMenuSection
          label='Visualización'
          items={visualizacionItems}
          iconColor={theme === 'light' ? 'text-primary' : 'text-secondary'}
        />

        <SidebarMenuSection
          label='Reportes'
          items={reportesItems}
          iconColor={theme === 'light' ? 'text-primary' : 'text-secondary'}
        />

        <SidebarMenuSection
          label='Gestión'
          items={gestionItems}
          iconColor={theme === 'light' ? 'text-primary' : 'text-secondary'}
        />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
