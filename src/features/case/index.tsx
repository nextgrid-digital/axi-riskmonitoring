import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { formatExposure } from '@/components/exposure-formatter'
import { format } from 'date-fns'
import { bonds } from '@/features/bonds/data/bonds'
import { getCaseForBond } from './data/case'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface CaseProps {
  bondId: string
}

export function Case({ bondId }: CaseProps) {
  const caseData = getCaseForBond(bondId)
  const navigate = useNavigate()
  const [underwriterComments, setUnderwriterComments] = useState(
    'Cash flows tight; repeated extensions. Recommend biof'
  )
  const [exposureTolerance, setExposureTolerance] = useState(
    'Comfort up to INR 160 Cr subject to collateral grid.'
  )
  const [internalLimit, setInternalLimit] = useState('160')
  const [strategy, setStrategy] = useState<'maintain' | 'reduce' | 'increase'>('reduce')
  const [circulateToAccountManagers, setCirculateToAccountManagers] = useState(false)
  const [circulateToBranchHeads, setCirculateToBranchHeads] = useState(false)

  // Calculate group metrics and get company name
  const { groupMetrics, companyName, panNumber, contractorName } = useMemo(() => {
    // Find the current bond
    const currentBond = bonds.find(b => b.id === bondId)
    
    // Get company name from bond contractor field
    let companyName = currentBond?.contractor || caseData?.project_name?.split(' - ')[0] || 'Unknown Company'
    
    // Map company names (holding company mapping)
    const companyNameMap: Record<string, string> = {
      'ABC Infra': 'ABC Holdings',
      'ABC Infrastructure Ltd': 'ABC Holdings',
      'ABC Infrastructure': 'ABC Holdings',
    }
    
    // Apply mapping if available
    companyName = companyNameMap[companyName] || companyName
    
    // Format company name with "Private Limited" suffix
    const displayCompanyName = companyName.includes('Limited') || companyName.includes('Ltd') 
      ? companyName 
      : `${companyName} Private Limited`
    
    // Base company name without "Private Limited" for subsidiary names
    const baseCompanyName = displayCompanyName.replace(/\s+Private Limited$/, '').replace(/\s+Limited$/, '').replace(/\s+Ltd$/, '')
    
    // Get contractor name for search - use the original contractor name from bond data
    // This should match what's in the bonds table
    const contractorName = currentBond?.contractor || companyName
    
    // Generate PAN number based on contractor name (same logic as contractor-bonds.ts)
    const generatePAN = (contractorName: string): string => {
      const hash = contractorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const numericPart = String(Math.abs(hash) % 10000).padStart(4, '0')
      const alphaPart = String.fromCharCode(65 + (Math.abs(hash) % 26))
      return `ABCDE${numericPart}${alphaPart}`
    }
    
    const panNumber = currentBond?.contractor ? generatePAN(currentBond.contractor) : 'N/A'
    
    // Get contractor bonds for the same contractor
    const contractorBonds = currentBond 
      ? bonds.filter(b => b.contractor === currentBond.contractor)
      : []
    
    // Calculate total exposure for the contractor
    const totalExposure = 234 // Fixed value in crore
    
    const groupLimit = 400 // Default group limit in crore
    const lastReviewDate = new Date() // In real app, fetch from API
    lastReviewDate.setDate(lastReviewDate.getDate() - 30) // 30 days ago as example
    
            return {
              companyName: displayCompanyName,
              panNumber,
              contractorName,
              groupMetrics: {
                baseCompanyName,
                groupLimit,
                groupExposure: totalExposure,
                lastReviewDate,
                utilizationPercentage: (totalExposure / groupLimit) * 100,
                totalBonds: 23, // Fixed value
              },
            }
          }, [bondId, caseData])

  return (
    <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>
          {companyName}
        </h2>
        <p className='text-muted-foreground'>
          PAN card no: {panNumber}
        </p>
      </div>

      {/* Summary Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Group Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatExposure(groupMetrics.groupLimit)}</div>
            <p className='text-xs text-muted-foreground'>Total limit allocated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Group Exposure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatExposure(groupMetrics.groupExposure)}</div>
            <p className='text-xs text-muted-foreground'>
              {groupMetrics.utilizationPercentage.toFixed(1)}% utilized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Last Group review Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {format(groupMetrics.lastReviewDate, 'dd MMM yyyy')}
            </div>
            <p className='text-xs text-muted-foreground'>Last portfolio review</p>
          </CardContent>
        </Card>

        <Card 
          className='cursor-pointer hover:bg-accent transition-colors'
          onClick={() => {
            navigate({
              to: '/customer-bond-portfolio',
              search: { search: contractorName },
            })
          }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Contractor Portfolio Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{groupMetrics.totalBonds}</div>
            <p className='text-xs text-muted-foreground'>Total active bonds</p>
          </CardContent>
        </Card>
      </div>

      {/* Registration & Group Mapping Section */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Top Left: Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Registration</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='legalName'>Legal Name:</Label>
              <Input id='legalName' value={`${companyName} Holdings Ltd`} readOnly />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='tradeName'>Trade Name:</Label>
              <Input id='tradeName' value={companyName} readOnly />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='pan'>
                PAN (mandatory):
              </Label>
              <Input id='pan' value={panNumber} readOnly className='font-mono' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cin'>CIN:</Label>
              <Input id='cin' value='U12345DL2018PTC000111' readOnly className='font-mono' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='gstin'>GSTIN:</Label>
              <Input id='gstin' value='07ABCDE1234A1Z5' readOnly className='font-mono' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='address'>Registered Address:</Label>
              <Input id='address' value='Sector 18, Noida, Uttar Pradesh, 201301' readOnly />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='industry'>Industry:</Label>
              <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300 text-sm font-medium px-3 py-1'>
                EPC / Infra
              </Badge>
            </div>
            <Alert className='bg-orange-50 border-orange-200 text-orange-800'>
              <AlertDescription>
                PAN is mandatory to avoid duplicate profiles
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Top Right: Holding-Subsidiary Mapping */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Holding-Subsidiary Mapping</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label className='text-sm font-medium'>Holding:</Label>
                <p className='text-sm'>{companyName} Ltd</p>
              </div>
              <div className='space-y-2'>
                <Label className='text-sm font-medium'>Subsidiaries:</Label>
                <ul className='list-disc pl-5 space-y-1 text-sm'>
                  <li>{groupMetrics.baseCompanyName} Infra Pvt Ltd</li>
                  <li>{groupMetrics.baseCompanyName} Roads LLP</li>
                  <li>{groupMetrics.baseCompanyName} EPC India Pvt Ltd</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Group Exposure Snapshot */}
          <Card>
            <CardHeader>
              <CardTitle>Group Exposure Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entity</TableHead>
                    <TableHead>Exposure</TableHead>
                    <TableHead>#Bonds</TableHead>
                    <TableHead>Largest Single</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>{companyName}</TableCell>
                    <TableCell>INR {formatExposure(41)}</TableCell>
                    <TableCell>
                      <Badge className='bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-300 font-medium'>
                        3
                      </Badge>
                    </TableCell>
                    <TableCell>INR {formatExposure(28)}</TableCell>
                    <TableCell>
                      <Badge className='bg-green-100 text-green-700 hover:bg-green-200 border-green-300 font-medium'>
                        Within limit
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>{groupMetrics.baseCompanyName} Infra Pvt Ltd</TableCell>
                    <TableCell>INR {formatExposure(145)}</TableCell>
                    <TableCell>
                      <Badge className='bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-300 font-medium'>
                        12
                      </Badge>
                    </TableCell>
                    <TableCell>INR {formatExposure(18)}</TableCell>
                    <TableCell>
                      <Badge className='bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300 font-medium'>
                        Watchlist
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>{groupMetrics.baseCompanyName} Roads LLP</TableCell>
                    <TableCell>INR {formatExposure(48)}</TableCell>
                    <TableCell>
                      <Badge className='bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-300 font-medium'>
                        8
                      </Badge>
                    </TableCell>
                    <TableCell>INR {formatExposure(9)}</TableCell>
                    <TableCell>
                      <Badge className='bg-green-100 text-green-700 hover:bg-green-200 border-green-300 font-medium'>
                        OK
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contractor Review Case & Strategy Section */}
      <div className='space-y-6'>
        {/* Review Case Header */}
        <Card>
          <CardHeader>
            <div className='space-y-2'>
              <CardTitle className='text-xl'>Review Case: {groupMetrics.baseCompanyName} Infra Pvt Ltd</CardTitle>
              <div className='flex flex-wrap gap-4 items-center'>
                <span className='text-sm text-muted-foreground'>Due: 31-Dec-25</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-muted-foreground'>Frequency:</span>
                  <Badge className='bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300 font-medium'>
                    Quarterly
                  </Badge>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-muted-foreground'>Assignee:</span>
                  <Badge className='bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-300 font-medium'>
                    UW-Delhi
                  </Badge>
                </div>
                <span className='text-sm text-muted-foreground'>SLA: 30 days</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Three Column Layout */}
        <div className='grid gap-6 md:grid-cols-3'>
          {/* Left Column: Key Parameters */}
          <Card>
            <CardHeader>
              <CardTitle>Key Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>Overall Exposure</TableCell>
                    <TableCell>INR {formatExposure(234)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Single Largest Exposure</TableCell>
                    <TableCell>INR {formatExposure(28)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Exposure/Revenue</TableCell>
                    <TableCell>
                      <Badge className='bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-300 font-medium'>
                        0.62
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Credit Rating</TableCell>
                    <TableCell>
                      <Badge className='bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300 font-medium'>
                        BBB
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Industry</TableCell>
                    <TableCell>
                      <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300 font-medium'>
                        EPC
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Middle Column: Analysis & Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis & Comments</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='underwriterComments'>Underwriter comments:</Label>
                <Textarea
                  id='underwriterComments'
                  value={underwriterComments}
                  onChange={(e) => setUnderwriterComments(e.target.value)}
                  rows={4}
                  placeholder='Enter underwriter comments...'
                />
              </div>
              <div className='space-y-2'>
                <Label className='text-sm font-medium'>Supporting docs:</Label>
                <ul className='list-disc pl-5 space-y-1 text-sm text-muted-foreground'>
                  <li>Latest financials uploaded</li>
                  <li>Progress certificates attached</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Underwriting Strategy & Internal Limit */}
          <Card>
            <CardHeader>
              <CardTitle>Underwriting Strategy & Internal Limit</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                <Label className='text-sm font-medium'>Strategy:</Label>
                <div className='flex gap-2'>
                  <Button
                    variant={strategy === 'maintain' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setStrategy('maintain')}
                    className={strategy === 'maintain' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  >
                    Maintain
                  </Button>
                  <Button
                    variant={strategy === 'reduce' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setStrategy('reduce')}
                    className={strategy === 'reduce' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  >
                    Reduce
                  </Button>
                  <Button
                    variant={strategy === 'increase' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setStrategy('increase')}
                    className={strategy === 'increase' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  >
                    Increase
                  </Button>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='internalLimit'>Internal limit recommended:</Label>
                <Input
                  id='internalLimit'
                  value={internalLimit}
                  onChange={(e) => setInternalLimit(e.target.value)}
                  placeholder='Enter limit'
                />
                <span className='text-sm text-muted-foreground'>INR {internalLimit} Cr</span>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='exposureTolerance'>Exposure tolerance note:</Label>
                <Textarea
                  id='exposureTolerance'
                  value={exposureTolerance}
                  onChange={(e) => setExposureTolerance(e.target.value)}
                  rows={3}
                  placeholder='Enter exposure tolerance note...'
                />
              </div>

              <div className='space-y-3'>
                <Label className='text-sm font-medium'>Circulate strategy to:</Label>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='accountManagers'
                      checked={circulateToAccountManagers}
                      onCheckedChange={(checked) =>
                        setCirculateToAccountManagers(checked === true)
                      }
                    />
                    <Label htmlFor='accountManagers' className='text-sm font-normal cursor-pointer'>
                      Account Managers
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='branchHeads'
                      checked={circulateToBranchHeads}
                      onCheckedChange={(checked) => setCirculateToBranchHeads(checked === true)}
                    />
                    <Label htmlFor='branchHeads' className='text-sm font-normal cursor-pointer'>
                      Branch Heads
                    </Label>
                  </div>
                </div>
              </div>

              <div className='flex justify-end pt-4'>
                <Button className='bg-blue-600 hover:bg-blue-700'>Send Notification</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  )
}
