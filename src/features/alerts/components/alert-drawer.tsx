import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatExposure } from '@/components/exposure-formatter'
import { CheckCircle2, ListTodo, ExternalLink } from 'lucide-react'
import type { Alert } from '../types'

interface AlertDrawerProps {
  alert: Alert
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AlertDrawer({ alert, open, onOpenChange }: AlertDrawerProps) {
  const navigate = useNavigate()
  const [isResolving, setIsResolving] = useState(false)

  const handleResolve = () => {
    setIsResolving(true)
    // TODO: Implement resolve logic
    setTimeout(() => {
      setIsResolving(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleAssignTask = () => {
    navigate({
      to: '/risk-monitoring/project/tasks',
      search: { alertId: alert.id },
    })
    onOpenChange(false)
  }

  const handleViewContractor = () => {
    navigate({
      to: '/contractor/$id',
      params: { id: alert.contractorId },
    })
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='right' className='w-full sm:max-w-2xl overflow-y-auto'>
        <div className='px-6 pb-6'>
          <SheetHeader className='px-0'>
            <SheetTitle>{alert.id}</SheetTitle>
            <SheetDescription>Alert Details</SheetDescription>
          </SheetHeader>

          <div className='mt-6 space-y-6'>
          {/* Alert Info */}
          <div className='space-y-4'>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Contractor</h3>
              <div className='mt-1 flex items-center justify-between'>
                <p className='text-sm font-medium'>{alert.contractor}</p>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleViewContractor}
                >
                  View <ExternalLink className='ml-2 h-3 w-3' />
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Type</h3>
              <Badge variant='outline' className='mt-1'>{alert.type}</Badge>
            </div>

            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Trigger</h3>
              <p className='mt-1 text-sm'>{alert.trigger}</p>
            </div>

            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Severity</h3>
              <Badge
                variant={
                  alert.severity === 'Critical'
                    ? 'destructive'
                    : alert.severity === 'High'
                      ? 'default'
                      : 'secondary'
                }
                className='mt-1'
              >
                {alert.severity}
              </Badge>
            </div>

            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Status</h3>
              <Badge
                variant={
                  alert.status === 'New'
                    ? 'default'
                    : alert.status === 'In Progress'
                      ? 'secondary'
                      : 'outline'
                }
                className='mt-1'
              >
                {alert.status}
              </Badge>
            </div>

            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Date</h3>
              <p className='mt-1 text-sm'>
                {new Date(alert.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Exposure</h3>
              <p className='mt-1 text-sm font-medium'>
                {formatExposure(alert.exposure)}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Description</h3>
              <p className='mt-1 text-sm'>{alert.description}</p>
            </div>
          </div>

          {/* Linked Bonds */}
          {alert.alertLinkedBonds && alert.alertLinkedBonds.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className='text-sm font-medium text-muted-foreground mb-2'>
                  Linked Bonds / Projects
                </h3>
                <div className='space-y-2'>
                  {alert.alertLinkedBonds.map((bond) => (
                    <div
                      key={bond.bondId}
                      className='rounded-md border p-3 text-sm'
                    >
                      <div className='font-medium'>{bond.projectName}</div>
                      <div className='text-xs text-muted-foreground mt-1'>
                        {bond.bondId} • {formatExposure(bond.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Suggested Tasks */}
          <Separator />
          <div>
            <h3 className='text-sm font-medium text-muted-foreground mb-2'>
              Suggested Tasks
            </h3>
            <div className='space-y-2'>
              <div className='rounded-md border p-3 text-sm'>
                <div className='flex items-start justify-between'>
                  <div>
                    <div className='font-medium'>Top-up Collateral</div>
                    <div className='text-xs text-muted-foreground mt-1'>
                      Review and request additional collateral
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleAssignTask}
                  >
                    <ListTodo className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <Separator />
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={handleAssignTask}
              className='flex-1'
            >
              <ListTodo className='mr-2 h-4 w-4' />
              Assign Task
            </Button>
            <Button
              onClick={handleResolve}
              disabled={isResolving}
              className='flex-1'
            >
              <CheckCircle2 className='mr-2 h-4 w-4' />
              {isResolving ? 'Resolving...' : 'Resolve'}
            </Button>
          </div>
        </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

