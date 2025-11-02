import { type ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { RiskBadge } from '@/components/risk-badge'
import { formatExposure } from '@/components/exposure-formatter'
import { Button } from '@/components/ui/button'
import { ArrowRight, AlertCircle, ListTodo } from 'lucide-react'
import type { PortfolioItem } from '../types'

function ContractorLink({ contractorId, contractor }: { contractorId: string; contractor: string }) {
  return (
    <Link
      to='/contractor/$id'
      params={{ id: contractorId }}
      className='inline-flex items-center font-medium hover:underline'
    >
      {contractor}
      <ArrowRight className='ml-2 h-3 w-3' />
    </Link>
  )
}

export const portfolioColumns: ColumnDef<PortfolioItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'contractor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Contractor' />
    ),
    cell: ({ row }) => {
      return (
        <ContractorLink contractorId={row.original.contractorId} contractor={row.getValue('contractor') as string} />
      )
    },
  },
  {
    accessorKey: 'projects',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Projects' />
    ),
    cell: ({ row }) => <div className='text-center'>{row.getValue('projects')}</div>,
  },
  {
    accessorKey: 'exposure',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Exposure' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{formatExposure(row.getValue('exposure'))}</div>
    ),
  },
  {
    accessorKey: 'riskBand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Risk Band' />
    ),
    cell: ({ row }) => <RiskBadge riskBand={row.getValue('riskBand')} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'alerts',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Alerts' />
    ),
    cell: ({ row }) => {
      const alerts = row.original.alerts
      return (
        <div className='flex items-center gap-2'>
          {alerts > 0 && <AlertCircle className='h-4 w-4 text-destructive' />}
          <span>{alerts}</span>
        </div>
      )
    },
  },
  {
    id: 'tasks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tasks' />
    ),
    cell: ({ row }) => {
      const tasks = row.original.tasks
      return (
        <div className='flex items-center gap-2'>
          {tasks > 0 && <ListTodo className='h-4 w-4 text-primary' />}
          <span>{tasks}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'lastReview',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Review' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('lastReview'))
      return <div>{date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
    },
  },
  {
    accessorKey: 'nextDue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Next Due' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('nextDue'))
      return <div>{date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('status')}</div>
    ),
  },
]

