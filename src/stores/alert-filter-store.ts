import { create } from 'zustand'
import type { AlertSeverity } from '@/features/alerts/types'

interface AlertFilters {
  severity: AlertSeverity[]
  contractor: string[]
  geography: string[]
  timeframe: {
    startDate: string | null
    endDate: string | null
  }
}

interface AlertFilterStore {
  filters: AlertFilters
  setSeverity: (severity: AlertSeverity[]) => void
  setContractor: (contractor: string[]) => void
  setGeography: (geography: string[]) => void
  setTimeframe: (timeframe: { startDate: string | null; endDate: string | null }) => void
  resetFilters: () => void
}

const defaultFilters: AlertFilters = {
  severity: [],
  contractor: [],
  geography: [],
  timeframe: {
    startDate: null,
    endDate: null,
  },
}

export const useAlertFilterStore = create<AlertFilterStore>((set) => ({
  filters: defaultFilters,
  setSeverity: (severity) =>
    set((state) => ({
      filters: { ...state.filters, severity },
    })),
  setContractor: (contractor) =>
    set((state) => ({
      filters: { ...state.filters, contractor },
    })),
  setGeography: (geography) =>
    set((state) => ({
      filters: { ...state.filters, geography },
    })),
  setTimeframe: (timeframe) =>
    set((state) => ({
      filters: { ...state.filters, timeframe },
    })),
  resetFilters: () =>
    set({
      filters: defaultFilters,
    }),
}))

