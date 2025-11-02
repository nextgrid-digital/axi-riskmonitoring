import { createFileRoute } from '@tanstack/react-router'
import { SavedPortfolio } from '@/features/saved-portfolio'

export const Route = createFileRoute('/_authenticated/risk-monitoring/project/saved-portfolio/')({
  component: SavedPortfolioPage,
})

function SavedPortfolioPage() {
  try {
    return <SavedPortfolio />
  } catch (error) {
    console.error('Error rendering SavedPortfolio:', error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">500</h2>
          <p className="text-muted-foreground mb-4">Oops! Something went wrong :')</p>
          <p className="text-sm text-muted-foreground">We apologize for the inconvenience. Please try again later.</p>
        </div>
      </div>
    )
  }
}
