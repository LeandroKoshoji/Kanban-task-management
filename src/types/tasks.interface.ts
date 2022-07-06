interface ISubtask {
  title: string
  isCompleted: boolean
}
export interface ITask {
  title: string
  description: string
  status: string
  substasks?: ISubtask[]
}
