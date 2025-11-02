import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import type { TimelineEvent } from '../types'

interface ClaimTimelineProps {
  timeline: TimelineEvent[]
}

export function ClaimTimeline({ timeline }: ClaimTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='relative'>
          <div className='absolute left-4 top-0 h-full w-px bg-border' />
          <div className='space-y-6'>
            {timeline.map((event, index) => (
              <div key={index} className='relative flex items-start gap-4'>
                <div className='relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  <div className='h-2 w-2 rounded-full bg-current' />
                </div>
                <div className='flex-1 space-y-1 pb-6'>
                  <p className='text-sm text-muted-foreground'>
                    {(() => {
                      try {
                        return format(new Date(event.date), 'dd MMM yyyy')
                      } catch {
                        return event.date
                      }
                    })()}
                  </p>
                  <p className='text-sm font-medium'>{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

