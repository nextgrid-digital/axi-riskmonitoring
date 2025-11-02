import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  TrendingUp,
  User,
  FileClock,
  Send,
} from 'lucide-react'
import type { Task } from '../types'

interface TaskTimelineEscalationProps {
  bondId: string
}

interface EscalationLevel {
  level: string
  role: string
  action: string
  timeline: string
}

export function TaskTimelineEscalation({ bondId }: TaskTimelineEscalationProps) {
  // Escalation Hierarchy & Timelines from the image
  const escalationHierarchy: EscalationLevel[] = [
    {
      level: 'L1',
      role: 'Underwriter',
      action: 'Complete task',
      timeline: '30 days',
    },
    {
      level: 'L2',
      role: 'Immediate Supervisor',
      action: 'Approve extension / monitor',
      timeline: '+10 days',
    },
    {
      level: 'L3',
      role: 'Senior Management',
      action: 'Resolve overdue',
      timeline: '7 days',
    },
    {
      level: 'L4',
      role: 'Next Level',
      action: 'Final escalation',
      timeline: '5 days',
    },
  ]

  // Mock data - in real app, fetch from API
  const tasks: Task[] = [
    {
      id: 'TASK-001',
      type: 'progress_check',
      title: 'Review Q1 2024 Progress Update',
      assignedTo: 'John Underwriter',
      dueDate: '2024-02-15',
      status: 'completed',
      slaDays: 30,
      daysRemaining: 0,
      escalationLevel: 0,
    },
    {
      id: 'TASK-002',
      type: 'progress_check',
      title: 'Review Q2 2024 Progress Update',
      assignedTo: 'John Underwriter',
      dueDate: '2024-05-10',
      status: 'in_progress',
      slaDays: 30,
      daysRemaining: 15,
      escalationLevel: 0,
    },
    {
      id: 'TASK-003',
      type: 'amendment_review',
      title: 'Review Bond Amendment AM-001',
      assignedTo: 'John Underwriter',
      dueDate: '2024-01-20',
      status: 'overdue',
      slaDays: 25,
      daysRemaining: -5,
      escalationLevel: 1,
      escalatedTo: 'Senior Management',
    },
    {
      id: 'TASK-004',
      type: 'dispute_resolution',
      title: 'Resolve Dispute D1 - Milestone M2',
      assignedTo: 'John Underwriter',
      dueDate: '2024-02-05',
      status: 'overdue',
      slaDays: 20,
      daysRemaining: -12,
      escalationLevel: 2,
      escalatedTo: 'VP Level',
      extensionRequested: true,
      extensionApproved: false,
    },
  ]

  const pendingTasks = tasks.filter(
    (t) => t.status === 'pending' || t.status === 'in_progress'
  )
  const overdueTasks = tasks.filter((t) => t.status === 'overdue')
  const completedTasks = tasks.filter((t) => t.status === 'completed')

  const getSlaPercentage = (task: Task) => {
    if (task.daysRemaining <= 0) return 0
    return (task.daysRemaining / task.slaDays) * 100
  }

  const getStatusBadge = (task: Task) => {
    if (task.status === 'completed') {
      return <Badge variant='default'>Completed</Badge>
    }
    if (task.status === 'overdue') {
      return <Badge variant='destructive'>Overdue</Badge>
    }
    if (task.status === 'in_progress') {
      return <Badge variant='secondary'>In Progress</Badge>
    }
    return <Badge variant='outline'>Pending</Badge>
  }

  const getTaskTypeIcon = (type: Task['type']) => {
    switch (type) {
      case 'progress_check':
        return <FileClock className='h-4 w-4' />
      case 'amendment_review':
        return <FileClock className='h-4 w-4' />
      case 'dispute_resolution':
        return <AlertTriangle className='h-4 w-4' />
      default:
        return <Clock className='h-4 w-4' />
    }
  }

  const requestExtension = (taskId: string) => {
    // Request extension with supervisor approval
    console.log('Request extension for', taskId)
  }

  const getEscalationLabel = (level: number) => {
    const escalation = escalationHierarchy[level]
    return escalation ? escalation.role : 'No Escalation'
  }

  return (
    <div className='space-y-6'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='pt-6'>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Total Tasks</p>
              <p className='text-2xl font-bold'>{tasks.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Pending</p>
              <p className='text-2xl font-bold text-blue-600'>
                {pendingTasks.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Overdue</p>
              <p className='text-2xl font-bold text-red-600'>
                {overdueTasks.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Completed</p>
              <p className='text-2xl font-bold text-green-600'>
                {completedTasks.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {overdueTasks.length > 0 && (
        <Alert variant='destructive'>
          <AlertTriangle className='h-4 w-4' />
          <AlertTitle>Overdue Tasks Requiring Attention</AlertTitle>
          <AlertDescription>
            {overdueTasks.length} task(s) have exceeded their SLA timeline and
            are escalating
          </AlertDescription>
        </Alert>
      )}

      {/* Escalation Hierarchy & Timelines Table */}
      <Card>
        <CardHeader>
          <CardTitle>Escalation Hierarchy & Timelines (Admin)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Timeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalationHierarchy.map((level) => (
                <TableRow key={level.level}>
                  <TableCell className='font-medium'>{level.level}</TableCell>
                  <TableCell>{level.role}</TableCell>
                  <TableCell>{level.action}</TableCell>
                  <TableCell>{level.timeline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks and SLA Timeline</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {tasks.map((task) => (
            <div key={task.id} className='border rounded-lg p-4 space-y-3'>
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-3 flex-1'>
                  {getTaskTypeIcon(task.type)}
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2'>
                      <p className='font-medium'>{task.title}</p>
                      {getStatusBadge(task)}
                    </div>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <User className='h-3 w-3' />
                        <span>{task.assignedTo}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3' />
                        <span>Due: {task.dueDate}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        <span>SLA: {task.slaDays} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLA Progress */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>
                    {task.daysRemaining > 0
                      ? `${task.daysRemaining} days remaining`
                      : `${Math.abs(task.daysRemaining)} days overdue`}
                  </span>
                  <span className='text-muted-foreground'>
                    {task.daysRemaining > 0
                      ? `${Math.round(getSlaPercentage(task))}% of SLA remaining`
                      : 'SLA exceeded'}
                  </span>
                </div>
                <Progress
                  value={
                    task.status === 'completed'
                      ? 100
                      : Math.max(0, getSlaPercentage(task))
                  }
                  className={
                    task.status === 'overdue'
                      ? 'bg-red-200'
                      : task.daysRemaining < 5
                      ? 'bg-orange-200'
                      : ''
                  }
                />
              </div>

              {/* Extension Request */}
              {task.extensionRequested && (
                <Alert
                  variant={task.extensionApproved ? 'default' : 'default'}
                  className='border-orange-200 bg-orange-50'
                >
                  <Clock className='h-4 w-4' />
                  <AlertTitle>
                    Extension Requested
                    {task.extensionApproved ? ' - Approved' : ' - Pending Approval'}
                  </AlertTitle>
                  <AlertDescription>
                    Awaiting supervisor approval for deadline extension
                  </AlertDescription>
                </Alert>
              )}

              {/* Escalation Info */}
              {task.escalationLevel > 0 && (
                <Alert variant='destructive'>
                  <TrendingUp className='h-4 w-4' />
                  <AlertTitle>Escalated</AlertTitle>
                  <AlertDescription>
                    Escalated to {getEscalationLabel(task.escalationLevel)}
                    {task.escalatedTo && ` - ${task.escalatedTo}`}
                  </AlertDescription>
                </Alert>
              )}

              <div className='flex gap-2'>
                {task.status !== 'completed' && (
                  <>
                    {task.status === 'overdue' && !task.extensionRequested && (
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => requestExtension(task.id)}
                      >
                        Request Extension
                      </Button>
                    )}
                    <Button size='sm' variant='outline'>
                      View Details
                    </Button>
                    <Button size='sm'>Mark Complete</Button>
                  </>
                )}
                {task.status === 'completed' && (
                  <div className='flex items-center gap-2 text-sm text-green-600'>
                    <CheckCircle2 className='h-4 w-4' />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
