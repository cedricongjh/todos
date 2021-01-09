import React, { useEffect, useState } from 'react'
import './App.css'
import axios  from 'axios'
import TodoForm from './components/forms/todoForm'

  // find way to make these passable as params
  interface Todo {
    text: string
    id?: number
    category?: string
    due?: string
    completed: boolean
  }

  interface Category {
    id?: number
    name: string
  }


const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const handleSubmit = (evt: any, payload: Todo) => {
    evt.preventDefault()
    axios.post('/todos', {...payload}).then((resp: any) => {
      console.log(resp)
      setTodos([...todos, resp.data.data])
    })
  }

  const handleUpdate = (todo: Todo, checked: Boolean) => {
    axios.put(`/todos/${todo.id}`, {...todo, completed: checked}).then((resp: any) => {
      console.log(resp)
      setTodos(todos.map(ele => ele.id !== todo.id ? ele : resp.data.data))
    })
  }

  useEffect(() => {
    axios.get('/todos').then((resp: any) => {
      setTodos(resp.data.data)
    })
    axios.get('/categories').then((resp: any) => {
      setCategories(resp.data.data)
    })
  }, [])

  return (
  <div>
    <div>TODO CATEGORY DUE</div>
    {todos.map(todo => <div key={todo.id}>
      <input type="checkbox" checked={todo.completed} onChange={e => handleUpdate(todo, e.target.checked)}/>
      {todo.text} {todo.category} {todo.due}
    </div>)}
    <TodoForm handleSubmit={handleSubmit} categories={categories} />
  </div>
  )
}

export default App;
