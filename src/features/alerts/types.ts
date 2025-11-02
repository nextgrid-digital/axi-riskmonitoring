export enum AlertSeverity {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum AlertType {
  FINANCIAL = 'Financial',
  LEGAL = 'Legal',
  OPERATIONAL = 'Operational',
}

export enum AlertStatus {
  NEW = 'New',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
}

export interface AlertLinkedBond {
  bondId: string
  projectName: string
  amount: number // ₹Cr
}

export interface Alert {
  id: string
  contractorId: string
  contractor: string
  type: AlertType
  trigger: string
  date: string // ISO date string
  severity: AlertSeverity
  status: AlertStatus
  geography: string
  action: string
  description: string
  exposure: number // ₹Cr
  alertLinkedBonds: AlertLinkedBond[]
}

