import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { ContractorPortfolioReview } from '@/features/contractor-portfolio-review'

const portfolioSearchSchema = z.object({
  search: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/customer-bond-portfolio/')({
  validateSearch: portfolioSearchSchema,
  component: CustomerBondPortfolioPage,
})

function CustomerBondPortfolioPage() {
  const { search } = Route.useSearch()
  return <ContractorPortfolioReview initialSearch={search || ''} />
}

