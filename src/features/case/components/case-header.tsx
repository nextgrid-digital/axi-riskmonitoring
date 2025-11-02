import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import type { Case } from '../types'

interface CaseHeaderProps {
  caseData: Case
}

export function CaseHeader({ caseData }: CaseHeaderProps) {
  const { metrics } = caseData
  const exposurePercentage = (metrics.exposure / metrics.limit) * 100

  const getStatusBadge = () => {
    if (caseData.status === 'At Risk') {
      return <Badge variant='destructive'>{caseData.status}</Badge>
    }
    if (caseData.status === 'Amber') {
      return <Badge variant='default'>{caseData.status}</Badge>
    }
    return <Badge variant='secondary'>{caseData.status}</Badge>
  }

  return (
    <div className='space-y-4'>
      {/* Case Title & Status */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <h2 className='text-2xl font-bold'>{caseData.project_name}</h2>
          {getStatusBadge()}
        </div>
        <div className='text-sm text-muted-foreground'>
          <span>Case {caseData.case_id}</span>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {/* Delay Metric */}
        <Card className='p-4'>
          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>Delay</p>
            <div className='flex items-center gap-2'>
              <span className='text-2xl font-bold'>+{metrics.delay_days}d</span>
              <Badge variant='destructive' className='text-xs'>Overdue</Badge>
            </div>
          </div>
        </Card>

        {/* LD Risk Metric */}
        <Card className='p-4'>
          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>LD Risk</p>
            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold'>{metrics.ld_risk}%</span>
              </div>
              <Progress value={metrics.ld_risk} className='h-2' />
            </div>
          </div>
        </Card>

        {/* Exposure/Limit Metric */}
        <Card className='p-4'>
          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>Exposure/Limit</p>
            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold'>
                  {metrics.exposure}/{metrics.limit}
                </span>
              </div>
              <Progress value={exposurePercentage} className='h-2' />
              <p className='text-xs text-muted-foreground'>{exposurePercentage.toFixed(1)}% utilized</p>
            </div>
          </div>
        </Card>

        {/* Next Milestone Metric */}
        <Card className='p-4'>
          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>Next Milestone</p>
            <div className='flex items-center gap-2'>
              <Calendar className='h-5 w-5 text-muted-foreground' />
              <span className='text-lg font-semibold'>
                {format(new Date(metrics.next_milestone_date), 'dd MMM')}
              </span>
            </div>
            <p className='text-xs text-muted-foreground'>
              {format(new Date(metrics.next_milestone_date), 'EEE, dd MMM yyyy')}
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
