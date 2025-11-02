import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BondAmendment } from '@/features/case/components/bond-amendment'
import { ProgressMonitoring } from '@/features/case/components/progress-monitoring'
import { TaskTimelineEscalation } from '@/features/case/components/task-timeline-escalation'
import { bonds } from '@/features/bonds/data/bonds'

export const Route = createFileRoute('/_authenticated/risk-monitoring/project-monitoring/')({
  component: ProjectMonitoringPage,
})

function ProjectMonitoringPage() {
  // Use the first bond as default, or 'PAB4048' if available
  const defaultBondId = bonds.find(b => b.id === 'PAB4048')?.id || bonds[0]?.id || 'PAB4048'

  return (
    <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>ABC Holdings - Project : Rafting Works</h2>
      </div>

      {/* Tabs */}
      <Tabs defaultValue='progress-monitoring' className='w-full'>
        <TabsList>
          <TabsTrigger value='progress-monitoring'>Progress Monitoring</TabsTrigger>
          <TabsTrigger value='bond-amendment'>Bond Amendment</TabsTrigger>
          <TabsTrigger value='task-timeline'>Task Timeline and Escalation</TabsTrigger>
        </TabsList>

        <TabsContent value='progress-monitoring' className='space-y-4'>
          <ProgressMonitoring bondId={defaultBondId} />
        </TabsContent>

        <TabsContent value='bond-amendment' className='space-y-4'>
          <BondAmendment bondId={defaultBondId} />
        </TabsContent>

        <TabsContent value='task-timeline' className='space-y-4'>
          <TaskTimelineEscalation bondId={defaultBondId} />
        </TabsContent>
      </Tabs>
    </Main>
  )
}

