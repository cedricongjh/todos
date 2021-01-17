import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse }  from 'axios'
import TodoItem from './todoItem'

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


const TodoList: React.FC = () => {

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

  const handleDelete = (todo: Todo) => {
    axios.delete(`todos/${todo.id}`).then((resp: AxiosResponse<any>) => {
      setTodos(todos.filter(item => item.id !== todo.id))
    })
  }

  const handleCreateCategory = (newCategory: string, todo: Todo) => {
    axios.post('/categories', {name: newCategory}).then((resp: AxiosResponse<any>) => {
      setCategories([...categories, resp.data.data])
      handleUpdate(todo, 'category', resp.data.data.name, false)
    })
  }

  useEffect(() => {
    axios.get('/todos').then((resp: any) => {
      let todos = resp.data.data
      todos.push({text: '', category: '', due: '', completed: false})
      setTodos(todos)
    }).catch(err => {
      setTodos([{text: '', category: '', due: '', completed: false}])
    })
    axios.get('/categories').then((resp: any) => {
      setCategories(resp.data.data)
    }).catch(err => {
      setCategories([])
    })
  }, [])

  return (
  <div className="todo-list">

    <div className="todo-list-row todo-list-headers">
      <div></div>
      <div>TODO</div>
      <div>CATEGORY</div>
      <div>DUE</div>
    </div>
  
    {todos.map(todo => 
    <TodoItem
      key={todo.id || ''} 
      todo={todo}
      categories={categories}
      handleUpdate={handleUpdate}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      createCategory={handleCreateCategory} 
    />)}
  
  </div>
  )
}

export default TodoList;