import React, { useEffect, useState } from 'react'

import axios, { AxiosResponse }  from 'axios'

import TodoControl from './todoControl'
import TodoItem from './todoItem'
import TodoForm from './forms/todoForm'

import { insertTodo } from '../../utils/dateHandling'
import { Todo, Category } from '../../interfaces/todo.interfaces'


const TodoList: React.FC<{setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> = 
  ({setLoggedIn}) => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([])
  const [formtodo, setFormTodo] = useState<Todo>({text: '', due: '', completed: false, category_id: undefined})

  const [categories, setCategories] = useState<Category[]>([])


  const [filter, setFilter] = useState(false)
  const [dateOrder, setDateOrder] = useState<boolean>(true)

  // trigger filtering when todos update
  useEffect(() => {
    setDisplayedTodos([...todos])
    setFilter(f => !f)
  }, [todos])
  
  // fetch user data upon mounting
  useEffect(() => {
    axios.get('/user').then((resp: any) => {
      let todos = resp.data.data['todos']
      setTodos(todos)
      let categories = resp.data.data['categories']
      setCategories(categories)
      setDateOrder(resp.data.data['date_sort_ascending'])
    }).catch(err => {
      console.log(err)
      setTodos([])
      setCategories([])
    })
  }, [])

  const handleSubmit = (payload: Todo) => {
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
      setDisplayedTodos={setDisplayedTodos}
      handleCreateCategory={handleCreateCategory}
      handleUpdateCategory={handleUpdateCategory}
      handleDeleteCategory={handleDeleteCategory}
      handleChangeSortOrder={handleChangeSortOrder}
      handleLogout={logout} />
  
    {displayedTodos.map(todo => 
    <TodoItem
      key={todo.id || ''} 
      todo={todo}
      categories={categories}
      handleUpdate={handleUpdate}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      createCategory={handleCreateCategory} 
    />)}

    <TodoForm 
      handleSubmit={handleSubmit} 
      handleUpdate={handleUpdate} 
      createCategory={handleCreateCategory} 
      handleDelete={handleDelete} 
      categories={categories} 
      todo={formtodo} 
      setEdit={null} />
  
  </div>
  )
}

export default TodoList;