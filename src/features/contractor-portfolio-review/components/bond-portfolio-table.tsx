import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/data-table'
import { bondPortfolioColumns } from './bond-portfolio-columns'
import { useBondFilterStore } from '@/stores/bond-filter-store'
import type { Bond } from '@/features/bonds/types'
import { useNavigate } from '@tanstack/react-router'

interface BondPortfolioTableProps {
  data: Bond[]
  onRowClick?: (bond: Bond) => void
}

export function BondPortfolioTable({ data, onRowClick }: BondPortfolioTableProps) {
  const navigate = useNavigate()
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<any[]>([])

  const filters = useBondFilterStore((state) => state.filters)

  // Apply filters to data
  const filteredData = useMemo(() => {
    return data.filter((bond) => {
      // Beneficiary filter
      if (
        filters.beneficiary.length > 0 &&
        !filters.beneficiary.includes(bond.beneficiary)
      ) {
        return false
      }

      // Industry filter
      if (
        filters.industry.length > 0 &&
        (!bond.industry || !filters.industry.includes(bond.industry))
      ) {
        return false
      }

      // State filter - bonds don't have state directly, skip for now
      // if (
      //   filters.state.length > 0 &&
      //   !filters.state.includes(bond.state)
      // ) {
      //   return false
      // }

      // Bond Type filter
      if (
        filters.bondType.length > 0 &&
        !filters.bondType.includes(bond.productType)
      ) {
        return false
      }

      // Tenor filter
      if (filters.tenor.length > 0) {
        const bondTenorMonths = bond.tenor
        let matches = false
        for (const range of filters.tenor) {
          if (range === 'Less than 6 months' && bondTenorMonths < 6) matches = true
          if (range === 'Between 6 months to 1 year' && bondTenorMonths >= 6 && bondTenorMonths < 12) matches = true
          if (range === 'Between 1-2 years' && bondTenorMonths >= 12 && bondTenorMonths < 24) matches = true
          if (range === 'Between 2-3 years' && bondTenorMonths >= 24 && bondTenorMonths < 36) matches = true
          if (range === 'Between 3-4 years' && bondTenorMonths >= 36 && bondTenorMonths < 48) matches = true
          if (range === 'Between 4-5 years' && bondTenorMonths >= 48 && bondTenorMonths < 60) matches = true
          if (range === 'More than 5 years' && bondTenorMonths >= 60) matches = true
        }
        if (!matches) return false
      }

      // Exposure Amount filter - use bondValue
      if (filters.exposureAmount.length > 0 && bond.bondValue !== undefined) {
        const exposure = bond.bondValue
        let matches = false
        for (const range of filters.exposureAmount) {
          if (range === '0-5 crore' && exposure >= 0 && exposure <= 5) matches = true
          if (range === '5-50 crore' && exposure > 5 && exposure <= 50) matches = true
          if (range === '50-100 crore' && exposure > 50 && exposure <= 100) matches = true
          if (range === '100-200 crore' && exposure > 100 && exposure <= 200) matches = true
          if (range === '200 crore and above' && exposure > 200) matches = true
        }
        if (!matches) return false
      }

      // Internal Rating filter - bonds don't have internal rating directly, skip for now

      // Reinsurance filter
      if (
        filters.reinsurance.length > 0 &&
        !filters.reinsurance.includes(bond.reinsurance as string)
      ) {
        return false
      }

      return true
    })
  }, [data, filters])

  const table = useReactTable({
    data: filteredData,
    columns: bondPortfolioColumns,
    state: {
      sorting,
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
      columnFilters,
      columnVisibility,
    },
    onPaginationChange: () => {},
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const handleRowClick = (bond: Bond) => {
    // Navigate to case detail page using bond ID
    navigate({
      to: '/case/$id',
      params: { id: bond.id },
    })
    onRowClick?.(bond)
  }

  return (
    <>
      <div className={cn('flex flex-1 flex-col gap-4')}>
        <div className='rounded-md border bg-white'>
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
                table.getRowModel().rows.map((row) => {
                  const bond = row.original
                  return (
                    <TableRow
                      key={row.id}
                      className='cursor-pointer hover:bg-muted/50'
                      onClick={(e) => {
                        // Don't open drawer if clicking on action buttons
                        const target = e.target as HTMLElement
                        if (target.closest('button')) {
                          return
                        }
                        handleRowClick(bond)
                      }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell
                            key={cell.id}
                            className={cn(cell.column.columnDef.meta?.className)}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={bondPortfolioColumns.length}
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
    </>
  )
}

