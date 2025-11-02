import { useState, useMemo } from 'react'
import { Main } from '@/components/layout/main'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import { TasksProvider } from './components/tasks-provider'
import { TasksTable } from './components/tasks-table'
import { TasksKanban } from './components/tasks-kanban'
import { TasksViewToggle } from './components/tasks-view-toggle'
import { tasks } from './data/tasks'
import { TaskStatus } from './types'
import type { Task } from './types'
import { useTaskFilterStore } from '@/stores/task-filter-store'

export function Tasks() {
  const [view, setView] = useState<'table' | 'kanban'>('table')
  const [tasksState, setTasksState] = useState<Task[]>(tasks)
  const filters = useTaskFilterStore((state) => state.filters)

  // Apply filters
  const filteredTasks = useMemo(() => {
    return tasksState.filter((task) => {
      if (filters.assignee.length > 0 && !filters.assignee.includes(task.assignee)) {
        return false
      }
      if (filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
        return false
      }
      if (filters.dueDate.startDate) {
        const taskDate = new Date(task.dueDate)
        const startDate = new Date(filters.dueDate.startDate)
        if (taskDate < startDate) return false
      }
      if (filters.dueDate.endDate) {
        const taskDate = new Date(task.dueDate)
        const endDate = new Date(filters.dueDate.endDate)
        if (taskDate > endDate) return false
      }
      return true
    })
  }, [tasksState, filters])

  const handleTaskUpdate = (taskId: string, newStatus: TaskStatus) => {
    setTasksState((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  return (
    <TasksProvider>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>
              Manage tasks generated from alerts or monitoring actions
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <TasksViewToggle view={view} onViewChange={setView} />
            <TasksPrimaryButtons />
          </div>
        </div>

        {view === 'table' ? (
          <TasksTable data={filteredTasks} />
        ) : (
          <TasksKanban tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} />
        )}
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}

