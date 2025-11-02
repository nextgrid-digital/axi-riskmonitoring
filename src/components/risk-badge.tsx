import { RiskBand } from '@/features/portfolio/types'
import { cn } from '@/lib/utils'

interface RiskBadgeProps {
  riskBand: RiskBand
  className?: string
}

export function RiskBadge({ riskBand, className }: RiskBadgeProps) {
  const colors = {
    [RiskBand.RED]: 'bg-red-500',
    [RiskBand.AMBER]: 'bg-amber-500',
    [RiskBand.GREEN]: 'bg-green-500',
  } as const

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn('h-4 w-4 rounded-full', colors[riskBand])} title={riskBand} />
    </div>
  )
}

