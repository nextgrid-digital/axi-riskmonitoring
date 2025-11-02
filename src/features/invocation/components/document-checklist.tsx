import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CheckCircle2, Circle, Upload } from 'lucide-react'
import type { DocumentChecklistItem } from '../types'

interface DocumentChecklistProps {
  checklist: DocumentChecklistItem[]
}

export function DocumentChecklist({ checklist }: DocumentChecklistProps) {
  const receivedCount = checklist.filter((item) => item.status === 'Received').length
  const progressValue = (receivedCount / checklist.length) * 100

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Document Checklist</h3>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>{receivedCount}/{checklist.length} Received</span>
          <Progress value={progressValue} className='w-32 h-2' />
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checklist.map((item, index) => {
              const isReceived = item.status === 'Received'
              return (
                <TableRow key={index}>
                  <TableCell className='font-medium'>{item.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={isReceived ? 'secondary' : 'outline'}
                      className={isReceived ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}
                    >
                      <div className='flex items-center gap-1.5'>
                        {isReceived ? (
                          <CheckCircle2 className='h-3 w-3' />
                        ) : (
                          <Circle className='h-3 w-3' />
                        )}
                        {item.status}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button variant='outline' size='sm'>
                      <Upload className='mr-2 h-3 w-3' />
                      {isReceived ? 'Replace' : 'Upload'}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

