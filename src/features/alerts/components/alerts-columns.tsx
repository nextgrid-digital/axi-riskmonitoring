import { type ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { formatExposure } from '@/components/exposure-formatter'
import { Eye, CheckCircle2 } from 'lucide-react'
import type { Alert } from '../types'

interface AlertsColumnsProps {
  onViewAlert: (alert: Alert) => void
}

export function createAlertsColumns({ onViewAlert }: AlertsColumnsProps): ColumnDef<Alert>[] {
  return [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Alert ID' />
      ),
      cell: ({ row }) => (
        <div className='font-mono text-sm'>{row.getValue('id')}</div>
      ),
    },
    {
      accessorKey: 'contractor',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Contractor' />
      ),
      cell: ({ row }) => (
        <div className='font-medium'>{row.getValue('contractor')}</div>
      ),
    },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Type' />
      ),
      cell: ({ row }) => {
        const type = row.getValue('type') as string
        return <Badge variant='outline'>{type}</Badge>
      },
    },
    {
      accessorKey: 'trigger',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Trigger' />
      ),
      cell: ({ row }) => <div>{row.getValue('trigger')}</div>,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Date' />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue('date'))
        return <div>{date.toLocaleDateString('en-IN')}</div>
      },
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const alert = row.original
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onViewAlert(alert)}
          >
            <Eye className='mr-2 h-4 w-4' />
            {alert.action}
          </Button>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const variant =
          status === 'New'
            ? 'default'
            : status === 'In Progress'
              ? 'secondary'
              : 'outline'
        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: 'severity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Severity' />
      ),
      cell: ({ row }) => {
        const severity = row.getValue('severity') as string
        const variant =
          severity === 'Critical'
            ? 'destructive'
            : severity === 'High'
              ? 'default'
              : 'secondary'
        return <Badge variant={variant}>{severity}</Badge>
      },
    },
  ]
}

