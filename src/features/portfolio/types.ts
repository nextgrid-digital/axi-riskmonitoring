export enum RiskBand {
  RED = 'Red',
  AMBER = 'Amber',
  GREEN = 'Green',
}

export enum ContractorRating {
  A = 'A',
  B = 'B',
  C = 'C',
}

export enum ProductType {
  BID = 'Bid',
  PERFORMANCE = 'Performance',
  ADVANCE = 'Advance',
}

export enum ProjectType {
  ROAD = 'Road',
  POWER = 'Power',
  INFRA = 'Infra',
}

export enum Vintage {
  QUARTER = 'Quarter',
  ANNUAL = 'Annual',
  ADHOC = 'Ad-hoc',
}

export enum PortfolioStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  SUSPENDED = 'Suspended',
}

export interface PortfolioItem {
  id: string
  contractor: string
  projects: number
  exposure: number // ₹Cr
  riskBand: RiskBand
  alerts: number
  tasks: number
  lastReview: string // ISO date string
  nextDue: string // ISO date string
  status: PortfolioStatus
  geography: string
  rating: ContractorRating
  productType: ProductType
  projectType: ProjectType
  bondTenure: number // months
  beneficiary: string
  vintage: Vintage
  contractorId: string
}

export interface PortfolioMetrics {
  totalActiveRisk: number // ₹Cr
  contractorsUnderWatch: number
  alertsTriggered: number
  tasksOpen: number
  riskExpiringSoon: number // ₹Cr
}

