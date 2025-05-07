
import { Link as RouterLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

interface SidebarMenuSectionProps {
  label: string;
  items: SidebarItem[];
  iconColor?: string;
}

export function SidebarMenuSection({ label, items, iconColor }: SidebarMenuSectionProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[hsl(var(--secondary))]">{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton 
                tooltip={item.title}
                asChild
              >
                <RouterLink to={item.path} className={cn("flex items-center hover:text-[hsl(var(--primary))] transition-colors")}>
                  <item.icon className={`mr-2 ${iconColor || "text-[hsl(var(--secondary))]"}`} size={20} />
                  <span>{item.title}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
