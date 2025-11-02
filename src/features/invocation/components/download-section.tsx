import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileDown } from 'lucide-react'
import { toast } from 'sonner'

export function DownloadSection() {
  const handleDownload = () => {
    toast.info('PDF download triggered (mock)')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Output</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Button
          variant='default'
          className='w-full'
          onClick={handleDownload}
        >
          <FileDown className='mr-2 h-4 w-4' />
          Download Invocation Readiness Kit (PDF)
        </Button>
        <p className='text-sm text-muted-foreground'>
          Chronology + annexures included
        </p>
      </CardContent>
    </Card>
  )
}

