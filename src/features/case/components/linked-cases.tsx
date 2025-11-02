import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import type { LinkedCase } from '../types'

interface LinkedCasesProps {
  linkedCases: LinkedCase[]
  caseId?: string
}

export function LinkedCases({ linkedCases, caseId }: LinkedCasesProps) {
  const navigate = useNavigate()

  const handleNavigate = (type: string, id: string) => {
    if (type === 'Invocation') {
      // Navigate to invocation readiness page using case ID
      // Use provided caseId or default for prototype
      const targetCaseId = caseId || 'MC-2025-001'
      navigate({
        to: '/case/$id/invocation',
        params: { id: targetCaseId },
      })
    } else {
      // For disputes or other types, you can add navigation logic here
      console.log(`Navigate to ${type}: ${id}`)
    }
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Linked Cases</h3>
      <div className='space-y-2'>
        {linkedCases.map((linkedCase) => (
          <div
            key={linkedCase.id}
            className='flex items-center justify-between p-3 rounded-md border'
          >
            <div className='flex items-center gap-2'>
              <Badge
                variant={linkedCase.type === 'Dispute' ? 'destructive' : 'default'}
              >
                {linkedCase.type}
              </Badge>
              <span className='text-sm font-medium'>{linkedCase.id}</span>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => handleNavigate(linkedCase.type, linkedCase.id)}
            >
              <ExternalLink className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
