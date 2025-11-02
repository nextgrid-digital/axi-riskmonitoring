import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBondFilterStore } from '@/stores/bond-filter-store'
import { useMemo } from 'react'
import { bonds } from '../data/bonds'

const BENEFICIARIES = [
  'NTPC',
  'NHAI',
  'BHEL',
  'PGCIL',
  'Mecon Limited',
  'BEML',
  'BRO',
  'PWD',
  'NHIDCL',
  'NHPC',
].sort()

const STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
].sort()

const BOND_TYPES = [
  'Bid',
  'Performance',
  'Material',
  'Advance',
  'Retention',
]

const TENOR_RANGES = [
  'Less than 6 months',
  'Between 6 months to 1 year',
  'Between 1-2 years',
  'Between 2-3 years',
  'Between 3-4 years',
  'Between 4-5 years',
  'More than 5 years',
]

const EXPOSURE_AMOUNT_RANGES = [
  '0-5 crore',
  '5-50 crore',
  '50-100 crore',
  '100-200 crore',
  '200 crore and above',
]

const INTERNAL_RATINGS = [
  'CRISIL AAA (highest safety)',
  'CRISIL AA (high safety)',
  'CRISIL A (adequate safety)',
  'CRISIL BBB (moderate safety)',
  'CRISIL BB (moderate risk)',
  'CRISIL B (high risk)',
  'CRISIL C (very high risk)',
  'CRISIL D (default)',
]

const REINSURANCE_OPTIONS = [
  "On NIA's net (%)",
  'On Reinsurance (%)',
]

const INDUSTRY_TYPES = [
  'Agro Chemical',
  'Agro Processing',
  'Apparel',
  'Auto / Auto Ancillary',
  'Aviation',
  'B2B E-Com',
  'Beverages',
  'Capital Goods',
  'Cement',
  'Chemicals',
  'Civil',
  'Consulting',
  'Consumer Durables',
  'D2C E-Com',
  'Education',
  'Electrical Equipment',
  'EPC / Infrastructure',
  'Finance',
  'FMCG',
  'FOOD',
  'Govt - Admin',
  'Govt - Bene',
  'Govt - Ecosystem',
  'Govt - Regulator',
  'Healthcare',
  'Implementation Services',
  'Industrial Automation',
  'Insurance',
  'IT Distribution',
  'IT/Tech',
  'Jewellery',
  'Logistics',
  'Manufacturing',
  'Medical Equipment',
  'Metals',
  'Mining',
  'Oil & Gas',
  'Others',
  'Packaging',
  'Pharmaceuticals',
  'Real Estate',
  'SaaS',
  'Sanitary Wares',
  'Steel',
  'Trading/Distribution',
  'Transportation',
  'Construction',
  'Security Services',
  'Media',
  'Hospitality',
  'Manpower Supply',
  'Shipping',
  'Power',
  'Renewable Energy',
  'Industrial Machinery',
  'Defence',
  'Engineering',
].sort()

export function BondFilters() {
  const filters = useBondFilterStore((state) => state.filters)
  const setBeneficiary = useBondFilterStore((state) => state.setBeneficiary)
  const setIndustry = useBondFilterStore((state) => state.setIndustry)
  const setState = useBondFilterStore((state) => state.setState)
  const setBondType = useBondFilterStore((state) => state.setBondType)
  const setTenor = useBondFilterStore((state) => state.setTenor)
  const setExposureAmount = useBondFilterStore((state) => state.setExposureAmount)
  const setInternalRating = useBondFilterStore((state) => state.setInternalRating)
  const setReinsurance = useBondFilterStore((state) => state.setReinsurance)


  return (
    <div className='w-48 space-y-2 pr-3 border-r max-h-[calc(100vh-8rem)] overflow-y-auto'>
      {/* Filters Heading */}
      <h3 className='text-xs font-mono font-medium uppercase text-muted-foreground tracking-wider mb-3'>
        Filters
      </h3>

      {/* Beneficiary */}
      <div>
        <Label className='mb-1.5 block text-sm'>Beneficiary</Label>
        <Select
          value={filters.beneficiary.length > 0 ? filters.beneficiary[0] : undefined}
          onValueChange={(value) => {
            if (value && value !== 'all') {
              setBeneficiary([value])
            } else {
              setBeneficiary([])
            }
          }}
        >
          <SelectTrigger className='h-9 text-sm w-full'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {BENEFICIARIES.map((beneficiary) => (
              <SelectItem key={beneficiary} value={beneficiary}>
                {beneficiary}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Industry */}
      <div>
        <Label className='mb-1.5 block text-sm'>Industry</Label>
        <Select
          value={filters.industry.length > 0 ? filters.industry[0] : undefined}
          onValueChange={(value) => {
            if (value && value !== 'all') {
              setIndustry([value])
            } else {
              setIndustry([])
            }
          }}
        >
          <SelectTrigger className='h-9 text-sm w-full'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent className='max-h-[300px]'>
            <SelectItem value='all'>All</SelectItem>
            {INDUSTRY_TYPES.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* State */}
      <div>
        <Label className='mb-1.5 block text-sm'>State</Label>
        <Select
          value={filters.state.length > 0 ? filters.state[0] : undefined}
          onValueChange={(value) => {
            if (value && value !== 'all') {
              setState([value])
            } else {
              setState([])
            }
          }}
        >
          <SelectTrigger className='h-9 text-sm w-full'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent className='max-h-[300px]'>
            <SelectItem value='all'>All</SelectItem>
            {STATES.map((state) => (
              <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bond Type */}
      <div>
        <Label className='mb-1.5 block text-sm'>Bond Type</Label>
        <Select
          value={filters.bondType.length > 0 ? filters.bondType[0] : undefined}
          onValueChange={(value) => {
            if (value && value !== 'all') {
              setBondType([value])
            } else {
              setBondType([])
            }
          }}
        >
          <SelectTrigger className='h-9 text-sm w-full'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {BOND_TYPES.map((bondType) => (
              <SelectItem key={bondType} value={bondType}>
                {bondType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tenor */}
      <div>
        <Label className='mb-1.5 block text-sm'>Tenor</Label>
        <Select
          value={filters.tenor.length > 0 ? filters.tenor[0] : undefined}
          onValueChange={(value) => {
            if (value && value !== 'all') {
              setTenor([value])
            } else {
              setTenor([])
            }
          }}
        >
          <SelectTrigger className='h-9 text-sm w-full'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {TENOR_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Exposure Amount */}
      <div>
        <Label className='mb-1.5 block text-sm'>Exposure Amount</Label>
        <Select
          value={filters.exposureAmount.length > 0 ? filters.exposureAmount[0] : undefined}
          onValueChange={(value) => {
            if (value && value !== 'all') {
              setExposureAmount([value])
            } else {
              setExposureAmount([])
            }
          }}
        >
          <SelectTrigger className='h-9 text-sm w-full'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {EXPOSURE_AMOUNT_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Internal Rating */}
      <div>
        <Label className='mb-1.5 block text-sm'>Internal Rating</Label>
        <Select
          value={filters.internalRating.length > 0 ? filters.internalRating[0] : undefined}
          onValueChange={(value) => {
            if (value && value !== 'all') {
              setInternalRating([value])
            } else {
              setInternalRating([])
            }
          }}
        >
          <SelectTrigger className='h-9 text-sm w-full'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {INTERNAL_RATINGS.map((rating) => {
              // Color code based on rating level
              let colorClass = 'bg-gray-500'
              if (rating.includes('CRISIL AAA') || rating.includes('CRISIL AA')) {
                colorClass = 'bg-green-500'
              } else if (rating.includes('CRISIL A (adequate') || rating.includes('CRISIL BBB')) {
                colorClass = 'bg-yellow-500'
              } else if (rating.includes('CRISIL BB') || rating.includes('CRISIL B (high')) {
                colorClass = 'bg-orange-500'
              } else if (rating.includes('CRISIL C') || rating.includes('CRISIL D')) {
                colorClass = 'bg-red-500'
              }
              
              return (
                <SelectItem key={rating} value={rating}>
                  <div className='flex items-center gap-2'>
                    <div className={`h-3 w-3 rounded-full ${colorClass}`} />
                    <span>{rating}</span>
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Reinsurance */}
      <div>
        <Label className='mb-1.5 block text-sm'>Reinsurance</Label>
        <Select
          value={filters.reinsurance.length > 0 ? filters.reinsurance[0] : undefined}
          onValueChange={(value) => {
            if (value && value !== 'all') {
              setReinsurance([value])
            } else {
              setReinsurance([])
            }
          }}
        >
          <SelectTrigger className='h-9 text-sm w-full'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {REINSURANCE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}