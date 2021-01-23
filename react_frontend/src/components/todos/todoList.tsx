import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse }  from 'axios'
import TodoItem from './todoItem'
import TodoForm from './forms/todoForm'
import { Todo, Category } from '../../interfaces/todo.interfaces'
import TodoControl from './todoControl'

const TodoList: React.FC<{setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> = 
  ({setLoggedIn}) => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formtodo, setFormTodo] = useState<Todo>({text: '', due: '', completed: false, category_id: undefined})

  const handleSubmit = (payload: Todo) => {
    axios.post('/todos', {...payload}).then((resp: any) => {
      setTodos(() => {
        return [...todos, resp.data.data]
      })
      setFormTodo({text: '', due: '', completed: false, category_id: undefined})
    })
  }

  const handleUpdate = (todo: Todo, property: string, newValue: any) => {
      if (todo.id) {
        setTodos(() => { return todos.map(ele => ele.id !== todo.id ? ele: {...todo, [property]: newValue})})
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

  const logout = () => {
      axios.post('logout').then((resp: AxiosResponse<any>) => {
        setLoggedIn(false)
      })

  }

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
    }).catch(err => {
      console.log(err)
      setTodos([])
      setCategories([])
    })
  }, [])

  return (
  <div className="todo-list">

    <div>
       <TodoControl 
        todos={todos} 
        categories={categories}
        filter={filter} 
        setDisplayedTodos={setDisplayedTodos}
        handleCreateCategory={handleCreateCategory}
        handleUpdateCategory={handleUpdateCategory}
        handleLogout={logout} />
    </div>
  
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