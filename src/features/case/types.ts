export interface Case {
  case_id: string
  bond_id: string
  project_name: string
  status: string
  metrics: CaseMetrics
  progress_trend: ProgressDataPoint[]
  risk_distribution: RiskDistribution[]
  financials: Financials
  activity_log: ActivityLogEntry[]
  linked_cases: LinkedCase[]
}

export interface CaseMetrics {
  delay_days: number
  ld_risk: number
  exposure: number
  limit: number
  next_milestone_date: string
}

export interface ProgressDataPoint {
  week: string
  progress: number
}

export interface RiskDistribution {
  type: string
  value: number
}

export interface Financials {
  premium: string
  collateral: string
  exposure_limit: string
  claim_period_end: string
}

export interface ActivityLogEntry {
  date: string
  actor: string
  action: string
}

export interface LinkedCase {
  type: string
  id: string
}

export interface BondAmendment {
  id: string
  type: string
  requestedDate: string
  requestedBy: string
  status: string
  changes: Record<string, { from: string; to: string }>
  riskAssessment: string
  requiresIncrementalPremium: boolean
}

export interface Milestone {
  id: string
  name: string
  dueDate: string
  status: 'pending' | 'completed' | 'delayed' | 'disputed'
  completionDate?: string
  principalUpdate?: string
  beneficiaryUpdate?: string
  revisionAgreed?: boolean
}

export interface ProgressUpdate {
  id: string
  quarter: string
  requestedDate: string
  submittedDate?: string
  principalResponse?: string
  underwriterTaskId?: string
  status: 'pending' | 'submitted' | 'reviewed'
}

export interface Dispute {
  id: string
  milestoneId: string
  raisedBy: string
  description: string
  status: 'open' | 'resolved'
  alertToUnderwriter: boolean
  alertToAccountManager: boolean
}

export interface Task {
  id: string
  type: 'progress_check' | 'amendment_review' | 'dispute_resolution'
  title: string
  assignedTo: string
  dueDate: string
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  slaDays: number
  daysRemaining: number
  extensionRequested?: boolean
  extensionApproved?: boolean
  escalationLevel: number
  escalatedTo?: string
}
