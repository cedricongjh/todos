export interface Todo {
    text: string
    id?: number
    category_id?: number
    due?: string | null
    completed: boolean
}
  
export interface Category {
    id?: number
    name: string
    color?: string
}
