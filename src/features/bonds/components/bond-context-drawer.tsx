import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { format } from 'date-fns'
import { formatDistanceToNow } from 'date-fns'
import { RiskBadge } from '@/components/risk-badge'
import { RiskBand } from '@/features/portfolio/types'
import type { Bond } from '../types'

interface BondContextDrawerProps {
  bond: Bond
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BondContextDrawer({ bond, open, onOpenChange }: BondContextDrawerProps) {
  const riskBandMap: Record<string, RiskBand> = {
    'Red': RiskBand.RED,
    'Amber': RiskBand.AMBER,
    'Green': RiskBand.GREEN,
  }
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-full sm:max-w-2xl overflow-y-auto'>
        <div className='px-6 pb-6'>
          <SheetHeader className='px-0'>
            <SheetTitle className='flex items-center gap-2'>
              <span>Bond {bond.bondNumber}</span>
              <RiskBadge riskBand={riskBandMap[bond.riskBand] || RiskBand.GREEN} />
            </SheetTitle>
            <SheetDescription>
              {bond.uin && `${bond.uin} • `}
              {bond.contractor} → {bond.beneficiary}
            </SheetDescription>
          </SheetHeader>

          <div className='mt-6 space-y-5'>
          {/* Bond Overview */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold'>Bond Overview</h3>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <p className='text-sm text-muted-foreground'>Contractor</p>
                <p className='text-sm font-medium'>{bond.contractor}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Beneficiary</p>
                <p className='text-sm font-medium'>{bond.beneficiary}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Product Type</p>
                <p className='text-sm font-medium'>{bond.productType}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Tenor</p>
                <p className='text-sm font-medium'>{bond.tenor} months</p>
              </div>
              {bond.woNumber && (
                <div>
                  <p className='text-sm text-muted-foreground'>WO Number</p>
                  <p className='text-sm font-medium'>{bond.woNumber}</p>
                </div>
              )}
              <div>
                <p className='text-sm text-muted-foreground'>Risk Band</p>
                <div className='flex items-center gap-2 mt-1'>
                  <RiskBadge riskBand={riskBandMap[bond.riskBand] || RiskBand.GREEN} />
                  <span className='text-sm font-medium'>{bond.riskBand}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Progress & Milestone */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold'>Progress & Milestone</h3>
            <div className='space-y-2.5'>
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium'>Progress</span>
                  <span className='text-sm font-medium'>{bond.progress}%</span>
                </div>
                <Progress value={bond.progress} />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <p className='text-sm text-muted-foreground'>Last Update</p>
                  <p className='text-sm font-medium'>
                    {format(new Date(bond.lastUpdate), 'dd-MMM-yyyy')}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Delay</p>
                  <p className={`text-sm font-medium ${bond.delay > 0 ? 'text-red-600' : bond.delay < 0 ? 'text-green-600' : ''}`}>
                    {bond.delay > 0 ? `+${bond.delay}` : bond.delay} days
                  </p>
                </div>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Next Milestone</p>
                <p className='text-sm font-medium'>{bond.nextMilestone}</p>
                <p className='text-xs text-muted-foreground mt-1'>
                  Due: {format(new Date(bond.milestoneDueDate), 'dd-MMM-yyyy')}
                  {(() => {
                    const dueDate = new Date(bond.milestoneDueDate)
                    const now = new Date()
                    if (dueDate < now) {
                      // Past due date
                      const diffDays = Math.ceil((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
                      return (
                        <span className='text-red-600 ml-1'>
                          ({diffDays === 1 ? '1 day ago' : `${diffDays} days ago`})
                        </span>
                      )
                    } else {
                      // Future due date
                      const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                      if (diffDays <= 7) {
                        return <span className='text-red-600 ml-1'>(in {diffDays} {diffDays === 1 ? 'day' : 'days'})</span>
                      } else if (diffDays <= 30) {
                        return <span className='text-amber-600 ml-1'>(in {diffDays} days)</span>
                      } else {
                        const months = Math.floor(diffDays / 30)
                        return <span className='text-muted-foreground ml-1'>(in {months} {months === 1 ? 'month' : 'months'})</span>
                      }
                    }
                  })()}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Status & Claims */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold'>Status & Claims</h3>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <p className='text-sm text-muted-foreground mb-1.5'>Invoke</p>
                <Badge variant={bond.invoke ? 'destructive' : 'secondary'} className='font-normal'>
                  {bond.invoke ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div>
                <p className='text-sm text-muted-foreground mb-1.5'>Dispute</p>
                <Badge 
                  variant={bond.dispute ? (bond.riskBand === 'Red' ? 'destructive' : bond.riskBand === 'Amber' ? 'default' : 'secondary') : 'secondary'} 
                  className='font-normal'
                >
                  {bond.dispute ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className='col-span-2'>
                <p className='text-sm text-muted-foreground mb-1.5'>Claim Period Remaining</p>
                <p className={`text-sm font-medium ${bond.claimPeriodRemaining <= 30 ? 'text-red-600' : bond.claimPeriodRemaining <= 90 ? 'text-amber-600' : ''}`}>
                  {bond.claimPeriodRemaining} days
                </p>
              </div>
            </div>
          </div>

          <Separator />
          {/* Timeline Section */}
          <div>
            <h3 className='mb-3 text-lg font-semibold'>Timeline</h3>
            <div className='space-y-2.5'>
              {bond.timeline.map((event, index) => (
                <div key={index} className='space-y-1'>
                  <div className='flex items-start gap-2'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      {format(new Date(event.date), 'dd-MMM')}:
                    </span>
                    <div className='flex-1'>
                      <div className='text-sm font-medium'>{event.event}</div>
                      {event.description && (
                        <div className='text-xs text-muted-foreground'>
                          {event.description}
                        </div>
                      )}
                    </div>
                  </div>
                  {index < bond.timeline.length - 1 && <Separator className='mt-2' />}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Covenants Section */}
          <div>
            <h3 className='mb-3 text-lg font-semibold'>Covenants</h3>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Collateral:</span>
                <Badge 
                  variant={bond.covenants.collateral === 'OK' ? 'secondary' : 'default'}
                >
                  {bond.covenants.collateral}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Premium:</span>
                <Badge 
                  variant={bond.covenants.premium === 'Paid' ? 'secondary' : 'destructive'}
                >
                  {bond.covenants.premium}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>RI:</span>
                <Badge 
                  variant={bond.covenants.reinsurance === 'OK' ? 'secondary' : 'default'}
                >
                  {bond.covenants.reinsurance}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

