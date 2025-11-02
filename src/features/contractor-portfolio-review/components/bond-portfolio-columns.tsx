import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatExposure } from '@/components/exposure-formatter'
import type { Bond } from '@/features/bonds/types'
import { format } from 'date-fns'
import { useNavigate } from '@tanstack/react-router'

// Bond Type Cell Component
function BondTypeCell({ bondType }: { bondType: string }) {
  const navigate = useNavigate()
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row click
    navigate({
      to: '/risk-monitoring/project-monitoring',
    })
  }
  
  // Get color classes based on bond type for pill styling
  const getBondTypePillStyle = (type: string) => {
    const lowerType = type.toLowerCase()
    if (lowerType.includes('bid')) {
      return 'bg-green-100 text-green-700 hover:bg-green-200 border-green-300' // Green for Bid
    } else if (lowerType.includes('performance')) {
      return 'bg-red-100 text-red-700 hover:bg-red-200 border-red-300' // Red for Performance
    } else if (lowerType.includes('advance')) {
      return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300' // Blue for Advance
    } else if (lowerType.includes('retention')) {
      return 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300' // Purple for Retention
    } else if (lowerType.includes('customs')) {
      return 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300' // Orange for Customs
    } else {
      return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-300' // Default indigo for others
    }
  }
  
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer ${getBondTypePillStyle(bondType)}`}
      type='button'
    >
      {bondType}
    </button>
  )
}

export const bondPortfolioColumns: ColumnDef<Bond>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond Id' />
    ),
    cell: ({ row }) => (
      <div className='font-mono text-sm'>{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'beneficiary',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Beneficiary name' />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('beneficiary')}</div>
    ),
  },
  {
    accessorKey: 'industry',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Industry' />
    ),
    cell: ({ row }) => {
      const industry = row.getValue('industry') as string | undefined
      return <div>{industry || 'EPC / Infrastructure'}</div>
    },
  },
  {
    accessorKey: 'projectName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Project name' />
    ),
    cell: ({ row }) => {
      const projectName = row.getValue('projectName') as string | undefined
      return <div>{projectName || '-'}</div>
    },
  },
  {
    accessorKey: 'productType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond type' />
    ),
    cell: ({ row }) => {
      const bondType = row.getValue('productType') as string
      return <BondTypeCell bondType={bondType} />
    },
  },
  {
    accessorKey: 'bondValue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond value' />
    ),
    cell: ({ row }) => {
      const bondValue = row.getValue('bondValue') as number | undefined
      if (bondValue === undefined) {
        // Fallback: estimate from claimPeriodRemaining or use placeholder
        return <div>{formatExposure(1.0)}</div>
      }
      return <div>{formatExposure(bondValue)}</div>
    },
  },
  {
    accessorKey: 'bondStartDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond start date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('bondStartDate') as string | undefined
      const lastUpdate = row.original.lastUpdate
      const dateToUse = date || lastUpdate
      try {
        return <div>{format(new Date(dateToUse), 'dd-MMM-yyyy')}</div>
      } catch {
        return <div>{dateToUse}</div>
      }
    },
  },
  {
    accessorKey: 'bondEndDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond end date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('bondEndDate') as string | undefined
      const milestoneDueDate = row.original.milestoneDueDate
      const dateToUse = date || milestoneDueDate
      try {
        return <div>{format(new Date(dateToUse), 'dd-MMM-yyyy')}</div>
      } catch {
        return <div>{dateToUse}</div>
      }
    },
  },
  {
    accessorKey: 'tenor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bond Tenor' />
    ),
    cell: ({ row }) => {
      const tenor = row.getValue('tenor') as number
      return <div>{tenor} months</div>
    },
  },
  {
    accessorKey: 'premiumRate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Premium rate' />
    ),
    cell: ({ row }) => {
      const premiumRate = row.getValue('premiumRate') as number | undefined
      if (premiumRate === undefined) {
        // Default premium rate based on bond type or risk
        return <div>1.5%</div>
      }
      return <div>{premiumRate.toFixed(2)}%</div>
    },
  },
  {
    accessorKey: 'premiumAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Premium amount' />
    ),
    cell: ({ row }) => {
      const premiumAmount = row.getValue('premiumAmount') as number | undefined
      const bondValue = row.original.bondValue
      const premiumRate = row.original.premiumRate
      
      if (premiumAmount !== undefined) {
        return <div>₹{premiumAmount.toLocaleString('en-IN')}</div>
      }
      
      // Calculate from bond value and premium rate
      if (bondValue !== undefined && premiumRate !== undefined) {
        const calculated = (bondValue * premiumRate / 100) * 10000000 // Convert crore to rupees
        return <div>₹{calculated.toLocaleString('en-IN')}</div>
      }
      
      // Fallback
      return <div>₹45,000</div>
    },
  },
  {
    accessorKey: 'marginMoney',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Margin money' />
    ),
    cell: ({ row }) => {
      const marginMoney = row.getValue('marginMoney') as number | undefined
      if (marginMoney !== undefined) {
        return <div>₹{marginMoney.toLocaleString('en-IN')}</div>
      }
      // Fallback: typically 5-10% of bond value
      const bondValue = row.original.bondValue
      if (bondValue !== undefined) {
        const calculated = (bondValue * 0.05) * 10000000 // 5% of bond value in rupees
        return <div>₹{calculated.toLocaleString('en-IN')}</div>
      }
      return <div>₹50,000</div>
    },
  },
]

