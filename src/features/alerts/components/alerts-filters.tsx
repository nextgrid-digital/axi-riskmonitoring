import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useAlertFilterStore } from '@/stores/alert-filter-store'
import { AlertSeverity } from '../types'
import { Filter } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function AlertsFilters() {
  const filters = useAlertFilterStore((state) => state.filters)
  const setSeverity = useAlertFilterStore((state) => state.setSeverity)
  const setContractor = useAlertFilterStore((state) => state.setContractor)
  const setGeography = useAlertFilterStore((state) => state.setGeography)
  const setTimeframe = useAlertFilterStore((state) => state.setTimeframe)
  const resetFilters = useAlertFilterStore((state) => state.resetFilters)

  const geographyOptions = ['North', 'South', 'East', 'West', 'Central']
  const contractorOptions = [
    'ABC Infrastructure Ltd',
    'XYZ Infrastructure Pvt Ltd',
    'RITES Limited',
    'Adani Power Limited',
    'L&T Construction',
    'IRCON International',
    'GMR Infrastructure',
    'NHAI Projects Ltd',
    'Reliance Infrastructure',
    'Tata Projects',
    'Essar Projects India',
    'GVK Power & Infrastructure',
  ]

  const hasActiveFilters =
    filters.severity.length > 0 ||
    filters.contractor.length > 0 ||
    filters.geography.length > 0 ||
    filters.timeframe.startDate !== null ||
    filters.timeframe.endDate !== null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <Filter className='mr-2 h-4 w-4' />
          Filters
          {hasActiveFilters && (
            <span className='ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground'>
              {[
                filters.severity.length,
                filters.contractor.length,
                filters.geography.length,
              ].reduce((sum, val) => sum + val, 0) +
                (filters.timeframe.startDate ? 1 : 0) +
                (filters.timeframe.endDate ? 1 : 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[400px] overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Alert Filters</SheetTitle>
          <SheetDescription>
            Filter alerts by severity, contractor, geography, and timeframe.
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-6'>
          {/* Severity */}
          <div>
            <Label className='mb-2 block'>Severity</Label>
            <div className='space-y-2'>
              {Object.values(AlertSeverity).map((severity) => (
                <div key={severity} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`severity-${severity}`}
                    checked={filters.severity.includes(severity)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSeverity([...filters.severity, severity])
                      } else {
                        setSeverity(
                          filters.severity.filter((s) => s !== severity)
                        )
                      }
                    }}
                  />
                  <Label htmlFor={`severity-${severity}`} className='cursor-pointer'>
                    {severity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Contractor */}
          <div>
            <Label className='mb-2 block'>Contractor</Label>
            <div className='space-y-2 max-h-40 overflow-y-auto'>
              {contractorOptions.map((contractor) => (
                <div key={contractor} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`contractor-${contractor}`}
                    checked={filters.contractor.includes(contractor)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setContractor([...filters.contractor, contractor])
                      } else {
                        setContractor(
                          filters.contractor.filter((c) => c !== contractor)
                        )
                      }
                    }}
                  />
                  <Label
                    htmlFor={`contractor-${contractor}`}
                    className='cursor-pointer text-sm'
                  >
                    {contractor}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Geography */}
          <div>
            <Label className='mb-2 block'>Geography</Label>
            <div className='space-y-2'>
              {geographyOptions.map((geo) => (
                <div key={geo} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`geo-${geo}`}
                    checked={filters.geography.includes(geo)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setGeography([...filters.geography, geo])
                      } else {
                        setGeography(filters.geography.filter((g) => g !== geo))
                      }
                    }}
                  />
                  <Label htmlFor={`geo-${geo}`} className='cursor-pointer'>
                    {geo}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Timeframe */}
          <div>
            <Label className='mb-2 block'>Timeframe</Label>
            <div className='space-y-2'>
              <div>
                <Label htmlFor='start-date' className='text-xs text-muted-foreground'>
                  Start Date
                </Label>
                <Input
                  id='start-date'
                  type='date'
                  value={filters.timeframe.startDate || ''}
                  onChange={(e) =>
                    setTimeframe({
                      ...filters.timeframe,
                      startDate: e.target.value || null,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor='end-date' className='text-xs text-muted-foreground'>
                  End Date
                </Label>
                <Input
                  id='end-date'
                  type='date'
                  value={filters.timeframe.endDate || ''}
                  onChange={(e) =>
                    setTimeframe({
                      ...filters.timeframe,
                      endDate: e.target.value || null,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button variant='outline' onClick={resetFilters} className='w-full'>
              Reset Filters
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

