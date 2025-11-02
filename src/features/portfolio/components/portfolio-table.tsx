import { useState, useMemo } from 'react'
import {
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
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
import { PortfolioBulkActions } from './portfolio-bulk-actions'
import { portfolioColumns } from './portfolio-columns'
import { usePortfolioFilterStore } from '@/stores/portfolio-filter-store'
import type { PortfolioItem } from '../types'

interface PortfolioTableProps {
  data: PortfolioItem[]
}

export function PortfolioTable({ data }: PortfolioTableProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const filters = usePortfolioFilterStore((state) => state.filters)

  // Apply filters to data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Geography filter
      if (
        filters.geography.length > 0 &&
        !filters.geography.includes(item.geography)
      ) {
        return false
      }

      // Rating filter
      if (filters.rating.length > 0 && !filters.rating.includes(item.rating)) {
        return false
      }

      // Product Type filter
      if (
        filters.productType.length > 0 &&
        !filters.productType.includes(item.productType)
      ) {
        return false
      }

      // Project Type filter
      if (
        filters.projectType.length > 0 &&
        !filters.projectType.includes(item.projectType)
      ) {
        return false
      }

      // Bond Tenure filter
      if (
        item.bondTenure < filters.bondTenure[0] ||
        item.bondTenure > filters.bondTenure[1]
      ) {
        return false
      }

      // Beneficiary filter
      if (
        filters.beneficiary.length > 0 &&
        !filters.beneficiary.includes(item.beneficiary)
      ) {
        return false
      }

      // Vintage filter
      if (
        filters.vintage.length > 0 &&
        !filters.vintage.includes(item.vintage)
      ) {
        return false
      }

      // Risk Band filter
      if (
        filters.riskBand.length > 0 &&
        !filters.riskBand.includes(item.riskBand)
      ) {
        return false
      }

      return true
    })
  }, [data, filters])

  const table = useReactTable({
    data: filteredData,
    columns: portfolioColumns,
    state: {
      sorting,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    enableRowSelection: true,
    onPaginationChange: () => {},
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className={cn('flex flex-1 flex-col gap-4')}>
      <PortfolioBulkActions table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={header.column.columnDef.meta?.className}
                    >
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
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className}
                    >
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
                  colSpan={portfolioColumns.length}
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
  )
}

