import bondsData from '@/data/bonds.json'
import type { Bond } from '../types'

// Cast the JSON data to match our TypeScript types
export const bonds: Bond[] = bondsData as Bond[]

