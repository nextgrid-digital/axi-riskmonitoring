import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { FileText, Search, Send, Shield } from 'lucide-react'

interface InvocationActionsProps {
  actions: string[]
}

export function InvocationActions({ actions }: InvocationActionsProps) {
  const handleAction = (action: string) => {
    // Map action names to toast messages
    const actionMessages: Record<string, string> = {
      'Issue cure notice': 'Cure notice issued',
      'Appoint surveyor': 'Surveyor appointment triggered',
      'Draft response': 'Response draft initiated',
      'Trigger recovery playbook': 'Recovery playbook triggered',
    }
    const message = actionMessages[action] || `${action} action triggered`
    toast.success(message)
  }

  const getIcon = (action: string) => {
    if (action.toLowerCase().includes('notice')) return <Send className='mr-2 h-4 w-4' />
    if (action.toLowerCase().includes('surveyor')) return <Search className='mr-2 h-4 w-4' />
    if (action.toLowerCase().includes('response')) return <FileText className='mr-2 h-4 w-4' />
    if (action.toLowerCase().includes('playbook')) return <Shield className='mr-2 h-4 w-4' />
    return null
  }

  return (
    <div className='space-y-2'>
      <h3 className='text-lg font-semibold'>Actions & Decisions</h3>
      <div className='flex flex-col gap-2'>
        {actions.map((action, index) => (
          <Button
            key={index}
            variant='outline'
            className='w-full justify-start'
            onClick={() => handleAction(action)}
          >
            {getIcon(action)}
            {action}
          </Button>
        ))}
      </div>
    </div>
  )
}
