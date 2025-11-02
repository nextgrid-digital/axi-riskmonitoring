import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, Bell, ListTodo, AlertCircle } from 'lucide-react'
import type { PortfolioMetrics } from '../types'

interface PortfolioMetricsProps {
  metrics: PortfolioMetrics
}

export function PortfolioMetrics({ metrics }: PortfolioMetricsProps) {
  const formatRupee = (amount: number) => `₹${amount.toFixed(1)} Cr`

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Active Risk</CardTitle>
          <TrendingUp className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatRupee(metrics.totalActiveRisk)}</div>
          <p className='text-xs text-muted-foreground'>Across all contractors</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Contractors Under Watch</CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{metrics.contractorsUnderWatch}</div>
          <p className='text-xs text-muted-foreground'>With active alerts or tasks</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Alerts Triggered</CardTitle>
          <Bell className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{metrics.alertsTriggered}</div>
          <p className='text-xs text-muted-foreground'>Active alerts</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Tasks Open</CardTitle>
          <ListTodo className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{metrics.tasksOpen}</div>
          <p className='text-xs text-muted-foreground'>Pending tasks</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Risk Expiring Soon</CardTitle>
          <AlertCircle className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatRupee(metrics.riskExpiringSoon)}</div>
          <p className='text-xs text-muted-foreground'>Next 90 days</p>
        </CardContent>
      </Card>
    </div>
  )
}

