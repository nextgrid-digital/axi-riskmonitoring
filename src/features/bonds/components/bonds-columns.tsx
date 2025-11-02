import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { RiskBadge } from '@/components/risk-badge'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Bond } from '../types'
import { format } from 'date-fns'

export const bondsColumns: ColumnDef<Bond>[] = [
  {
    accessorKey: 'bondNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('bondNumber')}</div>
    ),
  },
  {
    accessorKey: 'progress',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Progress%' />
    ),
    cell: ({ row }) => {
      const progress = row.getValue('progress') as number
      return (
        <div className='flex items-center gap-2 w-32'>
          <Progress value={progress} className='flex-1' />
          <span className='text-sm font-medium w-12 text-right'>{progress}%</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'lastUpdate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Update' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('lastUpdate'))
      return <div>{format(date, 'dd-MMM')}</div>
    },
  },
  {
    accessorKey: 'nextMilestone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Next Milest' />
    ),
    cell: ({ row }) => {
      const bond = row.original
      return (
        <div>
          <div className='font-medium'>{bond.nextMilestone}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'delay',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Delay' />
    ),
    cell: ({ row }) => {
      const delay = row.getValue('delay') as number
      const isNegative = delay < 0
      const isPositive = delay > 0
      return (
        <div className={cn(
          'font-medium',
          isNegative && 'text-green-600',
          isPositive && 'text-red-600',
          !isNegative && !isPositive && 'text-muted-foreground'
        )}>
          {isNegative ? '-' : '+'}{Math.abs(delay)}d
        </div>
      )
    },
  },
  {
    accessorKey: 'riskBand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='G/A/R' />
    ),
    cell: ({ row }) => <RiskBadge riskBand={row.getValue('riskBand')} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'invoke',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Invoke' />
    ),
    cell: ({ row }) => {
      const invoke = row.getValue('invoke') as boolean
      return (
        <Badge variant={invoke ? 'destructive' : 'secondary'}>
          {invoke ? 'Yes' : 'No'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'dispute',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dispute' />
    ),
    cell: ({ row }) => {
      const bond = row.original
      const dispute = row.getValue('dispute') as boolean
      const riskBand = bond.riskBand
      
      const variantMap = {
        'Red': 'destructive',
        'Amber': 'default',
        'Green': 'secondary',
      } as const
      
      return (
        <Badge variant={dispute ? (variantMap[riskBand] || 'default') : 'secondary'} className='font-normal'>
          {dispute ? 'Yes' : 'No'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'premium',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Premium' />
    ),
    cell: ({ row }) => {
      const premium = row.getValue('premium') as string
      const variant = premium === 'Paid' ? 'secondary' : 'destructive'
      return (
        <Badge variant={variant}>{premium}</Badge>
      )
    },
  },
  {
    id: 'actions',
    header: 'Action',
    cell: () => {
      return (
        <div className='flex items-center gap-1'>
          <Button variant='ghost' size='sm' className='h-7 px-2 text-xs'>
            Open
          </Button>
          <span className='text-muted-foreground'>|</span>
          <Button variant='ghost' size='sm' className='h-7 px-2 text-xs'>
            Amend
          </Button>
        </div>
      )
    },
  },
]

