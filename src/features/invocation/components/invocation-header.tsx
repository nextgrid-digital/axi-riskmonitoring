import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Calendar, Clock } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import type { Invocation } from '../types'

interface InvocationHeaderProps {
  invocation: Invocation
}

export function InvocationHeader({ invocation }: InvocationHeaderProps) {
  let lastDate: Date
  let daysRemaining = 0
  
  try {
    lastDate = new Date(invocation.claim_window.last_permissible_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Normalize today to start of day
    lastDate.setHours(0, 0, 0, 0) // Normalize last date to start of day
    daysRemaining = differenceInDays(lastDate, today)
  } catch (error) {
    console.error('Error parsing date:', error)
    lastDate = new Date()
    daysRemaining = 0
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Defaults Detected':
        return 'destructive'
      case 'Under Review':
        return 'secondary'
      case 'Ready for Invocation':
        return 'default'
      default:
        return 'outline'
    }
  }

  const progressValue = daysRemaining > 0 ? (daysRemaining / 90) * 100 : 0

  return (
    <Card className='p-6'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div>
              <h2 className='text-2xl font-bold'>Case {invocation.case_id}</h2>
              <p className='text-sm text-muted-foreground mt-1'>Bond ID: {invocation.bond_id}</p>
            </div>
            <Badge variant={getStatusVariant(invocation.status)} className='text-sm'>
              {invocation.status}
            </Badge>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>
              {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Claim window expired'}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm text-muted-foreground'>
              Last permissible date: {format(lastDate, 'dd MMM yyyy')}
            </span>
          </div>
        </div>

        {daysRemaining > 0 && (
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-xs text-muted-foreground'>
              <span>Claim window countdown</span>
              <span>{daysRemaining} days</span>
            </div>
            <Progress value={progressValue} className='h-2' />
          </div>
        )}
      </div>
    </Card>
  )
}
