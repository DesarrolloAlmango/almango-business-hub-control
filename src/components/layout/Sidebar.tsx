import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { SidebarHeader } from './sidebar/SidebarHeader'
import { SidebarFooter } from './sidebar/SidebarFooter'
import { SidebarMenuSection } from './sidebar/SidebarMenuSection'
import {
  principalItems,
  reportesItems,
  gestionItems,
} from './sidebar/SidebarItems'

export function DashboardSidebar() {
  return (
    <Sidebar
      className="'bg-[hsl(var(--sidebar-background))] border-r border-border'"
      collapsible='icon'
    >
      <SidebarHeader />

      <SidebarContent>
        <SidebarMenuSection
          label='Principal'
          items={principalItems}
          iconColor='text-[hsl(var(--primary))]'
        />
        <SidebarMenuSection
          label='Gestión'
          items={gestionItems}
          iconColor='text-[hsl(var(--primary))]'
        />

        <SidebarMenuSection
          label='Reportes'
          items={reportesItems}
          iconColor='text-[hsl(var(--primary))]'
        />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
