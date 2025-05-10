
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
      <SidebarGroupLabel className="text-[hsl(var(--secondary))] text-sm font-semibold tracking-wide uppercase">
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
                        "flex items-center justify-between text-[hsl(var(--blue))] hover:text-[hsl(var(--primary))] transition-colors",
                        "py-2 px-3 rounded-md font-medium text-sm" // Added padding and font styling
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`mr-2 ${
                            iconColor || "text-[hsl(var(--secondary))]"
                          }`}
                          size={20}
                        />
                        <span className="tracking-normal">{item.title.toUpperCase()}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
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
                                className="flex items-center text-[hsl(var(--blue))] hover:text-[hsl(var(--primary))] transition-colors py-1.5 px-9 rounded-md" // Enhanced padding and spacing
                              >
                                <subItem.icon
                                  className={`mr-2 ${
                                    iconColor || "text-[hsl(var(--secondary))]"
                                  }`}
                                  size={16}
                                />
                                <span className="text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] transition-colors text-sm">
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
                        "flex items-center text-[hsl(var(--blue))] hover:text-[hsl(var(--primary))] transition-colors",
                        "py-2 px-3 rounded-md font-medium text-sm" // Added padding and font styling
                      )}
                    >
                      <item.icon
                        className={`mr-2 ${
                          iconColor || "text-[hsl(var(--secondary))]"
                        }`}
                        size={20}
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
