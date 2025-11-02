import { Link } from '@tanstack/react-router'
import { useSidebar } from '@/components/ui/sidebar'
import { ExternalLink } from 'lucide-react'
import axitrustLogo from '@/assets/axitrust.png'

export function AxiTrustLogo() {
  const { isMobile, setOpenMobile, state } = useSidebar()

  const isCollapsed = state === 'collapsed' && !isMobile

  return (
    <div className='flex flex-col items-center justify-center px-2 py-3 transition-all gap-2'>
      <Link
        to='/'
        onClick={() => setOpenMobile(false)}
        className='flex items-center justify-center w-full'
      >
        {/* White box container with axiTrust logo */}
        <div className='bg-white rounded-lg px-4 py-2.5 flex items-center gap-0.5 shadow-sm w-full justify-center'>
          {/* axitrust Logo Image */}
          <img
            src={axitrustLogo}
            alt='axitrust'
            className={isCollapsed ? 'h-8 w-8' : 'h-6 w-auto'}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Link>

      {/* Yellow SANDBOX INSTANCE banner */}
      {!isCollapsed && (
        <>
          <div className='bg-yellow-400 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm w-full justify-center'>
            <ExternalLink className='h-3.5 w-3.5 text-[#1D2B38]' />
            <span className='text-xs font-semibold uppercase tracking-wider text-[#1D2B38]'>
              SANDBOX INSTANCE
            </span>
            <ExternalLink className='h-3.5 w-3.5 text-[#1D2B38]' />
          </div>
          {/* Separator below yellow box */}
          <div className='w-full border-t border-sidebar-border mt-2'></div>
        </>
      )}
    </div>
  )
}

