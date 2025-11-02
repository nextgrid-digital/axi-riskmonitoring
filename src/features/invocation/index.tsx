import { Main } from '@/components/layout/main'
import { Card } from '@/components/ui/card'
import { InvocationHeader } from './components/invocation-header'
import { InvocationBreadcrumb } from './components/invocation-breadcrumb'
import { ClaimWindowCard } from './components/claim-window'
import { ClaimTimeline } from './components/claim-timeline'
import { DocumentChecklist } from './components/document-checklist'
import { MonetaryAccounting } from './components/monetary-accounting'
import { MonetaryChart } from './components/monetary-chart'
import { InvocationActions } from './components/invocation-actions'
import { DownloadSection } from './components/download-section'
import { getInvocationForCase } from './data/invocation'

interface InvocationProps {
  caseId: string
}

export function Invocation({ caseId }: InvocationProps) {
  console.log('Invocation component rendering with caseId:', caseId)
  
  try {
    const invocationData = getInvocationForCase(caseId)
    console.log('Invocation data loaded:', invocationData)

    if (!invocationData) {
      return (
        <Main className='flex flex-1 flex-col gap-6'>
          <div className='text-center py-12'>
            <h2 className='text-2xl font-bold mb-2'>Invocation Data Not Found</h2>
            <p className='text-muted-foreground'>Unable to load invocation data for case: {caseId}</p>
          </div>
        </Main>
      )
    }

    return (
      <Main className='flex flex-1 flex-col gap-6'>
        <InvocationBreadcrumb caseId={invocationData.case_id} />
        <InvocationHeader invocation={invocationData} />

        {/* Claim Window & Timeline */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <ClaimWindowCard claimWindow={invocationData.claim_window} />
          <ClaimTimeline timeline={invocationData.timeline} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column - Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            <Card className='p-6'>
              <DocumentChecklist checklist={invocationData.document_checklist} />
            </Card>

            <MonetaryAccounting monetary={invocationData.monetary_accounting} />
            <MonetaryChart monetary={invocationData.monetary_accounting} />
          </div>

          {/* Right Column - Actions & Output */}
          <div className='space-y-6'>
            <Card className='p-6'>
              <InvocationActions actions={invocationData.actions} />
            </Card>
            <DownloadSection />
          </div>
        </div>
      </Main>
    )
  } catch (error) {
    console.error('Error rendering Invocation:', error)
    return (
      <Main className='flex flex-1 flex-col gap-6'>
        <div className='text-center py-12'>
          <h2 className='text-2xl font-bold mb-2'>Error Loading Invocation</h2>
          <p className='text-muted-foreground'>{error instanceof Error ? error.message : 'Unknown error'}</p>
          <pre className='mt-4 text-xs text-left bg-muted p-4 rounded'>
            {error instanceof Error ? error.stack : String(error)}
          </pre>
        </div>
      </Main>
    )
  }
}
