import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MonetaryAccounting } from '../types'

interface MonetaryAccountingProps {
  monetary: MonetaryAccounting
}

export function MonetaryAccounting({ monetary }: MonetaryAccountingProps) {
  const formatRupee = (amount: number) => `₹${amount.toFixed(1)} Cr`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monetary Accounting</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='lds'>Liquidated Damages (LDs)</Label>
            <Input
              id='lds'
              value={formatRupee(monetary.lds)}
              readOnly
              className='font-medium'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='setoffs'>Set-offs</Label>
            <Input
              id='setoffs'
              value={formatRupee(monetary.setoffs)}
              readOnly
              className='font-medium'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='net-claimable'>Net Claimable</Label>
            <Input
              id='net-claimable'
              value={formatRupee(monetary.net_claimable)}
              readOnly
              className='font-medium text-green-600'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='salvage-plan'>Salvage & Recovery Plan</Label>
          <Textarea
            id='salvage-plan'
            value={monetary.salvage_plan}
            readOnly
            rows={3}
            className='resize-none'
          />
        </div>
      </CardContent>
    </Card>
  )
}
