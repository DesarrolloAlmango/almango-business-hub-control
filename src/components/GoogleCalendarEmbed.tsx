import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DashboardLayout } from './layout/DashboardLayout'

interface GoogleCalendarEmbedProps {
  calendarId: string // e.g. tu-email@gmail.com o el ID del calendario
  title?: string
  height?: number
}

export function GoogleCalendarEmbed({
  calendarId,
  title = 'Calendario de Google',
  height = 600,
}: GoogleCalendarEmbedProps) {
  // Puedes personalizar la URL según tus necesidades (ver docs de Google Calendar Embed)
  const src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
    calendarId
  )}&ctz=America/Argentina/Buenos_Aires`

  return (
    <DashboardLayout>
      <Card className='my-4'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>{title}</CardTitle>
            <a
              href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(
                calendarId
              )}`}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm'
            >
              Abrir en Google Calendar
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <div className='w-full overflow-x-auto rounded border bg-white dark:bg-background shadow-sm'>
            <div className='aspect-[16/9] md:aspect-[16/7] rounded overflow-hidden'>
              <iframe
                src={src}
                style={{ border: 0 }}
                width='100%'
                height={height}
                title='Google Calendar'
                className='rounded min-h-[350px] w-full'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
