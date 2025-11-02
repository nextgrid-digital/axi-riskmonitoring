import { Area, AreaChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ProgressDataPoint } from '../types'

interface ProgressChartProps {
  data: ProgressDataPoint[]
}

export function ProgressChart({ data }: ProgressChartProps) {
  return (
    <div className='space-y-4'>
      <div>
        <h3 className='text-lg font-semibold'>Progress & Timeline</h3>
      </div>
      <ResponsiveContainer width='100%' height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='colorProgress' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#60a5fa' stopOpacity={0.3} />
              <stop offset='95%' stopColor='#60a5fa' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='week' tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
            }}
            formatter={(value: number) => [`${value}%`, 'Progress']}
          />
          <Area
            type='monotone'
            dataKey='progress'
            stroke='#3b82f6'
            strokeWidth={2}
            fill='url(#colorProgress)'
          />
          <Line
            type='monotone'
            dataKey='progress'
            stroke='#3b82f6'
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Milestone Chips */}
      <div className='flex gap-2 overflow-x-auto pb-2'>
        {['Foundation', 'Rafting', 'Slab', 'Structural', 'Testing', 'Commissioning'].map(
          (milestone, index) => (
            <div
              key={milestone}
              className={`flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium ${
                index <= 2
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {milestone}
            </div>
          )
        )}
      </div>
    </div>
  )
}

