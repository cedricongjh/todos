export interface Todo {
    text: string
    id?: number
    category?: string
    due?: string
    completed: boolean
  }
  
export interface Category {
    id?: number
    name: string
}
