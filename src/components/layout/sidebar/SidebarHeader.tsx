import { SidebarHeader as UISidebarHeader } from "@/components/ui/sidebar";

export function SidebarHeader() {
  return (
    <UISidebarHeader className="flex items-center justify-start p-4">
      <div className="flex items-center gap-2">       
        <span className="text-x2 font-bold text-white">
          <span className="text-[hsl(var(--primary))]">Almango</span> Business
        </span>
      </div>
    </UISidebarHeader>
  );
}


