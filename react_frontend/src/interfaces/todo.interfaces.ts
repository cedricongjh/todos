export interface Todo {
    text: string
    id?: number
    category_id?: number
    due?: string
    completed: boolean
}
  
export interface Category {
    id?: number
    name: string
    color?: string
}
