import { SidebarHeader as UISidebarHeader } from "@/components/ui/sidebar";

export function SidebarHeader() {
  return (
    <UISidebarHeader className='flex items-center justify-start p-4'>
      <div className='flex items-center gap-2'>
        <img
          src='/lovable-uploads/almango-business.png'
          alt='Almango Logo'
          className='h-14 w-34'
        />
        {/* <span className='text-xl font-bold text-white'>
          <span className='text-[hsl(var(--primary))]'>Almango</span> Business
        </span> */}
      </div>
    </UISidebarHeader>
  );
}
