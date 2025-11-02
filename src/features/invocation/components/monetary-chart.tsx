import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import type { MonetaryAccounting } from '../types'

interface MonetaryChartProps {
  monetary: MonetaryAccounting
}

export function MonetaryChart({ monetary }: MonetaryChartProps) {
  const data = [
    {
      name: 'Amount (Cr)',
      'Liquidated Damages': monetary.lds,
      'Set-offs': monetary.setoffs,
      'Net Claimable': monetary.net_claimable,
    },
  ]

  return (
    <Card>
      <CardContent className='pt-6'>
        <h4 className='text-sm font-medium mb-4'>Monetary Overview</h4>
        <ResponsiveContainer width='100%' height={200}>
          <BarChart data={data} layout='vertical'>
            <XAxis type='number' hide />
            <YAxis dataKey='name' type='category' hide />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
              formatter={(value: number) => [`₹${value.toFixed(1)} Cr`, '']}
            />
            <Legend />
            <Bar dataKey='Liquidated Damages' stackId='a' fill='#ef4444' radius={[0, 4, 4, 0]} />
            <Bar dataKey='Set-offs' stackId='a' fill='#f97316' radius={[0, 4, 4, 0]} />
            <Bar dataKey='Net Claimable' stackId='a' fill='#22c55e' radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

