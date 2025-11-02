export enum TaskStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  INFO_REQUESTED = 'Info Requested',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export interface TaskLinkedAlert {
  id: string
  type: string
  trigger: string
}

export interface Task {
  id: string
  title: string
  contractorId: string
  contractor: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  dueDate: string // ISO date string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  description: string
  alertId: string | null
  exposure: number // ₹Cr
  sla: number // days remaining
  linkedAlert: TaskLinkedAlert | null
}

