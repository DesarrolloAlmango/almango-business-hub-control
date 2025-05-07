
import { SidebarFooter as UISidebarFooter } from "@/components/ui/sidebar";

export function SidebarFooter() {
  return (
    <UISidebarFooter className="p-4">
      <div className="text-xs text-[hsl(var(--secondary))] text-center">
        Almango Business Hub © {new Date().getFullYear()}
      </div>
    </UISidebarFooter>
  );
}
