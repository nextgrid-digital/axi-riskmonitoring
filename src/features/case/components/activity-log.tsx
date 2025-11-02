import { format } from 'date-fns'
import { User, AlertTriangle } from 'lucide-react'
import type { ActivityLogEntry } from '../types'

interface ActivityLogProps {
  entries: ActivityLogEntry[]
}

const getActorIcon = (actor: string) => {
  if (actor === 'System') {
    return <AlertTriangle className='h-4 w-4 text-orange-500' />
  }
  return <User className='h-4 w-4 text-blue-500' />
}

export function ActivityLog({ entries }: ActivityLogProps) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Activity Log</h3>
      <div className='relative'>
        {/* Timeline Line */}
        <div className='absolute left-4 top-0 bottom-0 w-0.5 bg-border' />

        <ul className='space-y-4'>
          {entries.map((entry, index) => (
            <li key={index} className='relative pl-10'>
              {/* Timeline Dot */}
              <div className='absolute left-0 top-1.5'>
                <div className='h-3 w-3 rounded-full bg-primary border-2 border-background' />
              </div>

              {/* Content */}
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  {getActorIcon(entry.actor)}
                  <span className='text-sm font-medium'>{entry.actor}</span>
                  <span className='text-xs text-muted-foreground'>
                    {format(new Date(entry.date), 'dd MMM')}
                  </span>
                </div>
                <p className='text-sm text-muted-foreground'>{entry.action}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

