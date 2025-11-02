export enum RiskBand {
  RED = 'Red',
  AMBER = 'Amber',
  GREEN = 'Green',
}

export enum ProgressStatus {
  ON_TRACK = 'On Track',
  DELAYED = 'Delayed',
  AT_RISK = 'At Risk',
  COMPLETED = 'Completed',
}

export enum PremiumStatus {
  PAID = 'Paid',
  DUE = 'Due',
  OVERDUE = 'Overdue',
}

export enum CollateralStatus {
  OK = 'OK',
  PENDING = 'Pending',
  INSUFFICIENT = 'Insufficient',
}

export enum ReinsuranceStatus {
  OK = 'OK',
  PENDING = 'Pending',
  NOT_COVERED = 'Not Covered',
}

export interface Bond {
  id: string
  bondNumber: string
  uin?: string
  contractor: string
  contractorId: string
  beneficiary: string
  industry?: string
  projectName?: string
  bondValue?: number // INR crore
  premiumRate?: number // percentage
  premiumAmount?: number // INR
  marginMoney?: number // INR
  progress: number // percentage
  lastUpdate: string // ISO date string
  bondStartDate?: string // ISO date string
  bondEndDate?: string // ISO date string
  nextMilestone: string
  milestoneDueDate: string // ISO date string
  delay: number // days (negative means ahead, positive means behind)
  riskBand: RiskBand
  invoke: boolean
  dispute: boolean
  premium: PremiumStatus
  collateral: CollateralStatus
  reinsurance: ReinsuranceStatus
  productType: string
  tenor: number // months
  claimPeriodRemaining: number // days
  woNumber?: string
  timeline: TimelineEvent[]
  covenants: {
    collateral: CollateralStatus
    premium: PremiumStatus
    reinsurance: ReinsuranceStatus
  }
}

export interface TimelineEvent {
  date: string // ISO date string
  event: string
  description?: string
}

export interface BondFilters {
  beneficiary: string[]
  industry: string[]
  state: string[]
  bondType: string[]
  tenor: string[]
  exposureAmount: string[] // e.g., "0-5 crore", "5-50 crore", etc.
  internalRating: string[] // e.g., "CRISIL AAA (highest safety)", "CRISIL AA (high safety)", etc.
  reinsurance: string[] // e.g., "OK", "Pending", "Not Covered"
}

export interface ContractorBondSummary {
  id: string
  bondId: string // First/primary bond ID
  contractorName: string
  panNumber: string
  industry: string
  annualTurnover: number // INR crore
  creditRating: string
  internalRating: string // Full CRISIL rating format, e.g., "CRISIL AAA (highest safety)"
  creditDefault: boolean // Has credit default occurred
  creditInsuranceDefault: boolean // Has credit insurance default occurred
  state: string
  totalExposure: number // INR crore
  totalBondsIssued: number
  reinsurance: ReinsuranceStatus | string
  bondType: string // Comma-separated or primary type
  beneficiary: string // Comma-separated or primary beneficiary
  bondStartDate: string // ISO date string
  bondEndDate: string // ISO date string
  allBonds: Bond[] // Store all bonds for reference
}

