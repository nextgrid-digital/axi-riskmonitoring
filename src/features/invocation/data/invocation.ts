import invocationJsonData from '@/data/invocation.json'
import type { Invocation } from '../types'

// Cast the JSON data to match our TypeScript types
const invocationData: Invocation = invocationJsonData as Invocation

// Get invocation by case ID
export function getInvocationByCaseId(caseId: string): Invocation | null {
  if (invocationData.case_id === caseId) {
    return invocationData
  }
  return null
}

// For now, return the same invocation for any case ID (we can expand this later)
export function getInvocationForCase(_caseId: string): Invocation {
  return invocationData
}

export { invocationData as invocation }
