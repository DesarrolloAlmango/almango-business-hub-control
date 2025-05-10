
import { Link as RouterLink } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronDown, LucideIcon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

interface SidebarItemWithSubmenu extends SidebarItem {
  submenu?: SidebarItem[];
}

interface SidebarMenuSectionProps {
  label: string;
  items: (SidebarItem | SidebarItemWithSubmenu)[];
  iconColor?: string;
}

export function SidebarMenuSection({
  label,
  items,
  iconColor,
}: SidebarMenuSectionProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { state } = useSidebar();
  const { theme } = useTheme();
  const isCollapsed = state === "collapsed";

  const toggleSubmenu = (path: string) => {
    setOpenSubmenu(openSubmenu === path ? null : path);
  };

  // Define theme-based classes
  const menuTextClass = theme === "light" 
    ? "text-gray-800 hover:text-primary hover:bg-gray-100" 
    : "text-white hover:text-primary hover:bg-sidebar-accent";

  const submenuTextClass = theme === "light"
    ? "text-gray-700 hover:text-primary hover:bg-gray-100"
    : "text-gray-200 hover:text-primary hover:bg-sidebar-accent";

  const iconColorClass = theme === "light"
    ? iconColor || "text-primary"
    : iconColor || "text-secondary";

  const labelClass = theme === "light"
    ? "text-gray-500"
    : "text-gray-400";

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={`${labelClass} text-xs font-semibold tracking-wide uppercase mb-1`}>
        {!isCollapsed && label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const hasSubmenu =
              "submenu" in item && item.submenu && item.submenu.length > 0;

            return (
              <SidebarMenuItem key={item.path} className="mb-0.5">
                {hasSubmenu ? (
                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => toggleSubmenu(item.path)}
                        className={cn(
                          "flex items-center justify-between w-full",
                          menuTextClass,
                          "transition-all duration-150 rounded-md",
                          "py-1.5 px-2 text-xs font-medium"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon
                            className={cn("mr-2", iconColorClass)}
                            size={16}
                          />
                          {!isCollapsed && (
                            <span>{item.title}</span>
                          )}
                        </div>
                        {!isCollapsed && (
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform",
                              openSubmenu === item.path && "transform rotate-180"
                            )}
                          />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      {openSubmenu === item.path && !isCollapsed && (
                        <SidebarMenuSub>
                          {item.submenu!.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.path}>
                              <SidebarMenuSubButton asChild>
                                <RouterLink
                                  to={subItem.path}
                                  className={cn(
                                    "flex items-center", 
                                    submenuTextClass,
                                    "transition-all duration-150",
                                    "py-1 px-2 text-xs rounded-md"
                                  )}
                                >
                                  <subItem.icon
                                    className={cn("mr-2", iconColorClass)}
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
                        "flex items-center",
                        menuTextClass,
                        "transition-all duration-150 rounded-md",
                        "py-1.5 px-2 text-xs font-medium"
                      )}
                    >
                      <item.icon
                        className={cn("mr-2", iconColorClass)}
                        size={16}
                      />
                      {!isCollapsed && (
                        <span>{item.title}</span>
                      )}
                    </RouterLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
