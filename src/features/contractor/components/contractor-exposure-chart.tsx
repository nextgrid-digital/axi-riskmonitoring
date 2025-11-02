import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { formatExposure } from '@/components/exposure-formatter'

interface ContractorExposureChartProps {
  data: { date: string; amount: number }[]
}

export function ContractorExposureChart({ data }: ContractorExposureChartProps) {
  const chartData = data.map((item) => ({
    date: format(new Date(item.date), 'MMM yyyy'),
    amount: item.amount,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exposure Trend</CardTitle>
        <CardDescription>Last 12 months exposure history</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='date'
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value.toFixed(0)}Cr`}
            />
            <Tooltip
              formatter={(value: number) => formatExposure(value)}
              labelStyle={{ color: '#000' }}
            />
            <Line
              type='monotone'
              dataKey='amount'
              stroke='currentColor'
              strokeWidth={2}
              className='stroke-primary'
              dot={{ fill: 'currentColor', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

