import { Main } from '@/components/layout/main'
import { ContractorHeader } from './components/contractor-header'
import { ContractorTabs } from './components/contractor-tabs'
import { ContractorExposureChart } from './components/contractor-exposure-chart'
import {
  getContractorById,
  getContractorBonds,
  getContractorAlerts,
  getContractorTasks,
  getContractorExposureTrend,
} from './data/contractor'
import { useParams, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Contractor() {
  const { id } = useParams({ from: '/_authenticated/contractor/$id' })
  const navigate = useNavigate()

  const contractor = getContractorById(id)
  const bonds = contractor ? getContractorBonds(id) : []
  const alerts = contractor ? getContractorAlerts(id) : []
  const tasks = contractor ? getContractorTasks(id) : []
  const exposureTrend = contractor ? getContractorExposureTrend(id) : []

  if (!contractor) {
    return (
      <>
        <Header fixed>
          <Search />
          <div className='ms-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ConfigDrawer />
            <ProfileDropdown />
          </div>
        </Header>
        <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold tracking-tight'>Contractor Not Found</h2>
            <p className='text-muted-foreground'>The requested contractor does not exist.</p>
            <Button
              variant='outline'
              onClick={() => navigate({ to: '/risk-monitoring/project/portfolio' })}
              className='mt-4'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Portfolio
            </Button>
          </div>
        </Main>
      </>
    )
  }

  return (
    <>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <Button
          variant='ghost'
          onClick={() => navigate({ to: '/risk-monitoring/project/portfolio' })}
          className='w-fit'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Portfolio
        </Button>

        <ContractorHeader contractor={contractor} />
        <ContractorExposureChart data={exposureTrend} />
        <ContractorTabs bonds={bonds} alerts={alerts} tasks={tasks} />
      </Main>
    </>
  )
}

