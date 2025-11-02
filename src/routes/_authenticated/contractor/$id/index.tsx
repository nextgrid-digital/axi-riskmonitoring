import { createFileRoute } from '@tanstack/react-router'
import { Contractor } from '@/features/contractor'

export const Route = createFileRoute('/_authenticated/contractor/$id/')({
  component: Contractor,
})

