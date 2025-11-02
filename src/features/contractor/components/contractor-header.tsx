import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatExposure } from '@/components/exposure-formatter'
import type { Contractor } from '../types'

interface ContractorHeaderProps {
  contractor: Contractor
}

export function ContractorHeader({ contractor }: ContractorHeaderProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>{contractor.name}</h2>
          <div className='mt-2 flex items-center gap-3'>
            <Badge variant='outline'>Rating: {contractor.rating}</Badge>
            <Badge variant='secondary'>{contractor.geography}</Badge>
          </div>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardContent className='pt-6'>
            <div className='text-sm font-medium text-muted-foreground'>
              Total Exposure
            </div>
            <div className='mt-1 text-2xl font-bold'>
              {formatExposure(contractor.totalExposure)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-sm font-medium text-muted-foreground'>
              Active Projects
            </div>
            <div className='mt-1 text-2xl font-bold'>
              {contractor.activeProjects}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-sm font-medium text-muted-foreground'>
              Completed Projects
            </div>
            <div className='mt-1 text-2xl font-bold'>
              {contractor.completedProjects}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-sm font-medium text-muted-foreground'>
              Employees
            </div>
            <div className='mt-1 text-2xl font-bold'>
              {contractor.employeeCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardContent className='pt-6'>
            <div className='text-sm font-medium text-muted-foreground'>
              Contact Person
            </div>
            <div className='mt-1 font-medium'>{contractor.contactPerson}</div>
            <div className='text-sm text-muted-foreground'>{contractor.email}</div>
            <div className='text-sm text-muted-foreground'>{contractor.phone}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-sm font-medium text-muted-foreground'>Address</div>
            <div className='mt-1 text-sm'>{contractor.address}</div>
            <div className='mt-2 text-xs text-muted-foreground'>
              Established: {contractor.established}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

