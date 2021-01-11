import React, { useEffect, useState } from 'react'
import './App.css'
import axios  from 'axios'
import TodoItem from './components/todoItem'

type Todo  = {
  text: string
  id?: number
  category?: string
  due?: string
  completed: boolean
}

type Category = {
  id?: number
  name: string
}


const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const handleSubmit = (payload: Todo) => {
    axios.post('/todos', {...payload}).then((resp: any) => {
      setTodos(() => {
        todos.pop()
        return [...todos, resp.data.data, {text: '', category: '', due: '', completed: false}]
      })
    })
  }

  const handleUpdate = (todo: Todo, property: string, newValue: any, submit: Boolean) => {
    if (submit) {
      axios.put(`/todos/${todo.id}`, {...todo, [property]: newValue}).then((resp: any) => {
        setTodos(todos.map(ele => ele.id !== todo.id ? ele : resp.data.data))
      })
    } else {
      setTodos(() => {
        if (todo.id) {
          return todos.map(ele => ele.id !== todo.id ? ele: {...todo, [property]: newValue})
        } else {
          return todos.map(ele => ele.id ? ele : {...todo, [property]: newValue})
        }
      })
    }
  }

  useEffect(() => {
    axios.get('/todos').then((resp: any) => {
      let todos = resp.data.data
      todos.push({text: '', category: '', due: '', completed: false})
      setTodos(todos)
    })
    axios.get('/categories').then((resp: any) => {
      setCategories(resp.data.data)
    })
  }, [])

  return (
  <div>

    <div>TODO CATEGORY DUE</div>
  
    {todos.map(todo => 
    <TodoItem
      key={todo.id || ''} 
      todo={todo}
      categories={categories}
      handleUpdate={handleUpdate}
      handleSubmit={handleSubmit} 
    />)}
  
  </div>
  )
}

export default App;
