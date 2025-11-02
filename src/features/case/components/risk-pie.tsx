import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Badge } from '@/components/ui/badge'
import type { RiskDistribution } from '../types'

interface RiskPieProps {
  data: RiskDistribution[]
}

const COLORS: Record<string, string> = {
  'Payment Delays': '#ef4444',
  'Site Issues': '#f97316',
  'Collateral': '#22c55e',
  'Other': '#94a3b8',
}

export function RiskPie({ data }: RiskPieProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Risk Analysis</h3>
        <Badge variant='outline'>{data.length} Active Risks</Badge>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
        <ResponsiveContainer width='100%' height={200}>
          <PieChart>
            <Pie
              data={data as any}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey='value'
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.type] || '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
              formatter={(value: number) => [`${value}%`, '']}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className='space-y-2'>
          {data.map((item) => {
            const color = COLORS[item.type] || '#94a3b8'
            const isPayment = item.type === 'Payment Delays'
            const isSite = item.type === 'Site Issues'
            const isCollateral = item.type === 'Collateral'

            return (
              <div key={item.type} className='flex items-center gap-2'>
                <div
                  className='w-4 h-4 rounded-full flex-shrink-0'
                  style={{ backgroundColor: color }}
                />
                <span className='text-sm flex-1'>{item.type}</span>
                <Badge
                  variant={isPayment ? 'destructive' : isSite ? 'default' : isCollateral ? 'secondary' : 'outline'}
                  className='text-xs'
                >
                  {item.value}%
                </Badge>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

