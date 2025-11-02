import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, Building2, FileText, Calendar } from 'lucide-react'
import { getCaseForBond } from '../data/case'

interface BondAmendmentProps {
  bondId: string
}

export function BondAmendment({ bondId }: BondAmendmentProps) {
  const caseData = getCaseForBond(bondId)
  const [underwriterReview, setUnderwriterReview] = useState({
    riskIncreased: true,
    beneficiaryConsent: true,
    reinsuranceCapacity: true,
  })
  const [incrementalPremium, setIncrementalPremium] = useState(
    'INR 45,000 + taxes.'
  )

  // Mock data from the image
  const proposedAmendment = {
    tenor: { original: '31-Mar-26', proposed: '30-Jun-26 (+90d)' },
    bondValue: { original: 'INR 1.00 Cr', proposed: 'INR 1.10 Cr (+10%)' },
    contractValue: { original: 'INR 10.00 Cr', proposed: 'INR 10.80 Cr' },
    scopeOfWork: {
      original: 'A+B',
      proposed: 'A+B+Change Order 3',
    },
    rationale:
      'Delay due to design change approved by beneficiary.',
    milestones: {
      original: 'M1/M2/M3',
      proposed: 'Revised M2, M3 dates',
    },
  }

  const materialityStatus = 'Substantial change detected'
  const assignment = 'Assign to: UW-Delhi (auto rule). Due: 7 days.'
  const reviewStatus = 'Review Pending'

  const premiumAdequacy = 'Not adequate'
  const utilizationPre = '72%'
  const utilizationPost = '86%'
  const utilizationStatus = '(within limit)'
  const gateStatus = 'Update blocked until receipt posted.'

  return (
    <div className='space-y-6'>
      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='space-y-2'>
              <Label className='text-muted-foreground text-sm'>Project Name</Label>
              <p className='text-sm font-medium'>
                {caseData?.project_name || 'N/A'}
              </p>
            </div>
            <div className='space-y-2'>
              <Label className='text-muted-foreground text-sm'>Bond ID</Label>
              <p className='text-sm font-medium'>{bondId}</p>
            </div>
            <div className='space-y-2'>
              <Label className='text-muted-foreground text-sm'>Case ID</Label>
              <p className='text-sm font-medium'>
                {caseData?.case_id || 'N/A'}
              </p>
            </div>
            <div className='space-y-2'>
              <Label className='text-muted-foreground text-sm'>Status</Label>
              <Badge
                variant={
                  caseData?.status === 'At Risk'
                    ? 'destructive'
                    : caseData?.status === 'Amber'
                    ? 'default'
                    : 'secondary'
                }
              >
                {caseData?.status || 'N/A'}
              </Badge>
            </div>
            {caseData?.metrics && (
              <>
                <div className='space-y-2'>
                  <Label className='text-muted-foreground text-sm'>
                    Delay Days
                  </Label>
                  <p className='text-sm font-medium'>
                    +{caseData.metrics.delay_days}d
                  </p>
                </div>
                <div className='space-y-2'>
                  <Label className='text-muted-foreground text-sm'>LD Risk</Label>
                  <p className='text-sm font-medium'>
                    {caseData.metrics.ld_risk}%
                  </p>
                </div>
                <div className='space-y-2'>
                  <Label className='text-muted-foreground text-sm'>
                    Exposure/Limit
                  </Label>
                  <p className='text-sm font-medium'>
                    {caseData.metrics.exposure}/{caseData.metrics.limit}
                  </p>
                </div>
                <div className='space-y-2'>
                  <Label className='text-muted-foreground text-sm'>
                    Next Milestone
                  </Label>
                  <p className='text-sm font-medium'>
                    {caseData.metrics.next_milestone_date
                      ? new Date(caseData.metrics.next_milestone_date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-6 md:grid-cols-3'>
        {/* Proposed Amendment */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Proposed Amendment</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Original</TableHead>
                  <TableHead>Proposed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className='font-medium'>Tenor</TableCell>
                  <TableCell>{proposedAmendment.tenor.original}</TableCell>
                  <TableCell>{proposedAmendment.tenor.proposed}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>Bond Value</TableCell>
                  <TableCell>
                    {proposedAmendment.bondValue.original}
                  </TableCell>
                  <TableCell>
                    {proposedAmendment.bondValue.proposed}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>Contract Value</TableCell>
                  <TableCell>
                    {proposedAmendment.contractValue.original}
                  </TableCell>
                  <TableCell>
                    {proposedAmendment.contractValue.proposed}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>Scope of Work</TableCell>
                  <TableCell>
                    {proposedAmendment.scopeOfWork.original}
                  </TableCell>
                  <TableCell>
                    {proposedAmendment.scopeOfWork.proposed}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    Rationale (principal)
                  </TableCell>
                  <TableCell colSpan={2}>
                    {proposedAmendment.rationale}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    Milestones/Timeline
                  </TableCell>
                  <TableCell>
                    {proposedAmendment.milestones.original}
                  </TableCell>
                  <TableCell>
                    {proposedAmendment.milestones.proposed}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Review Trigger */}
        <Card>
          <CardHeader>
            <CardTitle>Review Trigger</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Badge
              variant='outline'
              className='w-fit bg-orange-100 text-orange-800 border-orange-300'
            >
              {materialityStatus}
            </Badge>
            <ul className='list-disc pl-5 text-sm text-muted-foreground space-y-1'>
              <li>Variance vs original exceeds threshold.</li>
              <li>Risk review required by responsible underwriter.</li>
            </ul>
            <div className='text-sm'>
              <p>{assignment}</p>
            </div>
            <Button variant='destructive' className='w-full'>
              {reviewStatus}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Underwriter Risk Review */}
        <Card>
          <CardHeader>
            <CardTitle>Underwriter Risk Review</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='riskUnchanged'
                checked={!underwriterReview.riskIncreased}
                onCheckedChange={(checked) =>
                  setUnderwriterReview((prev) => ({
                    ...prev,
                    riskIncreased: !checked,
                  }))
                }
              />
              <Label htmlFor='riskUnchanged' className='text-sm'>
                Risk unchanged
              </Label>
              <Checkbox
                id='riskIncreased'
                checked={underwriterReview.riskIncreased}
                onCheckedChange={(checked) =>
                  setUnderwriterReview((prev) => ({
                    ...prev,
                    riskIncreased: checked === true,
                  }))
                }
              />
              <Label htmlFor='riskIncreased' className='text-sm font-bold'>
                Risk increased (moderate)
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='beneficiaryConsent'
                checked={underwriterReview.beneficiaryConsent}
                onCheckedChange={(checked) =>
                  setUnderwriterReview((prev) => ({
                    ...prev,
                    beneficiaryConsent: checked === true,
                  }))
                }
              />
              <Label htmlFor='beneficiaryConsent' className='text-sm'>
                Beneficiary consent on change orders received
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='reinsuranceCapacity'
                checked={underwriterReview.reinsuranceCapacity}
                onCheckedChange={(checked) =>
                  setUnderwriterReview((prev) => ({
                    ...prev,
                    reinsuranceCapacity: checked === true,
                  }))
                }
              />
              <Label htmlFor='reinsuranceCapacity' className='text-sm'>
                Reinsurance capacity sufficient
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Premium & Limits */}
        <Card>
          <CardHeader>
            <CardTitle>Premium & Limits</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Label>Premium adequacy check:</Label>
              <Badge variant='destructive'>{premiumAdequacy}</Badge>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='incrementalPremium' className='text-sm'>
                Incremental premium to be called:
              </Label>
              <Input
                id='incrementalPremium'
                value={incrementalPremium}
                onChange={(e) => setIncrementalPremium(e.target.value)}
                placeholder='e.g., INR 45,000 + taxes.'
                className='w-full'
              />
            </div>
            <div className='space-y-2'>
              <p className='text-sm font-medium'>
                Internal contractor limit:
              </p>
              <p className='text-sm'>
                Utilization pre/post: {utilizationPre} → {utilizationPost}{' '}
                {utilizationStatus}
              </p>
            </div>
            <Alert className='bg-yellow-50 border-yellow-200 text-yellow-800'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Gate</AlertTitle>
              <AlertDescription>{gateStatus}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
