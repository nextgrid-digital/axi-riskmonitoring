import { create } from 'zustand'
import type {
  RiskBand,
  ContractorRating,
  ProductType,
  ProjectType,
  Vintage,
} from '@/features/portfolio/types'

interface PortfolioFilters {
  geography: string[]
  rating: ContractorRating[]
  productType: ProductType[]
  projectType: ProjectType[]
  bondTenure: [number, number] // [min, max] in months
  beneficiary: string[]
  vintage: Vintage[]
  riskBand: RiskBand[]
}

interface PortfolioFilterStore {
  filters: PortfolioFilters
  setGeography: (geography: string[]) => void
  setRating: (rating: ContractorRating[]) => void
  setProductType: (productType: ProductType[]) => void
  setProjectType: (projectType: ProjectType[]) => void
  setBondTenure: (bondTenure: [number, number]) => void
  setBeneficiary: (beneficiary: string[]) => void
  setVintage: (vintage: Vintage[]) => void
  setRiskBand: (riskBand: RiskBand[]) => void
  resetFilters: () => void
}

const defaultFilters: PortfolioFilters = {
  geography: [],
  rating: [],
  productType: [],
  projectType: [],
  bondTenure: [0, 36],
  beneficiary: [],
  vintage: [],
  riskBand: [],
}

export const usePortfolioFilterStore = create<PortfolioFilterStore>((set) => ({
  filters: defaultFilters,
  setGeography: (geography) =>
    set((state) => ({
      filters: { ...state.filters, geography },
    })),
  setRating: (rating) =>
    set((state) => ({
      filters: { ...state.filters, rating },
    })),
  setProductType: (productType) =>
    set((state) => ({
      filters: { ...state.filters, productType },
    })),
  setProjectType: (projectType) =>
    set((state) => ({
      filters: { ...state.filters, projectType },
    })),
  setBondTenure: (bondTenure) =>
    set((state) => ({
      filters: { ...state.filters, bondTenure },
    })),
  setBeneficiary: (beneficiary) =>
    set((state) => ({
      filters: { ...state.filters, beneficiary },
    })),
  setVintage: (vintage) =>
    set((state) => ({
      filters: { ...state.filters, vintage },
    })),
  setRiskBand: (riskBand) =>
    set((state) => ({
      filters: { ...state.filters, riskBand },
    })),
  resetFilters: () =>
    set({
      filters: defaultFilters,
    }),
}))

