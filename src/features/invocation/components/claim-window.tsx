import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import type { ClaimWindow } from '../types'

interface ClaimWindowProps {
  claimWindow: ClaimWindow
}

export function ClaimWindowCard({ claimWindow }: ClaimWindowProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Window</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Last Permissible Date</span>
          </div>
          <p className='text-sm text-muted-foreground pl-6'>
            {(() => {
              try {
                return format(new Date(claimWindow.last_permissible_date), 'dd MMM yyyy')
              } catch {
                return claimWindow.last_permissible_date
              }
            })()}
          </p>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Notice Period</span>
          </div>
          <p className='text-sm text-muted-foreground pl-6'>{claimWindow.notice_period}</p>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <CheckCircle2 className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Holiday Rules</span>
          </div>
          <Badge variant='secondary' className='ml-6'>
            {claimWindow.holiday_rules}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

