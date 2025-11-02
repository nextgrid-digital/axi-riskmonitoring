import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, Circle } from 'lucide-react'
import type { DocumentChecklistItem } from '../types'

interface ChecklistItem {
  item: string
  status: string
  date?: string
}

interface InvocationChecklistProps {
  checklist: ChecklistItem[]
}

export function InvocationChecklist({ checklist }: InvocationChecklistProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className='h-4 w-4 text-green-600' />
      case 'In Progress':
        return <Clock className='h-4 w-4 text-amber-600' />
      default:
        return <Circle className='h-4 w-4 text-muted-foreground' />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'secondary'
      case 'In Progress':
        return 'default'
      default:
        return 'outline'
    }
  }

  return (
    <div className='space-y-2'>
      <h3 className='text-lg font-semibold'>Document Checklist</h3>
      <div className='space-y-3'>
        {checklist.map((item, index) => (
          <div key={index} className='flex items-center justify-between p-3 border rounded-md'>
            <div className='flex items-center gap-3'>
              {getStatusIcon(item.status)}
              <span className='text-sm font-medium'>{item.item}</span>
            </div>
            <div className='flex items-center gap-2'>
              {item.date && (
                <span className='text-xs text-muted-foreground'>
                  {new Date(item.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
              <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

