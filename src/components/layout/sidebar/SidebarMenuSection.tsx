import { Link as RouterLink } from 'react-router-dom'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ChevronDown, LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/hooks/use-theme'

interface SidebarItem {
  title: string
  icon: LucideIcon
  path: string
}

interface SidebarItemWithSubmenu extends SidebarItem {
  submenu?: SidebarItem[]
}

interface SidebarMenuSectionProps {
  label: string
  items: (SidebarItem | SidebarItemWithSubmenu)[]
  iconColor?: string
}

export function SidebarMenuSection({
  label,
  items,
  iconColor,
}: SidebarMenuSectionProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const { state } = useSidebar()
  const { theme } = useTheme()
  const isCollapsed = state === 'collapsed'

  const toggleSubmenu = (path: string) => {
    setOpenSubmenu(openSubmenu === path ? null : path)
  }

  // Define theme-based classes with white text for both themes
  const menuTextClass =
    theme === 'light'
      ? 'text-[hsl(var(--secondary))] hover:text-white hover:bg-sidebar-accent'
      : 'text-white hover:text-white hover:bg-sidebar-accent'

  const submenuTextClass =
    theme === 'light'
      ? '!text-[hsl(var(--secondary))] hover:!text-white hover:bg-gray-100'
      : '!text-white hover:text-white hover:bg-sidebar-accent'

  const iconColorClass =
    iconColor || (theme === 'light' ? 'text-black' : 'text-white')

  const labelClass =
    theme === 'light' ? 'text-[hsl(var(--primary))]' : 'text-white'

  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className={`${labelClass} text-xs font-semibold tracking-wide uppercase mb-1`}
      >
        {!isCollapsed && label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const hasSubmenu =
              'submenu' in item && item.submenu && item.submenu.length > 0

            return (
              <SidebarMenuItem key={item.path} className='mb-0.5'>
                {hasSubmenu ? (
                  <Collapsible>
                    <CollapsibleTrigger className='w-full'>
                      <div
                        role='button'
                        tabIndex={0}
                        onClick={() => toggleSubmenu(item.path)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggleSubmenu(item.path)
                          }
                        }}
                        className={cn(
                          'flex items-center justify-between w-full',
                          menuTextClass,
                          'transition-all duration-150 rounded-md',
                          'py-1.5 px-2 text-xs font-medium cursor-pointer',
                          isCollapsed && 'justify-center px-0'
                        )}
                      >
                        <div
                          className={cn(
                            'flex items-center',
                            isCollapsed && 'justify-center w-full' // Añadimos estas clases
                          )}
                        >
                          <item.icon
                            className={cn(
                              'mr-2',
                              iconColorClass,
                              isCollapsed && 'mr-0'
                            )}
                            size={16}
                          />
                          {!isCollapsed && (
                            <span className='px-2'>{item.title}</span>
                          )}
                        </div>
                        {!isCollapsed && (
                          <ChevronDown
                            className={cn(
                              'h-3.5 w-3.5 transition-transform',
                              openSubmenu === item.path &&
                                'transform rotate-180'
                            )}
                          />
                        )}
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      {openSubmenu === item.path && (
                        <SidebarMenuSub
                          className={cn(
                            'ml-4 pl-2 border-l border-l-gray-200 dark:border-l-gray-700',
                            isCollapsed && 'ml-0 pl-0 border-l-0'
                          )}
                        >
                          {item.submenu!.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.path}>
                              <SidebarMenuSubButton asChild>
                                <RouterLink
                                  to={subItem.path}
                                  className={cn(
                                    'flex items-center',
                                    submenuTextClass,
                                    'transition-all duration-150',
                                    'py-1 px-2 text-xs rounded-md'
                                  )}
                                >
                                  <subItem.icon
                                    className={cn('mr-2', iconColorClass)}
                                    size={14}
                                  />
                                  <span>{subItem.title}</span>
                                </RouterLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <RouterLink
                      to={item.path}
                      className={cn(
                        'flex items-center',
                        menuTextClass,
                        'transition-all duration-150 rounded-md',
                        'py-1.5 px-2 text-xs font-medium',
                        isCollapsed && 'justify-center px-0'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'mr-2',
                          iconColorClass,
                          isCollapsed && 'mr-0'
                        )}
                        size={16}
                      />
                      {!isCollapsed && <span>{item.title}</span>}
                    </RouterLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
