interface ISubtask {
  title: string
  isCompleted: boolean
}
export interface ITask {
  id: number
  title: string
  description: string
  status: string
  subtasks: ISubtask[]
}
