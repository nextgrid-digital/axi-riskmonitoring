import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { formatExposure } from '@/components/exposure-formatter'
import { format } from 'date-fns'
import type { Bond } from '../types'
import type { Alert } from '@/features/alerts/types'
import type { Task } from '@/features/tasks/types'

interface ContractorTabsProps {
  bonds: Bond[]
  alerts: Alert[]
  tasks: Task[]
}

export function ContractorTabs({ bonds, alerts, tasks }: ContractorTabsProps) {
  return (
    <Tabs defaultValue='bonds' className='w-full'>
      <TabsList>
        <TabsTrigger value='bonds'>Bonds ({bonds.length})</TabsTrigger>
        <TabsTrigger value='tasks'>Tasks ({tasks.length})</TabsTrigger>
        <TabsTrigger value='alerts'>Alerts ({alerts.length})</TabsTrigger>
      </TabsList>

      <TabsContent value='bonds' className='space-y-4'>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bond ID</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Product Type</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Tenure</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bonds.length > 0 ? (
                bonds.map((bond) => (
                  <TableRow key={bond.id}>
                    <TableCell className='font-mono text-sm'>{bond.id}</TableCell>
                    <TableCell className='font-medium'>{bond.projectName}</TableCell>
                    <TableCell>{bond.productType}</TableCell>
                    <TableCell>{bond.projectType}</TableCell>
                    <TableCell className='font-medium'>{formatExposure(bond.amount)}</TableCell>
                    <TableCell>{bond.beneficiary}</TableCell>
                    <TableCell>{bond.bondTenure} months</TableCell>
                    <TableCell>
                      <Badge variant={bond.status === 'Active' ? 'default' : 'secondary'}>
                        {bond.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className='h-24 text-center'>
                    No bonds found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value='tasks' className='space-y-4'>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>SLA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className='font-mono text-sm'>{task.id}</TableCell>
                    <TableCell className='font-medium'>{task.title}</TableCell>
                    <TableCell>
                      <Badge variant='outline'>{task.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          task.priority === 'Critical'
                            ? 'destructive'
                            : task.priority === 'High'
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>
                      {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={task.sla <= 2 ? 'destructive' : 'secondary'}>
                        {task.sla}d left
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className='h-24 text-center'>
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value='alerts' className='space-y-4'>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className='font-mono text-sm'>{alert.id}</TableCell>
                    <TableCell>
                      <Badge variant='outline'>{alert.type}</Badge>
                    </TableCell>
                    <TableCell>{alert.trigger}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.severity === 'Critical'
                            ? 'destructive'
                            : alert.severity === 'High'
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.status === 'New'
                            ? 'default'
                            : alert.status === 'In Progress'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(alert.date), 'MMM dd, yyyy')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className='h-24 text-center'>
                    No alerts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  )
}

