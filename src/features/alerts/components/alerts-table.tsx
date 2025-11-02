import { useState, useMemo } from 'react'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/data-table'
import { createAlertsColumns } from './alerts-columns'
import { useAlertFilterStore } from '@/stores/alert-filter-store'
import type { Alert } from '../types'
import { AlertDrawer } from './alert-drawer'

interface AlertsTableProps {
  data: Alert[]
}

export function AlertsTable({ data }: AlertsTableProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const filters = useAlertFilterStore((state) => state.filters)

  // Apply filters
  const filteredData = useMemo(() => {
    return data.filter((alert) => {
      if (
        filters.severity.length > 0 &&
        !filters.severity.includes(alert.severity)
      ) {
        return false
      }
      if (
        filters.contractor.length > 0 &&
        !filters.contractor.includes(alert.contractor)
      ) {
        return false
      }
      if (
        filters.geography.length > 0 &&
        !filters.geography.includes(alert.geography)
      ) {
        return false
      }
      if (filters.timeframe.startDate) {
        const alertDate = new Date(alert.date)
        const startDate = new Date(filters.timeframe.startDate)
        if (alertDate < startDate) return false
      }
      if (filters.timeframe.endDate) {
        const alertDate = new Date(alert.date)
        const endDate = new Date(filters.timeframe.endDate)
        if (alertDate > endDate) return false
      }
      return true
    })
  }, [data, filters])

  const columns = useMemo(
    () =>
      createAlertsColumns({
        onViewAlert: (alert) => {
          setSelectedAlert(alert)
          setIsDrawerOpen(true)
        },
      }),
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      rowSelection,
      columnVisibility,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      <div className={cn('flex flex-1 flex-col gap-4')}>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>

      {selectedAlert && (
        <AlertDrawer
          alert={selectedAlert}
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        />
      )}
    </>
  )
}

