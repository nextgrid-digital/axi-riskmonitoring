import { Link, useRouterState } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { BarChart3, Bell, Bookmark, ListTodo } from 'lucide-react'

export function RiskMonitoringTabs() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const tabs = [
    {
      label: 'Alerts',
      path: '/risk-monitoring/project/alerts',
      icon: Bell,
    },
    {
      label: 'Portfolio',
      path: '/risk-monitoring/project/portfolio',
      icon: BarChart3,
    },
    {
      label: 'Saved Portfolio',
      path: '/risk-monitoring/project/saved-portfolio',
      icon: Bookmark,
    },
    {
      label: 'Task Manager',
      path: '/risk-monitoring/project/tasks',
      icon: ListTodo,
    },
  ]

  return (
    <div className='flex gap-2 border-b'>
      {tabs.map((tab) => {
        // Portfolio tab should be active on both /project/portfolio and /project (root)
        const isActive = 
          currentPath === tab.path || 
          currentPath.startsWith(tab.path + '/') ||
          (tab.path === '/risk-monitoring/project/portfolio' && currentPath === '/risk-monitoring/project')
        const Icon = tab.icon

        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:text-foreground',
              isActive
                ? 'text-foreground border-b-2 border-foreground -mb-[1px]'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className='h-4 w-4' />
            <span>{tab.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

