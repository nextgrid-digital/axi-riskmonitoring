import { createFileRoute } from '@tanstack/react-router'
import { Invocation } from '@/features/invocation'

export const Route = createFileRoute('/_authenticated/case/$id/invocation/')({
  component: InvocationPage,
})

function InvocationPage() {
  const { id } = Route.useParams()
  console.log('InvocationPage rendering with id:', id)
  
  return <Invocation caseId={id} />
}
