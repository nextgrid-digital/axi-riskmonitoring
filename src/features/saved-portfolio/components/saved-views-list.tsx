import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSavedPortfolioStore } from '@/stores/saved-portfolio-store'
import { useBondFilterStore } from '@/stores/bond-filter-store'
import type { SavedView } from '../types'
import { Bookmark, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface SavedViewsListProps {
  selectedViewId?: string | null
  onViewSelect?: (viewId: string) => void
}

export function SavedViewsList({ selectedViewId, onViewSelect }: SavedViewsListProps) {
  const [views, setViews] = useState<SavedView[]>([])
  const getAllViews = useSavedPortfolioStore((state) => state.getAllViews)

  useEffect(() => {
    // Only access localStorage after component mounts
    try {
      setViews(getAllViews())
    } catch (error) {
      console.error('Error loading saved views:', error)
      setViews([])
    }
  }, [getAllViews])
  const loadView = useSavedPortfolioStore((state) => state.loadView)
  const deleteView = useSavedPortfolioStore((state) => state.deleteView)
  const applyFilters = useBondFilterStore((state) => state.applyFilters)

  const handleViewClick = (viewId: string) => {
    const filters = loadView(viewId)
    if (filters) {
      applyFilters(filters)
      toast.success('View loaded successfully')
      onViewSelect?.(viewId)
    } else {
      toast.error('Failed to load view')
    }
  }
  
  // Also update selected when views change and there's no selection yet
  useEffect(() => {
    if (views.length > 0 && !selectedViewId) {
      onViewSelect?.(views[0].id)
    }
  }, [views, selectedViewId, onViewSelect])

  const handleDelete = (e: React.MouseEvent, viewId: string, isPredefined: boolean) => {
    e.stopPropagation()
    if (isPredefined) {
      toast.info('Pre-defined views cannot be deleted')
      return
    }
    deleteView(viewId)
    toast.success('View deleted successfully')
  }

  return (
    <div className='space-y-2'>
      <h3 className='text-sm font-medium mb-3'>Saved Views</h3>
      {views.length === 0 ? (
        <p className='text-sm text-muted-foreground'>No saved views</p>
      ) : (
        <div className='space-y-1'>
          {views.map((view) => {
            const isSelected = selectedViewId === view.id
            return (
              <div
                key={view.id}
                className={cn(
                  'flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer transition-colors',
                  'group',
                  isSelected && 'bg-accent'
                )}
                onClick={() => handleViewClick(view.id)}
              >
                <div className='flex items-center gap-2 flex-1 min-w-0'>
                  <Bookmark className={cn('h-4 w-4 flex-shrink-0', isSelected ? 'text-foreground' : 'text-muted-foreground')} />
                  <span className={cn('text-sm truncate', isSelected && 'font-medium')}>{view.name}</span>
                </div>
                {!view.isPredefined && (
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity'
                    onClick={(e) => handleDelete(e, view.id, view.isPredefined)}
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

