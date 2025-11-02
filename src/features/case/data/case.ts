import caseJsonData from '@/data/case.json'
import type { Case } from '../types'

// Cast the JSON data to match our TypeScript types
const caseData: Case = caseJsonData as Case

// Get case by bond ID
export function getCaseByBondId(bondId: string): Case | null {
  // Extract numeric ID from bond ID (e.g., "#1001" -> "1001", "bond-1001" -> "1001")
  const numericId = bondId.replace(/[^0-9]/g, '')
  const caseBondId = caseData.bond_id.replace(/[^0-9]/g, '')
  
  if (caseBondId === numericId) {
    return caseData
  }
  return null
}

// Get case by case ID
export function getCaseById(caseId: string): Case | null {
  if (caseData.case_id === caseId) {
    return caseData
  }
  return null
}

// For now, return the same case for any bond ID (we can expand this later)
export function getCaseForBond(_bondId: string): Case {
  return caseData
}
