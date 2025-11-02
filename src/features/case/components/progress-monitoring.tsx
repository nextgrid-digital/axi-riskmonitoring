import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Send } from 'lucide-react'

interface ProgressMonitoringProps {
  bondId: string
}

interface Milestone {
  name: string
  planned: string
  actual: string
  variance: string
  status: 'Done' | 'Delayed' | 'Due' | 'Pending'
}

interface RevisedMilestone {
  milestone: string
  revisedDate: string
  notes: string
}

export function ProgressMonitoring({ bondId }: ProgressMonitoringProps) {
  const [principalReply, setPrincipalReply] = useState(
    'Rafting delayed due to design approval; propose 30-Sep.'
  )
  const [underwriterObservations, setUnderwriterObservations] = useState(
    'Seek beneficiary concurrence email; update milestones accordingly.'
  )
  const [beneficiaryComment, setBeneficiaryComment] = useState(
    'Please confirm agreement to revised timelines.'
  )
  const [projectDelayed, setProjectDelayed] = useState(true)
  const [beneficiaryConcurrencePending, setBeneficiaryConcurrencePending] =
    useState(false)
  const [disputeFlag, setDisputeFlag] = useState(false)

  // Mock data from the image
  const milestones: Milestone[] = [
    {
      name: 'Mobilization',
      planned: '01-Jul-25',
      actual: '08-Jul-25',
      variance: '+7d',
      status: 'Done',
    },
    {
      name: 'Rafting',
      planned: '01-Sep-25',
      actual: '-',
      variance: '+18d',
      status: 'Delayed',
    },
    {
      name: 'Shuttering',
      planned: '18-Oct-25',
      actual: '-',
      variance: '-',
      status: 'Due',
    },
    {
      name: 'Slab',
      planned: '05-Dec-25',
      actual: '-',
      variance: '-',
      status: 'Pending',
    },
  ]

  const revisedMilestones: RevisedMilestone[] = [
    {
      milestone: 'Rafting',
      revisedDate: '30-Sep-25',
      notes: 'Beneficiary to confirm',
    },
    {
      milestone: 'Shuttering',
      revisedDate: '05-Nov-25',
      notes: 'Shifted accordingly',
    },
  ]

  const nextQuarterlyUpdate = {
    date: '15-Jan-26',
    quarter: 'Q3',
    assignedTo: 'UW-Delhi (rule-based)',
    autoAlertSent: true,
  }

  const getStatusBadge = (status: Milestone['status']) => {
    switch (status) {
      case 'Done':
        return <Badge variant='default'>Done</Badge>
      case 'Delayed':
        return <Badge variant='destructive'>Delayed</Badge>
      case 'Due':
        return <Badge variant='secondary'>Due</Badge>
      case 'Pending':
        return <Badge variant='outline'>Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleSend = () => {
    // Send comment to beneficiary
    console.log('Sending to beneficiary:', beneficiaryComment)
  }

  return (
    <div className='space-y-6'>
      {/* Progress Monitoring Table */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead>Planned</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Var</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((milestone) => (
                <TableRow key={milestone.name}>
                  <TableCell className='font-medium'>
                    {milestone.name}
                  </TableCell>
                  <TableCell>{milestone.planned}</TableCell>
                  <TableCell>{milestone.actual}</TableCell>
                  <TableCell
                    className={
                      milestone.variance.startsWith('+')
                        ? 'text-red-600'
                        : 'text-muted-foreground'
                    }
                  >
                    {milestone.variance}
                  </TableCell>
                  <TableCell>{getStatusBadge(milestone.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Next Quarterly Update */}
      <Card>
        <CardHeader>
          <CardTitle>Next Quarterly Update</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <p className='text-sm'>
            Next quarterly update: {nextQuarterlyUpdate.date} (
            {nextQuarterlyUpdate.quarter})
          </p>
          <p className='text-sm text-muted-foreground'>
            Assigned to: {nextQuarterlyUpdate.assignedTo} • Auto-alert sent to
            principal
          </p>
          <Button>Task Open</Button>
        </CardContent>
      </Card>

      {/* Principal Reply */}
      <Card>
        <CardHeader>
          <CardTitle>Principal Reply</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={principalReply}
            onChange={(e) => setPrincipalReply(e.target.value)}
            rows={3}
            placeholder='Principal reply...'
          />
        </CardContent>
      </Card>

      {/* Underwriter Observations */}
      <Card>
        <CardHeader>
          <CardTitle>Underwriter Observations</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={underwriterObservations}
            onChange={(e) => setUnderwriterObservations(e.target.value)}
            rows={3}
            placeholder='Underwriter observations...'
          />
        </CardContent>
      </Card>

      {/* Action Section */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Checkboxes */}
          <div className='space-y-3'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='projectDelayed'
                checked={projectDelayed}
                onCheckedChange={(checked) =>
                  setProjectDelayed(checked === true)
                }
              />
              <Label
                htmlFor='projectDelayed'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Project delayed
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='beneficiaryConcurrence'
                checked={beneficiaryConcurrencePending}
                onCheckedChange={(checked) =>
                  setBeneficiaryConcurrencePending(checked === true)
                }
              />
              <Label
                htmlFor='beneficiaryConcurrence'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Beneficiary concurrence pending
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='disputeFlag'
                checked={disputeFlag}
                onCheckedChange={(checked) => setDisputeFlag(checked === true)}
              />
              <Label
                htmlFor='disputeFlag'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Dispute flag
              </Label>
            </div>
          </div>

          {/* Revised Dates Table */}
          {revisedMilestones.length > 0 && (
            <div className='space-y-2'>
              <Label>Revised Dates</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Revised Date</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revisedMilestones.map((revised, index) => (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>
                        {revised.milestone}
                      </TableCell>
                      <TableCell>{revised.revisedDate}</TableCell>
                      <TableCell>{revised.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Brief comment to beneficiary */}
          <div className='space-y-2'>
            <Label htmlFor='beneficiaryComment'>
              Brief comment to beneficiary:
            </Label>
            <div className='flex gap-2'>
              <Textarea
                id='beneficiaryComment'
                value={beneficiaryComment}
                onChange={(e) => setBeneficiaryComment(e.target.value)}
                rows={3}
                placeholder='Please confirm agreement to revised timelines.'
                className='flex-1'
              />
              <Button onClick={handleSend} className='self-end'>
                <Send className='h-4 w-4 mr-2' />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
