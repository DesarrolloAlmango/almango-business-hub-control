import { SidebarHeader as UISidebarHeader } from "@/components/ui/sidebar";

export function SidebarHeader() {
  return (
    <UISidebarHeader className="flex items-left justify-start p-4">
      <div className="flex items-left gap-2">
         <img 
          src="/lovable-uploads/bbb7cf38-3978-487f-8d60-82f4e16d39c6.png" 
          alt="Almango Logo" 
          className="h-10 w-10"
        /> 
        <span className="text-xl font-bold text-white">
          <span className="text-[hsl(var(--primary))]">Almango</span> Business
        </span>
      </div>
    </UISidebarHeader>
  );
}
