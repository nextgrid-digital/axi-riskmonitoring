import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatExposure } from '@/components/exposure-formatter'
import type { ContractorBondSummary } from '../types'
import { format } from 'date-fns'

export const contractorBondsColumns: ColumnDef<ContractorBondSummary>[] = [
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
  {
    accessorKey: 'creditRating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Credit rating' />
    ),
    cell: ({ row }) => {
      const rating = row.getValue('creditRating') as string
      // Map ratings to badge variants
      let variant: 'default' | 'secondary' | 'destructive' = 'default'
      if (rating === 'AAA' || rating === 'AA' || rating === 'A') {
        variant = 'secondary'
      } else if (rating === 'C' || rating === 'D') {
        variant = 'destructive'
      }
      return (
        <Badge variant={variant}>{rating}</Badge>
      )
    },
  },
  {
    accessorKey: 'state',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='State' />
    ),
    cell: ({ row }) => {
      const state = row.getValue('state') as string
      // Convert state from normalized format (e.g., "tamil-nadu") to display format (e.g., "Tamil Nadu")
      const displayState = state
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return <div>{displayState}</div>
    },
  },
  {
    accessorKey: 'totalExposure',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total exposure (INR crore)' />
    ),
    cell: ({ row }) => {
      const exposure = row.getValue('totalExposure') as number
      return <div className='font-medium'>{formatExposure(exposure)}</div>
    },
  },
  {
    accessorKey: 'totalBondsIssued',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total number of bonds issued' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('totalBondsIssued')}</div>
    ),
  },
  {
    accessorKey: 'reinsurance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reinsurance' />
    ),
    cell: ({ row }) => {
      const reinsurance = row.getValue('reinsurance') as string
      const colorClass = {
        "On NIA's net (%)": 'bg-blue-500',
        'On Reinsurance (%)': 'bg-purple-500',
      }[reinsurance] || 'bg-gray-500'
      return (
        <Badge variant='outline' className={`border-none ${colorClass} text-white`}>
          {reinsurance}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'bondType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond type' />
    ),
    cell: ({ row }) => {
      const bondType = row.getValue('bondType') as string
      return <div>{bondType}</div>
    },
  },
  {
    accessorKey: 'beneficiary',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Beneficiary' />
    ),
    cell: ({ row }) => {
      const beneficiary = row.getValue('beneficiary') as string
      return <div>{beneficiary}</div>
    },
  },
  {
    accessorKey: 'bondStartDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond start date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('bondStartDate') as string
      try {
        return <div>{format(new Date(date), 'dd-MMM-yyyy')}</div>
      } catch {
        return <div>{date}</div>
      }
    },
  },
  {
    accessorKey: 'bondEndDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond end date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('bondEndDate') as string
      try {
        return <div>{format(new Date(date), 'dd-MMM-yyyy')}</div>
      } catch {
        return <div>{date}</div>
      }
    },
  },
]
