import { createFileRoute } from '@tanstack/react-router'
import { Case as CaseComponent } from '@/features/case'

export const Route = createFileRoute('/_authenticated/case/$id/')({
  component: CasePage,
})

function CasePage() {
  const { id } = Route.useParams()

  return <CaseComponent bondId={id} />
}
