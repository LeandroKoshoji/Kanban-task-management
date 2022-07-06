import { ITask } from './tasks.interface'

export interface IBoard {
  id: number
  name: string
  columns?: IBoardColum[]
}

interface IBoardColum {
  name: string
  tasks?: ITask[]
}
