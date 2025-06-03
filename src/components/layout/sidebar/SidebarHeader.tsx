import { SidebarHeader as UISidebarHeader } from '@/components/ui/sidebar'
import { useSidebar } from '@/components/ui/sidebar'
import { ChevronRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function SidebarHeader() {
  const { toggleSidebar, state } = useSidebar()
  const { theme } = useTheme()

  return (
    <UISidebarHeader className='flex items-center justify-between p-3'>
      {state === 'expanded' && (
        <img
          src='/lovable-uploads/almango-business.png'
          alt='Almango Logo'
          className='h-13 w-33'
        />
      )}

      <Button
        variant='ghost'
        size='icon'
        onClick={toggleSidebar}
        className={`${
          theme === 'light'
            ? '!text-black hover:bg-gray-100 hover:rounded-full'
            : 'text-white hover:bg-sidebar-accent'
        } transition-all duration-300`}
      >
        {state === 'expanded' ? <ChevronRight size={18} /> : <Menu size={18} />}
      </Button>
    </UISidebarHeader>
  )
}
