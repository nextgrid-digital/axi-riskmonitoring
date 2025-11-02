import { bonds } from './bonds'
import contractorsData from '@/data/contractors.json'
import type { ContractorBondSummary, Bond } from '../types'

const contractors = contractorsData as Array<{
  id: string
  name: string
  rating: string
  geography: string
  address: string
  totalExposure: number
}>

// Helper to get contractor data
function getContractorData(contractorId: string) {
  return contractors.find((c) => c.id === contractorId)
}

// Map contractor names to contractor IDs (since bonds use names but contractors have IDs)
const contractorNameMap: Record<string, string> = {
  'ABC Infra': 'CTR-001',
  'ABC Infrastructure Ltd': 'CTR-001',
  'XYZ Construction': 'CTR-002',
  'XYZ Infrastructure Pvt Ltd': 'CTR-002',
  'RITES Ltd': 'CTR-003',
  'RITES Limited': 'CTR-003',
  'Adani Power': 'CTR-004',
  'Adani Power Limited': 'CTR-004',
  'L&T Construction': 'CTR-005',
  'Tata Projects': 'CTR-010',
  'Reliance Infrastructure': 'CTR-009',
  'GMR Infrastructure': 'CTR-007',
  'NHAI Projects': 'CTR-008',
  'NHAI Projects Ltd': 'CTR-008',
  'IRCON International': 'CTR-006',
  'Essar Projects': 'CTR-011',
  'Essar Projects India': 'CTR-011',
  'GVK Power': 'CTR-012',
  'GVK Power & Infrastructure': 'CTR-012',
}

// Aggregate bonds by contractor
export function getContractorBondSummaries(): ContractorBondSummary[] {
  try {
    // Group bonds by contractor name
    const bondsByContractorName = new Map<string, Bond[]>()
    
    if (!bonds || bonds.length === 0) {
      console.warn('No bonds data available')
      return []
    }
    
    bonds.forEach((bond) => {
      try {
        const contractorName = bond?.contractor
        if (!contractorName) {
          console.warn('Bond missing contractor name:', bond?.id)
          return
        }
        if (!bondsByContractorName.has(contractorName)) {
          bondsByContractorName.set(contractorName, [])
        }
        bondsByContractorName.get(contractorName)!.push(bond)
      } catch (error) {
        console.error('Error processing bond:', bond?.id, error)
      }
    })

    // Transform to ContractorBondSummary
    const summaries: ContractorBondSummary[] = []
    let sNo = 1

    bondsByContractorName.forEach((contractorBonds, contractorName) => {
      try {
        // Find matching contractor ID from name
        const contractorId = contractorNameMap[contractorName] || contractors.find(c => c.name.toLowerCase().includes(contractorName.toLowerCase()) || contractorName.toLowerCase().includes(c.name.toLowerCase()))?.id
        
        if (!contractorId) {
          // Create fallback contractor data if not found
          const totalExposure = contractorBonds.reduce((sum, bond) => {
            return sum + (bond.claimPeriodRemaining * 0.1)
          }, 0)
          
          // Get reinsurance status
          const reinsuranceCounts = contractorBonds.reduce((acc, bond) => {
            acc[bond.reinsurance] = (acc[bond.reinsurance] || 0) + 1
            return acc
          }, {} as Record<string, number>)
          const reinsurance = Object.entries(reinsuranceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "On NIA's net (%)"
          
        // Calculate dates from bonds
        const firstBond = contractorBonds[0]
        const bondStartDate = firstBond?.lastUpdate 
          ? new Date(firstBond.lastUpdate).toISOString()
          : new Date().toISOString()
        const bondEndDate = firstBond?.milestoneDueDate
          ? new Date(firstBond.milestoneDueDate).toISOString()
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
        
        // Get unique bond types and beneficiaries
        const bondTypes = Array.from(new Set(contractorBonds.map(b => b.productType))).join(', ')
        const beneficiaries = Array.from(new Set(contractorBonds.map(b => b.beneficiary))).join(', ')

        summaries.push({
          id: `CTR-${sNo}`,
          bondId: firstBond?.id || `BOND-${sNo}`,
          contractorName: contractorName,
          panNumber: `ABCDE${String(Math.abs(contractorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 10000).padStart(4, '0')}${String.fromCharCode(65 + (Math.abs(contractorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 26))}`,
          industry: (() => {
            // Assign industry based on bonds
            const industries = contractorBonds.map(b => {
              if (b.beneficiary.includes('NTPC') || b.beneficiary.includes('Power')) return 'Power'
              if (b.beneficiary.includes('NHAI') || b.beneficiary.includes('Metro')) return 'Transportation'
              if (b.beneficiary.includes('Steel') || contractorName.includes('Steel')) return 'Steel'
              return 'EPC / Infrastructure'
            })
            const counts = industries.reduce((acc, ind) => { acc[ind] = (acc[ind] || 0) + 1; return acc }, {} as Record<string, number>)
            return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'EPC / Infrastructure'
          })(),
          annualTurnover: totalExposure * 10,
          creditRating: (() => {
            const ratings = ['AAA', 'AA', 'A', 'BBB', 'B', 'C', 'D']
            return ratings[Math.floor(Math.random() * 7)]
          })(),
          creditDefault: (() => {
            // Higher probability of default for lower-rated contractors
            const rating = contractorBonds[0]?.riskBand || 'Green'
            if (rating === 'Red') return Math.random() > 0.7 // 30% chance
            if (rating === 'Amber') return Math.random() > 0.85 // 15% chance
            return Math.random() > 0.95 // 5% chance
          })(),
          creditInsuranceDefault: (() => {
            // Credit insurance default is less common than credit default
            const rating = contractorBonds[0]?.riskBand || 'Green'
            if (rating === 'Red') return Math.random() > 0.85 // 15% chance
            if (rating === 'Amber') return Math.random() > 0.92 // 8% chance
            return Math.random() > 0.97 // 3% chance
          })(),
          internalRating: (() => {
            const ratings = [
              'CRISIL AAA (highest safety)',
              'CRISIL AA (high safety)',
              'CRISIL A (adequate safety)',
              'CRISIL BBB (moderate safety)',
              'CRISIL BB (moderate risk)',
              'CRISIL B (high risk)',
              'CRISIL C (very high risk)',
              'CRISIL D (default)',
            ]
            return ratings[Math.floor(Math.random() * 8)]
          })(),
          state: (() => {
            // Assign state based on contractor name or use geography hints
            const contractorNameLower = contractorName.toLowerCase()
            // Try to infer state from contractor name or use common states
            if (contractorNameLower.includes('mumbai') || contractorNameLower.includes('pune') || contractorNameLower.includes('nagpur')) {
              return 'maharashtra'
            }
            if (contractorNameLower.includes('delhi') || contractorNameLower.includes('noida') || contractorNameLower.includes('gurgaon')) {
              return 'haryana'
            }
            if (contractorNameLower.includes('bangalore') || contractorNameLower.includes('karnataka')) {
              return 'karnataka'
            }
            if (contractorNameLower.includes('chennai') || contractorNameLower.includes('tamil')) {
              return 'tamil-nadu'
            }
            if (contractorNameLower.includes('hyderabad') || contractorNameLower.includes('telangana')) {
              return 'telangana'
            }
            if (contractorNameLower.includes('ahmedabad') || contractorNameLower.includes('gujarat')) {
              return 'gujarat'
            }
            if (contractorNameLower.includes('kolkata') || contractorNameLower.includes('west bengal')) {
              return 'west-bengal'
            }
            if (contractorNameLower.includes('bhubaneswar') || contractorNameLower.includes('odisha')) {
              return 'odisha'
            }
            // Default fallback - use a common state
            return 'maharashtra'
          })(),
          totalExposure: totalExposure,
          totalBondsIssued: contractorBonds.length,
          reinsurance: reinsurance,
          bondType: bondTypes || 'N/A',
          beneficiary: beneficiaries || 'N/A',
          bondStartDate: bondStartDate,
          bondEndDate: bondEndDate,
          allBonds: contractorBonds,
        })
          return
        }
        
        const contractorData = getContractorData(contractorId)
        if (!contractorData) {
          // Fallback if contractor ID exists but data is missing
          return
        }

        const totalExposure = contractorBonds.reduce((sum, bond) => {
          // Estimate exposure from bond data (you may need to add exposure field to bond data)
          return sum + (bond.claimPeriodRemaining * 0.1) // Placeholder calculation
        }, 0) || contractorData.totalExposure

        // Get reinsurance status (most common or default)
        const reinsuranceCounts = contractorBonds.reduce((acc, bond) => {
          acc[bond.reinsurance] = (acc[bond.reinsurance] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        const reinsurance = Object.entries(reinsuranceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "On NIA's net (%)"

        // Extract state from address
        const addressParts = contractorData.address.split(',')
        const stateRaw = addressParts[addressParts.length - 1]?.trim() || ''
        
        // Complete state mapping to normalized format
        const stateMap: Record<string, string> = {
          'Andhra Pradesh': 'andhra-pradesh',
          'Arunachal Pradesh': 'arunachal-pradesh',
          'Assam': 'assam',
          'Bihar': 'bihar',
          'Chhattisgarh': 'chhattisgarh',
          'Goa': 'goa',
          'Gujarat': 'gujarat',
          'Haryana': 'haryana',
          'Himachal Pradesh': 'himachal-pradesh',
          'Jharkhand': 'jharkhand',
          'Karnataka': 'karnataka',
          'Kerala': 'kerala',
          'Madhya Pradesh': 'madhya-pradesh',
          'Maharashtra': 'maharashtra',
          'Manipur': 'manipur',
          'Meghalaya': 'meghalaya',
          'Mizoram': 'mizoram',
          'Nagaland': 'nagaland',
          'Odisha': 'odisha',
          'Punjab': 'punjab',
          'Rajasthan': 'rajasthan',
          'Sikkim': 'sikkim',
          'Tamil Nadu': 'tamil-nadu',
          'Telangana': 'telangana',
          'Tripura': 'tripura',
          'Uttar Pradesh': 'uttar-pradesh',
          'Uttarakhand': 'uttarakhand',
          'West Bengal': 'west-bengal',
          'Delhi': 'delhi',
          'New Delhi': 'delhi',
        }
        
        // Try to find state in map, or normalize it, or use a fallback
        let state = stateMap[stateRaw] || stateRaw.toLowerCase().replace(/\s+/g, '-')
        
        // If still not found or empty, assign based on geography or use default
        if (!state || state === '' || state === 'unknown') {
          const geographyStateMap: Record<string, string> = {
            'North': 'delhi',
            'West': 'maharashtra',
            'South': 'karnataka',
            'East': 'west-bengal',
            'Central': 'madhya-pradesh',
          }
          state = geographyStateMap[contractorData.geography] || 'maharashtra'
        }

        // Get industry from contractor bonds (use most common industry from bonds)
        // For now, assign based on contractor name patterns or default
        const industriesFromBonds = contractorBonds.map(b => {
          // Map bond product type or contractor name to industry
          if (b.productType.includes('Power') || contractorName.includes('Power')) return 'Power'
          if (b.productType.includes('Material') || contractorName.includes('Steel')) return 'Steel'
          if (b.productType.includes('Cement') || contractorName.includes('Cement')) return 'Cement'
          if (b.beneficiary.includes('NTPC') || b.beneficiary.includes('BHEL')) return 'Power'
          if (b.beneficiary.includes('NHAI') || b.beneficiary.includes('Road')) return 'Transportation'
          if (b.beneficiary.includes('Metro') || b.beneficiary.includes('Railway')) return 'Transportation'
          return 'EPC / Infrastructure' // Default
        })
        const industryCounts = industriesFromBonds.reduce((acc, ind) => {
          acc[ind] = (acc[ind] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        const industry = Object.entries(industryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'EPC / Infrastructure'

        // Calculate dates from bonds
        const firstBond = contractorBonds[0]
        const bondStartDate = firstBond?.lastUpdate 
          ? new Date(firstBond.lastUpdate).toISOString()
          : new Date().toISOString()
        const bondEndDate = firstBond?.milestoneDueDate
          ? new Date(firstBond.milestoneDueDate).toISOString()
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
        
        // Get unique bond types and beneficiaries
        const bondTypes = Array.from(new Set(contractorBonds.map(b => b.productType))).join(', ')
        const beneficiaries = Array.from(new Set(contractorBonds.map(b => b.beneficiary))).join(', ')

        summaries.push({
          id: contractorId,
          bondId: firstBond?.id || contractorId,
          contractorName: contractorData.name,
          // Generate deterministic PAN based on contractor ID
          panNumber: `ABCDE${String(Math.abs(contractorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 10000).padStart(4, '0')}${String.fromCharCode(65 + (Math.abs(contractorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 26))}`,
          industry: industry,
          annualTurnover: totalExposure * 10, // Placeholder calculation
          creditRating: contractorData.rating,
          creditDefault: (() => {
            // Higher probability of default for lower-rated contractors
            const rating = contractorData.rating
            if (rating === 'D' || rating === 'C') return Math.random() > 0.6 // 40% chance
            if (rating === 'B' || rating === 'BBB') return Math.random() > 0.85 // 15% chance
            if (rating === 'A') return Math.random() > 0.92 // 8% chance
            return Math.random() > 0.97 // 3% chance for AA/AAA
          })(),
          creditInsuranceDefault: (() => {
            // Credit insurance default is less common
            const rating = contractorData.rating
            if (rating === 'D' || rating === 'C') return Math.random() > 0.75 // 25% chance
            if (rating === 'B' || rating === 'BBB') return Math.random() > 0.90 // 10% chance
            if (rating === 'A') return Math.random() > 0.95 // 5% chance
            return Math.random() > 0.98 // 2% chance for AA/AAA
          })(),
          internalRating: (() => {
            // Map credit rating to full CRISIL format
            const ratingMap: Record<string, string> = {
              'AAA': 'CRISIL AAA (highest safety)',
              'AA': 'CRISIL AA (high safety)',
              'A': 'CRISIL A (adequate safety)',
              'BBB': 'CRISIL BBB (moderate safety)',
              'BB': 'CRISIL BB (moderate risk)',
              'B': 'CRISIL B (high risk)',
              'C': 'CRISIL C (very high risk)',
              'D': 'CRISIL D (default)',
            }
            return ratingMap[contractorData.rating] || 'CRISIL BBB (moderate safety)'
          })(),
          state: state,
          totalExposure: totalExposure,
          totalBondsIssued: contractorBonds.length,
          reinsurance: reinsurance,
          bondType: bondTypes || 'N/A',
          beneficiary: beneficiaries || 'N/A',
          bondStartDate: bondStartDate,
          bondEndDate: bondEndDate,
          allBonds: contractorBonds,
        })
      } catch (error) {
        console.error(`Error processing contractor ${contractorName}:`, error)
        // Continue with next contractor instead of crashing
      }
    })

    return summaries.sort((a, b) => a.contractorName.localeCompare(b.contractorName))
  } catch (error) {
    console.error('Error in getContractorBondSummaries:', error)
    return []
  }
}

