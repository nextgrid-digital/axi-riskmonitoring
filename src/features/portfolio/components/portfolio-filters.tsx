import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import { usePortfolioFilterStore } from '@/stores/portfolio-filter-store'
import {
  RiskBand,
  ContractorRating,
  ProductType,
  ProjectType,
  Vintage,
} from '../types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function PortfolioFilters() {
  const filters = usePortfolioFilterStore((state) => state.filters)
  const setGeography = usePortfolioFilterStore((state) => state.setGeography)
  const setRating = usePortfolioFilterStore((state) => state.setRating)
  const setProductType = usePortfolioFilterStore((state) => state.setProductType)
  const setProjectType = usePortfolioFilterStore((state) => state.setProjectType)
  const setBondTenure = usePortfolioFilterStore((state) => state.setBondTenure)
  const setBeneficiary = usePortfolioFilterStore((state) => state.setBeneficiary)
  const setVintage = usePortfolioFilterStore((state) => state.setVintage)
  const setRiskBand = usePortfolioFilterStore((state) => state.setRiskBand)
  const resetFilters = usePortfolioFilterStore((state) => state.resetFilters)

  const geographyOptions = ['North', 'South', 'East', 'West', 'Central']
  const beneficiaryOptions = [
    'NHAI',
    'NTPC',
    'Railways',
    'Gujarat Energy',
    'BMRCL',
    'Assam PWD',
    'Hyderabad Metro',
    'Maharashtra SEB',
    'Delhi Metro',
    'Odisha PWD',
    'APGENCO',
  ]

  const hasActiveFilters = useMemo(() => {
    return (
      filters.geography.length > 0 ||
      filters.rating.length > 0 ||
      filters.productType.length > 0 ||
      filters.projectType.length > 0 ||
      filters.bondTenure[0] > 0 ||
      filters.bondTenure[1] < 36 ||
      filters.beneficiary.length > 0 ||
      filters.vintage.length > 0 ||
      filters.riskBand.length > 0
    )
  }, [filters])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <Filter className='mr-2 h-4 w-4' />
          Filters
          {hasActiveFilters && (
            <span className='ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground'>
              {[
                filters.geography.length,
                filters.rating.length,
                filters.productType.length,
                filters.projectType.length,
                filters.beneficiary.length,
                filters.vintage.length,
                filters.riskBand.length,
              ].reduce((sum, val) => sum + val, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[400px] overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Portfolio Filters</SheetTitle>
          <SheetDescription>
            Filter contractors by geography, rating, product type, and more.
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-6'>
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

          {/* Contractor Rating */}
          <div>
            <Label className='mb-2 block'>Contractor Rating</Label>
            <div className='space-y-2'>
              {Object.values(ContractorRating).map((rating) => (
                <div key={rating} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating.includes(rating)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setRating([...filters.rating, rating])
                      } else {
                        setRating(filters.rating.filter((r) => r !== rating))
                      }
                    }}
                  />
                  <Label htmlFor={`rating-${rating}`} className='cursor-pointer'>
                    {rating}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Product Type */}
          <div>
            <Label className='mb-2 block'>Product Type</Label>
            <div className='space-y-2'>
              {Object.values(ProductType).map((type) => (
                <div key={type} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`product-${type}`}
                    checked={filters.productType.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProductType([...filters.productType, type])
                      } else {
                        setProductType(
                          filters.productType.filter((t) => t !== type)
                        )
                      }
                    }}
                  />
                  <Label htmlFor={`product-${type}`} className='cursor-pointer'>
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Project Type */}
          <div>
            <Label className='mb-2 block'>Project Type</Label>
            <div className='space-y-2'>
              {Object.values(ProjectType).map((type) => (
                <div key={type} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`project-${type}`}
                    checked={filters.projectType.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProjectType([...filters.projectType, type])
                      } else {
                        setProjectType(
                          filters.projectType.filter((t) => t !== type)
                        )
                      }
                    }}
                  />
                  <Label htmlFor={`project-${type}`} className='cursor-pointer'>
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Bond Tenure */}
          <div>
            <Label className='mb-2 block'>
              Bond Tenure: {filters.bondTenure[0]} - {filters.bondTenure[1]} months
            </Label>
            <div className='flex gap-2'>
              <Input
                type='number'
                min={0}
                max={36}
                value={filters.bondTenure[0]}
                onChange={(e) =>
                  setBondTenure([Number(e.target.value), filters.bondTenure[1]])
                }
                className='w-20'
              />
              <Input
                type='number'
                min={0}
                max={36}
                value={filters.bondTenure[1]}
                onChange={(e) =>
                  setBondTenure([filters.bondTenure[0], Number(e.target.value)])
                }
                className='w-20'
              />
            </div>
          </div>

          {/* Beneficiary */}
          <div>
            <Label className='mb-2 block'>Beneficiary</Label>
            <div className='space-y-2 max-h-40 overflow-y-auto'>
              {beneficiaryOptions.map((beneficiary) => (
                <div key={beneficiary} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`beneficiary-${beneficiary}`}
                    checked={filters.beneficiary.includes(beneficiary)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setBeneficiary([...filters.beneficiary, beneficiary])
                      } else {
                        setBeneficiary(
                          filters.beneficiary.filter((b) => b !== beneficiary)
                        )
                      }
                    }}
                  />
                  <Label
                    htmlFor={`beneficiary-${beneficiary}`}
                    className='cursor-pointer'
                  >
                    {beneficiary}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Vintage */}
          <div>
            <Label className='mb-2 block'>Vintage</Label>
            <div className='space-y-2'>
              {Object.values(Vintage).map((vintage) => (
                <div key={vintage} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`vintage-${vintage}`}
                    checked={filters.vintage.includes(vintage)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setVintage([...filters.vintage, vintage])
                      } else {
                        setVintage(
                          filters.vintage.filter((v) => v !== vintage)
                        )
                      }
                    }}
                  />
                  <Label htmlFor={`vintage-${vintage}`} className='cursor-pointer'>
                    {vintage}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Band */}
          <div>
            <Label className='mb-2 block'>Risk Band</Label>
            <div className='space-y-2'>
              {Object.values(RiskBand).map((band) => (
                <div key={band} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`risk-${band}`}
                    checked={filters.riskBand.includes(band)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setRiskBand([...filters.riskBand, band])
                      } else {
                        setRiskBand(filters.riskBand.filter((b) => b !== band))
                      }
                    }}
                  />
                  <Label htmlFor={`risk-${band}`} className='cursor-pointer'>
                    {band}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button
              variant='outline'
              onClick={resetFilters}
              className='w-full'
            >
              Reset Filters
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

