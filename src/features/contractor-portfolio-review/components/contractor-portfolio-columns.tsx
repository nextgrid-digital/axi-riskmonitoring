import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatExposure } from '@/components/exposure-formatter'
import type { ContractorBondSummary } from '@/features/bonds/types'

export const contractorPortfolioColumns: ColumnDef<ContractorBondSummary>[] = [
  {
    accessorKey: 'panNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Contractor ID' />
    ),
    cell: ({ row }) => (
      <div className='font-mono text-sm'>{row.getValue('panNumber')}</div>
    ),
  },
  {
    accessorKey: 'contractorName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Contractor Name' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('contractorName')}</div>
    ),
  },
  {
    accessorKey: 'industry',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Industry' />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('industry')}</div>
    ),
  },
  {
    accessorKey: 'annualTurnover',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Annual Turnover' />
    ),
    cell: ({ row }) => {
      const turnover = row.getValue('annualTurnover') as number
      return <div>{formatExposure(turnover)}</div>
    },
  },
  {
    accessorKey: 'creditDefault',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Credit default' />
    ),
    cell: ({ row }) => {
      const hasDefault = row.getValue('creditDefault') as boolean
      return (
        <Badge
          variant={hasDefault ? 'destructive' : 'secondary'}
          className={hasDefault ? 'bg-red-500' : 'bg-green-500'}
        >
          {hasDefault ? 'Yes' : 'No'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'creditInsuranceDefault',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Credit insurance default' />
    ),
    cell: ({ row }) => {
      const hasDefault = row.getValue('creditInsuranceDefault') as boolean
      return (
        <Badge
          variant={hasDefault ? 'destructive' : 'secondary'}
          className={hasDefault ? 'bg-red-500' : 'bg-green-500'}
        >
          {hasDefault ? 'Yes' : 'No'}
        </Badge>
      )
    },
  },
]

