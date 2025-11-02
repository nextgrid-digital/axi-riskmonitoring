import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Financials, CaseMetrics } from '../types'

interface FinancialSnapshotProps {
  financials: Financials
  metrics: CaseMetrics
}

export function FinancialSnapshot({ financials, metrics }: FinancialSnapshotProps) {
  // Parse exposure and limit from exposure_limit string or use metrics
  const exposure = metrics.exposure
  const limit = metrics.limit
  const exposurePercentage = (exposure / limit) * 100

  // Mock data for mini charts
  const exposureData = [
    { name: 'Used', value: exposure },
    { name: 'Available', value: limit - exposure },
  ]

  const collateralData = [
    { name: 'Posted', value: 80 },
    { name: 'Required', value: 100 },
  ]

  const premiumData = [
    { name: 'Paid', value: 0 },
    { name: 'Due', value: 100 },
  ]

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Financial Snapshot</h3>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* Exposure vs Limit */}
        <Card className='p-4'>
          <div className='space-y-3'>
            <p className='text-sm text-muted-foreground'>Exposure vs Limit</p>
            <ResponsiveContainer width='100%' height={80}>
              <BarChart data={exposureData} layout='vertical'>
                <XAxis type='number' hide />
                <YAxis type='category' dataKey='name' hide />
                <Tooltip />
                <Bar dataKey='value' fill='#3b82f6' radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className='text-xs text-muted-foreground'>
              {exposure}/{limit} ({exposurePercentage.toFixed(1)}%)
            </p>
          </div>
        </Card>

        {/* Collateral Posted vs Required */}
        <Card className='p-4'>
          <div className='space-y-3'>
            <p className='text-sm text-muted-foreground'>Collateral</p>
            <ResponsiveContainer width='100%' height={80}>
              <BarChart data={collateralData} layout='vertical'>
                <XAxis type='number' hide />
                <YAxis type='category' dataKey='name' hide />
                <Tooltip />
                <Bar dataKey='value' fill='#22c55e' radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <Badge variant={financials.collateral === 'OK' ? 'secondary' : 'default'}>
              {financials.collateral}
            </Badge>
          </div>
        </Card>

        {/* Premium Paid vs Due */}
        <Card className='p-4'>
          <div className='space-y-3'>
            <p className='text-sm text-muted-foreground'>Premium</p>
            <ResponsiveContainer width='100%' height={80}>
              <BarChart data={premiumData} layout='vertical'>
                <XAxis type='number' hide />
                <YAxis type='category' dataKey='name' hide />
                <Tooltip />
                <Bar dataKey='value' fill='#ef4444' radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <Badge variant={financials.premium === 'Due' ? 'destructive' : 'secondary'}>
              {financials.premium}
            </Badge>
          </div>
        </Card>
      </div>

      {/* Status Pills */}
      <div className='flex gap-2 flex-wrap'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>Premium:</span>
          <Badge variant={financials.premium === 'Due' ? 'destructive' : 'secondary'}>
            {financials.premium}
          </Badge>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>Collateral:</span>
          <Badge variant={financials.collateral === 'OK' ? 'secondary' : 'default'}>
            {financials.collateral}
          </Badge>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>Claim Period:</span>
          <Badge variant='outline'>{financials.claim_period_end}</Badge>
        </div>
      </div>
    </div>
  )
}
