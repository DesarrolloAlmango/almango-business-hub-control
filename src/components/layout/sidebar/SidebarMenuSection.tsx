
import { Link as RouterLink } from "react-router-dom";
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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronDown, LucideIcon } from "lucide-react";
import { useState } from "react";

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

  const toggleSubmenu = (path: string) => {
    setOpenSubmenu(openSubmenu === path ? null : path);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[hsl(var(--secondary))] text-xs font-semibold tracking-wide uppercase">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const hasSubmenu =
              "submenu" in item && item.submenu && item.submenu.length > 0;

            return (
              <SidebarMenuItem key={item.path}>
                {hasSubmenu ? (
                  <>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => toggleSubmenu(item.path)}
                      className={cn(
                        "flex items-center justify-between text-white hover:text-[hsl(var(--primary))] transition-colors",
                        "py-1.5 px-3 rounded-md font-medium text-xs" // Reduced font size
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`mr-2 ${
                            iconColor || "text-[hsl(var(--secondary))]"
                          }`}
                          size={18} // Reduced icon size
                        />
                        <span className="tracking-normal">{item.title.toUpperCase()}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform", // Reduced chevron size
                          openSubmenu === item.path && "transform rotate-180"
                        )}
                      />
                    </SidebarMenuButton>

                    {openSubmenu === item.path && (
                      <SidebarMenuSub>
                        {item.submenu!.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.path}>
                            <SidebarMenuSubButton asChild>
                              <RouterLink
                                to={subItem.path}
                                className="flex items-center text-white hover:text-[hsl(var(--primary))] transition-colors py-1.5 px-8 rounded-md text-xs" // Reduced font size and adjusted padding
                              >
                                <subItem.icon
                                  className={`mr-2 ${
                                    iconColor || "text-[hsl(var(--secondary))]"
                                  }`}
                                  size={14} // Reduced icon size for submenus
                                />
                                <span>
                                  {subItem.title}
                                </span>
                              </RouterLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <RouterLink
                      to={item.path}
                      className={cn(
                        "flex items-center text-white hover:text-[hsl(var(--primary))] transition-colors",
                        "py-1.5 px-3 rounded-md font-medium text-xs" // Reduced font size
                      )}
                    >
                      <item.icon
                        className={`mr-2 ${
                          iconColor || "text-[hsl(var(--secondary))]"
                        }`}
                        size={18} // Reduced icon size
                      />
                      <span className="tracking-normal">{item.title.toUpperCase()}</span>
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
