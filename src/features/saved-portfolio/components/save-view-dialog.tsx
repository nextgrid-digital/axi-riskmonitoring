import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSavedPortfolioStore } from '@/stores/saved-portfolio-store'
import { useBondFilterStore } from '@/stores/bond-filter-store'
import { toast } from 'sonner'
import { Bookmark } from 'lucide-react'

interface SaveViewDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SaveViewDialog({ open: openProp, onOpenChange }: SaveViewDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [viewName, setViewName] = useState('')
  const saveView = useSavedPortfolioStore((state) => state.saveView)
  const filters = useBondFilterStore((state) => state.filters)

  const open = openProp ?? internalOpen
  const handleOpenChange = onOpenChange ?? setInternalOpen

  const handleSave = () => {
    if (!viewName.trim()) {
      toast.error('Please enter a view name')
      return
    }

    try {
      saveView(viewName.trim(), filters)
      toast.success(`View "${viewName.trim()}" saved successfully`)
      setViewName('')
      handleOpenChange(false)
    } catch (error) {
      toast.error('Failed to save view')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Bookmark className='mr-2 h-4 w-4' />
          Save Filter View
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Filter View</DialogTitle>
          <DialogDescription>
            Save your current filter settings for quick access later.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='view-name'>View Name</Label>
            <Input
              id='view-name'
              placeholder='e.g., My Custom View'
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave()
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save View</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

