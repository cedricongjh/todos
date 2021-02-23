import React, { useEffect, useState } from 'react'

import axios, { AxiosResponse }  from 'axios'

import TodoControl from './todoControl'
import TodoForm from './forms/todoForm'

import BeatLoader from "react-spinners/BeatLoader"

import { insertTodo } from '../../utils/dateHandling'
import { Todo, Category } from '../../interfaces/todo.interfaces'
import { SSL_OP_COOKIE_EXCHANGE } from 'constants'


const TodoList: React.FC<{setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> = 
  ({setLoggedIn}) => {

  // todo state
  const [todos, setTodos] = useState<Todo[]>([])
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([])
  const [formtodo, setFormTodo] = useState<Todo>({text: '', due: '', completed: false, category_id: undefined})

  const [categories, setCategories] = useState<Category[]>([])

  // state used to trigger actions
  const [filter, setFilter] = useState(false)
  const [dateOrder, setDateOrder] = useState<boolean>(true)

  // state used to set loading indicators
  const [fetching, setFetching] = useState(false)
  const [saving, setSaving] = useState(false)
  const [adding, setAdding] = useState(false)

  // trigger filtering when todos update
  useEffect(() => {
    setDisplayedTodos([...todos])
    setFilter(f => !f)
  }, [todos])
  
  // fetch user data upon mounting
  useEffect(() => {
    setFetching(true)
    axios.get('/user').then((resp: any) => {
      let todos = resp.data.data['todos']
      setTodos(todos)
      let categories = resp.data.data['categories']
      setCategories(categories)
      setDateOrder(resp.data.data['date_sort_ascending'])
      setFetching(false)
    }).catch(err => {
      console.log(err)
      setTodos([])
      setCategories([])
      setFetching(false)
    })
  }, [])

  const handleSubmit = (payload: Todo) => {
    setSaving(true)
    setAdding(true)
    axios.post('/todos', {...payload}).then((resp: any) => {
      setTodos(() => {
        if (resp.data.data.due) {
          return insertTodo(todos, resp.data.data, dateOrder)
        } else {
          if (dateOrder) {
            return [resp.data.data, ...todos]
          } else {
            return [...todos, resp.data.data]
          }
        }
      })
      setFormTodo({text: '', due: '', completed: false, category_id: undefined})
    }).finally(() => {
      setSaving(false)
      setAdding(false)
    })
  }

  const handleUpdate = (todo: Todo, property: string, newValue: any) => {
      if (todo.id) {
        if (property === 'due') {
          const newTodo = {...todo, [property]: newValue}
          const removed = todos.filter(ele => ele.id !== todo.id)
          return setTodos(() => insertTodo(removed, newTodo, dateOrder))
        } else {
          setTodos(() => { return todos.map(ele => ele.id !== todo.id ? ele: {...todo, [property]: newValue})})
        }
      } else {
        setFormTodo({...formtodo, [property]: newValue})
      }
    }

  const handleDelete = (todo: Todo) => {
    axios.delete(`todos/${todo.id}`).then((resp: AxiosResponse<any>) => {
      setTodos(todos.filter(item => item.id !== todo.id))
    })
  }

  const handleCreateCategory = (newCategory: string, color?: string, todo?: Todo) => {
    axios.post('/categories', {name: newCategory, color: color}).then((resp: AxiosResponse<any>) => {
      setCategories([...categories, resp.data.data])
      if (todo) {
        handleUpdate(todo, 'category_id', resp.data.data.id)
        if (todo.id) {
          axios.put(`todos/${todo.id}`, {...todo, category_id: resp.data.data.id})
        }
      }
    })
  }

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(() => {
      if (updatedCategory.id) {
        return categories.map(ele => ele.id !== updatedCategory.id ? ele : {...updatedCategory})
      } else {
        return categories.map(ele => ele.id ? ele : {...updatedCategory})
      }
    })
  }

  const handleDeleteCategory = (deletedCategory: Category) => {
    setCategories(() => categories.filter(categories => categories.id !== deletedCategory.id))
    setTodos(() => {
      return todos.map(
        todo => {
          if (todo.category_id === deletedCategory.id) {
            return {...todo, category_id: undefined}
          } else {
            return todo
          }
        }
      )
    })
    axios.delete(`/categories/${deletedCategory.id}`).then((resp: any) => {
    })

  }

  const handleChangeSortOrder = (value: boolean) => {
    setTodos([...todos].reverse())
    setDateOrder(value)
    axios.put('/user', {'date_sort_ascending': value})
  }

  const logout = () => {
      axios.post('logout').then((resp: AxiosResponse<any>) => {
        localStorage.removeItem('filterSettings')
        document.cookie = "Authorized=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        setLoggedIn(false)
      })
  }

  return (
  <div className="todo-list">

    <TodoControl 
      todos={todos} 
      categories={categories}
      filter={filter}
      dateOrder={dateOrder}
      saving={saving}
      setDisplayedTodos={setDisplayedTodos}
      handleCreateCategory={handleCreateCategory}
      handleUpdateCategory={handleUpdateCategory}
      handleDeleteCategory={handleDeleteCategory}
      handleChangeSortOrder={handleChangeSortOrder}
      handleLogout={logout} />
  
    {!fetching ? displayedTodos.map((todo, index) => 
    <TodoForm
      key={todo.id || ''} 
      todo={todo}
      index={index}
      categories={categories}
      setSaving={setSaving}
      handleUpdate={handleUpdate}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      createCategory={handleCreateCategory} 
    />) : 
    <div className = "todo-list-loading-indicator">
      <div className="todo-list-loading-indicator-container">
        <BeatLoader />
        Getting your todos...
      </div>
    </div>}

    {!adding ? <TodoForm 
      handleSubmit={handleSubmit} 
      handleUpdate={handleUpdate} 
      createCategory={handleCreateCategory} 
      handleDelete={handleDelete} 
      categories={categories} 
      todo={formtodo}
      setSaving={setSaving}
      index={displayedTodos.length} /> : null}

  </div>
  )
}

export default TodoList;