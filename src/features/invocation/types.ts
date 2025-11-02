export interface Invocation {
  case_id: string
  bond_id: string
  claim_window: ClaimWindow
  document_checklist: DocumentChecklistItem[]
  monetary_accounting: MonetaryAccounting
  actions: string[]
  timeline: TimelineEvent[]
  status: 'Defaults Detected' | 'Under Review' | 'Ready for Invocation'
  created_date: string
  updated_date: string
}

export interface ClaimWindow {
  last_permissible_date: string
  notice_period: string
  holiday_rules: string
}

export interface DocumentChecklistItem {
  name: string
  status: 'Received' | 'Pending'
}

export interface MonetaryAccounting {
  lds: number
  setoffs: number
  net_claimable: number
  salvage_plan: string
}

export interface TimelineEvent {
  date: string
  event: string
}
