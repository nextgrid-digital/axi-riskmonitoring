import { create } from 'zustand'
import type { BondFilters } from '@/features/bonds/types'

interface BondFilterState {
  filters: BondFilters
  setBeneficiary: (values: string[]) => void
  setIndustry: (values: string[]) => void
  setState: (values: string[]) => void
  setBondType: (values: string[]) => void
  setTenor: (values: string[]) => void
  setExposureAmount: (values: string[]) => void
  setInternalRating: (values: string[]) => void
  setReinsurance: (values: string[]) => void
  applyFilters: (filters: BondFilters) => void
  reset: () => void
}

const defaultFilters: BondFilters = {
  beneficiary: [],
  industry: [],
  state: [],
  bondType: [],
  tenor: [],
  exposureAmount: [],
  internalRating: [],
  reinsurance: [],
}

export const useBondFilterStore = create<BondFilterState>((set) => ({
  filters: defaultFilters,
  setBeneficiary: (values) =>
    set((state) => ({
      filters: { ...state.filters, beneficiary: values },
    })),
  setIndustry: (values) =>
    set((state) => ({
      filters: { ...state.filters, industry: values },
    })),
  setState: (values) =>
    set((state) => ({
      filters: { ...state.filters, state: values },
    })),
  setBondType: (values) =>
    set((state) => ({
      filters: { ...state.filters, bondType: values },
    })),
  setTenor: (values) =>
    set((state) => ({
      filters: { ...state.filters, tenor: values },
    })),
  setExposureAmount: (values) =>
    set((state) => ({
      filters: { ...state.filters, exposureAmount: values },
    })),
  setInternalRating: (values) =>
    set((state) => ({
      filters: { ...state.filters, internalRating: values },
    })),
  setReinsurance: (values) =>
    set((state) => ({
      filters: { ...state.filters, reinsurance: values },
    })),
  applyFilters: (filters) => set({ filters }),
  reset: () => set({ filters: defaultFilters }),
}))

