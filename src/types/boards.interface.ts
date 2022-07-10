import { ITask } from './tasks.interface'

export interface IBoard {
  id: number
  name: string
  columns?: IBoardColum[]
}

interface IBoardColum {
  id: number
  name: string
  tasks?: ITask[]
}
