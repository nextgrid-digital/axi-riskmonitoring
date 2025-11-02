import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  FileText,
  DollarSign,
  Edit,
  Search,
  MessageSquare,
} from 'lucide-react'
import { toast } from 'sonner'

export function ActionDrawer() {
  const handleAction = (actionName: string) => {
    toast.success(`${actionName} request submitted successfully.`)
  }

  const actions = [
    {
      label: 'Request Extension',
      icon: FileText,
      onClick: () => handleAction('Extension'),
    },
    {
      label: 'Top-up Collateral',
      icon: DollarSign,
      onClick: () => handleAction('Collateral top-up'),
    },
    {
      label: 'Scope Change',
      icon: Edit,
      onClick: () => handleAction('Scope change'),
    },
    {
      label: 'Site Inspection',
      icon: Search,
      onClick: () => handleAction('Site inspection'),
    },
    {
      label: 'Reinsurance Consult',
      icon: MessageSquare,
      onClick: () => handleAction('Reinsurance consultation'),
    },
  ]

  return (
    <Card className='p-6'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Actions</h3>
        <div className='space-y-2'>
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant='outline'
                className='w-full justify-start'
                onClick={action.onClick}
              >
                <Icon className='mr-2 h-4 w-4' />
                {action.label}
              </Button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

