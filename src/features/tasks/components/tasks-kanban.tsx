import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatExposure } from '@/components/exposure-formatter'
import { format } from 'date-fns'
import { TaskStatus } from '../types'
import type { Task } from '../types'
import { GripVertical } from 'lucide-react'

interface TasksKanbanProps {
  tasks: Task[]
  onTaskUpdate: (taskId: string, newStatus: TaskStatus) => void
}

interface TaskCardProps {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className='mb-2 cursor-grab active:cursor-grabbing'
    >
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-sm font-medium leading-tight'>
            {task.title}
          </CardTitle>
          <div
            {...attributes}
            {...listeners}
            className='cursor-grab active:cursor-grabbing'
          >
            <GripVertical className='h-4 w-4 text-muted-foreground' />
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-2 pt-0'>
        <div className='text-xs text-muted-foreground'>{task.contractor}</div>
        <div className='flex items-center justify-between'>
          <div className='text-xs font-medium'>{formatExposure(task.exposure)}</div>
          {task.linkedAlert && (
            <Badge variant='outline' className='text-xs'>
              {task.linkedAlert.id}
            </Badge>
          )}
        </div>
        <div className='flex items-center justify-between text-xs'>
          <span className='text-muted-foreground'>
            Due: {format(new Date(task.dueDate), 'MMM dd')}
          </span>
          <Badge
            variant={task.sla <= 2 ? 'destructive' : 'secondary'}
            className='text-xs'
          >
            {task.sla}d left
          </Badge>
        </div>
        <div className='flex items-center justify-between pt-1'>
          <Badge
            variant={
              task.priority === 'Critical'
                ? 'destructive'
                : task.priority === 'High'
                  ? 'default'
                  : 'secondary'
            }
            className='text-xs'
          >
            {task.priority}
          </Badge>
          <div className='text-xs text-muted-foreground'>{task.assignee}</div>
        </div>
      </CardContent>
    </Card>
  )
}

interface KanbanColumnProps {
  title: string
  status: TaskStatus
  tasks: Task[]
  onTaskUpdate: (taskId: string, newStatus: TaskStatus) => void
  id: string
}

function KanbanColumn({ title, status, tasks, onTaskUpdate, id }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  })

  return (
    <div
      ref={setNodeRef}
      className='flex h-full min-w-[300px] flex-col rounded-lg border bg-muted/50 p-4'
    >
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='font-semibold'>{title}</h3>
        <Badge variant='secondary'>{tasks.length}</Badge>
      </div>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className='flex-1 space-y-2 overflow-y-auto'>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className='py-8 text-center text-sm text-muted-foreground'>
              No tasks
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

export function TasksKanban({ tasks, onTaskUpdate }: TasksKanbanProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const columns = [
    { status: TaskStatus.NOT_STARTED, title: 'Not Started' },
    { status: TaskStatus.IN_PROGRESS, title: 'In Progress' },
    { status: TaskStatus.INFO_REQUESTED, title: 'Info Requested' },
    { status: TaskStatus.COMPLETED, title: 'Completed' },
  ]

  const tasksByStatus = columns.reduce((acc, col) => {
    acc[col.status] = tasks.filter((task) => task.status === col.status)
    return acc
  }, {} as Record<TaskStatus, Task[]>)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const overId = over.id as string

    // Check if dropping on a valid status column
    if (Object.values(TaskStatus).includes(overId as TaskStatus)) {
      const task = tasks.find((t) => t.id === taskId)
      if (task && task.status !== overId) {
        onTaskUpdate(taskId, overId as TaskStatus)
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className='flex gap-4 overflow-x-auto pb-4'>
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            id={column.status}
            title={column.title}
            status={column.status}
            tasks={tasksByStatus[column.status] || []}
            onTaskUpdate={onTaskUpdate}
          />
        ))}
      </div>
    </DndContext>
  )
}

