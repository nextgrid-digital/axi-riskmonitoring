import { Button } from '@/components/ui/button'
import { Table2, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TasksViewToggleProps {
  view: 'table' | 'kanban'
  onViewChange: (view: 'table' | 'kanban') => void
}

export function TasksViewToggle({ view, onViewChange }: TasksViewToggleProps) {
  return (
    <div className='flex items-center gap-2 rounded-md border p-1'>
      <Button
        variant={view === 'table' ? 'secondary' : 'ghost'}
        size='sm'
        onClick={() => onViewChange('table')}
        className={cn(
          'h-8 px-3',
          view === 'table' && 'bg-background shadow-sm'
        )}
      >
        <Table2 className='mr-2 h-4 w-4' />
        Table
      </Button>
      <Button
        variant={view === 'kanban' ? 'secondary' : 'ghost'}
        size='sm'
        onClick={() => onViewChange('kanban')}
        className={cn(
          'h-8 px-3',
          view === 'kanban' && 'bg-background shadow-sm'
        )}
      >
        <LayoutGrid className='mr-2 h-4 w-4' />
        Kanban
      </Button>
    </div>
  )
}

