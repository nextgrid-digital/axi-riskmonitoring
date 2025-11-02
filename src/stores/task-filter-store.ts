import { create } from 'zustand'
import type { TaskPriority } from '@/features/tasks/types'

interface TaskFilters {
  assignee: string[]
  priority: TaskPriority[]
  dueDate: {
    startDate: string | null
    endDate: string | null
  }
}

interface TaskFilterStore {
  filters: TaskFilters
  setAssignee: (assignee: string[]) => void
  setPriority: (priority: TaskPriority[]) => void
  setDueDate: (dueDate: { startDate: string | null; endDate: string | null }) => void
  resetFilters: () => void
}

const defaultFilters: TaskFilters = {
  assignee: [],
  priority: [],
  dueDate: {
    startDate: null,
    endDate: null,
  },
}

export const useTaskFilterStore = create<TaskFilterStore>((set) => ({
  filters: defaultFilters,
  setAssignee: (assignee) =>
    set((state) => ({
      filters: { ...state.filters, assignee },
    })),
  setPriority: (priority) =>
    set((state) => ({
      filters: { ...state.filters, priority },
    })),
  setDueDate: (dueDate) =>
    set((state) => ({
      filters: { ...state.filters, dueDate },
    })),
  resetFilters: () =>
    set({
      filters: defaultFilters,
    }),
}))

