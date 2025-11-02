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
import { contractorBondsColumns } from './contractor-bonds-columns'
import { useBondFilterStore } from '@/stores/bond-filter-store'
import type { ContractorBondSummary } from '../types'
import { useNavigate } from '@tanstack/react-router'

interface BondsTableProps {
  data: ContractorBondSummary[]
  onRowClick?: (summary: ContractorBondSummary) => void
}

export function BondsTable({ data, onRowClick }: BondsTableProps) {
  const navigate = useNavigate()
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<any[]>([])

  const filters = useBondFilterStore((state) => state.filters)

  // Apply filters to data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Beneficiary filter
      if (
        filters.beneficiary.length > 0 &&
        !item.beneficiary.split(', ').some(b => filters.beneficiary.includes(b.trim()))
      ) {
        return false
      }

      // Industry filter
      if (
        filters.industry.length > 0 &&
        !filters.industry.includes(item.industry)
      ) {
        return false
      }

      // State filter
      if (
        filters.state.length > 0 &&
        !filters.state.includes(item.state)
      ) {
        return false
      }

      // Bond Type filter
      if (
        filters.bondType.length > 0 &&
        !item.bondType.split(', ').some(bt => filters.bondType.includes(bt.trim()))
      ) {
        return false
      }

      // Tenor filter (check against all bonds)
      if (filters.tenor.length > 0) {
        let matches = false
        for (const bond of item.allBonds) {
          const bondTenorMonths = bond.tenor
          for (const range of filters.tenor) {
            if (range === 'Less than 6 months' && bondTenorMonths < 6) matches = true
            if (range === 'Between 6 months to 1 year' && bondTenorMonths >= 6 && bondTenorMonths < 12) matches = true
            if (range === 'Between 1-2 years' && bondTenorMonths >= 12 && bondTenorMonths < 24) matches = true
            if (range === 'Between 2-3 years' && bondTenorMonths >= 24 && bondTenorMonths < 36) matches = true
            if (range === 'Between 3-4 years' && bondTenorMonths >= 36 && bondTenorMonths < 48) matches = true
            if (range === 'Between 4-5 years' && bondTenorMonths >= 48 && bondTenorMonths < 60) matches = true
            if (range === 'More than 5 years' && bondTenorMonths >= 60) matches = true
          }
        }
        if (!matches) return false
      }

      // Exposure Amount filter
      if (filters.exposureAmount.length > 0) {
        const exposure = item.totalExposure
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

      // Internal Rating filter
      if (filters.internalRating.length > 0) {
        if (!filters.internalRating.includes(item.internalRating)) {
          return false
        }
      }

      // Reinsurance filter (exact match)
      if (
        filters.reinsurance.length > 0 &&
        !filters.reinsurance.includes(item.reinsurance as string)
      ) {
        return false
      }

      return true
    })
  }, [data, filters])

  const table = useReactTable({
    data: filteredData,
    columns: contractorBondsColumns,
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

  const handleRowClick = (summary: ContractorBondSummary) => {
    // Navigate to case detail page using first bond ID
    const firstBondId = summary.allBonds[0]?.id || summary.bondId
    navigate({
      to: '/case/$id',
      params: { id: firstBondId },
    })
    onRowClick?.(summary)
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
                        const summary = row.original
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
                                      handleRowClick(summary)
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
                      colSpan={contractorBondsColumns.length}
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

