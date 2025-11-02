import {
  LayoutDashboard,
  FileText,
  Shield,
  List,
  User,
  FileCheck,
  Building2,
  Settings,
  BarChart3,
  Bell,
  ListTodo,
  FolderKanban,
  Users,
  Briefcase,
  Activity,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Mukund',
    email: 'mukund@axitrust.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [],
  navGroups: [
    {
      title: '',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Bond Applications',
          icon: FileText,
          items: [
            {
              title: 'All Applications',
              url: '/bond-applications',
              icon: FileText,
            },
            {
              title: 'In Underwriting',
              url: '/bond-applications/underwriting',
              icon: Shield,
            },
            {
              title: 'NBI Generated',
              url: '/bond-applications/nbi',
              icon: List,
            },
            {
              title: 'In Issuance',
              url: '/bond-applications/issuance',
              icon: User,
            },
          ],
        },
        {
          title: 'Issued Bonds',
          url: '/issued-bonds',
          icon: FileCheck,
        },
        {
          title: 'Principal Management',
          url: '/principal-management',
          icon: Building2,
        },
        {
          title: 'Risk Monitoring',
          icon: BarChart3,
          items: [
            {
              title: 'Portfolio Monitoring',
              url: '/risk-monitoring/project',
              icon: Briefcase,
            },
            {
              title: 'Contractor Portfolio Review',
              url: '/risk-monitoring/customer-bond-portfolio',
              icon: FolderKanban,
            },
            {
              title: 'Project Monitoring',
              url: '/risk-monitoring/project-monitoring',
              icon: Activity,
            },
          ],
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}
