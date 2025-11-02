import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, AlertCircle, FileText, Save, ListTodo } from 'lucide-react'
import type { PortfolioItem } from '../types'

interface PortfolioBulkActionsProps {
  table: Table<PortfolioItem>
}

export function PortfolioBulkActions({ table }: PortfolioBulkActionsProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateTask = () => {
    setIsLoading(true)
    // TODO: Implement create task logic
    setTimeout(() => {
      setIsLoading(false)
      table.resetRowSelection()
    }, 1000)
  }

  const handleAddCustomAlert = () => {
    setIsLoading(true)
    // TODO: Implement add custom alert logic
    setTimeout(() => {
      setIsLoading(false)
      table.resetRowSelection()
    }, 1000)
  }

  const handleBulkUpdateRemarks = () => {
    setIsLoading(true)
    // TODO: Implement bulk update remarks logic
    setTimeout(() => {
      setIsLoading(false)
      table.resetRowSelection()
    }, 1000)
  }

  const handleSaveFilterView = () => {
    // TODO: Implement save filter view logic
  }

  return (
    <div className='flex items-center gap-2'>
      {selectedRows.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' disabled={isLoading}>
              <Plus className='mr-2 h-4 w-4' />
              Bulk Actions ({selectedRows.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>
              {selectedRows.length} contractor{selectedRows.length > 1 ? 's' : ''}{' '}
              selected
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCreateTask}>
              <ListTodo className='mr-2 h-4 w-4' />
              Create Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddCustomAlert}>
              <AlertCircle className='mr-2 h-4 w-4' />
              Add Custom Alert
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleBulkUpdateRemarks}>
              <FileText className='mr-2 h-4 w-4' />
              Bulk Update Remarks
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <Button variant='outline' size='sm' onClick={handleSaveFilterView}>
        <Save className='mr-2 h-4 w-4' />
        Save Filter View
      </Button>
    </div>
  )
}

