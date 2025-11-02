import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CheckCircle,
  AlertCircle,
  Timer,
  HelpCircle,
  CircleOff,
} from 'lucide-react'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    label: 'Not Started',
    value: 'Not Started' as const,
    icon: Circle,
  },
  {
    label: 'In Progress',
    value: 'In Progress' as const,
    icon: Timer,
  },
  {
    label: 'Info Requested',
    value: 'Info Requested' as const,
    icon: HelpCircle,
  },
  {
    label: 'Completed',
    value: 'Completed' as const,
    icon: CheckCircle,
  },
  {
    label: 'Canceled',
    value: 'Canceled' as const,
    icon: CircleOff,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'Low' as const,
    icon: ArrowDown,
  },
  {
    label: 'Medium',
    value: 'Medium' as const,
    icon: ArrowRight,
  },
  {
    label: 'High',
    value: 'High' as const,
    icon: ArrowUp,
  },
  {
    label: 'Critical',
    value: 'Critical' as const,
    icon: AlertCircle,
  },
]
